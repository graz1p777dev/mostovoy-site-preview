// Патч: на странице «О нас» (#contacts) и в подвале сайта был только текст
// «г. Бишкек» без реального адреса магазина. Подставляем настоящий адрес
// (ТЦ ЦУМ «Айчурек», совпадает с адресом на старом сайте mostovoy-store).
(function () {
  var FULL_ADDRESS = "ТЦ ЦУМ «Айчурек», просп. Чуй, 155, 1 этаж, отделы A9 и D14, Свердловский район, Бишкек, 720011";
  var SHORT_ADDRESS = "ТЦ ЦУМ «Айчурек», просп. Чуй, 155, отделы A9 и D14";
  var MAPS_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("ЦУМ Айчурек, проспект Чуй 155, Бишкек");

  function patchOnce(el, text) {
    if (!el || el.dataset.addressPatched) return;
    el.dataset.addressPatched = "1";
    el.textContent = text;
  }

  function addMapLink(li) {
    if (!li || li.dataset.mapAdded) return;
    li.dataset.mapAdded = "1";
    var a = document.createElement("a");
    a.href = MAPS_URL;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "Открыть на карте";
    a.style.display = "inline-block";
    a.style.marginTop = "4px";
    var wrap = document.createElement("div");
    wrap.appendChild(a);
    li.after(wrap);
  }

  function scan() {
    // Подвал (короткая версия — колонка узкая).
    document.querySelectorAll(".mfoot__col p").forEach(function (p) {
      if (p.textContent.trim() === "г. Бишкек") patchOnce(p, SHORT_ADDRESS);
    });
    // Секция «Контакты» на about.html (полная версия + ссылка на карту).
    document.querySelectorAll("#contacts .infolist li").forEach(function (li) {
      if (li.textContent.trim() === "г. Бишкек") {
        patchOnce(li, FULL_ADDRESS);
        addMapLink(li);
      }
    });
  }

  scan();
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
})();
