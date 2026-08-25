import"./image-url-DKWqd5-K.js";import{S as e,b as t,h as n,k as r,t as i,x as a}from"./shell-BaAfn-kO.js";var o=[{id:`about`,eyebrow:`О магазине`,title:`Вас приветствует MOSTOVOY.`,lead:`Магазин оригинальной техники в Бишкеке.`,points:[`Только оригинальные устройства — Apple, Samsung, Garmin, Dyson, Meta и другие бренды.`,`Проверяем каждое устройство перед выдачей.`,`Помогаем подобрать модель под задачу, а не продать что подороже.`]},{id:`warranty`,eyebrow:`Гарантия`,title:`Гарантия.`,lead:`Спокойствие после покупки.`,points:[`Официальная гарантия производителя на всю технику.`,`Обмен или возврат в течение 14 дней, если устройство не подошло.`,`Помощь в обращении в сервисный центр.`]},{id:`delivery`,eyebrow:`Доставка`,title:`Доставка и оплата.`,lead:`Быстро и без сюрпризов.`,points:[`Доставка по Бишкеку в день заказа.`,`Отправка по регионам Кыргызстана.`,`Оплата наличными, картой или переводом.`]},{id:`credit`,eyebrow:`Рассрочка`,title:`Рассрочка и кредит.`,lead:`Разбейте покупку на части.`,points:[`Рассрочка на 3, 6 и 12 месяцев.`,`Оформление в магазине — нужен только паспорт.`,`Точные условия подскажем в переписке до покупки.`]},{id:`support`,eyebrow:`Поддержка`,title:`Поддержка.`,lead:`Отвечаем на вопросы до и после покупки.`,points:[`Настроим новое устройство и перенесём данные.`,`Подскажем по аксессуарам и совместимости.`,`Пишите в WhatsApp или Telegram — отвечаем в рабочее время.`]},{id:`contacts`,eyebrow:`Контакты`,title:`Контакты.`,lead:`Пн – Вс, 10:00 – 20:00.`,points:[`г. Бишкек`,`WhatsApp и Telegram — самый быстрый способ связаться.`]}];function s(){let e=document.getElementById(`about`);e.innerHTML=`
    <div class="shell">
      <nav class="crumbs" aria-label="Хлебные крошки">
        <a href="index.html">Главная</a><span>/</span><span>О нас</span>
      </nav>
    </div>
    ${o.map((e,t)=>`<section class="section${t%2==0?` section--alt`:``}" id="${e.id}">
        <div class="shell">
          <div class="section__head">
            <span class="section__eyebrow">${e.eyebrow}</span>
            <h2 class="section__title">${e.title}</h2>
            <p class="section__sub">${e.lead}</p>
          </div>
          <ul class="infolist">${e.points.map(e=>`<li>${e}</li>`).join(``)}</ul>
          ${e.id===`contacts`?`<div class="hero__actions" style="justify-content:flex-start;margin-top:26px">
                  <a class="btn btn--lg" href="${r(`Здравствуйте! У меня вопрос.`)}" target="_blank" rel="noopener">WhatsApp</a>
                  <a class="btn btn--lg btn--ghost" href="https://t.me/${n.contact.telegram}" target="_blank" rel="noopener">Telegram</a>
                </div>`:``}
        </div>
      </section>`).join(``)}`}async function c(){i(),a(),e(),await t(),s(),location.hash&&document.querySelector(location.hash)?.scrollIntoView()}c();