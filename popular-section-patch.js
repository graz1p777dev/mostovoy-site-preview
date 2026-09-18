// Секция «Популярное» на главной — превью каталога: первые 8 моделей в
// том же порядке, что и весь каталог (iPhone → iPad → MacBook → остальная
// Apple → DJI/Meta/Dyson → остальное), схлопнутые по модели (см.
// catalog-group-patch.js — та же логика группировки/сортировки).
// Раньше здесь была отдельная подборка 5 категорий бандла сайта, но она
// требовала непустое поле image/img в базе, которого у нас нет — секция
// всегда была пустой.
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

  function bucketRank(p) {
    var name = String(p.name || "").toLowerCase();
    var brand = String(p.brand || "");
    var cat = String(p.category || "");
    if (name.indexOf("iphone") !== -1) return 0;
    if (name.indexOf("ipad") !== -1 || (cat === "iPad" && brand === "Apple")) return 1;
    if (name.indexOf("macbook") !== -1 || cat === "MacBook") return 2;
    if (brand === "Apple") return 3;
    if (brand === "DJI" || brand === "Meta" || brand === "Dyson") return 4;
    return 5;
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

  var STYLE_ID = "popular-section-style";
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

  function esc(s) {
    return String(s || "").replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }

  function fmtPrice(n, currency) {
    var v = Math.round(Number(n) || 0).toLocaleString("ru-RU");
    return v + " " + (currency === "RUB" ? "₽" : "$");
  }

  function card(cheapest, baseName, colors) {
    var href = "product.html?id=" + encodeURIComponent(cheapest.id);
    var photo = (window.__curatedPhoto && window.__curatedPhoto(baseName, cheapest.color)) || cheapest.image || cheapest.img || "";
    var letter = esc(String(baseName || "?").trim().charAt(0).toUpperCase());
    var media = photo
      ? '<img src="' + esc(photo) + '" alt="' + esc(baseName) + '" loading="lazy" decoding="async" onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{className:\'pcard__ph\',textContent:\'' + letter + "'}))\">"
      : '<span class="pcard__ph" aria-hidden="true">' + letter + "</span>";
    var swatches = "";
    if (colors.length > 1) {
      swatches = '<div class="pcard__swatches">' + colors.slice(0, 3).map(function (c) {
        return '<span class="pcard__swatch" style="background:' + colorHex(c) + '" title="' + esc(c) + '"></span>';
      }).join("") + (colors.length > 3 ? '<span class="pcard__swatch--more">+' + (colors.length - 3) + "</span>" : "") + "</div>";
    }
    var price = (colors.length > 1 || true) ? "от " + fmtPrice(cheapest.price, cheapest.currency) : fmtPrice(cheapest.price, cheapest.currency);
    return '<article class="pcard">' +
      '<a class="pcard__media" href="' + href + '">' + media + "</a>" +
      '<a class="pcard__name" href="' + href + '">' + esc(baseName) + "</a>" +
      swatches +
      '<div class="pcard__price">' + price + "</div>" +
      '<div class="pcard__foot"><a class="btn btn--sm" href="' + href + '">Подробнее</a></div>' +
      "</article>";
  }

  function buildPreview(catalog) {
    var available = catalog.filter(function (p) { return p.available; });
    var groups = {};
    var order = [];
    available.forEach(function (p, i) {
      var k = modelKey(p);
      if (!groups[k]) { groups[k] = []; order.push(k); }
      groups[k].push(p);
    });
    var models = order.map(function (k, i) {
      var list = groups[k].slice().sort(function (a, b) { return a.price - b.price; });
      var cheapest = list[0];
      var colors = [];
      var seen = {};
      list.forEach(function (p) {
        var c = niceColor(p);
        if (c && !seen[c]) { seen[c] = true; colors.push(c); }
      });
      return { cheapest: cheapest, baseName: stripModelNoise(cheapest.name || ""), colors: colors, rank: bucketRank(cheapest), i: i };
    });
    models.sort(function (a, b) { return a.rank - b.rank || a.i - b.i; });
    return models;
  }

  var MARK_ATTR = "data-popular-patched";

  function mount(catalog) {
    var heading = Array.from(document.querySelectorAll(".section__eyebrow")).find(function (el) {
      return /популярное/i.test(el.textContent || "");
    });
    var section = heading && heading.closest("section");
    var grid = section && section.querySelector(".pgrid");
    if (!grid || grid.getAttribute(MARK_ATTR) === "1") return;
    var models = buildPreview(catalog);
    if (!models.length) return;
    injectStyle();
    grid.setAttribute(MARK_ATTR, "1");
    grid.innerHTML = models.map(function (m) { return card(m.cheapest, m.baseName, m.colors); }).join("");
    var titleEl = section.querySelector(".section__title");
    if (titleEl) titleEl.textContent = "Каталог.";
    var eyebrowEl = section.querySelector(".section__eyebrow");
    if (eyebrowEl) eyebrowEl.textContent = "Каталог";
  }

  var catalogPromise = fetch("/api/catalog").then(function (r) { return r.json(); }).then(function (data) {
    return data.products || data;
  }).catch(function () { return []; });

  function tick() {
    catalogPromise.then(function (catalog) {
      if (catalog.length) mount(catalog);
    });
  }

  new MutationObserver(tick).observe(document.documentElement, { childList: true, subtree: true });
  tick();
})();
