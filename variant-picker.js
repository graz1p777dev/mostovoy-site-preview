// Переключатель цвета/конфигурации на странице товара. Сайт рендерит
// каждую строку из базы (память × связь × цвет) как отдельный товар без
// связи друг с другом — здесь группируем строки той же модели (логика
// повторяет frontend/src/variants.ts основного сайта) и добавляем пилюли
// «Цвет» / «Конфигурация», клик по которым ведёт на страницу нужной строки.
(function () {
  var STORAGE_RE = /\b\d+(?:[.,]\d+)?\s*\/\s*\d+(?:[.,]\d+)?\s*(?:gb|гб|tb|тб)?\b/gi;
  var STORAGE_UNIT_RE = /\b\d+(?:[.,]\d+)?\s*(?:gb|гб|tb|тб|mb|мб)\b/gi;
  var CONN_RE = /\b(?:wi-?fi|5g|4g|lte|e-?sim|dual\s*sim|физическая\s*sim|актив(?:ирован)?|2\s*sim)\b/gi;

  function stripModelNoise(name) {
    return (" " + name + " ")
      .replace(STORAGE_RE, " ")
      .replace(STORAGE_UNIT_RE, " ")
      .replace(CONN_RE, " ")
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
    var stripped = stripModelNoise(String(p.name || "")).toLowerCase();
    var brand = String(p.brand || "").toLowerCase().trim();
    if (brand && stripped.indexOf(brand) === 0) stripped = stripped.slice(brand.length).trim();
    return brand + "|" + stripped;
  }

  function configLabel(p, baseName) {
    var rest = String(p.name || "");
    var baseLower = baseName.toLowerCase();
    var idx = rest.toLowerCase().indexOf(baseLower);
    if (baseLower && idx !== -1) rest = rest.slice(0, idx) + rest.slice(idx + baseName.length);
    rest = stripColor(rest, p.color);
    rest = rest.replace(/[()]/g, " ").replace(/^[\s/,+-]+|[\s/,+-]+$/g, "").replace(/\s+/g, " ").trim();
    return rest;
  }

  function qs(name) {
    return new URLSearchParams(location.search).get(name);
  }

  var currentId = qs("id");
  if (!currentId) return;

  var STYLE_ID = "variant-picker-style";
  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent =
      ".vopt{margin-top:20px}" +
      ".vopt__title{color:var(--ink-2,#6e6e73);font-size:13px;margin-bottom:8px}" +
      ".vpills{display:flex;flex-wrap:wrap;gap:8px}" +
      ".vpill{border:1px solid var(--line,#d2d2d7);background:#fff;color:var(--ink,#1d1d1f);border-radius:999px;padding:8px 16px;font-size:13px;cursor:pointer;transition:border-color .15s,color .15s}" +
      ".vpill:hover{border-color:var(--ink,#1d1d1f)}" +
      ".vpill.active{border-color:var(--accent,#e11d1d);color:var(--accent,#e11d1d);font-weight:600}";
    document.head.appendChild(style);
  }

  fetch("/api/catalog")
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var list = data.products || data;
      var current = list.find(function (p) { return String(p.id) === String(currentId); });
      if (!current) return;

      var key = modelKey(current);
      var siblings = list.filter(function (p) { return modelKey(p) === key; });
      if (siblings.length < 2) return;

      var baseName = siblings.reduce(function (s, x) {
        return (x.name || "").length < s.length ? x.name : s;
      }, siblings[0].name || current.name);

      var byPrice = siblings.slice().sort(function (a, b) { return a.price - b.price; });

      var colors = [];
      var seenColor = {};
      byPrice.forEach(function (p) {
        if (p.color && !seenColor[p.color]) {
          seenColor[p.color] = true;
          colors.push(p);
        }
      });

      var configs = [];
      var seenConfig = {};
      byPrice.forEach(function (p) {
        var label = configLabel(p, baseName) || p.color || p.name;
        if (label && label !== baseName && !seenConfig[label]) {
          seenConfig[label] = true;
          configs.push([label, p]);
        }
      });

      function buildBlock(title, entries, labelFn) {
        if (entries.length < 2) return "";
        var html = '<div class="vopt"><p class="vopt__title">' + title + '</p><div class="vpills">';
        entries.forEach(function (p) {
          var label = labelFn(p);
          var active = String(p.id) === String(currentId) ? " active" : "";
          html += '<button type="button" class="vpill' + active + '" data-goto="' + encodeURIComponent(String(p.id)) + '">' + label + "</button>";
        });
        html += "</div></div>";
        return html;
      }

      var html =
        buildBlock("Цвет", colors, function (p) { return p.color; }) +
        buildBlock("Конфигурация", configs.map(function (c) { return c[1]; }), function (p) { return configLabel(p, baseName) || p.color || p.name; });
      if (!html) return;

      function mount() {
        if (document.getElementById("variantPicker")) return;
        var actions = document.querySelector(".pdetail__actions");
        if (!actions) return;
        injectStyle();
        var wrap = document.createElement("div");
        wrap.id = "variantPicker";
        wrap.innerHTML = html;
        actions.insertAdjacentElement("beforebegin", wrap);
        wrap.addEventListener("click", function (e) {
          var btn = e.target.closest("[data-goto]");
          if (!btn) return;
          location.href = "product.html?id=" + btn.dataset.goto;
        });
      }

      mount();
      new MutationObserver(mount).observe(document.documentElement, { childList: true, subtree: true });
    })
    .catch(function () {});
})();
