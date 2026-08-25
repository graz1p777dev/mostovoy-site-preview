import{t as e}from"./image-url-DKWqd5-K.js";var t=document.getElementById(`admin`),n=document.getElementById(`btnLogout`),r=document.getElementById(`btnTheme`),i=document.getElementById(`btnToTop`),a={authenticated:!1,loginEnabled:!0,view:`crm`,products:[],groups:[`Гаджеты`,`Игры`,`Аксессуары`,`Другое`],categorySuggestions:[],posts:[],history:[],crmConversations:[],crmDetail:null,crmStatus:null,crmSearch:``,approvals:[],approvalFilter:`pending`,developerStatus:null,aiUsage:null,botEvents:[],labHistory:[],analyticsDays:30,visibleProducts:30,editingProductSlug:null,editingPostSlug:null,search:``,sortBy:`updated_desc`,displayCurrency:[`USD`,`KGS`,`RUB`].includes(localStorage.getItem(`mostovoy_currency`)||``)?localStorage.getItem(`mostovoy_currency`):`USD`,rates:{USD:1,KGS:87.5,RUB:79},loginError:null};function o(e){document.documentElement.dataset.adminTheme=e,localStorage.setItem(`mostovoy_admin_theme`,e),r.textContent=e===`dark`?`☀`:`☾`,r.setAttribute(`aria-label`,e===`dark`?`Включить светлую тему`:`Включить тёмную тему`)}o(localStorage.getItem(`mostovoy_admin_theme`)===`dark`?`dark`:`light`),r.addEventListener(`click`,()=>{o(document.documentElement.dataset.adminTheme===`dark`?`light`:`dark`)}),i.addEventListener(`click`,()=>{window.scrollTo({top:0,behavior:`smooth`})});var s=class extends Error{data};async function c(e,t,n){let r=n instanceof FormData,i=await fetch(`/api/admin${t}`,{method:e,credentials:`same-origin`,headers:r?void 0:{"content-type":`application/json`},body:n?r?n:JSON.stringify(n):void 0}),o=await i.json().catch(()=>({}));if(i.status===401)throw a.authenticated=!1,$(),Error(`Сессия истекла, войдите снова`);if(!i.ok){let e=new s(o.error||`HTTP ${i.status}`);throw e.data=o,e}return o}function l(e,t){return e==null?`—`:Math.round(e).toLocaleString(`ru-RU`)+` `+t}var u={USD:{label:`USD · $`,suffix:`$`},KGS:{label:`KGS · с`,suffix:`с`},RUB:{label:`RUB · ₽`,suffix:`₽`}};function d(e,t){return e/(a.rates[t]||1)*a.rates[a.displayCurrency]}function f(e,t){if(e==null)return`—`;let n=d(e,t),r=a.displayCurrency===`USD`?10:100;return`${(Math.ceil(n/r)*r).toLocaleString(`ru-RU`)} ${u[a.displayCurrency].suffix}`}function p(e){return`<label class="admin__currencySwitch" for="${e}">
    <span>Показывать цены</span>
    <select id="${e}" aria-label="Валюта отображения">
      ${Object.entries(u).map(([e,t])=>`<option value="${e}" ${a.displayCurrency===e?`selected`:``}>${t.label}</option>`).join(``)}
    </select>
  </label>`}function m(e){a.displayCurrency=e,localStorage.setItem(`mostovoy_currency`,e),document.dispatchEvent(new CustomEvent(`currency:change`,{detail:{code:e}}))}async function ee(){try{let e=await fetch(`/api/catalog`,{headers:{accept:`application/json`}});if(!e.ok)return;let t=await e.json();t.rates&&(a.rates={...a.rates,...t.rates})}catch{}}function h(e){return`$${e<.01?e.toFixed(4):e.toFixed(2)}`}function g(e){return Math.round(e).toLocaleString(`ru-RU`)}function _(e){if(!e)return`—`;let t=e.includes(`T`)?e:e.replace(` `,`T`)+`Z`,n=new Date(t).getTime();if(!Number.isFinite(n))return`—`;let r=Math.round((Date.now()-n)/6e4);if(r<1)return`только что`;if(r<60)return`${r} мин назад`;let i=Math.round(r/60);if(i<24)return`${i} ч назад`;let a=Math.round(i/24);return a<30?`${a} дн назад`:new Date(n).toLocaleDateString(`ru-RU`)}function v(e){let t={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`};return String(e??``).replace(/[&<>"']/g,e=>t[e])}var y;function b(e,t=!0){let n=document.querySelector(`.toast`);n||(n=document.createElement(`div`),n.className=`toast`,document.body.appendChild(n)),n.textContent=e,n.classList.toggle(`toast--error`,!t),n.classList.add(`show`),clearTimeout(y),y=setTimeout(()=>n.classList.remove(`show`),3200)}async function x(){try{let e=await fetch(`/api/admin/session`,{credentials:`same-origin`}).then(e=>e.json());a.authenticated=e.authenticated,a.loginEnabled=e.loginEnabled}catch{a.authenticated=!1}}function S(){if(n.hidden=!0,!a.loginEnabled){t.innerHTML=`<div class="admin__login">
      <h1 class="section__title">CRM</h1>
      <p class="lead">Вход для сотрудников не настроен на сервере. Задайте ADMIN_USERNAME, ADMIN_PASSWORD_HASH и SESSION_SECRET
      (командой <code>npm run admin:set-password</code>) — либо пользуйтесь <code>npm run admin</code> с терминала.</p>
    </div>`;return}t.innerHTML=`
    <div class="admin__login">
      <div class="admin__login-brand">
        <span class="logo__badge admin__login-badge" role="img" aria-label="Мостовой"></span>
        <span class="admin__login-kicker">CRM для сотрудников</span>
      </div>
      <h1 class="section__title">С возвращением</h1>
      <p class="admin__login-copy">Войдите, чтобы работать с диалогами, товарами, ценами и новостями магазина.</p>
      ${a.loginError?`<p class="admin__error">${v(a.loginError)}</p>`:``}
      <form id="loginForm" class="admin__login-form">
        <label>Логин
          <input type="text" name="username" autocomplete="username" placeholder="Введите логин" required autofocus />
        </label>
        <label>Пароль
          <input type="password" name="password" autocomplete="current-password" placeholder="Введите пароль" required />
        </label>
        <button type="submit" class="btn">Войти</button>
      </form>
      <a class="admin__login-back" href="index.html">← Вернуться в магазин</a>
    </div>`,document.getElementById(`loginForm`).addEventListener(`submit`,async e=>{e.preventDefault();let t=new FormData(e.target),n=await fetch(`/api/admin/login`,{method:`POST`,credentials:`same-origin`,headers:{"content-type":`application/json`},body:JSON.stringify({username:t.get(`username`),password:t.get(`password`)})}),r=await n.json().catch(()=>({}));n.ok?(a.authenticated=!0,a.loginError=null,$()):(a.loginError=n.status===429?`${r.error} (~${Math.ceil((r.retryAfterSec||0)/60)} мин)`:r.error||`Ошибка входа`,S())})}function C(t,n,r){return`
    <div class="admin__imgfield" data-field="${t}">
      <p class="opt__title">${r}</p>
      <div class="admin__imgrow">
        <input type="text" name="${t}" value="${v(n||``)}" placeholder="https://... или загрузите файл" />
        <label class="admin__uploadbtn">
          Файл…
          <input type="file" accept="image/*" hidden data-upload-for="${t}" />
        </label>
      </div>
      <div class="admin__imgpreview" data-preview-for="${t}">${n?`<img src="${v(e(n,160))}" alt="" loading="lazy" decoding="async" onerror="this.parentElement.innerHTML=''">`:``}</div>
    </div>`}function w(e,t){let n=e.querySelector(`[name="${t}"]`),r=e.querySelector(`[data-upload-for="${t}"]`),i=e.querySelector(`[data-preview-for="${t}"]`),a=e=>{i.innerHTML=e?`<img src="${v(e)}" alt="" onerror="this.parentElement.innerHTML=''">`:``};n.addEventListener(`input`,()=>a(n.value)),r.addEventListener(`change`,async()=>{let e=r.files?.[0];if(!e)return;let t=new FormData;t.append(`file`,e);try{b(`Загружаю фото…`);let e=await c(`POST`,`/upload`,t);n.value=e.url,a(e.url),b(`Фото загружено`)}catch(e){b(e.message,!1)}finally{r.value=``}})}function te(e=``,t=`#cccccc`){return`<div class="admin__swrow">
    <input type="text" class="sw-name" placeholder="Название (Чёрный)" value="${v(e)}" />
    <input type="color" class="sw-hex" value="${/^#[0-9a-f]{6}$/i.test(t)?t:`#cccccc`}" />
    <button type="button" class="admin__link admin__link--danger sw-remove">Удалить</button>
  </div>`}function ne(e,t){let n=e.querySelector(`.admin__swatches`),r=e.querySelector(`.admin__sw-add`),i=(e,t)=>n.insertAdjacentHTML(`beforeend`,te(e,t));(t?.length?t:[]).forEach(([e,t])=>i(e,t)),n.addEventListener(`click`,e=>{e.target.closest(`.sw-remove`)?.closest(`.admin__swrow`)?.remove()}),r.addEventListener(`click`,()=>i())}function re(e){return[...e.querySelectorAll(`.admin__swrow`)].map(e=>[e.querySelector(`.sw-name`).value.trim(),e.querySelector(`.sw-hex`).value]).filter(([e])=>e)}function ie(){return{name:``,brand:``,category:``,productGroup:``,price:``,currency:`USD`,color:``,variant:``,storage:``,description:``,image:``,images:``,available:!0,discountPercent:``,discountLabel:``}}function ae(e){return{name:e.name||``,brand:e.brand||``,category:e.category||``,productGroup:e.group||``,price:e.price??``,currency:e.currency||`USD`,color:e.color||``,variant:e.variant||``,storage:(e.storageOptions||[]).join(`, `),description:e.description||``,image:e.image||``,images:(e.images||[]).join(`
`),available:e.available!==!1,discountPercent:e.discountPercent??``,discountLabel:e.discountLabel||``}}function oe(e){return`
    <div class="calc__row2">
      <label>Название *
        <input name="name" required value="${v(e.name)}" placeholder="iPhone 16 Pro Max" />
      </label>
      <label>Бренд
        <input name="brand" value="${v(e.brand)}" placeholder="Apple" />
      </label>
    </div>
    <div class="calc__row2">
      <label>Категория
        <input name="category" value="${v(e.category)}" placeholder="Смартфоны" list="categorySuggestions" />
      </label>
      <label>Группа
        <select name="productGroup">
          <option value="">— подобрать автоматически —</option>
          ${a.groups.map(t=>`<option value="${t}" ${e.productGroup===t?`selected`:``}>${t}</option>`).join(``)}
        </select>
      </label>
    </div>
    <div class="calc__row2">
      <label>Цена *
        <input name="price" type="number" min="0" step="0.01" required value="${e.price}" />
      </label>
      <label>Валюта
        <select name="currency">
          ${[`USD`,`KGS`,`RUB`].map(t=>`<option value="${t}" ${e.currency===t?`selected`:``}>${t}</option>`).join(``)}
        </select>
      </label>
    </div>

    <label>Варианты памяти (через запятую — цена растёт с объёмом автоматически)
      <input name="storage" value="${v(e.storage)}" placeholder="128 GB, 256 GB, 512 GB" />
    </label>
    <div class="calc__row2">
      <label>Цвет (если один)
        <input name="color" value="${v(e.color)}" placeholder="Чёрный" />
      </label>
      <label>Вариант (если не про память — напр. «Body+Face»)
        <input name="variant" value="${v(e.variant)}" />
      </label>
    </div>

    <div class="admin__block">
      <p class="opt__title">Доступные цвета (необязательно)</p>
      <div class="admin__swatches"></div>
      <button type="button" class="admin__link admin__sw-add">+ добавить цвет</button>
    </div>

    <label>Описание
      <textarea name="description" rows="3" placeholder="Короткое описание товара">${v(e.description)}</textarea>
    </label>

    ${C(`image`,e.image,`Главное фото`)}
    <label>Доп. фото — URL по одному на строку
      <textarea name="images" rows="2">${v(e.images)}</textarea>
    </label>

    <div class="admin__block admin__discount">
      <p class="opt__title">Акция</p>
      <div class="calc__row2">
        <label>Процент скидки (1–99, пусто — без акции)
          <input name="discountPercent" type="number" min="1" max="99" value="${e.discountPercent}" />
        </label>
        <label>Подпись акции
          <input name="discountLabel" value="${v(e.discountLabel)}" placeholder="Летняя распродажа" />
        </label>
      </div>
      <p class="admin__discountPreview" id="discountPreview"></p>
    </div>

    <label class="admin__checkbox">
      <input type="checkbox" name="available" ${e.available?`checked`:``} /> В наличии
    </label>`}function T(e){let t=e.elements.namedItem(`price`),n=e.elements.namedItem(`discountPercent`),r=e.elements.namedItem(`currency`),i=e.querySelector(`#discountPreview`),a=()=>{let e=Number(t.value),a=Number(n.value);if(!e||!a||a<=0||a>=100){i.textContent=``;return}let o=Math.round(e*(1-a/100)*100)/100;i.innerHTML=`Цена по акции: <b>${l(o,r.value)}</b> <s>${l(e,r.value)}</s>`};[t,n,r].forEach(e=>e.addEventListener(`input`,a)),a()}function se(e){let t=new FormData(e),n=e=>t.get(e)||``;return{name:n(`name`).trim(),brand:n(`brand`).trim()||void 0,category:n(`category`).trim()||void 0,productGroup:n(`productGroup`)||void 0,color:n(`color`).trim()||void 0,variant:n(`variant`).trim()||void 0,price:t.get(`price`),currency:t.get(`currency`),storageOptions:n(`storage`).trim()||``,description:n(`description`).trim()||void 0,image:n(`image`).trim()||void 0,images:n(`images`).trim()||``,swatches:re(e),discountPercent:n(`discountPercent`).trim()??``,discountLabel:n(`discountLabel`).trim()||void 0,available:e.elements.namedItem(`available`).checked}}function ce(){let e=a.editingProductSlug?a.products.find(e=>e.slug===a.editingProductSlug):null,t=e?ae(e):ie();return`
    <div class="admin__head">
      <div>
        <p class="eyebrow">Товары</p>
        <h1 class="section__title">${e?`Редактировать товар`:`Добавить товар`}</h1>
      </div>
      ${e?`<button type="button" class="btn btn--ghost" id="btnCancelEdit">Отменить редактирование</button>`:``}
    </div>

    <datalist id="categorySuggestions">${a.categorySuggestions.map(e=>`<option value="${v(e)}">`).join(``)}</datalist>

    <form id="productForm" class="calc admin__form">
      ${oe(t)}
      <div class="admin__formActions">
        <button type="submit" class="btn">${e?`Сохранить`:`Добавить товар`}</button>
      </div>
      <p class="admin__formMsg" id="formMsg"></p>
    </form>

    <div class="admin__listHead">
      <h2 class="section__title">Каталог (${a.products.length})</h2>
      <div class="admin__listControls">
        <input type="search" id="productSearch" placeholder="Поиск по названию, бренду…" value="${v(a.search)}" />
        <select id="productSort">
          <option value="updated_desc" ${a.sortBy===`updated_desc`?`selected`:``}>Сначала недавно изменённые</option>
          <option value="group" ${a.sortBy===`group`?`selected`:``}>По группе</option>
          <option value="brand" ${a.sortBy===`brand`?`selected`:``}>По бренду</option>
          <option value="price_asc" ${a.sortBy===`price_asc`?`selected`:``}>Цена: по возрастанию</option>
          <option value="price_desc" ${a.sortBy===`price_desc`?`selected`:``}>Цена: по убыванию</option>
          <option value="status" ${a.sortBy===`status`?`selected`:``}>По статусу</option>
        </select>
        ${p(`productDisplayCurrency`)}
        <label class="admin__checkbox">
          <input type="checkbox" id="showHidden" /> показывать скрытые
        </label>
      </div>
    </div>
    <div class="admin__products" id="productsList"></div>`}var E={active:`активен`,needs_research:`нужно уточнить`,hidden:`скрыт`,sync_error:`ошибка`};function D(t){let n=[t.storageOptions?.length?t.storageOptions.join(` / `):null,t.swatches?.length?`цвета: ${t.swatches.map(e=>e[0]).join(`, `)}`:null,t.variant].filter(Boolean).join(` · `),r=t.salePrice?`<b class="admin__price--sale">${f(t.salePrice,t.currency)}</b> <s>${f(t.price,t.currency)}</s> <span class="admin__discountTag">−${t.discountPercent}%</span>`:`<b>${f(t.price,t.currency)}</b>`;return`<article class="admin__prow" data-slug="${t.slug}">
    <div class="admin__prow-media">${t.image?`<img src="${v(e(t.image,96))}" alt="" loading="lazy" decoding="async" fetchpriority="low" onerror="this.remove()">`:`<span class="admin__ph">${v((t.name||`?`)[0])}</span>`}</div>
    <div class="admin__prow-main">
      <div class="admin__prow-top">
        <b class="admin__prow-name">${v(t.name)}</b>
        <span class="admin__prow-tag">${v(t.brand||``)}${t.brand&&t.group?` · `:``}${v(t.group||``)}</span>
      </div>
      ${n?`<p class="admin__prow-config">${v(n)}</p>`:``}
    </div>
    <div class="admin__prow-price">${r}</div>
    <div class="admin__prow-status"><span class="admin__status admin__status--${t.status}">${E[t.status]||t.status}</span></div>
    <div class="admin__prow-updated">${_(t.updatedAt)}</div>
    <div class="admin__prow-actions">
      <button type="button" class="admin__link" data-edit="${t.slug}">Править</button>
      ${t.status===`hidden`?`<button type="button" class="admin__link" data-restore="${t.slug}">Вернуть</button>`:`<button type="button" class="admin__link admin__link--danger" data-hide="${t.slug}">Скрыть</button>`}
      <button type="button" class="admin__link admin__link--delete" data-delete="${t.slug}" data-name="${v(t.name)}">Удалить</button>
    </div>
  </article>`}var O=[`Гаджеты`,`Игры`,`Аксессуары`,`Другое`];function k(e){let t=[...e];switch(a.sortBy){case`group`:return t.sort((e,t)=>O.indexOf(e.group)-O.indexOf(t.group)||e.name.localeCompare(t.name,`ru`));case`brand`:return t.sort((e,t)=>(e.brand||``).localeCompare(t.brand||``,`ru`)||e.name.localeCompare(t.name,`ru`));case`price_asc`:return t.sort((e,t)=>d(e.salePrice??e.price,e.currency)-d(t.salePrice??t.price,t.currency));case`price_desc`:return t.sort((e,t)=>d(t.salePrice??t.price,t.currency)-d(e.salePrice??e.price,e.currency));case`status`:return t.sort((e,t)=>e.status.localeCompare(t.status));default:return t.sort((e,t)=>new Date(t.updatedAt).getTime()-new Date(e.updatedAt).getTime())}}function A(){let e=document.getElementById(`productsList`);if(!e)return;let t=document.getElementById(`showHidden`)?.checked,n=a.search.trim().toLowerCase(),r=a.products.filter(e=>t||e.status!==`hidden`);n&&(r=r.filter(e=>`${e.name} ${e.brand||``} ${e.category||``}`.toLowerCase().includes(n))),r=k(r);let i=r.slice(0,a.visibleProducts),o=r.length-i.length;e.innerHTML=r.length?`${i.map(D).join(``)}${o>0?`<button type="button" class="btn btn--ghost admin__loadMore" id="productsLoadMore">Показать ещё (${o})</button>`:``}`:`<p class="admin__empty">Ничего не найдено</p>`,document.getElementById(`productsLoadMore`)?.addEventListener(`click`,()=>{a.visibleProducts+=30,A()}),e.querySelectorAll(`[data-edit]`).forEach(e=>e.addEventListener(`click`,()=>{a.editingProductSlug=e.dataset.edit,$(),window.scrollTo({top:0,behavior:`smooth`})})),e.querySelectorAll(`[data-hide]`).forEach(e=>e.addEventListener(`click`,async()=>{confirm(`Скрыть товар с витрины?`)&&(await c(`DELETE`,`/products/${encodeURIComponent(e.dataset.hide)}`),await j())})),e.querySelectorAll(`[data-restore]`).forEach(e=>e.addEventListener(`click`,async()=>{await c(`POST`,`/products/${encodeURIComponent(e.dataset.restore)}/restore`),await j()})),e.querySelectorAll(`[data-delete]`).forEach(e=>e.addEventListener(`click`,async()=>{let t=e.dataset.name||`этот товар`;confirm(`Удалить «${t}» навсегда? Это действие нельзя отменить.`)&&(await c(`DELETE`,`/products/${encodeURIComponent(e.dataset.delete)}/permanent`),a.editingProductSlug===e.dataset.delete&&(a.editingProductSlug=null),b(`Товар удалён`),await j())}))}async function j(){try{let{products:e,groups:t,categorySuggestions:n}=await c(`GET`,`/products`);if(a.products=e,t?.length&&(a.groups=t),n?.length){a.categorySuggestions=n;let e=document.getElementById(`categorySuggestions`);e&&(e.innerHTML=n.map(e=>`<option value="${v(e)}">`).join(``))}A()}catch(e){let t=document.getElementById(`productsList`);t&&(t.innerHTML=`<p class="admin__error">${v(e.message)}</p>`)}}function le(){let e=document.getElementById(`productForm`),t=a.editingProductSlug?a.products.find(e=>e.slug===a.editingProductSlug):null;w(e,`image`),ne(e,t?.swatches),T(e),e.addEventListener(`submit`,async t=>{t.preventDefault();let n=document.getElementById(`formMsg`);n.textContent=`Сохраняю…`,n.className=`admin__formMsg`;try{let t=se(e),r=a.editingProductSlug?await c(`PUT`,`/products/${encodeURIComponent(a.editingProductSlug)}`,t):await c(`POST`,`/products`,t);n.textContent=r.warnings?.length?`Сохранено. ${r.warnings.join(` `)}`:`Сохранено.`,n.className=`admin__formMsg admin__formMsg--ok`,a.editingProductSlug=null,await j(),setTimeout(()=>$(),900)}catch(e){n.textContent=e.message,n.className=`admin__formMsg admin__formMsg--error`}}),document.getElementById(`btnCancelEdit`)?.addEventListener(`click`,()=>{a.editingProductSlug=null,$()}),document.getElementById(`productSearch`).addEventListener(`input`,e=>{a.search=e.target.value,a.visibleProducts=30,A()}),document.getElementById(`productSort`).addEventListener(`change`,e=>{a.sortBy=e.target.value,a.visibleProducts=30,A()}),document.getElementById(`productDisplayCurrency`).addEventListener(`change`,e=>{m(e.target.value),A()}),document.getElementById(`showHidden`).addEventListener(`change`,()=>{a.visibleProducts=30,A()}),j()}function ue(e){return`
    <label>Заголовок *
      <input name="title" required value="${v(e.title||``)}" placeholder="Новая партия iPhone в наличии" />
    </label>
    <label>Текст *
      <textarea name="body" rows="6" required placeholder="Текст поста">${v(e.body||``)}</textarea>
    </label>
    ${C(`image`,e.image,`Фото (необязательно)`)}
    <label>Статус
      <select name="status">
        <option value="published" ${e.status===`draft`?``:`selected`}>Опубликовано</option>
        <option value="draft" ${e.status===`draft`?`selected`:``}>Черновик (не виден на сайте)</option>
      </select>
    </label>`}function de(){let e=a.editingPostSlug?a.posts.find(e=>e.slug===a.editingPostSlug):null;return`
    <div class="admin__head">
      <div>
        <p class="eyebrow">Посты</p>
        <h1 class="section__title">${e?`Редактировать пост`:`Новый пост`}</h1>
      </div>
      ${e?`<button type="button" class="btn btn--ghost" id="btnCancelPostEdit">Отменить редактирование</button>`:``}
    </div>
    <form id="postForm" class="calc admin__form">
      ${ue(e||{})}
      <div class="admin__formActions">
        <button type="submit" class="btn">${e?`Сохранить`:`Опубликовать`}</button>
      </div>
      <p class="admin__formMsg" id="postFormMsg"></p>
    </form>

    <div class="admin__listHead"><h2 class="section__title">Все посты (${a.posts.length})</h2></div>
    <div class="admin__tableWrap">
      <table class="admin__table" id="postsTable"></table>
    </div>`}function fe(){let t=document.getElementById(`postsTable`);t&&(t.innerHTML=`
    <thead><tr><th></th><th>Заголовок</th><th>Статус</th><th>Дата</th><th></th></tr></thead>
    <tbody>
      ${a.posts.map(t=>`<tr data-slug="${t.slug}">
            <td class="admin__thumb">${t.image?`<img src="${v(e(t.image,96))}" alt="" loading="lazy" decoding="async" fetchpriority="low" onerror="this.remove()">`:``}</td>
            <td><b>${v(t.title)}</b></td>
            <td><span class="admin__status admin__status--${t.status===`published`?`active`:`hidden`}">${t.status===`published`?`опубликовано`:`черновик`}</span></td>
            <td class="admin__muted">${_(t.publishedAt)}</td>
            <td class="admin__actions">
              <button type="button" class="admin__link" data-edit-post="${t.slug}">Править</button>
              <button type="button" class="admin__link admin__link--danger" data-del-post="${t.slug}">Удалить</button>
            </td>
          </tr>`).join(``)||`<tr><td colspan="5" class="admin__empty">Пока нет постов</td></tr>`}
    </tbody>`,t.querySelectorAll(`[data-edit-post]`).forEach(e=>e.addEventListener(`click`,()=>{a.editingPostSlug=e.dataset.editPost,$(),window.scrollTo({top:0,behavior:`smooth`})})),t.querySelectorAll(`[data-del-post]`).forEach(e=>e.addEventListener(`click`,async()=>{confirm(`Удалить пост безвозвратно?`)&&(await c(`DELETE`,`/posts/${encodeURIComponent(e.dataset.delPost)}`),await M())})))}async function M(){try{let{posts:e}=await c(`GET`,`/posts`);a.posts=e,fe()}catch(e){b(e.message,!1)}}function N(){let e=document.getElementById(`postForm`);w(e,`image`),e.addEventListener(`submit`,async t=>{t.preventDefault();let n=document.getElementById(`postFormMsg`);n.textContent=`Сохраняю…`,n.className=`admin__formMsg`;let r=new FormData(e),i={title:(r.get(`title`)||``).trim(),body:(r.get(`body`)||``).trim(),image:(r.get(`image`)||``).trim(),status:r.get(`status`)};try{a.editingPostSlug?await c(`PUT`,`/posts/${encodeURIComponent(a.editingPostSlug)}`,i):await c(`POST`,`/posts`,i),n.textContent=`Сохранено.`,n.className=`admin__formMsg admin__formMsg--ok`,a.editingPostSlug=null,await M(),setTimeout(()=>$(),900)}catch(e){n.textContent=e.message,n.className=`admin__formMsg admin__formMsg--error`}}),document.getElementById(`btnCancelPostEdit`)?.addEventListener(`click`,()=>{a.editingPostSlug=null,$()}),M()}function P(){return`
    <div class="admin__head">
      <div>
        <p class="eyebrow">Обновления</p>
        <h1 class="section__title">Изменения цен</h1>
      </div>
      ${p(`historyDisplayCurrency`)}
    </div>
    <div class="admin__tableWrap">
      <table class="admin__table" id="historyTable"></table>
    </div>`}function F(){let e=document.getElementById(`historyTable`);e&&(e.innerHTML=`
    <thead><tr><th>Когда</th><th>Товар</th><th>Было</th><th>Стало</th><th>Источник</th></tr></thead>
    <tbody>
      ${a.history.map(e=>`<tr>
            <td class="admin__muted">${_(e.changedAt)}</td>
            <td>${e.productSlug?`<a href="#" data-goto="${e.productSlug}">${v(e.productName)}</a>`:v(e.productName)}</td>
            <td>${e.oldPrice==null?`<span class="admin__muted">новый товар</span>`:f(e.oldPrice,e.currency)}</td>
            <td><b>${f(e.newPrice,e.currency)}</b></td>
            <td><span class="admin__status admin__status--${e.source===`telegram`?`active`:`needs_research`}">${e.source===`telegram`?`Telegram`:`Админка`}</span></td>
          </tr>`).join(``)||`<tr><td colspan="5" class="admin__empty">Изменений пока нет</td></tr>`}
    </tbody>`,e.querySelectorAll(`[data-goto]`).forEach(e=>e.addEventListener(`click`,t=>{t.preventDefault(),a.view=`products`,a.editingProductSlug=e.dataset.goto,$(),window.scrollTo({top:0,behavior:`smooth`})})))}async function I(){try{let{changes:e}=await c(`GET`,`/price-history`);a.history=e,F()}catch(e){b(e.message,!1)}}function L(){document.getElementById(`historyDisplayCurrency`).addEventListener(`change`,e=>{m(e.target.value),F()}),I()}var R,z;function B(e){return e===`telegram`?`Telegram`:e===`whatsapp`?`WhatsApp`:`amoCRM`}function V(e){return(e.trim()[0]||`?`).toUpperCase()}function pe(){return`
    <div class="admin__head crm__head">
      <div>
        <p class="eyebrow">Единый inbox</p>
        <h1 class="section__title">CRM диалоги</h1>
      </div>
      <div class="crm__status" id="crmStatus"></div>
    </div>
    <div id="crmUsageSummary"></div>
    <div id="crmMount"><div class="crm__loading">Загружаем диалоги…</div></div>`}function me(){let e=document.getElementById(`crmUsageSummary`),t=a.aiUsage;!e||!t||(e.innerHTML=`<section class="crm-usage-summary">${[[`Диалогов`,t.overview.conversations],[`Сообщений`,t.overview.messages],[`AI ответов`,t.overview.aiReplies],[`Принято`,t.overview.approved],[`Без правок`,t.overview.withoutEdits],[`Отклонено`,t.overview.rejected],[`Расход AI`,h(t.periods.all.costUsd)]].map(([e,t])=>`<article><strong>${typeof t==`number`?t.toLocaleString(`ru-RU`):t}</strong><span>${e}</span></article>`).join(``)}</section>`)}function he(){let e=document.getElementById(`crmStatus`);if(!e||!a.crmStatus)return;let t=(e,t)=>`<span class="${t?`is-on`:`is-off`}"><i></i>${e}${t?``:` — настройте`}</span>`;e.innerHTML=t(`Telegram`,a.crmStatus.telegram)+t(`WhatsApp · amoCRM`,a.crmStatus.amocrm)+t(`AI`,a.crmStatus.ai)}function H(){let e=document.getElementById(`crmMount`);if(!e)return;let t=a.crmSearch.trim().toLowerCase(),n=a.crmConversations.filter(e=>`${e.customerName} ${e.customerUsername||``} ${e.customerPhone||``} ${e.lastMessage}`.toLowerCase().includes(t)),r=a.crmDetail,i=r?.conversation;e.innerHTML=`
    <div class="crm">
      <aside class="crm__inbox">
        <div class="crm__inboxTop">
          <b>Все диалоги</b><span>${a.crmConversations.length}</span>
        </div>
        <label class="crm__search">
          <span>⌕</span>
          <input type="search" id="crmSearch" placeholder="Имя или сообщение" value="${v(a.crmSearch)}" />
        </label>
        <div class="crm__threads">
          ${n.map(e=>`
            <button type="button" class="crm__thread ${i?.id===e.id?`active`:``}" data-crm-id="${e.id}">
              <span class="crm__avatar">${v(V(e.customerName))}</span>
              <span class="crm__threadBody">
                <span class="crm__threadLine"><b>${v(e.customerName)}</b><time>${v(_(e.lastMessageAt))}</time></span>
                <span class="crm__threadLine crm__threadMeta">
                  <em class="crm__source crm__source--${v(e.source)}">${B(e.source)}</em>
                  <small>${v(e.lastMessage||`Новый диалог`)}</small>
                </span>
              </span>
              ${e.unreadCount?`<strong class="crm__unread">${e.unreadCount}</strong>`:``}
            </button>`).join(``)||`<div class="crm__empty">Диалогов пока нет.<br />Напишите боту, чтобы проверить CRM.</div>`}
        </div>
      </aside>

      <section class="crm__chat">
        ${r?`
          <header class="crm__chatHead">
            <span class="crm__avatar crm__avatar--large">${v(V(i.customerName))}</span>
            <div><b>${v(i.customerName)}</b><small>${B(i.source)} · ${i.aiEnabled?`AI отвечает`:`ручной режим`}</small></div>
            <label class="crm__aiSwitch" title="Автоответы AI">
              <input type="checkbox" id="crmAiToggle" ${i.aiEnabled?`checked`:``} />
              <span></span><b>AI</b>
            </label>
          </header>
          <div class="crm__messages" id="crmMessages">
            ${r.messages.map(e=>`
              <article class="crm__message crm__message--${e.direction}">
                <p>${v(e.text).replace(/\n/g,`<br />`)}</p>
                <footer>${e.sender===`assistant`?`AI`:e.sender===`manager`?`Менеджер`:v(i.customerName)} · ${v(_(e.createdAt))}</footer>
              </article>`).join(``)||`<div class="crm__empty">Сообщений пока нет</div>`}
          </div>
          <form class="crm__composer" id="crmComposer">
            <textarea name="text" rows="1" maxlength="4000" placeholder="Написать клиенту…" required></textarea>
            <button type="submit" class="btn btn--sm">Отправить <span>↗</span></button>
          </form>`:`
          <div class="crm__welcome">
            <span class="logo__badge" aria-hidden="true"></span>
            <h2>Выберите диалог</h2>
            <p>Здесь появится переписка клиента с ботом или WhatsApp.</p>
          </div>`}
      </section>

      <aside class="crm__customer">
        ${r?`
          <div class="crm__customerHero">
            <span class="crm__avatar crm__avatar--xl">${v(V(i.customerName))}</span>
            <h3>${v(i.customerName)}</h3>
            <span class="crm__source crm__source--${v(i.source)}">${B(i.source)}</span>
          </div>
          <dl class="crm__facts">
            <div><dt>Контакт</dt><dd>${v(i.customerPhone||i.customerUsername||`Не указан`)}</dd></div>
            <div><dt>ID диалога</dt><dd>${v(i.externalChatId)}</dd></div>
            ${i.externalLeadId?`<div><dt>Сделка amoCRM</dt><dd>#${v(i.externalLeadId)}</dd></div>`:``}
            <div><dt>Последняя активность</dt><dd>${v(_(i.lastMessageAt))}</dd></div>
          </dl>
          <label class="crm__notes">Заметка менеджера
            <textarea id="crmNotes" rows="5" placeholder="Что важно помнить о клиенте">${v(i.notes)}</textarea>
          </label>
          <button type="button" class="btn btn--ghost crm__saveNotes" id="crmSaveNotes">Сохранить заметку</button>`:`
          <div class="crm__customerBlank">
            <p class="eyebrow">Карточка клиента</p>
            <p>Контакты, источник и заметки откроются вместе с диалогом.</p>
          </div>`}
        <div class="crm__settings">
          <b>Управление ботом</b>
          <p>Подтверждение ответов, промпты, модель и диагностика находятся во вкладках «Ответы бота» и «Разработчикам».</p>
          ${a.crmStatus?`<p>Webhook amoCRM:<br /><code>${v(a.crmStatus.amocrmWebhook)}</code></p>`:``}
        </div>
      </aside>
    </div>`,ge();let o=document.getElementById(`crmMessages`);o&&(o.scrollTop=o.scrollHeight)}function ge(){document.querySelectorAll(`[data-crm-id]`).forEach(e=>e.addEventListener(`click`,()=>U(Number(e.dataset.crmId)))),document.getElementById(`crmSearch`)?.addEventListener(`input`,e=>{a.crmSearch=e.target.value,H();let t=document.getElementById(`crmSearch`);t?.focus(),t?.setSelectionRange(t.value.length,t.value.length)}),document.getElementById(`crmAiToggle`)?.addEventListener(`change`,async e=>{if(!a.crmDetail)return;let t=e.target.checked;a.crmDetail=await c(`PATCH`,`/crm/conversations/${a.crmDetail.conversation.id}`,{aiEnabled:t}),a.crmConversations=a.crmConversations.map(e=>e.id===a.crmDetail.conversation.id?a.crmDetail.conversation:e),H()}),document.getElementById(`crmSaveNotes`)?.addEventListener(`click`,async()=>{if(!a.crmDetail)return;let e=document.getElementById(`crmNotes`).value;a.crmDetail=await c(`PATCH`,`/crm/conversations/${a.crmDetail.conversation.id}`,{notes:e}),b(`Заметка сохранена`)}),document.getElementById(`crmComposer`)?.addEventListener(`submit`,async e=>{if(e.preventDefault(),!a.crmDetail)return;let t=e.target,n=t.elements.namedItem(`text`).value.trim();if(!n)return;let r=t.querySelector(`button`);r.disabled=!0;try{a.crmDetail=await c(`POST`,`/crm/conversations/${a.crmDetail.conversation.id}/messages`,{text:n}),H()}catch(e){b(e.message,!1),r.disabled=!1}})}async function U(e){a.crmDetail=await c(`GET`,`/crm/conversations/${e}`),a.crmConversations=a.crmConversations.map(t=>t.id===e?{...t,unreadCount:0}:t),H()}async function W(e=!1){let{conversations:t}=await c(`GET`,`/crm/conversations`);a.crmConversations=t,e&&!a.crmDetail&&t[0]?await U(t[0].id):H()}async function _e(){try{let[e,t]=await Promise.all([c(`GET`,`/crm/status`),c(`GET`,`/crm/developer/usage`)]);a.crmStatus=e,a.aiUsage=t,he(),me(),await W(!0),R=setInterval(()=>W(!1).catch(()=>{}),1e4)}catch(e){b(e.message,!1)}}function ve(){return`
    <div class="admin__head analytics__head">
      <div>
        <p class="eyebrow">Переходы в WhatsApp</p>
        <h1 class="section__title">Что хотят купить</h1>
        <p class="analytics__lead">Считаем товары в момент нажатия «Купить в WhatsApp» на сайте.</p>
      </div>
      <div class="analytics__controls">
        <label class="analytics__period">Период
          <select id="analyticsDays">
            ${[[7,`7 дней`],[30,`30 дней`],[90,`90 дней`],[365,`1 год`]].map(([e,t])=>`<option value="${e}" ${a.analyticsDays===e?`selected`:``}>${t}</option>`).join(``)}
          </select>
        </label>
      </div>
    </div>
    <div id="analyticsMount"><div class="crm__loading">Собираем аналитику…</div></div>`}function G(e){let t={7:.32,30:1,90:2.8,365:10.6}[e]||1,n=e=>Math.max(1,Math.round(e*t)),r=[[`iphone-17-pro-max-256-gb-belyi-esim`,`iPhone 17 Pro Max`,42,51],[`macbook-pro-16-m5-pro-1-tb-space-black-24-gb-ram-mgea4`,`MacBook Pro 16 M5 Pro`,31,34],[`airpods-pro-3`,`AirPods Pro 3`,27,39],[`dyson-airwrap-hs09-co-anda2x-long-ceramic-pink-koreya-dorozhnaya-sumka-v-podarok`,`Dyson Airwrap HS09`,24,28],[`apple-watch-ultra-3-black`,`Apple Watch Ultra 3`,19,22],[`galaxy-s26-ultra-512-gb-vse-cveta-2-sim-vetnam`,`Galaxy S26 Ultra`,16,18],[`nintendo-switch-2`,`Nintendo Switch 2`,12,15]],i=[3,5,4,8,6,9,7,11,8,10,12,9,13,11,15,12,14,16,13,17,15,19,16,18,21,17,20,22,19,24],a=Math.min(e,30),o=Math.max(1,Math.floor(e/a)),s=Date.now(),c=Array.from({length:a},(e,t)=>({day:new Date(s-(a-1-t)*o*864e5).toISOString().slice(0,10),clicks:n(i[t%i.length])}));return{periodDays:e,summary:{clicks:n(186),units:n(243),visitors:n(132),handoffs:n(37)},topProducts:r.map(([e,t,r,i])=>({productSlug:e,productName:t,clicks:n(r),units:n(i)})),trend:c,sources:[{source:`product`,clicks:n(128)},{source:`cart`,clicks:n(58)}],recent:[[`product`,`iPhone 17 Pro Max`,1,8],[`cart`,`AirPods Pro 3`,2,24],[`product`,`MacBook Pro 16 M5 Pro`,1,51],[`cart`,`Dyson Airwrap HS09`,1,83],[`product`,`Apple Watch Ultra 3`,1,136],[`product`,`Galaxy S26 Ultra`,1,204]].map(([e,t,n,r],i)=>({id:`demo-${i}`,source:e,clickedAt:new Date(s-r*6e4).toISOString(),items:[{productSlug:null,productName:t,quantity:n}]}))}}function K(){let e=document.getElementById(`analyticsMount`);if(!e)return;let t=G(a.analyticsDays),n=Math.max(1,...t.trend.map(e=>e.clicks)),r=Math.max(1,...t.topProducts.map(e=>e.clicks)),i=Math.max(1,t.sources.reduce((e,t)=>e+t.clicks,0)),o=e=>e===`product`?`Карточка товара`:e===`credit`?`Рассрочка`:`Корзина`;e.innerHTML=`
    <aside class="analytics__demoNote">
      <div><b><i></i>Демонстрационный режим</b><span>Цифры ниже — пример оформления. Реальные нажатия продолжают записываться отдельно.</span></div>
    </aside>
    <section class="analytics__kpis">
      <article><span>Нажатий «Купить»</span><strong>${t.summary.clicks}</strong><small>переходов в WhatsApp</small></article>
      <article class="analytics__kpiHero"><span>Товаров в запросах</span><strong>${t.summary.units}</strong><small>с учётом количества в корзине</small></article>
      <article><span>Посетителей</span><strong>${t.summary.visitors}</strong><small>уникальных покупателей</small></article>
      <article><span>Передано менеджеру</span><strong>${t.summary.handoffs||0}</strong><small>диалогов, где менеджер подтвердил или отправил ответ</small></article>
    </section>

    <div class="analytics__grid">
      <section class="analytics__panel analytics__leaders">
        <header><div><p class="eyebrow">Рейтинг</p><h2>Товары-лидеры</h2></div><span>${t.topProducts.length} позиций</span></header>
        <div class="analytics__leaderList">
          ${t.topProducts.map((e,t)=>`
            <article class="analytics__leader">
              <b class="analytics__rank">${String(t+1).padStart(2,`0`)}</b>
              <div class="analytics__leaderMain">
                <strong>${v(e.productName)}</strong>
                <div class="analytics__track"><i style="width:${Math.max(6,e.clicks/r*100)}%"></i></div>
              </div>
              <div class="analytics__leaderValue"><b>${e.clicks} нажатий</b><small>${e.units} шт. в запросах</small></div>
            </article>`).join(``)||`<div class="analytics__empty">Пока нет переходов в WhatsApp. Статистика появится после первого нажатия «Купить».</div>`}
        </div>
      </section>

      <section class="analytics__panel analytics__trend">
        <header><div><p class="eyebrow">Динамика</p><h2>Нажатия по дням</h2></div></header>
        <div class="analytics__bars">
          ${t.trend.map(e=>`
            <div class="analytics__bar" title="${v(e.day)} — ${e.clicks} нажатий">
              <b>${e.clicks}</b><i style="height:${Math.max(8,e.clicks/n*100)}%"></i>
              <span>${new Date(`${e.day}T00:00:00`).toLocaleDateString(`ru-RU`,{day:`2-digit`,month:`2-digit`})}</span>
            </div>`).join(``)||`<div class="analytics__empty">Динамика появится после первого нажатия.</div>`}
        </div>
        <div class="analytics__sources">
          <p>Где нажимают «Купить»</p>
          ${t.sources.map(e=>`
            <div><span>${o(e.source)}</span><i><b style="width:${e.clicks/i*100}%"></b></i><strong>${e.clicks}</strong></div>
          `).join(``)||`<small>Источников пока нет</small>`}
        </div>
      </section>
    </div>

    <section class="analytics__panel analytics__recent">
      <header><div><p class="eyebrow">Журнал</p><h2>Последние переходы</h2></div></header>
      <div class="analytics__sales">
        ${t.recent.map(e=>{let t=e.items.reduce((e,t)=>e+t.quantity,0),n=e.items.map(e=>e.productName).join(`, `),r=e.items.map(e=>`${e.productName} × ${e.quantity}`).join(` · `);return`
          <article>
            <time>${v(_(e.clickedAt))}</time>
            <div><b>${v(n)}</b><small>${v(r)}</small></div>
            <span>${o(e.source)}</span>
            <strong>${t} шт.</strong>
          </article>`}).join(``)||`<div class="analytics__empty">Переходов за выбранный период пока нет.</div>`}
      </div>
    </section>`}function ye(){document.getElementById(`analyticsDays`)?.addEventListener(`change`,e=>{a.analyticsDays=Number(e.target.value),K()}),K()}function be(){return`
    <div class="admin__head">
      <div><p class="eyebrow">Human in the loop</p><h1 class="section__title">Ответы бота</h1>
        <p class="analytics__lead">Проверьте черновик, при необходимости отредактируйте и отправьте клиенту.</p></div>
      <label class="analytics__period">Показывать
        <select id="approvalFilter">
          <option value="pending" ${a.approvalFilter===`pending`?`selected`:``}>Ждут решения</option>
          <option value="all" ${a.approvalFilter===`all`?`selected`:``}>Все ответы</option>
        </select>
      </label>
    </div>
    <div class="bot-approvals" id="approvalsMount"><div class="crm__loading">Загружаем черновики…</div></div>`}function xe(){let e=document.getElementById(`approvalsMount`);e&&(e.innerHTML=a.approvals.map(e=>`
    <article class="bot-approval bot-approval--${e.status}">
      <header>
        <div><span class="crm__avatar">${v(V(e.customerName))}</span>
          <div><b>${v(e.customerName)}</b><small>${B(e.source)} · ${v(_(e.createdAt))}</small></div>
        </div>
        <span class="bot-status">${e.status===`pending`?`Ждёт решения`:e.status===`approved`?`Отправлен`:`Отклонён`}</span>
      </header>
      <div class="bot-approval__message"><small>Сообщение клиента</small><p>${v(e.customerMessage)}</p></div>
      ${e.summary?`<div class="bot-approval__summary"><small>Гипервизор</small><p>${v(e.summary)}</p></div>`:``}
      ${e.rejectReason?`<div class="bot-approval__summary"><small>Причина отклонения</small><p>${v(e.rejectReason)}</p></div>`:``}
      <label>Черновик ответа
        <textarea rows="5" data-approval-text="${e.id}" ${e.status===`pending`?``:`disabled`}>${v(e.editedReply||e.aiReply)}</textarea>
      </label>
      <footer>
        <small>${v(e.model||`модель не указана`)}</small>
        <button type="button" class="btn btn--ghost btn--sm" data-open-dialog="${e.conversationId}">Открыть диалог</button>
        ${e.status===`pending`?`
          <button type="button" class="btn btn--ghost btn--sm" data-reject="${e.id}">Отклонить</button>
          <button type="button" class="btn btn--sm" data-approve="${e.id}">Подтвердить и отправить</button>`:``}
      </footer>
    </article>`).join(``)||`<div class="bot-empty">Новых ответов на подтверждение нет.</div>`)}async function q(){a.approvals=(await c(`GET`,`/crm/approvals?status=${a.approvalFilter}`)).approvals,xe(),Se()}function Se(){document.querySelectorAll(`[data-open-dialog]`).forEach(e=>e.addEventListener(`click`,async()=>{a.view=`crm`,await U(Number(e.dataset.openDialog)),$()})),document.querySelectorAll(`[data-approve]`).forEach(e=>e.addEventListener(`click`,async()=>{let t=Number(e.dataset.approve),n=document.querySelector(`[data-approval-text="${t}"]`).value;e.disabled=!0;try{await c(`POST`,`/crm/approvals/${t}/approve`,{text:n}),b(`Ответ отправлен клиенту`),await q()}catch(t){b(t.message,!1),e.disabled=!1}})),document.querySelectorAll(`[data-reject]`).forEach(e=>e.addEventListener(`click`,async()=>{let t=window.prompt(`Почему ответ отклонён? Бот использует причину для обучения.`);if(t!==null){if(!t.trim()){b(`Укажите причину отклонения`,!1);return}e.disabled=!0;try{await c(`POST`,`/crm/approvals/${e.dataset.reject}/reject`,{reason:t.trim()}),b(`Черновик отклонён`),await q()}catch(t){b(t.message,!1),e.disabled=!1}}}))}function Ce(){document.getElementById(`approvalFilter`)?.addEventListener(`change`,async e=>{a.approvalFilter=e.target.value,await q()}),q().catch(e=>b(e.message,!1)),R=setInterval(()=>q().catch(()=>{}),1e4)}function J(e){return document.getElementById(e)?.value||``}function Y(){return{approvalEnabled:!!document.getElementById(`botApproval`)?.checked,aggressiveLearning:!!document.getElementById(`botAggressiveLearning`)?.checked,model:document.getElementById(`botModel`)?.value,systemPrompt:J(`botSystemPrompt`),hypervisorPrompt:J(`botHypervisorPrompt`),characterPrompt:J(`botCharacterPrompt`),rulesPrompt:J(`botRulesPrompt`),taskPrompt:J(`botTaskPrompt`)}}function we(){return`<div class="admin__head"><div><p class="eyebrow">Bot control center</p>
    <h1 class="section__title">Разработчикам</h1><p class="analytics__lead">Настройки модели, лаборатория и журнал прохождения сообщений.</p></div></div>
    <div id="developerMount"><div class="crm__loading">Проверяем системы бота…</div></div>`}function X(){return a.labHistory.map(e=>`
    <article class="bot-lab__message bot-lab__message--${e.role}">
      <p>${v(e.content).replace(/\n/g,`<br />`)}</p>
      ${e.role===`assistant`?`<small>${v(e.model||``)} · ${e.latencyMs||0} мс</small>`:``}
    </article>`).join(``)||`<div class="bot-empty">Напишите тестовый вопрос клиента — ответ останется только в лаборатории.</div>`}function Te(){let e=a.aiUsage;if(!e)return``;let t=[[`today`,`Сегодня`],[`averageDay`,`Средний в день`],[`month`,`За месяц (30 дн.)`],[`year`,`За год`],[`all`,`За всё время`]],n={sales_agent:`Продавец-консультант`,hypervisor_context:`Гипервизор · контекст`,media_analysis:`Изображения и аудио`,laboratory:`Лаборатория`,aggressive_learning:`Агрессивное обучение`};return`
    <section class="bot-panel ai-usage">
      <header><div><p class="eyebrow">AI API</p><h2>Расход токенов по периодам</h2></div>
        <small>Стоимость рассчитана для DeepSeek; для ChatGPT и Gemini сохраняются токены.</small></header>
      <div class="ai-usage__periods">${t.map(([t,n])=>`
        <article><strong>${g(e.periods[t].tokens)} <small>tok</small></strong>
          <b>${h(e.periods[t].costUsd)}</b><span>${n}</span></article>`).join(``)}</div>
    </section>
    <section class="bot-panel ai-usage ai-usage--tasks">
      <header><div><p class="eyebrow">Пайплайн магазина</p><h2>Расход токенов по задачам ИИ</h2></div></header>
      <div class="ai-usage__table">
        <div class="ai-usage__row ai-usage__row--head"><span>Задача</span><span>Вызовов</span><span>Токенов</span><span>Стоимость</span></div>
        ${e.tasks.map(e=>`<div class="ai-usage__row">
          <b>${v(n[e.task]||e.task)}<small>${v(e.model)}</small></b>
          <span>${e.calls.toLocaleString(`ru-RU`)}</span>
          <span>${g(e.tokens)}</span>
          <strong>${h(e.costUsd)}</strong>
        </div>`).join(``)||`<div class="bot-empty">Расходов пока нет. Первый реальный вызов ИИ появится здесь автоматически.</div>`}
      </div>
    </section>`}function Ee(e){let t=e.includes(`T`)?e:e.replace(` `,`T`)+`Z`,n=new Date(t);return Number.isNaN(n.getTime())?`--:--:--`:n.toLocaleTimeString(`ru-RU`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`})}function De(e){return!e||typeof e!=`object`?``:Object.entries(e).map(([e,t])=>`${e}=${typeof t==`string`?t:JSON.stringify(t)}`).join(` `).slice(0,420)}function Z(){return a.botEvents.length?[...a.botEvents].reverse().map(e=>{let t=De(e.details);return`<div class="bot-terminal__line bot-terminal__line--${e.level}">
      <time>${v(Ee(e.createdAt))}</time><b>${v(e.level.toUpperCase())}</b>
      <span class="bot-terminal__stage">${v(e.stage)}</span>
      <span>${v(e.message||e.event)}</span>
      ${t?`<code>${v(t)}</code>`:``}
    </div>`}).join(``):`<div class="bot-terminal__empty">$ Ожидаем события бота…</div>`}function Oe(){let e=document.getElementById(`botTerminal`);if(!e)return;let t=e.scrollHeight-e.scrollTop-e.clientHeight<44;e.innerHTML=Z(),t&&(e.scrollTop=e.scrollHeight)}function ke(){let e=document.getElementById(`developerMount`),t=a.developerStatus;if(!e||!t)return;let n=t.settings;e.innerHTML=`
    <section class="bot-kpis">
      <article><span>ИИ</span><strong>${t.enabled?`ONLINE`:`OFFLINE`}</strong></article>
      <article><span>Ждут подтверждения</span><strong>${t.approvals.pending}</strong></article>
      <article><span>Ошибок за 24 часа</span><strong>${t.errors24h}</strong></article>
    </section>
    <div class="bot-developer">
      <section class="bot-panel bot-settings">
        <header><div><p class="eyebrow">Конфигурация</p><h2>Настройки бота</h2></div>
          <button type="button" class="btn btn--sm" id="saveBotSettings">Сохранить</button></header>
        <label class="bot-switch"><input type="checkbox" id="botApproval" ${n.approvalEnabled?`checked`:``}><span></span>
          Подтверждать ответы перед отправкой</label>
        <label class="bot-switch bot-switch--learning"><input type="checkbox" id="botAggressiveLearning" ${n.aggressiveLearning?`checked`:``}><span></span>
          <div><b>Агрессивное обучение</b><small>После каждого отклонения сохраняет причину и точечно улучшает системный промпт.</small></div></label>
        <label>Модель<select id="botModel">${n.models.map(e=>`<option value="${v(e.id)}" ${e.id===n.model?`selected`:``} ${e.enabled?``:`disabled`}>
            ${v(e.label)} · ${v(e.provider)}${e.enabled?``:` — нужен API-ключ`}
          </option>`).join(``)}</select></label>
        ${[[`botSystemPrompt`,`Системный промпт`,n.systemPrompt],[`botHypervisorPrompt`,`Промпт гипервизора · только пересказ контекста`,n.hypervisorPrompt],[`botCharacterPrompt`,`Промпт характера`,n.characterPrompt],[`botRulesPrompt`,`Промпт правил`,n.rulesPrompt],[`botTaskPrompt`,`Промпт задачи`,n.taskPrompt]].map(([e,t,n])=>`<label>${t}<textarea id="${e}" rows="5">${v(n)}</textarea></label>`).join(``)}
      </section>
      <section class="bot-panel bot-lab">
        <header><div><p class="eyebrow">Изолировано от CRM и клиентов</p><h2>Лаборатория бота</h2>
          <small>Редактируйте промпты и проверяйте ответы — сообщения никуда не отправляются.</small></div>
          <button type="button" class="admin__link" id="clearBotLab">Очистить</button></header>
        <div class="bot-lab__messages" id="botLabMessages">${X()}</div>
        <form id="botLabForm"><textarea name="message" rows="3" placeholder="Сообщение тестового клиента…" required></textarea>
          <button class="btn btn--sm" type="submit">Запустить ↗</button></form>
      </section>
    </div>
    ${Te()}
    <section class="bot-panel bot-pipeline">
      <header><div><p class="eyebrow">Live log</p><h2>Пайплайн и ошибки</h2></div>
        <div class="bot-terminal__actions"><span><i></i> LIVE · 3 сек</span><button type="button" class="admin__link" id="refreshBotEvents">Обновить</button></div></header>
      <div class="bot-terminal" id="botTerminal" role="log" aria-live="polite">${Z()}</div>
    </section>`,je()}async function Ae(){let[e,t,n]=await Promise.all([c(`GET`,`/crm/developer/status`),c(`GET`,`/crm/developer/events?limit=150`),c(`GET`,`/crm/developer/usage`)]);a.developerStatus=e,a.botEvents=t.events,a.aiUsage=n,ke()}async function Q(){a.botEvents=(await c(`GET`,`/crm/developer/events?limit=150`)).events,Oe()}function je(){document.getElementById(`saveBotSettings`)?.addEventListener(`click`,async()=>{let e=await c(`PUT`,`/crm/settings`,Y());a.developerStatus&&(a.developerStatus.settings=e),b(`Настройки бота сохранены`)}),document.getElementById(`clearBotLab`)?.addEventListener(`click`,()=>{a.labHistory=[];let e=document.getElementById(`botLabMessages`);e&&(e.innerHTML=X())}),document.getElementById(`refreshBotEvents`)?.addEventListener(`click`,()=>Q().catch(e=>b(e.message,!1))),document.getElementById(`botLabForm`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=e.target,n=t.elements.namedItem(`message`),r=n.value.trim();if(!r)return;let i=t.querySelector(`button`);i.disabled=!0;let o=a.labHistory.map(({role:e,content:t})=>({role:e,content:t}));a.labHistory.push({role:`user`,content:r}),n.value=``;let s=document.getElementById(`botLabMessages`);s&&(s.innerHTML=X());try{let e=await c(`POST`,`/crm/developer/lab`,{message:r,history:o,model:Y().model,prompts:Y()});a.labHistory.push({role:`assistant`,content:e.reply,model:e.model,latencyMs:e.latencyMs}),s&&(s.innerHTML=X(),s.scrollTop=s.scrollHeight)}catch(e){b(e.message,!1)}finally{i.disabled=!1}})}function Me(){Ae().catch(e=>b(e.message,!1)),z=setInterval(()=>Q().catch(()=>{}),3e3)}var Ne=[{id:`crm`,label:`CRM`},{id:`approvals`,label:`Ответы бота`},{id:`analytics`,label:`Аналитика`},{id:`products`,label:`Товары`},{id:`news`,label:`Посты`},{id:`history`,label:`Обновления`},{id:`developer`,label:`Разработчикам`}];function Pe(){return`<nav class="admin__tabs">
    <span class="admin__tabIndicator" aria-hidden="true"></span>
    ${Ne.map(e=>`<button type="button" class="admin__tab ${a.view===e.id?`active`:``}" data-tab="${e.id}">${e.label}</button>`).join(``)}
  </nav>`}function Fe(){let e=t.querySelector(`.admin__tabs`),n=e?.querySelector(`.admin__tabIndicator`),r=e?.querySelector(`.admin__tab.active`);!e||!n||!r||(n.style.width=`${r.offsetWidth}px`,n.style.transform=`translateX(${r.offsetLeft-e.clientLeft}px)`,requestAnimationFrame(()=>e.classList.add(`is-ready`)))}function $(){if(R&&=(clearInterval(R),void 0),z&&=(clearInterval(z),void 0),!a.authenticated)return S();n.hidden=!1;let e=a.view===`crm`?pe():a.view===`approvals`?be():a.view===`developer`?we():a.view===`analytics`?ve():a.view===`news`?de():a.view===`history`?P():ce(),r=t.querySelector(`.admin__tabs`),i=t.querySelector(`.admin__view`);r&&i?(i.innerHTML=e,r.querySelectorAll(`[data-tab]`).forEach(e=>e.classList.toggle(`active`,e.dataset.tab===a.view))):t.innerHTML=Pe()+`<div class="admin__view">${e}</div>`,t.querySelectorAll(`[data-tab]`).forEach(e=>{e.dataset.wired!==`true`&&(e.dataset.wired=`true`,e.addEventListener(`click`,()=>{a.view=e.dataset.tab,a.editingProductSlug=null,a.editingPostSlug=null,$()}))}),Fe(),a.view===`crm`?_e():a.view===`approvals`?Ce():a.view===`developer`?Me():a.view===`analytics`?ye():a.view===`news`?N():a.view===`history`?L():le()}n.addEventListener(`click`,async()=>{await fetch(`/api/admin/logout`,{method:`POST`,credentials:`same-origin`}),a.authenticated=!1,$()}),(async function(){await Promise.all([x(),ee()]),$()})();