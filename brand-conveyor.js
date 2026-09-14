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
      ".bconv__item{flex:0 0 auto;padding:10px 22px;border-radius:999px;background:#fff;border:1px solid #d2d2d7;" +
      "font-size:14px;font-weight:600;color:#1d1d1f;cursor:pointer;white-space:nowrap;transition:background .2s,color .2s}" +
      ".bconv__item:hover{background:#e11d1d;color:#fff;border-color:#e11d1d}" +
      "@keyframes bconv-scroll{from{transform:translateX(0)}to{transform:translateX(-33.3333%)}}";
    document.head.appendChild(style);
  }

  function buildSection(brands) {
    var section = document.createElement("div");
    section.className = "bconv";
    var track = document.createElement("div");
    track.className = "bconv__track";
    track.id = TRACK_ID;
    var items = brands
      .map(function (b) {
        return (
          '<a class="bconv__item" href="catalog.html?brand=' + encodeURIComponent(b) + '">' + b + "</a>"
        );
      })
      .join("");
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
      mount(brands);
    })
    .catch(function () {});
})();
