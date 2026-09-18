// Секция «Популярное» на главной рисуется бандлом сайта (main-*.js,
// функция m()), но она требует у товара непустое поле image/img из базы —
// а у нас почти все фото приходят через curated-patch.js поверх пустого
// поля, поэтому фильтр всегда даёт 0 товаров и секция остаётся пустой.
// Здесь перерисовываем ту же секцию сами, без этого требования.
(function () {
  var KEYWORDS = ["iphone", "macbook", "ipad", "watch", "airpods"];
  var MARK_ATTR = "data-popular-patched";

  function esc(s) {
    return String(s || "").replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }

  function fmtPrice(p) {
    var n = Math.round(Number(p.price) || 0);
    return n.toLocaleString("ru-RU") + " " + (p.currency === "RUB" ? "₽" : "$");
  }

  function card(p) {
    var href = "product.html?id=" + encodeURIComponent(p.id);
    var photo = (window.__curatedPhoto && window.__curatedPhoto(p.name, p.color)) || p.image || p.img || "";
    var letter = esc(String(p.name || "?").trim().charAt(0).toUpperCase());
    var media = photo
      ? '<img src="' + esc(photo) + '" alt="' + esc(p.name) + '" loading="lazy" decoding="async" onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{className:\'pcard__ph\',textContent:\'' + letter + "'}))\">"
      : '<span class="pcard__ph" aria-hidden="true">' + letter + "</span>";
    return '<article class="pcard">' +
      '<a class="pcard__media" href="' + href + '">' + media + "</a>" +
      '<a class="pcard__name" href="' + href + '">' + esc(p.name) + "</a>" +
      '<div class="pcard__price">' + fmtPrice(p) + "</div>" +
      '<div class="pcard__foot"><a class="btn btn--sm" href="' + href + '">Подробнее</a></div>' +
      "</article>";
  }

  function pickPopular(catalog) {
    var picks = [];
    KEYWORDS.forEach(function (kw) {
      var matches = catalog
        .filter(function (p) { return p.available && String(p.name || "").toLowerCase().indexOf(kw) !== -1; })
        .sort(function (a, b) { return a.price - b.price; });
      var seenBase = {};
      for (var i = 0; i < matches.length && picks.length < 999; i++) {
        var base = String(matches[i].name || "").toLowerCase().slice(0, 16);
        if (seenBase[base]) continue;
        seenBase[base] = true;
        picks.push(matches[i]);
        if (Object.keys(seenBase).length >= 2) break;
      }
    });
    return picks.slice(0, 8);
  }

  function mount(catalog) {
    var heading = Array.from(document.querySelectorAll(".section__eyebrow")).find(function (el) {
      return /популярное/i.test(el.textContent || "");
    });
    var section = heading && heading.closest("section");
    var grid = section && section.querySelector(".pgrid");
    if (!grid || grid.getAttribute(MARK_ATTR) === "1") return;
    if (grid.children.length) { grid.setAttribute(MARK_ATTR, "1"); return; }
    var picks = pickPopular(catalog);
    if (!picks.length) return;
    grid.setAttribute(MARK_ATTR, "1");
    grid.innerHTML = picks.map(card).join("");
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
