// У Xiaomi и Sony есть товары в базе, но на главной странице для них нет ни
// своей плитки в разделе «Больше возможностей», ни пункта в шапке — попасть
// на них можно только через полный каталог или конвейер брендов. Добавляем
// им плитки в тот же ряд, ведут на каталог с уже применённым фильтром бренда
// (тот же приём, что и в brand-filter-url.js).
(function () {
  var EXTRA_TILES = [
    { brand: "Xiaomi", title: "Xiaomi", desc: "Смартфоны и планшеты Redmi, POCO", image: "/images/products/xiaomi/redmi-note-15-pro.webp" },
    { brand: "Sony", title: "Sony", desc: "Наушники с шумоподавлением", image: "/images/products/other/sony-wh-1000xm6.webp" },
  ];
  var MARK = "data-promo-extra";

  function mount() {
    if (document.querySelector("[" + MARK + "]")) return;
    var heading = Array.from(document.querySelectorAll(".section__eyebrow")).find(function (el) {
      return /больше возможностей/i.test(el.textContent || "");
    });
    var track = heading ? heading.closest("section").querySelector(".rail__track") : null;
    if (!track) return;
    EXTRA_TILES.forEach(function (tile) {
      var a = document.createElement("a");
      a.className = "promo promo--light";
      a.setAttribute(MARK, "1");
      a.href = "catalog.html?brand=" + encodeURIComponent(tile.brand);
      a.innerHTML =
        '<img src="' + tile.image + '" alt="" loading="lazy" decoding="async" onerror="this.remove()">' +
        "<h3>" + tile.title + "</h3><p>" + tile.desc + "</p>";
      track.appendChild(a);
    });
  }

  mount();
  new MutationObserver(mount).observe(document.documentElement, { childList: true, subtree: true });
})();
