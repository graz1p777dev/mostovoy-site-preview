// Поиск в шапке понимал только точное вхождение строки — «айфон 17»,
// «iphne» или «самсунг с25» ничего не находили. Здесь перехватываем ввод
// и сами ранжируем каталог: русские названия брендов → латиница, опечатки
// через расстояние Дамерау-Левенштейна, числа (17, 256) — только точно.
(function () {
  var ALIASES = {
    "айфон": "iphone", "афон": "iphone", "iphon": "iphone", "ифон": "iphone",
    "айпад": "ipad", "ipad": "ipad", "айпед": "ipad",
    "макбук": "macbook", "мак": "macbook", "mac": "macbook",
    "эпл": "apple", "эппл": "apple", "апл": "apple",
    "самсунг": "samsung", "самсунк": "samsung", "галакси": "galaxy", "гэлакси": "galaxy",
    "часы": "watch", "вотч": "watch", "вотчи": "watch", "смарт-часы": "watch",
    "наушники": "airpods", "эирподс": "airpods", "аирподс": "airpods", "эйрподс": "airpods",
    "ксиоми": "xiaomi", "сяоми": "xiaomi", "шаоми": "xiaomi", "ксяоми": "xiaomi",
    "редми": "redmi", "поко": "poco",
    "плейстейшн": "playstation", "плойка": "playstation", "пс5": "ps5", "пс": "ps5",
    "свитч": "switch", "нинтендо": "nintendo",
    "гармин": "garmin", "дайсон": "dyson", "стайлер": "airwrap", "фен": "dyson",
    "колонка": "станция", "алиса": "станция", "яндекс": "станция",
    "приставка": "playstation", "очки": "meta", "мета": "meta", "квест": "quest",
    "сони": "sony", "филипс": "philips", "бритва": "oneblade",
    "про": "pro", "макс": "max", "эир": "air", "аир": "air", "ультра": "ultra", "мини": "mini", "плюс": "plus",
    "про-макс": "pro max",
  };

  function norm(s) {
    return String(s || "").toLowerCase().replace(/ё/g, "е").replace(/[^a-zа-я0-9.+ ]+/g, " ").replace(/\s+/g, " ").trim();
  }

  function tokens(s) {
    return norm(s).split(" ").filter(Boolean);
  }

  function expandQuery(q) {
    return tokens(q).map(function (t) {
      var m = t.match(/^(\d+)(pro|max|air|mini|plus|ultra)$/);
      if (m) return [m[1], m[2]];
      return [ALIASES[t] || t];
    }).reduce(function (a, b) { return a.concat(b); }, [])
      .map(function (t) { return t.split(" "); })
      .reduce(function (a, b) { return a.concat(b); }, []);
  }

  function dlDistance(a, b) {
    var la = a.length, lb = b.length;
    if (!la) return lb; if (!lb) return la;
    var d = [];
    for (var i = 0; i <= la; i++) { d[i] = [i]; }
    for (var j = 0; j <= lb; j++) { d[0][j] = j; }
    for (i = 1; i <= la; i++) {
      for (j = 1; j <= lb; j++) {
        var cost = a[i - 1] === b[j - 1] ? 0 : 1;
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
    return d[la][lb];
  }

  function tokenScore(q, t) {
    if (t === q) return 1;
    if (/^\d+$/.test(q)) return /^\d+$/.test(t) ? 0 : (t.indexOf(q) === 0 ? 0.9 : 0);
    if (t.indexOf(q) === 0) return 0.9;
    if (q.length >= 3 && t.indexOf(q) !== -1) return 0.7;
    if (q.length >= 4) {
      var dist = dlDistance(q, t.slice(0, Math.max(q.length, Math.min(t.length, q.length + 1))));
      if (dist <= 1) return 0.75;
      if (q.length >= 6 && dist <= 2) return 0.55;
    }
    return 0;
  }

  var index = null;
  function buildIndex(list) {
    index = list.map(function (p) {
      var raw = [p.name, p.brand, p.category, p.color].filter(Boolean).join(" ");
      var toks = tokens(raw);
      // «256GB» → «256» + «gb», «17pro» → «17» + «pro»
      toks = toks.map(function (t) { var m = t.match(/^(\d+)([a-zа-я]+)$/); return m ? [m[1], m[2]] : [t]; })
        .reduce(function (a, b) { return a.concat(b); }, []);
      return { p: p, toks: toks };
    });
  }

  function search(q) {
    if (!index) return [];
    var qt = expandQuery(q);
    if (!qt.length) return [];
    var results = [];
    index.forEach(function (row) {
      var total = 0, missed = 0;
      qt.forEach(function (t) {
        var best = 0;
        for (var i = 0; i < row.toks.length; i++) { var s = tokenScore(t, row.toks[i]); if (s > best) best = s; if (best === 1) break; }
        if (!best) missed++; else total += best;
      });
      if (missed > 0 && (qt.length < 3 || missed > 1)) return;
      results.push({ p: row.p, score: total / qt.length - missed * 0.3 });
    });
    results.sort(function (a, b) { return b.score - a.score || (a.p.price - b.p.price); });
    return results.map(function (r) { return r.p; });
  }

  function plural(n, a, b, c) {
    var m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return a;
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return b;
    return c;
  }

  function esc(s) { return String(s || "").replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function card(p) {
    var img = (window.__curatedPhoto && window.__curatedPhoto(p.name, p.color)) || p.image || p.img || "";
    var media = img
      ? '<img src="' + esc(img) + '" alt="' + esc(p.name) + '" loading="lazy" decoding="async" onerror="this.remove()">'
      : '<span class="pcard__ph">' + esc(String(p.name || "?").charAt(0).toUpperCase()) + "</span>";
    var price = p.price ? '<span class="sresult__desc">' + esc(String(p.price).replace(/\B(?=(\d{3})+(?!\d))/g, " ")) + " $</span>" : "";
    return '<a class="sresult" href="product.html?id=' + encodeURIComponent(p.id) + '">' +
      '<span class="sresult__media">' + media + "</span>" +
      '<span class="sresult__copy"><span class="sresult__name">' + esc(p.name) + "</span>" + price + "</span></a>";
  }

  var catalogReady = fetch("/api/catalog").then(function (r) { return r.json(); }).then(function (data) {
    buildIndex(data.products || data);
  }).catch(function () {});

  function render() {
    var input = document.getElementById("shellSearchInput");
    var results = document.getElementById("shellSearchResults");
    var count = document.getElementById("shellSearchCount");
    if (!input || !results) return;
    var q = input.value.trim();
    if (!q || !index) return;
    var found = search(q);
    if (count) {
      count.hidden = false;
      count.textContent = found.length
        ? found.length + " " + plural(found.length, "результат", "результата", "результатов") + " по запросу: " + q
        : "Ничего не нашли по запросу: " + q;
    }
    results.innerHTML = found.slice(0, 40).map(card).join("");
  }

  function hook() {
    var input = document.getElementById("shellSearchInput");
    if (!input || input.dataset.fuzzyHooked) return;
    input.dataset.fuzzyHooked = "1";
    // Своя отрисовка идёт после штатной (та подписана на тот же input) —
    // ставим в конец очереди микрозадач, чтобы перекрыть её результат.
    input.addEventListener("input", function () { catalogReady.then(function () { setTimeout(render, 0); }); });
    input.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      var first = document.querySelector("#shellSearchResults .sresult");
      if (first) { e.preventDefault(); location.href = first.getAttribute("href"); }
    });
  }

  hook();
  new MutationObserver(hook).observe(document.documentElement, { childList: true, subtree: true });
})();
