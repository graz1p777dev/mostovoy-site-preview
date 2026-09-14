// Открывает каталог сразу с отмеченным брендом, если в ссылке есть
// ?brand=Имя (конвейер брендов на главной ведёт именно так). Сама
// фильтрация уже реализована в catalog.html — просто отмечаем нужный
// чекбокс и вызываем тот же обработчик change, что и при ручном клике.
(function () {
  var params = new URLSearchParams(location.search);
  var brand = params.get("brand");
  if (!brand) return;
  var applied = false;

  function tryApply() {
    if (applied) return;
    var box = document.querySelector('input[data-brand="' + CSS.escape(brand) + '"]');
    if (!box) return;
    applied = true;
    box.checked = true;
    box.dispatchEvent(new Event("change", { bubbles: true }));
  }

  tryApply();
  new MutationObserver(tryApply).observe(document.documentElement, { childList: true, subtree: true });
})();
