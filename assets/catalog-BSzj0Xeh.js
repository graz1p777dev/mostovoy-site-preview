import"./image-url-DKWqd5-K.js";import{C as e,S as t,b as n,d as r,f as i,l as a,m as o,n as s,s as c,t as l,u,x as d}from"./shell-BaAfn-kO.js";var f=new URLSearchParams(location.search),p={section:i(f.get(`s`)),family:null,brands:new Set,categories:new Set,q:f.get(`q`)||``,min:null,max:null,sort:`default`,onlyAvailable:!1};p.section&&(p.family=r(p.section,f.get(`f`)));var m=[];function h(){let e=m;return p.section&&(e=o(e,p.section)),p.family&&(e=u(e,p.family)),e}function g(e){return e.salePrice!=null&&(e.discountPercent||0)>0?e.salePrice:e.price}function _(e){let t=p.q.trim().toLocaleLowerCase(`ru`),n=e.filter(e=>{if(p.brands.size&&!p.brands.has(String(e.brand||``))||p.categories.size&&!p.categories.has(String(e.category||``))||p.onlyAvailable&&!e.available)return!1;let n=g(e);return!(p.min!=null&&n<p.min||p.max!=null&&n>p.max||t&&!`${e.name} ${e.brand||``} ${e.category||``}`.toLocaleLowerCase(`ru`).includes(t))});return p.sort===`asc`&&(n=[...n].sort((e,t)=>g(e)-g(t))),p.sort===`desc`&&(n=[...n].sort((e,t)=>g(t)-g(e))),p.sort===`name`&&(n=[...n].sort((e,t)=>e.name.localeCompare(t.name,`ru`))),n}function v(e,t){return[...new Set(e.map(e=>String(e[t]||``)).filter(Boolean))].sort((e,t)=>e.localeCompare(t,`ru`))}function y(){return p.family?p.family.title:p.section?p.section.title:`Каталог`}function b(){let e=[`<a href="index.html">Главная</a>`];return p.section?(e.push(`<span>/</span><a href="lineup.html?s=${p.section.slug}">${p.section.label}</a>`),p.family&&e.push(`<span>/</span><span>${p.family.title}</span>`)):e.push(`<span>/</span><span>Каталог</span>`),e.join(``)}function x(e){let t=v(e,`brand`),n=v(e,`category`),r=a.map(e=>`<label><input type="radio" name="section" value="${e.slug}" ${p.section?.slug===e.slug?`checked`:``} /> ${e.label}</label>`).join(``);return`
    <div class="fgroup">
      <h4>Раздел</h4>
      <label><input type="radio" name="section" value="" ${p.section?``:`checked`} /> Все товары</label>
      ${r}
    </div>
    ${n.length>1?`<div class="fgroup">
            <h4>Категория</h4>
            ${n.map(e=>`<label><input type="checkbox" data-category="${e}" ${p.categories.has(e)?`checked`:``} /> ${e}</label>`).join(``)}
          </div>`:``}
    ${t.length>1?`<div class="fgroup">
            <h4>Бренд</h4>
            ${t.map(e=>`<label><input type="checkbox" data-brand="${e}" ${p.brands.has(e)?`checked`:``} /> ${e}</label>`).join(``)}
          </div>`:``}
    <div class="fgroup">
      <h4>Цена</h4>
      <div class="fprice">
        <input type="number" inputmode="numeric" placeholder="от" id="fMin" value="${p.min??``}" />
        <input type="number" inputmode="numeric" placeholder="до" id="fMax" value="${p.max??``}" />
      </div>
    </div>
    <div class="fgroup">
      <label><input type="checkbox" id="fAvailable" ${p.onlyAvailable?`checked`:``} /> Только в наличии</label>
    </div>
    <button type="button" class="freset" id="fReset">Сбросить фильтры</button>`}function S(){let e=h(),t=_(e),n=document.getElementById(`catalog`);n.innerHTML=`
    <div class="shell">
      <nav class="crumbs" aria-label="Хлебные крошки">${b()}</nav>
    </div>
    <section class="section section--alt">
      <div class="shell">
        <div class="section__head">
          <span class="section__eyebrow">${p.section?p.section.label:`Каталог`}</span>
          <h1 class="section__title">${y()}</h1>
          ${p.family?`<p class="section__sub">${p.family.tagline}</p>`:``}
        </div>
        <div class="catalog">
          <aside class="filters" id="filters">${x(e)}</aside>
          <div>
            <div class="catalog__bar">
              <span class="catalog__count">${t.length} ${s(t.length,`товар`,`товара`,`товаров`)}</span>
              <div style="display:flex;gap:10px">
                <button type="button" class="btn btn--sm btn--ghost fmobile" id="fToggle">Фильтры</button>
                <select class="catalog__sort" id="sort" aria-label="Сортировка">
                  <option value="default">По умолчанию</option>
                  <option value="asc">Сначала дешевле</option>
                  <option value="desc">Сначала дороже</option>
                  <option value="name">По названию</option>
                </select>
              </div>
            </div>
            ${t.length?`<div class="pgrid">${t.map(c).join(``)}</div>`:`<p class="empty">Ничего не найдено. Попробуйте изменить фильтры.</p>`}
          </div>
        </div>
      </div>
    </section>`,document.getElementById(`sort`).value=p.sort,C()}function C(){let e=document.getElementById(`filters`);e.addEventListener(`change`,e=>{let t=e.target;t.name===`section`&&(p.section=i(t.value),p.family=null,p.brands.clear(),p.categories.clear(),T()),t.dataset.brand&&w(p.brands,t.dataset.brand,t.checked),t.dataset.category&&w(p.categories,t.dataset.category,t.checked),t.id===`fAvailable`&&(p.onlyAvailable=t.checked),t.id===`fMin`&&(p.min=t.value?Number(t.value):null),t.id===`fMax`&&(p.max=t.value?Number(t.value):null),S()}),document.getElementById(`fReset`)?.addEventListener(`click`,()=>{p.brands.clear(),p.categories.clear(),p.min=p.max=null,p.onlyAvailable=!1,p.q=``,S()}),document.getElementById(`sort`)?.addEventListener(`change`,e=>{p.sort=e.target.value,S()}),document.getElementById(`fToggle`)?.addEventListener(`click`,()=>e.classList.toggle(`is-open`))}function w(e,t,n){n?e.add(t):e.delete(t)}function T(){let e=new URLSearchParams;p.section&&e.set(`s`,p.section.slug),p.family&&e.set(`f`,p.family.slug),history.replaceState(null,``,e.toString()?`?${e}`:location.pathname),document.title=`${y()} — МОСТОВОЙ`}async function E(){l(),d(),t(),T(),m=await n(),S(),e(S)}E();