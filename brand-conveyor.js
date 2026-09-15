// Конвейер брендов на главной + переход в каталог с уже выбранным брендом.
// Список брендов берём из живого каталога (тот же /api/catalog, что и сам
// сайт), а не зашиваем руками — так конвейер не отстаёт от базы.
(function () {
  var STYLE_ID = "brand-conveyor-style";
  var TRACK_ID = "brandConveyorTrack";

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent =
      ".bconv{padding:28px 0;overflow:hidden;border-top:1px solid #d2d2d7;border-bottom:1px solid #d2d2d7;background:#f5f5f7}" +
      ".bconv__track{display:flex;gap:12px;width:max-content;animation:bconv-scroll 40s linear infinite}" +
      ".bconv:hover .bconv__track{animation-play-state:paused}" +
      ".bconv__item{flex:0 0 auto;display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:999px;background:#fff;border:1px solid #d2d2d7;" +
      "font-size:14px;font-weight:600;color:#1d1d1f;cursor:pointer;white-space:nowrap;text-decoration:none;transition:transform .2s,box-shadow .2s}" +
      ".bconv__item:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,.15)}" +
      ".bconv__item svg{flex:0 0 auto}" +
      "@media (max-width:600px){.bconv{padding:18px 0}.bconv__item{padding:9px 16px;font-size:13px}}" +
      "@keyframes bconv-scroll{from{transform:translateX(0)}to{transform:translateX(-33.3333%)}}";
    document.head.appendChild(style);
  }

  // Фирменные цвета пилюль (два цвета — градиент) и мини-логотипы там, где
  // знак узнаваем без слова; у брендов-словомарок (Sony, DJI, Canon…) иконки нет.
  var BRANDS = {
    "Apple":   { bg: "#1d1d1f", icon: '<path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.9-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.8-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.8 2.3 1.1 0 1.6-.7 3-.7s1.8.7 3 .7c1.2 0 2-1.1 2.8-2.2.9-1.3 1.2-2.5 1.2-2.6 0 0-2.3-.9-2.3-3.6zM14.1 5.9c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.7-1 2.8 1.1.1 2.1-.5 2.8-1.3z"/>' },
    "Samsung": { bg: "#1428a0" },
    "Sony":    { bg: "#000000" },
    "Xiaomi":  { bg: "#ff6900", icon: '<rect x="2" y="2" width="20" height="20" rx="5"/><path fill="#ff6900" d="M6.5 8.2h5.6c2.3 0 3.4 1 3.4 3.1v4.9h-2.2v-4.7c0-1-.4-1.5-1.5-1.5h-3v6.2H6.5V8.2zm3.1 2.9h2v5.1h-2v-5.1zM17.8 8.2H20v8h-2.2v-8z"/>' },
    "Яндекс":  { bg: "#fc3f1d", icon: '<circle cx="12" cy="12" r="10"/><path fill="#fc3f1d" d="M13.6 17.5V7.9h-1.2c-1.9 0-2.9.9-2.9 2.3 0 1.5.7 2.3 2.2 3.3l1.1.8-3.2 4.6h-1.9l3-4.3c-1.6-1.1-2.7-2.2-2.7-4.2 0-2.3 1.6-3.9 4.5-3.9h2.7v11h-1.6z"/>' },
    "Beats":   { bg: "#e01f2d", icon: '<circle cx="12" cy="12" r="10"/><path fill="#e01f2d" d="M8.2 6.5h2.2v3.3c.5-.4 1.2-.7 2-.7 2.2 0 3.8 1.7 3.8 4.2s-1.6 4.2-3.8 4.2c-2.4 0-4.2-1.7-4.2-4.3V6.5zm4 4.5c-1.1 0-1.8.9-1.8 2.3s.7 2.3 1.8 2.3 1.8-.9 1.8-2.3-.7-2.3-1.8-2.3z"/>' },
    "Canon":   { bg: "#cc0000" },
    "DJI":     { bg: "#111111" },
    "Dyson":   { bg: "#333333" },
    "Garmin":  { bg: "#007cc3", icon: '<path d="M12 3 2.5 20h19z"/>' },
    "Google":  { bg: "linear-gradient(135deg,#4285f4,#ea4335)" },
    "Insta360": { bg: "#ffcc00", fg: "#1d1d1f" },
    "Meta":    { bg: "linear-gradient(135deg,#0064e0,#a033ff)", icon: '<path fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" d="M3.5 15.5c0-4 1.8-8 4.6-8 3.3 0 5 9 7.9 9 2.5 0 4.5-3.5 4.5-6.5s-1.5-5.5-3.6-5.5c-3.4 0-5.3 9-8.5 9-2.7 0-4.9-3-4.9-6"/>' },
    "Nintendo": { bg: "#e60012" },
    "Philips": { bg: "#0b5ed7" },
    "Valve":   { bg: "linear-gradient(135deg,#1b2838,#66c0f4)" },
    "Whoop":   { bg: "#000000" },
  };

  function pill(b) {
    var cfg = BRANDS[b] || {};
    var style = cfg.bg ? 'style="background:' + cfg.bg + ";color:" + (cfg.fg || "#fff") + ';border-color:transparent"' : "";
    var icon = cfg.icon ? '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">' + cfg.icon + "</svg>" : "";
    return '<a class="bconv__item" ' + style + ' href="catalog.html?brand=' + encodeURIComponent(b) + '">' + icon + "<span>" + b + "</span></a>";
  }

  function buildSection(brands) {
    var section = document.createElement("div");
    section.className = "bconv";
    var track = document.createElement("div");
    track.className = "bconv__track";
    track.id = TRACK_ID;
    var items = brands.map(pill).join("");
    track.innerHTML = items + items + items; // тройной повтор — плавная бесконечная прокрутка
    section.appendChild(track);
    return section;
  }

  function mount(brands) {
    if (document.getElementById(TRACK_ID)) return;
    var main = document.querySelector("main");
    if (!main || !main.firstElementChild) return;
    injectStyle();
    main.firstElementChild.insertAdjacentElement("afterend", buildSection(brands));
  }

  fetch("/api/catalog")
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var list = data.products || data;
      var brands = Array.from(
        new Set(list.map(function (p) { return p.brand; }).filter(Boolean))
      ).sort(function (a, b) { return a.localeCompare(b, "ru"); });
      if (!brands.length) return;
      // Содержимое <main> рисует другой скрипт сайта уже после того, как этот
      // файл выполнился (fetch у нас тоже асинхронный) — пробуем сразу и потом
      // ещё по каждому изменению DOM, пока не получится.
      mount(brands);
      new MutationObserver(function () { mount(brands); }).observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
    })
    .catch(function () {});
})();
