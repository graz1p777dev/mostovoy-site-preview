import"./image-url-DKWqd5-K.js";import{C as e,S as t,a as n,b as r,f as i,i as a,m as o,s,t as c,x as l}from"./shell-BaAfn-kO.js";var u=[{slug:`iphone`,desc:`Актуальная линейка iPhone.`},{slug:`ipad`,desc:`С мощными чипами M4, M5.`},{slug:`mac`,desc:`Все модели. Выберите свой.`},{slug:`watch`,desc:`Series 11 | SE 3 | Ultra 3`}],d=[{slug:`sport`,title:`Garmin`,desc:`Мультиспортивные часы`,image:`/images/products/garmin/fenix-8.webp`,light:!0},{slug:`vr`,title:`Meta`,desc:`Умные очки Ray-Ban и Oakley`,image:`/images/products/meta/rayban-wayfarer.webp`,light:!0},{slug:`more`,title:`Dyson`,desc:`Стайлеры и пылесосы`,image:`/images/products/dyson/airwrap.webp`,light:!0},{slug:`audio`,title:`Аудио`,desc:`Колонки и микрофоны`,image:`/images/products/other/yandex-station-max.webp`,light:!0},{slug:`more`,title:`Игры`,desc:`PlayStation, Switch, Steam Deck`,image:`/images/products/other/ps5-pro.webp`,light:!0}];function f(e){return u.map(t=>{let n=i(t.slug);if(!n)return``;let r=a(o(e,n));return`<a class="tile" href="lineup.html?s=${n.slug}">
      <span class="tile__media">
        <img src="${n.image}" alt="${n.label}" loading="lazy" decoding="async" onerror="this.remove()" />
      </span>
      <span class="tile__title">${n.label}</span>
      <span class="tile__desc">${t.desc}${r?`<br /><small>${r}</small>`:``}</span>
      <span class="btn btn--sm">Подробнее</span>
    </a>`}).join(``)}function p(){return d.map(e=>`<a class="promo${e.light?` promo--light`:``}" href="lineup.html?s=${e.slug}">
      <img src="${e.image}" alt="" loading="lazy" decoding="async" onerror="this.remove()" />
      <h3>${e.title}</h3>
      <p>${e.desc}</p>
    </a>`).join(``)}function m(e){let t=[`iphone`,`mac`,`ipad`,`watch`,`airpods`],n=[];for(let r of t){let t=i(r);if(!t)continue;let a=o(e,t).filter(e=>e.available&&(e.image||e.img));n.push(...a.slice(0,2))}return n.slice(0,8).map(s).join(``)}function h(e){let t=document.getElementById(`home`);t.innerHTML=`
    <section class="hero">
      <div class="shell">
        <span class="section__eyebrow">Магазин техники в Бишкеке</span>
        <h1>Оригинальная техника<br />с гарантией.</h1>
        <p>Apple, Samsung, Garmin, Dyson и другие бренды. Гарантия, рассрочка и обмен старого устройства.</p>
        <div class="hero__actions">
          <a class="btn btn--lg" href="catalog.html">Смотреть каталог</a>
          <a class="btn btn--lg btn--ghost" href="trade.html">Обменять старое</a>
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="shell">
        <div class="section__head">
          <span class="section__eyebrow">Линейка продуктов</span>
          <h2 class="section__title">Лучшие устройства в одном магазине.</h2>
        </div>
        <div class="tiles">${f(e)}</div>
      </div>
    </section>

    <section class="section">
      <div class="shell">
        <div class="section__head">
          <span class="section__eyebrow">Больше возможностей</span>
          <h2 class="section__title">Техника для работы, творчества и жизни.</h2>
        </div>
        <div class="rail">
          <div class="rail__track">${p()}</div>
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="shell">
        <div class="section__head">
          <span class="section__eyebrow">Популярное</span>
          <h2 class="section__title">То, что выбирают чаще всего.</h2>
        </div>
        <div class="pgrid">${m(e)}</div>
        <p style="margin-top:32px"><a class="link-arrow" href="catalog.html">Весь каталог</a></p>
      </div>
    </section>`,n(t)}async function g(){c(),l(),t();let n=await r();h(n),e(()=>h(n))}g();