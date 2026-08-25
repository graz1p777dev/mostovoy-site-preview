import{t as e}from"./image-url-DKWqd5-K.js";import{C as t,D as n,E as r,O as i,S as a,_ as o,b as s,c,g as l,m as u,o as d,p as f,r as p,s as m,t as h,u as g,v as _,w as v,x as y,y as b}from"./shell-BaAfn-kO.js";var x={3:.94,6:.89,12:.84},S=[3,6,12];function C(e){let t=String(e.group||``).trim().toLocaleLowerCase(`ru`),n=String(e.category||``).trim().toLocaleLowerCase(`ru`);return t!==`аксессуары`&&n!==`аксессуары`&&n!==`фены и стайлеры`}function w(e,t){e=Math.max(e,0);let n=x[t];if(!n)return{monthly:0,total:0,overpay:0,rate:null};let r=e/n;return{monthly:r/t,total:r,overpay:Math.max(r-e,0),rate:n}}document.addEventListener(`click`,()=>document.querySelectorAll(`.cselect.open`).forEach(e=>e.classList.remove(`open`))),document.addEventListener(`DOMContentLoaded`,()=>{let e=document.querySelector(`.header`),t=document.getElementById(`burger`),n=document.getElementById(`nav`);t&&n&&(t.addEventListener(`click`,()=>{n.classList.toggle(`open`),t.classList.toggle(`active`)}),n.querySelectorAll(`a`).forEach(e=>e.addEventListener(`click`,()=>{n.classList.remove(`open`),t.classList.remove(`active`)})));let r=()=>e&&e.classList.toggle(`scrolled`,window.scrollY>8);r(),window.addEventListener(`scroll`,r,{passive:!0})});var T=null;function E(e){let t=[e.image||e.img||``,...e.images||[]].filter(Boolean);return[...new Set(t)]}function D(t){let n=E(t);return`<div class="gallery">
    <div class="gallery__main">${n[0]?`<img id="galleryMain" src="${e(n[0],1200)}" alt="${p(t.name)}" decoding="async" />`:c(t,1200)}</div>
    ${n.length>1?`<div class="gallery__thumbs">${n.map((t,n)=>`<button type="button" class="gallery__thumb${n===0?` is-active`:``}" data-src="${e(t,1200)}"><img src="${e(t,160)}" alt="" loading="lazy" /></button>`).join(``)}</div>`:``}
  </div>`}function O(e){let t=Array.isArray(e.swatches)?e.swatches:[];return t.length?`<div class="pcolors" id="pcolors">${t.map(([e,t],n)=>`<button type="button" class="pcolor${n===0?` is-active`:``}" data-color="${p(e)}" style="background:${t}" aria-label="${p(e)}" title="${p(e)}"></button>`).join(``)}</div>`:``}function k(e){let t=Object.entries(e.specifications||{}).filter(([,e])=>e);return t.length?`<dl class="specs">${t.map(([e,t])=>`<div class="specs__row"><dt>${e}</dt><dd>${t}</dd></div>`).join(``)}</dl>`:``}function A(e){if(!C(e)||!e.price)return``;let t=S[1];return`<p class="pdetail__note">В рассрочку — от ${o(w(e.price,t).monthly,e.currency)} в месяц на ${t} мес.</p>`}function j(e,t){let n=f(e);if(!n)return``;let r=n.families.find(t=>t.test.test(String(e.name||``))),i=(r?g(u(t,n),r):u(t,n)).filter(t=>String(t.id)!==String(e.id)).slice(0,4);return i.length?`<section class="section section--alt">
    <div class="shell">
      <div class="section__head"><span class="section__eyebrow">Смотрите также</span><h2 class="section__title">Похожие модели.</h2></div>
      <div class="pgrid">${i.map(m).join(``)}</div>
    </div>
  </section>`:``}function M(e,t){let n=f(e),r=document.getElementById(`product`);r.innerHTML=`
    <div class="shell">
      <nav class="crumbs" aria-label="Хлебные крошки">
        <a href="index.html">Главная</a><span>/</span>
        ${n?`<a href="lineup.html?s=${n.slug}">${n.label}</a><span>/</span>`:``}
        <span>${e.name}</span>
      </nav>
      <div class="product">
        ${D(e)}
        <div class="pdetail">
          <p class="pdetail__brand">${[e.brand,e.category].filter(Boolean).join(` · `)}</p>
          <h1>${e.name}</h1>
          <div class="pdetail__price">${d(e)}</div>
          ${e.description?`<p class="pdetail__desc">${e.description}</p>`:``}
          ${O(e)}
          <div class="pdetail__actions">
            ${e.available?`<button type="button" class="btn btn--lg" id="buyNow">Купить</button>
                   <button type="button" class="btn btn--lg btn--ghost" id="addCart">В корзину</button>`:`<span class="pcard__out">Нет в наличии — напишите нам, подскажем срок поставки.</span>`}
          </div>
          ${A(e)}
          ${k(e)}
        </div>
      </div>
    </div>
    ${j(e,t)}`,N(e)}function N(e){let t=document.getElementById(`galleryMain`);document.querySelectorAll(`.gallery__thumb`).forEach(e=>{e.addEventListener(`click`,()=>{t&&e.dataset.src&&(t.src=e.dataset.src),document.querySelectorAll(`.gallery__thumb`).forEach(e=>e.classList.remove(`is-active`)),e.classList.add(`is-active`)})}),document.getElementById(`pcolors`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-color]`);t&&(T=t.dataset.color||null,document.querySelectorAll(`.pcolor`).forEach(e=>e.classList.remove(`is-active`)),t.classList.add(`is-active`))}),document.getElementById(`buyNow`)?.addEventListener(`click`,()=>{b(r(e,{color:T}),[{productId:e.id,quantity:1}],`product`)}),document.getElementById(`addCart`)?.addEventListener(`click`,()=>{l(e.id,1,T),n(`Товар добавлен в корзину`),v(!0)})}async function P(){h(),y(),a();let e=new URLSearchParams(location.search).get(`id`)||``,n=await s(),r=_(e),o=document.getElementById(`product`);if(!r){o.innerHTML=`<div class="shell">
      <p class="empty">Товар не найден. <a class="link-arrow" href="catalog.html">Вернуться в каталог</a></p>
    </div>`;return}document.title=`${r.name} — МОСТОВОЙ`,T=Array.isArray(r.swatches)&&r.swatches.length?r.swatches[0][0]:null,i(r.id),M(r,n),t(()=>M(r,n))}P();