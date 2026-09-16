// В каталоге каждая строка из базы (память × связь × цвет) рисуется как
// отдельная карточка — один iPhone превращается в 15+ карточек. Здесь
// схлопываем карточки одной модели в одну (мин. цена, «от»), показываем на
// ней до 3 кружков доступных цветов, а весь выбор конфигурации остаётся на
// странице товара (см. variant-picker.js). Логика группировки — та же, что
// и в variants.ts основного сайта.
(function () {
  var STORAGE_RE = /(?<![\p{L}\p{N}])\d+(?:[.,]\d+)?\s*\/\s*\d+(?:[.,]\d+)?\s*(?:gb|гб|tb|тб)?(?![\p{L}\p{N}])/giu;
  var STORAGE_UNIT_RE = /(?<![\p{L}\p{N}])\d+(?:[.,]\d+)?\s*(?:gb|гб|tb|тб|mb|мб)(?![\p{L}\p{N}])/giu;
  var CONN_RE = /(?<![\p{L}\p{N}])(?:wi-?fi|5g|4g|lte|e-?sim|dual\s*sim|физическая\s*sim|актив(?:ирован)?|active|2\s*sim)(?![\p{L}\p{N}])/giu;
  var SIZE_RE = /(?<![\p{L}\p{N}])\d{2}\s*(?:mm|мм)(?![\p{L}\p{N}])/giu;

  function stripModelNoise(name) {
    return (" " + name + " ")
      .replace(STORAGE_RE, " ")
      .replace(STORAGE_UNIT_RE, " ")
      .replace(CONN_RE, " ")
      .replace(SIZE_RE, " ")
      .replace(/\bm[45](?:\s*pro)?\b/gi, " ")
      .replace(/[()]/g, " ")
      .replace(/[/,+]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function stripColor(text, color) {
    if (!color) return text;
    var parts = color.split(/[/,]/).map(function (c) { return c.trim(); }).filter(Boolean);
    var out = text;
    [color].concat(parts).forEach(function (part) {
      if (!part) return;
      var re = new RegExp(part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
      out = out.replace(re, " ");
    });
    return out.replace(/\s+/g, " ").trim();
  }

  function modelKey(p) {
    var stripped = stripColor(stripModelNoise(String(p.name || "")), p.color).toLowerCase();
    var brand = String(p.brand || "").toLowerCase().trim();
    if (brand && stripped.indexOf(brand) === 0) stripped = stripped.slice(brand.length).trim();
    return brand + "|" + stripped.replace(/\s+/g, " ").trim();
  }

  function niceColor(p) {
    var c = String(p.color || "").replace(/\(.*?\)/g, "").trim().toLowerCase();
    if (!c || /^все цвета$/.test(c) || /[,/]/.test(c)) return null;
    return c;
  }

  var COLOR_HEX = {
    "синий": "#3a5a8c", "тёмно-синий": "#28344a", "темно-синий": "#28344a", "голубой": "#8fc4e0",
    "белый": "#f2f2f2", "серебристый": "#e5e5e5", "серебро": "#e5e5e5",
    "чёрный": "#1d1d1f", "черный": "#1d1d1f", "космический черный": "#2b2b2d",
    "оранжевый": "#e0632a", "красный": "#c22a2a", "розовый": "#e7b7c4", "жёлтый": "#e8c34a", "желтый": "#e8c34a",
    "зелёный": "#5f7a5a", "зеленый": "#5f7a5a", "фиолетовый": "#7d6ba0", "сиреневый": "#b7a8d1",
    "серый": "#8e8e93", "графит": "#4a4a4d", "титан": "#8a8a86", "титановый": "#8a8a86",
    "золотой": "#d4c19c", "золото": "#d4c19c", "бежевый": "#d8cdb8", "кремовый": "#efe7d8",
  };
  function colorHex(name) {
    for (var k in COLOR_HEX) { if (name.indexOf(k) !== -1) return COLOR_HEX[k]; }
    return "#c7c7cc";
  }

  var STYLE_ID = "catalog-group-style";
  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent =
      ".pcard__swatches{display:flex;gap:5px;margin:6px 0 2px}" +
      ".pcard__swatch{width:14px;height:14px;border-radius:50%;border:1px solid rgba(0,0,0,.15);flex:0 0 auto}" +
      ".pcard__swatch--more{width:auto;height:14px;border-radius:7px;padding:0 5px;font-size:10px;line-height:14px;color:var(--ink-2,#6e6e73);border:1px solid var(--line,#d2d2d7);background:#fff}";
    document.head.appendChild(style);
  }

  function plural(n, a, b, c) {
    var m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return a;
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return b;
    return c;
  }

  var MARK = "data-grouped";

  function process(catalog) {
    var grid = document.querySelector(".pgrid");
    if (!grid || grid.getAttribute(MARK) === "1") return;
    var cards = Array.from(grid.querySelectorAll(".pcard"));
    if (!cards.length) return;

    // id -> pcard, только карточки, которые реально сейчас в гриде (после фильтров).
    var byId = {};
    cards.forEach(function (card) {
      var link = card.querySelector("a[href*='product.html?id=']");
      var href = link && link.getAttribute("href");
      var m = href && href.match(/[?&]id=([^&]+)/);
      if (m) byId[decodeURIComponent(m[1])] = card;
    });

    var present = catalog.filter(function (p) { return byId[String(p.id)]; });
    if (!present.length) return;

    var groups = {};
    present.forEach(function (p) {
      var k = modelKey(p);
      (groups[k] || (groups[k] = [])).push(p);
    });

    injectStyle();
    grid.setAttribute(MARK, "1");

    Object.keys(groups).forEach(function (k) {
      var list = groups[k];
      if (list.length < 2) return;
      list.sort(function (a, b) { return a.price - b.price; });
      var cheapest = list[0];
      var repCard = byId[String(cheapest.id)];
      if (!repCard) return;

      // Убираем карточки остальных строк той же модели.
      list.slice(1).forEach(function (p) {
        var c = byId[String(p.id)];
        if (c && c.parentElement) c.parentElement.removeChild(c);
      });

      // Имя — самое короткое в группе (обычно это и есть «голая» модель).
      var baseName = list.reduce(function (s, p) { return (p.name || "").length < s.length ? p.name : s; }, list[0].name || "");
      var nameEl = repCard.querySelector(".pcard__name");
      if (nameEl) nameEl.textContent = baseName;

      var priceEl = repCard.querySelector(".pcard__price");
      if (priceEl && !/^от\s/.test(priceEl.textContent || "")) {
        priceEl.textContent = "от " + priceEl.textContent.trim();
      }

      // Цвета — уникальные, до 3 кружков + «+N».
      var colors = [];
      var seen = {};
      list.forEach(function (p) {
        var c = niceColor(p);
        if (c && !seen[c]) { seen[c] = true; colors.push(c); }
      });
      if (colors.length > 1 && !repCard.querySelector(".pcard__swatches")) {
        var wrap = document.createElement("div");
        wrap.className = "pcard__swatches";
        colors.slice(0, 3).forEach(function (c) {
          var dot = document.createElement("span");
          dot.className = "pcard__swatch";
          dot.style.background = colorHex(c);
          dot.title = c;
          wrap.appendChild(dot);
        });
        if (colors.length > 3) {
          var more = document.createElement("span");
          more.className = "pcard__swatch--more";
          more.textContent = "+" + (colors.length - 3);
          wrap.appendChild(more);
        }
        if (nameEl && nameEl.parentElement) nameEl.insertAdjacentElement("afterend", wrap);
        else repCard.appendChild(wrap);
      }
    });

    var remaining = grid.querySelectorAll(".pcard").length;
    var countEl = document.querySelector(".catalog__count");
    if (countEl) countEl.textContent = remaining + " " + plural(remaining, "товар", "товара", "товаров");
  }

  var catalogPromise = fetch("/api/catalog").then(function (r) { return r.json(); }).then(function (data) {
    return data.products || data;
  }).catch(function () { return []; });

  function tick() {
    catalogPromise.then(function (catalog) {
      if (catalog.length) process(catalog);
    });
  }

  // Каталог перерисовывается при каждой смене фильтра/сортировки/страницы —
  // сбрасываем метку, чтобы группировка отработала заново на новом наборе.
  new MutationObserver(function (mutations) {
    var grid = document.querySelector(".pgrid");
    if (grid && grid.getAttribute(MARK) !== "1") tick();
  }).observe(document.documentElement, { childList: true, subtree: true });

  tick();
})();
