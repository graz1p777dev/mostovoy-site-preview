import"./image-url-DKWqd5-K.js";import{C as e,S as t,a as n,b as r,f as i,i as a,l as o,m as s,s as c,t as l,u,x as d}from"./shell-BaAfn-kO.js";function f(e,t,n){let r=u(n,t);if(!r.length)return``;let i=`catalog.html?s=${e.slug}&f=${t.slug}`,o=a(r),s=t.sizes?.length?t.sizes.map(e=>`<a class="btn btn--sm" href="${i}&q=${encodeURIComponent(e)}">${e}</a>`).join(``):`<a class="btn btn--sm" href="${i}">Подробнее</a>`;return`<article class="lcard">
    ${t.image?`<a class="lcard__media" href="${i}"><img src="${t.image}" alt="${t.title}" loading="lazy" decoding="async" /></a>`:``}
    ${t.isNew?`<span class="lcard__new">New</span>`:``}
    <a class="lcard__title" href="${i}">${t.title}</a>
    <p class="lcard__tagline">${t.tagline}</p>
    ${o?`<span class="lcard__from">${o}</span>`:``}
    <div class="lcard__actions">${s}</div>
  </article>`}function p(e,t){let r=s(t,e),i=document.getElementById(`lineup`),a=e.families.map(t=>f(e,t,r)).filter(Boolean),l=r.filter(t=>!e.families.some(e=>e.test.test(String(t.name||``))));i.innerHTML=`
    <div class="shell">
      <nav class="crumbs" aria-label="Хлебные крошки">
        <a href="index.html">Главная</a><span>/</span><span>${e.label}</span>
      </nav>
    </div>

    <section class="section section--alt">
      <div class="shell">
        <div class="section__head">
          <span class="section__eyebrow">${e.label}</span>
          <h1 class="section__title">${e.subtitle}</h1>
        </div>
        ${a.length?`<div class="rail"><div class="rail__track rail__track--lineup">${a.join(``)}</div></div>`:`<p class="empty">В этом разделе пока нет товаров.</p>`}
        <p style="margin-top:34px"><a class="link-arrow" href="catalog.html?s=${e.slug}">Все модели ${e.label}</a></p>
      </div>
    </section>

    ${l.length?`<section class="section section--alt">
            <div class="shell">
              <div class="section__head"><span class="section__eyebrow">Ещё в разделе</span><h2 class="section__title">Остальные модели.</h2></div>
              <div class="pgrid">${l.slice(0,8).map(c).join(``)}</div>
            </div>
          </section>`:``}

    <section class="section section--alt">
      <div class="shell">
        <div class="section__head">
          <span class="section__eyebrow">Навигация</span>
          <h2 class="section__title">Другие разделы.</h2>
        </div>
        <div class="rail">
          <div class="rail__track">
            ${o.filter(t=>t.slug!==e.slug).map(e=>`<a class="promo promo--light" href="lineup.html?s=${e.slug}">
                  <img src="${e.image||``}" alt="" loading="lazy" decoding="async" onerror="this.remove()" />
                  <h3>${e.label}</h3>
                  <p>${e.subtitle}</p>
                </a>`).join(``)}
          </div>
        </div>
      </div>
    </section>`,n(i)}async function m(){l(),d(),t();let n=i(new URLSearchParams(location.search).get(`s`))||o[0];document.title=`${n.title} — МОСТОВОЙ`;let a=await r();p(n,a),e(()=>p(n,a))}m();