import "./image-url-DKWqd5-K.js";
import {
  S as initCart,
  b as loadCatalog,
  h as store,
  k as whatsappLink,
  t as initShell,
  x as initPageLoader,
} from "./shell-BaAfn-kO.js";

const icons = {
  check: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 4.6 2.7 8.1 7 10 4.3-1.9 7-5.4 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-5"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>`,
  support: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-3"/><path d="M4 13H2v4a2 2 0 0 0 2 2h2v-6H4Zm16 0h2v4a2 2 0 0 1-2 2h-2v-6h2Z"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
};

const services = [
  { id: "warranty", icon: icons.shield, title: "Гарантия", text: "Официальная гарантия производителя на всю технику. Поможем и с обращением в сервисный центр." },
  { id: "delivery", icon: icons.truck, title: "Доставка и оплата", text: "По Бишкеку — в день заказа. По Кыргызстану — отправка в ваш регион. Оплата наличными, картой или переводом." },
  { id: "support", icon: icons.support, title: "Поддержка после покупки", text: "Настроим новое устройство, перенесём данные и подскажем по аксессуарам и совместимости." },
];

function renderAbout() {
  const root = document.getElementById("about");
  const whatsapp = whatsappLink("Здравствуйте! Хочу проконсультироваться по выбору техники.");
  const telegram = `https://t.me/${store.contact.telegram}`;

  root.innerHTML = `
    <div class="shell">
      <nav class="crumbs" aria-label="Хлебные крошки">
        <a href="index.html">Главная</a><span>/</span><span>О нас</span>
      </nav>
    </div>

    <article class="about-page">
      <header class="about-hero" id="about-story">
        <div class="shell about-hero__intro">
          <p class="about-kicker">MOSTOVOY в Бишкеке</p>
          <h1>Техника, которую<br>выбирают спокойно.</h1>
          <p class="about-hero__lead">Мы помогаем найти устройство под вашу задачу — честно объясняем разницу, проверяем перед выдачей и остаёмся на связи после покупки.</p>
          <div class="about-hero__actions">
            <a class="btn btn--lg" href="catalog.html">Выбрать технику</a>
            <a class="about-text-link" href="#contacts">Как нас найти</a>
          </div>
        </div>

        <div class="shell">
          <figure class="about-hero__figure">
            <img src="/images/about-store-hero.webp" alt="Современный магазин техники MOSTOVOY в Бишкеке" width="1774" height="887" fetchpriority="high">
            <figcaption>
              <span class="about-hero__monogram">M</span>
              <span><b>MOSTOVOY</b><small>Бишкек · ЦУМ «Айчурек»</small></span>
            </figcaption>
          </figure>
        </div>
      </header>

      <section class="about-story">
        <div class="shell about-story__grid">
          <div class="about-story__statement"><p>Сначала — ваша задача.<br>Потом — модель.</p></div>
          <div class="about-story__copy">
            <h2>Магазин с человеческим подходом</h2>
            <p>Смартфон для работы, часы для тренировок, ноутбук для большого проекта или подарок близкому — мы начинаем не с цены, а с того, как вы будете пользоваться техникой.</p>
            <p>В MOSTOVOY собраны оригинальные устройства Apple, Samsung, Garmin, Dyson, Meta и других брендов. Можно сравнить варианты вживую, задать сколько угодно вопросов и принять решение без спешки.</p>
          </div>
        </div>
      </section>

      <section class="about-principles" aria-labelledby="principles-title">
        <div class="shell">
          <div class="about-principles__head">
            <h2 id="principles-title">Что для нас важно</h2>
            <p>Покупка заканчивается не у кассы. Она заканчивается тогда, когда новой техникой удобно пользоваться.</p>
          </div>
          <div class="about-principles__list">
            <article><span>${icons.check}</span><h3>Оригинальность</h3><p>Только оригинальные устройства от известных производителей.</p></article>
            <article><span>${icons.check}</span><h3>Проверка</h3><p>Проверяем устройство и комплектацию вместе с вами перед выдачей.</p></article>
            <article><span>${icons.check}</span><h3>Понятный выбор</h3><p>Объясняем разницу между моделями простыми словами — без давления.</p></article>
            <article><span>${icons.check}</span><h3>Связь после покупки</h3><p>Помогаем с настройкой, переносом данных и вопросами по устройству.</p></article>
          </div>
        </div>
      </section>

      <section class="about-services" aria-labelledby="services-title">
        <div class="shell about-services__layout">
          <div class="about-services__intro">
            <h2 id="services-title">Всё необходимое — в одном месте</h2>
            <p>От выбора до первого включения.</p>
            <a class="about-text-link" href="trade.html">Узнать о Trade-in</a>
          </div>
          <div class="about-services__items">
            ${services.map((service) => `<article class="about-service" id="${service.id}"><div class="about-service__icon">${service.icon}</div><div><h3>${service.title}</h3><p>${service.text}</p></div></article>`).join("")}
          </div>
        </div>
      </section>

      <section class="about-contact" id="contacts">
        <div class="shell about-contact__grid">
          <div class="about-contact__copy">
            <p class="about-kicker">Приходите в гости</p>
            <h2>Посмотрите, сравните, выберите своё.</h2>
            <p>Мы открыты каждый день с 10:00 до 20:00.</p>
            <div class="about-contact__actions">
              <a class="btn btn--lg" href="${whatsapp}" target="_blank" rel="noopener">Написать в WhatsApp</a>
              <a class="about-contact__telegram" href="${telegram}" target="_blank" rel="noopener">Telegram</a>
            </div>
          </div>
          <a class="about-address" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("ЦУМ Айчурек, проспект Чуй 155, Бишкек")}" target="_blank" rel="noopener">
            <span class="about-address__icon">${icons.pin}</span>
            <span><small>Наш адрес</small><b>ТЦ ЦУМ «Айчурек»</b><em>просп. Чуй, 155 · 1 этаж · отдел D14</em><strong>Открыть на карте</strong></span>
          </a>
        </div>
      </section>
    </article>`;
}

async function init() {
  initShell();
  document.querySelectorAll('a[href="about.html#credit"]').forEach((link) => link.remove());
  initPageLoader();
  initCart();
  await loadCatalog();
  renderAbout();
  if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
}

init();
