// Выбор конфигурации прямо на странице товара — без перехода на другую
// страницу. Строки из базы одной модели (память × связь × цвет × размер…)
// раскладываем по осям, рисуем пилюли для каждой оси; при клике находим
// строку с нужным сочетанием и перерисовываем карточку через
// window.__mostovoyRender (assets/product-variants.js) — цена, фото и
// кнопки «Купить/В корзину» при этом относятся уже к выбранной строке.
(function () {
  var STORAGE_RE = /\b\d+(?:[.,]\d+)?\s*\/\s*\d+(?:[.,]\d+)?\s*(?:gb|гб|tb|тб)?\b/gi;
  var STORAGE_UNIT_RE = /\b\d+(?:[.,]\d+)?\s*(?:gb|гб|tb|тб|mb|мб)\b/gi;
  var CONN_RE = /\b(?:wi-?fi|5g|4g|lte|e-?sim|dual\s*sim|физическая\s*sim|актив(?:ирован)?|2\s*sim)\b/gi;
  var SIZE_RE = /\b(\d{2})\s*(?:mm|мм)\b/i;

  function stripModelNoise(name) {
    return (" " + name + " ")
      .replace(STORAGE_RE, " ")
      .replace(STORAGE_UNIT_RE, " ")
      .replace(CONN_RE, " ")
      .replace(SIZE_RE, " ")
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

  // Ключ модели: бренд + название без памяти/связи/размера/цвета.
  function modelKey(p) {
    var stripped = stripColor(stripModelNoise(String(p.name || "")), p.color).toLowerCase();
    var brand = String(p.brand || "").toLowerCase().trim();
    if (brand && stripped.indexOf(brand) === 0) stripped = stripped.slice(brand.length).trim();
    return brand + "|" + stripped.replace(/\s+/g, " ").trim();
  }

  function fmtStorage(num, unit) {
    var n = String(num).replace(",", ".");
    var u = /t/i.test(unit) ? "ТБ" : "ГБ";
    return n + " " + u;
  }

  // Оси конфигурации одной строки: память (и ОЗУ, если есть), связь, размер, цвет.
  function dims(p) {
    var name = String(p.name || "");
    var id = String(p.id || "");
    var out = { storage: null, ram: null, sim: null, size: null, color: null };

    var pair = name.match(/\b(\d+)\s*\/\s*(\d+)\s*(gb|гб|tb|тб)?\b/i);
    if (pair) {
      out.ram = pair[1] + " ГБ";
      out.storage = fmtStorage(pair[2], pair[3] || "gb");
    } else {
      var units = name.match(/\b\d+(?:[.,]\d+)?\s*(?:gb|гб|tb|тб)\b/gi) || [];
      if (units.length >= 2) {
        var r = units[0].match(/(\d+(?:[.,]\d+)?)\s*(\w+)/i);
        var s = units[units.length - 1].match(/(\d+(?:[.,]\d+)?)\s*(\w+)/i);
        out.ram = fmtStorage(r[1], r[2]);
        out.storage = fmtStorage(s[1], s[2]);
      } else if (units.length === 1) {
        var m = units[0].match(/(\d+(?:[.,]\d+)?)\s*(\w+)/i);
        out.storage = fmtStorage(m[1], m[2]);
      }
    }

    if (/физическ\w*\s*sim\s*\+\s*e-?sim|odna-fiz-sim-plus-esim|fizicheskaya-sim-plus-esim/i.test(name + " " + id)) out.sim = "SIM + eSIM";
    else if (/e-?sim\s*актив|esim-active/i.test(name + " " + id)) out.sim = "eSIM Active";
    else if (/\be-?sim\b/i.test(name) || /(^|-)esim(-|$)/i.test(id)) out.sim = "eSIM";
    else if (/dual\s*sim|2\s*sim|-2-sim/i.test(name + " " + id)) out.sim = "2 SIM";
    else if (/\b(?:5g|lte|cellular)\b/i.test(name)) out.sim = "Wi-Fi + Cellular";
    else if (/\bwi-?fi\b/i.test(name)) out.sim = "Wi-Fi";

    var size = name.match(SIZE_RE);
    if (size) out.size = size[1] + " мм";

    // «белый (Silver)» → «белый»; строки с двумя цветами через запятую —
    // это дубли одноцветных, в пилюли их не выносим.
    var color = String(p.color || "").replace(/\(.*?\)/g, "").trim().toLowerCase();
    if (color && !/^все цвета$/.test(color) && !/[,/]/.test(color)) out.color = color;

    return out;
  }

  var AXES = [
    { key: "storage", title: "Память" },
    { key: "ram", title: "Оперативная память" },
    { key: "size", title: "Размер" },
    { key: "sim", title: "SIM" },
    { key: "color", title: "Цвет" },
  ];

  function sortValues(values, key) {
    return values.slice().sort(function (a, b) {
      if (key === "storage" || key === "ram" || key === "size") {
        var na = parseFloat(a) * (/ТБ/.test(a) ? 1024 : 1);
        var nb = parseFloat(b) * (/ТБ/.test(b) ? 1024 : 1);
        return na - nb;
      }
      return a.localeCompare(b, "ru");
    });
  }

  var STYLE_ID = "variant-picker-style";
  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent =
      ".vopt{margin-top:18px}" +
      ".vopt__title{color:var(--ink-2,#6e6e73);font-size:13px;margin:0 0 8px}" +
      ".vopt__title b{color:var(--ink,#1d1d1f);font-weight:600}" +
      ".vpills{display:flex;flex-wrap:wrap;gap:8px}" +
      ".vpill{border:1px solid var(--line,#d2d2d7);background:#fff;color:var(--ink,#1d1d1f);border-radius:999px;padding:9px 16px;font-size:14px;line-height:1;cursor:pointer;transition:border-color .15s,color .15s;font-family:inherit}" +
      ".vpill:hover{border-color:var(--ink,#1d1d1f)}" +
      ".vpill.active{border-color:var(--accent,#e11d1d);color:var(--accent,#e11d1d);font-weight:600}" +
      ".vpill.muted{color:var(--ink-3,#86868b);border-style:dashed}" +
      "@media (max-width:600px){.vpill{padding:11px 16px;font-size:15px}}";
    document.head.appendChild(style);
  }

  function buildPicker(current, catalog) {
    var key = modelKey(current);
    var siblings = catalog.filter(function (p) { return modelKey(p) === key; });
    if (siblings.length < 2) return null;

    var rows = siblings.map(function (p) { return { p: p, d: dims(p) }; });
    var currentDims = dims(current);

    var axes = AXES.map(function (axis) {
      var values = {};
      rows.forEach(function (r) { if (r.d[axis.key]) values[r.d[axis.key]] = true; });
      return { key: axis.key, title: axis.title, values: sortValues(Object.keys(values), axis.key) };
    }).filter(function (a) { return a.values.length > 1; });
    if (!axes.length) return null;

    // Строка, подходящая под выбранные значения; при отсутствии точного
    // совпадения — ближайшая по остальным осям, из равных — самая дешёвая.
    function pick(selection) {
      var best = null, bestScore = -1;
      rows.forEach(function (r) {
        var score = 0;
        for (var k in selection) {
          if (!selection[k]) continue;
          if (r.d[k] === selection[k]) score += k === selection.__changed ? 100 : 1;
          else if (k === selection.__changed) return;
        }
        if (score > bestScore || (score === bestScore && best && r.p.price < best.p.price)) {
          best = r; bestScore = score;
        }
      });
      return best ? best.p : null;
    }

    function exists(sel) {
      return rows.some(function (r) {
        for (var k in sel) { if (k !== "__changed" && sel[k] && r.d[k] !== sel[k]) return false; }
        return true;
      });
    }

    var html = "";
    axes.forEach(function (axis) {
      var cur = currentDims[axis.key];
      html += '<div class="vopt" data-axis="' + axis.key + '"><p class="vopt__title">' + axis.title + (cur ? ": <b>" + cur + "</b>" : "") + '</p><div class="vpills">';
      axis.values.forEach(function (v) {
        var sel = {}; for (var k in currentDims) sel[k] = currentDims[k]; sel[axis.key] = v;
        var cls = "vpill" + (v === cur ? " active" : "") + (exists(sel) ? "" : " muted");
        html += '<button type="button" class="' + cls + '" data-axis="' + axis.key + '" data-value="' + v.replace(/"/g, "&quot;") + '">' + v + "</button>";
      });
      html += "</div></div>";
    });

    return { html: html, currentDims: currentDims, pick: pick };
  }

  function mount(detail) {
    var current = detail.product;
    var catalog = detail.catalog && (detail.catalog.products || detail.catalog);
    if (!current || !Array.isArray(catalog)) return;
    var actions = document.querySelector(".pdetail__actions");
    if (!actions || document.getElementById("variantPicker")) return;
    var picker = buildPicker(current, catalog);
    if (!picker) return;
    injectStyle();
    var wrap = document.createElement("div");
    wrap.id = "variantPicker";
    wrap.innerHTML = picker.html;
    actions.insertAdjacentElement("beforebegin", wrap);
    wrap.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-axis]");
      if (!btn || btn.classList.contains("active")) return;
      var sel = {};
      for (var k in picker.currentDims) sel[k] = picker.currentDims[k];
      sel[btn.dataset.axis] = btn.dataset.value;
      sel.__changed = btn.dataset.axis;
      var next = picker.pick(sel);
      if (!next || String(next.id) === String(current.id)) return;
      history.replaceState(null, "", "product.html?id=" + encodeURIComponent(String(next.id)));
      if (typeof window.__mostovoyRender === "function") window.__mostovoyRender(String(next.id));
      else location.href = "product.html?id=" + encodeURIComponent(String(next.id));
    });
  }

  document.addEventListener("product:rendered", function (e) { mount(e.detail); });
  if (window.__mostovoyCurrent) mount({ product: window.__mostovoyCurrent, catalog: window.__mostovoyCatalog });
})();
