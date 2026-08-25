import"./image-url-DKWqd5-K.js";import{C as e,D as t,S as n,T as r,_ as i,b as a,t as o,x as s}from"./shell-BaAfn-kO.js";var c=[{label:`Выберите модель`,value:0},{label:`iPhone 16 Pro Max`,value:900},{label:`iPhone 16 Pro`,value:800},{label:`iPhone 16`,value:620},{label:`iPhone 15 Pro Max`,value:720},{label:`iPhone 15 Pro`,value:640},{label:`iPhone 15`,value:500},{label:`iPhone 14`,value:380},{label:`iPhone 13`,value:300},{label:`Samsung Galaxy S24 Ultra`,value:620},{label:`Samsung Galaxy S24`,value:420},{label:`MacBook Air M2/M3`,value:700},{label:`MacBook Pro 14`,value:1100},{label:`iPad Pro / Air`,value:450},{label:`Другое устройство`,value:200}],l=[{label:`Как новое — без царапин`,value:1},{label:`Хорошее — мелкие потёртости`,value:.85},{label:`Среднее — заметные следы`,value:.7},{label:`С дефектами — трещины, замены`,value:.45}],u=!1;function d(){let e=document.getElementById(`tradeModel`),t=document.getElementById(`tradeCondition`);return Math.round(Number(e.value)*Number(t.value))}function f(){let e=document.getElementById(`tradeResult`),t=d();e.textContent=t>0?i(t,`USD`):`—`}function p(){let e=document.getElementById(`trade`);e.innerHTML=`
    <div class="shell">
      <nav class="crumbs" aria-label="Хлебные крошки">
        <a href="index.html">Главная</a><span>/</span><span>Trade-in</span>
      </nav>
    </div>

    <section class="section section--alt">
      <div class="shell">
        <div class="section__head">
          <span class="section__eyebrow">Trade-in</span>
          <h1 class="section__title">Старое устройство — в счёт нового.</h1>
        </div>

        <div class="tradebox">
          <label class="tradefield">
            <span>Устройство</span>
            <select class="catalog__sort" id="tradeModel">
              ${c.map(e=>`<option value="${e.value}">${e.label}</option>`).join(``)}
            </select>
          </label>
          <label class="tradefield">
            <span>Состояние</span>
            <select class="catalog__sort" id="tradeCondition">
              ${l.map(e=>`<option value="${e.value}">${e.label}</option>`).join(``)}
            </select>
          </label>
          <div class="tradefield">
            <span>Предварительная оценка</span>
            <b class="traderesult" id="tradeResult">—</b>
          </div>
          <button type="button" class="btn btn--lg" id="tradeSend">Отправить заявку</button>
        </div>

        <p class="section__lead">
          Оценка предварительная. Точную сумму называем после диагностики в магазине —
          она может отличаться в обе стороны.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="shell">
        <div class="section__head"><span class="section__eyebrow">Порядок</span><h2 class="section__title">Как это работает.</h2></div>
        <ul class="infolist">
          <li>Выберите модель и состояние — получите ориентир по сумме.</li>
          <li>Принесите устройство в магазин на бесплатную диагностику.</li>
          <li>Получите итоговую оценку и скидку на новую технику.</li>
        </ul>
      </div>
    </section>`,m(),f()}function m(){let e=document.getElementById(`tradeModel`),n=document.getElementById(`tradeCondition`);[e,n].forEach(t=>t.addEventListener(`change`,()=>{u=Number(e.value)>0,f()})),document.getElementById(`tradeSend`)?.addEventListener(`click`,()=>{if(!u||!d()){t(`Сначала выберите модель устройства`),e.focus();return}r([`Здравствуйте! Хочу подтвердить предварительную оценку Trade-in:`,`Устройство: ${e.options[e.selectedIndex].text}`,`Состояние: ${n.options[n.selectedIndex].text}`,`Предварительная оценка: ${i(d(),`USD`)}`,``,`Когда можно принести устройство на диагностику?`].join(`
`))})}async function h(){o(),s(),n(),await a(),p(),e(f)}h();