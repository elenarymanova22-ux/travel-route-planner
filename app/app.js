// ============================================================
// МАРШРУТ — Планировщик путешествия
// Все данные и логика приложения
// ============================================================

// ------------------------------------------------------------
// 1. ДАННЫЕ ПОЕЗДКИ
// ------------------------------------------------------------

const TRIP = {
  title: "Лиссабон и океан",
  startDate: "2026-09-12",
  endDate: "2026-09-18",
  totalDays: 7,
  totalBudget: 180000,
};

const ROUTE_STOPS = [
  { name: "Лиссабон",   icon: "plane" },
  { name: "Кашкайш",    icon: "beach" },
  { name: "Синтра",     icon: "castle" },
  { name: "Эрисейра",   icon: "wave" },
  { name: "Океан",      icon: "fish" },
  { name: "Лиссабон",   icon: "home" },
];

const DAY_META = [
  { day: 1, date: "12 сент.", weekday: "сб", city: "Лиссабон" },
  { day: 2, date: "13 сент.", weekday: "вс", city: "Кашкайш" },
  { day: 3, date: "14 сент.", weekday: "пн", city: "Синтра" },
  { day: 4, date: "15 сент.", weekday: "вт", city: "Эрисейра" },
  { day: 5, date: "16 сент.", weekday: "ср", city: "Океан" },
  { day: 6, date: "17 сент.", weekday: "чт", city: "Эрисейра" },
  { day: 7, date: "18 сент.", weekday: "пт", city: "Лиссабон" },
];

// ------------------------------------------------------------
// 2. РАСПИСАНИЕ — два варианта темпа
// ------------------------------------------------------------

const SCHEDULE = {
  calm: [
    {
      day: 1,
      events: [
        { time: "10:00", name: "Прилёт в Лиссабон", category: "transport", cost: 42000, bookingId: "flight" },
        { time: "14:00", name: "Заселение в отель", category: "hotel", cost: 0, bookingId: "hotel" },
        { time: "19:00", name: "Ужин в таверне Алфама", category: "food", cost: 3500, bookingId: null },
      ],
    },
    {
      day: 2,
      events: [
        { time: "11:00", name: "Поезд в Кашкайш", category: "transport", cost: 800, bookingId: "train" },
        { time: "14:00", name: "Прогулка по набережной", category: "activity", cost: 0, bookingId: null },
        { time: "19:00", name: "Ужин на морепродуктах", category: "food", cost: 4000, bookingId: null },
      ],
    },
    {
      day: 3,
      events: [
        { time: "11:00", name: "Экскурсия в Синтру", category: "activity", cost: 3500, bookingId: "excursion" },
        { time: "15:00", name: "Дворец Пена", category: "activity", cost: 1500, bookingId: null },
        { time: "19:00", name: "Возвращение, ужин", category: "food", cost: 3000, bookingId: null },
      ],
    },
    {
      day: 4,
      events: [
        { time: "11:00", name: "Выезд в Эрисейру", category: "transport", cost: 1200, bookingId: null },
        { time: "15:00", name: "Прогулка по old town", category: "activity", cost: 0, bookingId: null },
        { time: "19:00", name: "Закат и ужин", category: "food", cost: 3500, bookingId: null },
      ],
    },
    {
      day: 5,
      events: [
        { time: "10:00", name: "Пляж Прайя де Мантеигаша", category: "activity", cost: 0, bookingId: null },
        { time: "14:00", name: "Обед на пляже", category: "food", cost: 2500, bookingId: null },
        { time: "19:00", name: "Ужин в рыбацкой деревне", category: "food", cost: 3500, bookingId: null },
      ],
    },
    {
      day: 6,
      events: [
        { time: "12:00", name: "Возвращение в Лиссабон", category: "transport", cost: 1200, bookingId: null },
        { time: "15:00", name: "Лижейрош + пастéis de nata", category: "activity", cost: 800, bookingId: null },
        { time: "19:00", name: "Прощальный ужин + фадо", category: "food", cost: 5500, bookingId: null },
      ],
    },
    {
      day: 7,
      events: [
        { time: "10:00", name: "Выезд в аэропорт", category: "transport", cost: 2000, bookingId: null },
        { time: "13:00", name: "Вылет в Москву", category: "transport", cost: 0, bookingId: "flight" },
      ],
    },
  ],

  packed: [
    {
      day: 1,
      events: [
        { time: "08:00", name: "Прилёт в Лиссабон", category: "transport", cost: 42000, bookingId: "flight" },
        { time: "11:00", name: "Заселение в отель", category: "hotel", cost: 0, bookingId: "hotel" },
        { time: "13:00", name: "Тур по Белему", category: "activity", cost: 2500, bookingId: "excursion" },
        { time: "16:00", name: "Монастырь Жеронимуш", category: "activity", cost: 1200, bookingId: null },
        { time: "19:30", name: "Ужин + фадо-шоу", category: "food", cost: 5000, bookingId: null },
      ],
    },
    {
      day: 2,
      events: [
        { time: "09:00", name: "Поезд в Кашкайш", category: "transport", cost: 800, bookingId: "train" },
        { time: "11:00", name: "Музей моря", category: "activity", cost: 900, bookingId: null },
        { time: "14:00", name: "Обед у марини", category: "food", cost: 3500, bookingId: null },
        { time: "16:00", name: "Пляж Гуиниш", category: "activity", cost: 0, bookingId: null },
        { time: "20:00", name: "Ужин в Байрру", category: "food", cost: 4000, bookingId: null },
      ],
    },
    {
      day: 3,
      events: [
        { time: "08:30", name: "Экскурсия в Синтру", category: "activity", cost: 3500, bookingId: "excursion" },
        { time: "11:00", name: "Дворец Пена", category: "activity", cost: 1500, bookingId: null },
        { time: "14:00", name: "Обед в Синтре", category: "food", cost: 2500, bookingId: null },
        { time: "16:00", name: "Конфессионалы + сады", category: "activity", cost: 700, bookingId: null },
        { time: "20:00", name: "Ужин с видом", category: "food", cost: 4500, bookingId: null },
      ],
    },
    {
      day: 4,
      events: [
        { time: "09:00", name: "Выезд в Эрисейру", category: "transport", cost: 1200, bookingId: null },
        { time: "11:00", name: "Сёрф на Фоз ду Лижрейру", category: "activity", cost: 4000, bookingId: null },
        { time: "14:00", name: "Обед на побережье", category: "food", cost: 3000, bookingId: null },
        { time: "16:00", name: "Смотровая площадка", category: "activity", cost: 0, bookingId: null },
        { time: "19:30", name: "Закат + ужин", category: "food", cost: 3500, bookingId: null },
      ],
    },
    {
      day: 5,
      events: [
        { time: "08:00", name: "Пляж Прайя де Мантеигаша", category: "activity", cost: 0, bookingId: null },
        { time: "11:00", name: "Хайкинг по южному берегу", category: "activity", cost: 0, bookingId: null },
        { time: "14:00", name: "Обед в Пение", category: "food", cost: 3000, bookingId: null },
        { time: "16:00", name: "Маяк Кабу да Рока", category: "activity", cost: 0, bookingId: null },
        { time: "20:00", name: "Ужин в шефском ресторане", category: "food", cost: 7000, bookingId: null },
      ],
    },
    {
      day: 6,
      events: [
        { time: "09:30", name: "Музей Карра vat тiв", category: "activity", cost: 1000, bookingId: null },
        { time: "12:00", name: "Лижейрош + пастis", category: "activity", cost: 800, bookingId: null },
        { time: "14:00", name: "Обед на Руа-Аугуста", category: "food", cost: 3000, bookingId: null },
        { time: "17:00", name: "Музей подземных стоков", category: "activity", cost: 1200, bookingId: null },
        { time: "20:00", name: "Прощальный ужин + фадо", category: "food", cost: 6000, bookingId: null },
      ],
    },
    {
      day: 7,
      events: [
        { time: "08:00", name: "Прогулка по Маркет-Тайм", category: "activity", cost: 500, bookingId: null },
        { time: "10:00", name: "Выезд в аэропорт", category: "transport", cost: 2000, bookingId: null },
        { time: "13:00", name: "Вылет в Москву", category: "transport", cost: 0, bookingId: "flight" },
      ],
    },
  ],
};

// ------------------------------------------------------------
// 3. КАТЕГОРИИ РАСХОДОВ
// ------------------------------------------------------------

const EXPENSE_CATEGORIES = [
  { key: "transport", label: "Транспорт", color: "var(--color-purple)" },
  { key: "hotel",     label: "Отель",     color: "var(--color-blue)" },
  { key: "food",      label: "Еда",       color: "var(--color-coral)" },
  { key: "activity",  label: "Активности", color: "var(--color-teal)" },
];

const CATEGORY_LABELS = {
  transport: "Транспорт",
  hotel: "Жильё",
  food: "Еда",
  activity: "Активности",
};

const CATEGORY_ICONS = {
  transport: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 10l5-8 5 8M7 2v0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 10h8l-1 4H4L3 10z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  hotel: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="6" width="12" height="8" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M5 6V4a3 3 0 016 0v2" stroke="currentColor" stroke-width="1.5"/></svg>`,
  food: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 2v5c0 2 2 3 5 3s5-1 5-3V2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="8" y1="10" x2="8" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  activity: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5"/><path d="M8 4v4l3 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

// ------------------------------------------------------------
// 4. БРОНИРОВАНИЯ
// ------------------------------------------------------------

const BOOKINGS_DEFAULT = [
  {
    id: "flight",
    type: "flight",
    title: "Перелёт Москва — Лиссабон",
    detail: "Аэрофлот · 12 сентября · 3ч 40мин",
    status: "confirmed",
  },
  {
    id: "hotel",
    type: "hotel",
    title: "Hotel Lisboa Carmo",
    detail: "12–18 сентября · 6 ночей · центр",
    status: "confirmed",
  },
  {
    id: "train",
    type: "train",
    title: "Поезд Лиссабон — Кашкайш",
    detail: "13 сентября · 40 мин ·往返",
    status: "pending",
  },
  {
    id: "excursion",
    type: "excursion",
    title: "Экскурсия «Сказочная Синтра»",
    detail: "14 сентября · 5 часов · группа",
    status: "pending",
  },
];

const BOOKING_ICONS = {
  flight: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/></svg>`,
  hotel: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="9" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2"/><path d="M7 9V7a5 5 0 0110 0v2" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="15" r="2" stroke="currentColor" stroke-width="2"/></svg>`,
  train: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="5" y="3" width="14" height="15" rx="3" stroke="currentColor" stroke-width="2"/><path d="M5 12h14" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="20" r="1.5" fill="currentColor"/><circle cx="15.5" cy="20" r="1.5" fill="currentColor"/><path d="M8 21.5l-2 2M16 21.5l2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  excursion: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 3c-3 4-3 8 0 12s3 6 0 9M12 3c3 4 3 8 0 12s-3 6 0 9" stroke="currentColor" stroke-width="1.5"/><path d="M3 12h18" stroke="currentColor" stroke-width="1.5"/></svg>`,
};

// ------------------------------------------------------------
// 5. ЧЕК-ЛИСТ
// ------------------------------------------------------------

const CHECKLIST_DEFAULT = [
  { id: "c1",  category: "documents", text: "Загранпаспорт", checked: false },
  { id: "c2",  category: "documents", text: "Билеты на самолёт", checked: false },
  { id: "c3",  category: "documents", text: "Бронирование отеля", checked: false },
  { id: "c4",  category: "documents", text: "Страховка", checked: false },
  { id: "c5",  category: "money", text: "Наличные евро", checked: false },
  { id: "c6",  category: "money", text: "Банковская карта", checked: false },
  { id: "c7",  category: "money", text: "Карта Renfe / CP", checked: false },
  { id: "c8",  category: "things", text: "Зарядка для телефона", checked: false },
  { id: "c9",  category: "things", text: "Солнцезащитный крем", checked: false },
  { id: "c10", category: "things", text: "Удобная обувь", checked: false },
  { id: "c11", category: "things", text: "Плавки / полотенце", checked: false },
  { id: "c12", category: "health", text: "Аптечка", checked: false },
  { id: "c13", category: "health", text: "Таблетки от солнца", checked: false },
  { id: "c14", category: "health", text: "Средство от комаров", checked: false },
];

const CHECKLIST_CATEGORIES = [
  { key: "documents", label: "Документы", icon: "passport" },
  { key: "money",     label: "Деньги",    icon: "wallet" },
  { key: "things",    label: "Вещи",       icon: "bag" },
  { key: "health",    label: "Здоровье",   icon: "health" },
];

// ------------------------------------------------------------
// 6. СОСТОЯНИЕ ПРИЛОЖЕНИЯ
// ------------------------------------------------------------

let state = {
  currentDay: 0,          // индекс 0–6
  currentPace: "calm",    // "calm" | "packed"
  bookings: [],           // копия бронирований
  checklist: [],          // копия чек-листа
  uiState: "success",     // "loading" | "error" | "empty" | "success"
};

// ------------------------------------------------------------
// 7. УТИЛИТЫ
// ------------------------------------------------------------

function loadState() {
  try {
    const bookings = localStorage.getItem("route_bookings");
    const checklist = localStorage.getItem("route_checklist");
    state.bookings = bookings ? JSON.parse(bookings) : JSON.parse(JSON.stringify(BOOKINGS_DEFAULT));
    state.checklist = checklist ? JSON.parse(checklist) : JSON.parse(JSON.stringify(CHECKLIST_DEFAULT));
  } catch (e) {
    state.bookings = JSON.parse(JSON.stringify(BOOKINGS_DEFAULT));
    state.checklist = JSON.parse(JSON.stringify(CHECKLIST_DEFAULT));
  }
}

function saveBookings() {
  localStorage.setItem("route_bookings", JSON.stringify(state.bookings));
}

function saveChecklist() {
  localStorage.setItem("route_checklist", JSON.stringify(state.checklist));
}

function formatNumber(n) {
  return n.toLocaleString("ru-RU");
}

function pluralizeDays(n) {
  const lastTwo = n % 100;
  const lastOne = n % 10;
  if (lastTwo >= 11 && lastTwo <= 19) return "дней";
  if (lastOne === 1) return "день";
  if (lastOne >= 2 && lastOne <= 4) return "дня";
  return "дней";
}

function pluralizeHours(n) {
  const lastTwo = n % 100;
  const lastOne = n % 10;
  if (lastTwo >= 11 && lastTwo <= 19) return "часов";
  if (lastOne === 1) return "час";
  if (lastOne >= 2 && lastOne <= 4) return "часа";
  return "часов";
}

function pluralizeMinutes(n) {
  const lastTwo = n % 100;
  const lastOne = n % 10;
  if (lastTwo >= 11 && lastTwo <= 19) return "минут";
  if (lastOne === 1) return "минута";
  if (lastOne >= 2 && lastOne <= 4) return "минуты";
  return "минут";
}

// ------------------------------------------------------------
// 8. ОБРАТНЫЙ ОТСЧЁТ
// ------------------------------------------------------------

let countdownInterval = null;

function startCountdown() {
  function update() {
    const now = new Date();
    const target = new Date(TRIP.startDate + "T00:00:00");
    const diff = target - now;

    const el = document.getElementById("countdown");
    if (!el) return;

    if (diff <= 0) {
      el.textContent = "Путешествие началось!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    el.textContent = `До отъезда: ${days} ${pluralizeDays(days)} ${hours} ${pluralizeHours(hours)} ${minutes} ${pluralizeMinutes(minutes)}`;
  }

  update();
  countdownInterval = setInterval(update, 60000);
}

// ------------------------------------------------------------
// 9. РЕНДЕР ОБЛОЖКИ (маршрутная линия)
// ------------------------------------------------------------

function renderRouteLine() {
  const container = document.getElementById("route-line");
  if (!container) return;

  const stops = ROUTE_STOPS;
  const dotsCount = stops.length;

  let html = `<svg class="hero__route-svg" viewBox="0 0 ${dotsCount * 120} 80" xmlns="http://www.w3.org/2000/svg">`;

  // Линия
  const lineY = 40;
  html += `<path d="M 60 ${lineY}`;
  for (let i = 1; i < dotsCount; i++) {
    const x = 60 + i * 120;
    const cy = i % 2 === 0 ? lineY - 10 : lineY + 10;
    const cx = 60 + (i - 0.5) * 120;
    html += ` Q ${cx} ${cy} ${x} ${lineY}`;
  }
  html += `" stroke="var(--color-purple-light)" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.6"/>`;

  // Точки
  for (let i = 0; i < dotsCount; i++) {
    const x = 60 + i * 120;
    const r = i === 0 || i === dotsCount - 1 ? 8 : 6;
    const fill = i === 0 || i === dotsCount - 1 ? "var(--color-purple)" : "var(--color-purple-light)";
    html += `<circle cx="${x}" cy="${lineY}" r="${r}" fill="${fill}" />`;

    // Название
    const labelY = i % 2 === 0 ? lineY - 20 : lineY + 24;
    html += `<text x="${x}" y="${labelY}" text-anchor="middle" fill="var(--color-text-secondary)" font-size="11" font-family="var(--font-family)">${stops[i].name}</text>`;
  }

  html += `</svg>`;
  container.innerHTML = html;
}

// ------------------------------------------------------------
// 10. РЕНДЕР МАРШРУТА
// ------------------------------------------------------------

function renderDayButtons() {
  const container = document.getElementById("day-buttons");
  if (!container) return;

  let html = "";
  for (let i = 0; i < TRIP.totalDays; i++) {
    const meta = DAY_META[i];
    const active = i === state.currentDay;
    const classes = active ? " day-btn--active" : "";
    const ariaSelected = active ? "true" : "false";
    html += `<button class="day-btn${classes}" data-day="${i}" type="button" role="tab" aria-selected="${ariaSelected}">
      <span class="day-btn__num">${meta.day}</span>
      <span class="day-btn__date">${meta.date}</span>
    </button>`;
  }
  container.innerHTML = html;
}

function renderEvents() {
  const container = document.getElementById("events-list");
  if (!container) return;

  const schedule = SCHEDULE[state.currentPace];
  const dayData = schedule[state.currentDay];
  const meta = DAY_META[state.currentDay];

  if (!dayData || dayData.events.length === 0) {
    container.innerHTML = `
      <div class="empty-day">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" stroke="var(--color-border)" stroke-width="2" stroke-dasharray="4 4"/><path d="M18 28c1 2 3 3 6 3s5-1 6-3" stroke="var(--color-text-muted)" stroke-width="2" stroke-linecap="round"/><circle cx="18" cy="20" r="2" fill="var(--color-text-muted)"/><circle cx="30" cy="20" r="2" fill="var(--color-text-muted)"/></svg>
        <p>На этот день событий нет</p>
      </div>`;
    return;
  }

  // Стоимость дня
  let dayCost = 0;
  for (const ev of dayData.events) {
    dayCost += ev.cost;
  }

  let html = `
    <div class="events-header">
      <div class="events-header__left">
        <h2 class="events-header__city">${meta.city}</h2>
        <span class="events-header__date">${meta.date}, ${meta.weekday}</span>
      </div>
      <div class="events-header__right">
        <span class="events-header__count">${dayData.events.length} ${dayData.events.length === 1 ? "событие" : dayData.events.length < 5 ? "события" : "событий"}</span>
        ${dayCost > 0 ? `<span class="events-header__cost">${formatNumber(dayCost)} ₽</span>` : ""}
      </div>
    </div>`;

  for (const ev of dayData.events) {
    const categoryColor = getCategoryColor(ev.category);
    html += `
      <article class="event-card">
        <div class="event-card__time">${ev.time}</div>
        <div class="event-card__body">
          <h3 class="event-card__name">${ev.name}</h3>
          <div class="event-card__meta">
            <span class="event-card__category" style="--cat-color: ${categoryColor}">
              <span class="event-card__cat-icon">${CATEGORY_ICONS[ev.category] || ""}</span>
              ${CATEGORY_LABELS[ev.category] || ev.category}
            </span>
            ${ev.cost > 0 ? `<span class="event-card__cost">${formatNumber(ev.cost)} ₽</span>` : ""}
          </div>
          ${ev.bookingId ? renderBookingBadge(ev.bookingId) : ""}
        </div>
      </article>`;
  }

  container.innerHTML = html;
}

function renderBookingBadge(bookingId) {
  const booking = state.bookings.find((b) => b.id === bookingId);
  if (!booking) return "";

  const statusClass = booking.status === "confirmed" ? "badge--confirmed" : "badge--pending";
  const statusText = booking.status === "confirmed" ? "Подтверждено" : "Ожидает";

  return `<span class="event-card__badge ${statusClass}">${statusText}</span>`;
}

function getCategoryColor(category) {
  const map = {
    transport: "var(--color-purple)",
    hotel: "var(--color-blue)",
    food: "var(--color-coral)",
    activity: "var(--color-teal)",
  };
  return map[category] || "var(--color-text-muted)";
}

// ------------------------------------------------------------
// 11. ПЕРЕКЛЮЧЕНИЕ ДНЯ
// ------------------------------------------------------------

function selectDay(index) {
  state.currentDay = index;
  renderDayButtons();
  renderEvents();
}

// ------------------------------------------------------------
// 12. ПЕРЕКЛЮЧЕНИЕ ТЕМПА
// ------------------------------------------------------------

function togglePace(pace) {
  state.currentPace = pace;
  renderPaceToggle();
  renderEvents();
  renderBudget();
}

function renderPaceToggle() {
  const calmBtn = document.getElementById("pace-calm");
  const packedBtn = document.getElementById("pace-packed");
  if (!calmBtn || !packedBtn) return;

  calmBtn.classList.toggle("pace-btn--active", state.currentPace === "calm");
  packedBtn.classList.toggle("pace-btn--active", state.currentPace === "packed");

  // Подсказка
  const hint = document.getElementById("pace-hint");
  if (hint) {
    hint.textContent = state.currentPace === "calm"
      ? "Мягкий ритм — больше времени на прогулки и отдых"
      : "Максимум впечатлений — каждый день наполнен";
  }
}

// ------------------------------------------------------------
// 13. БЮДЖЕТ
// ------------------------------------------------------------

function calculateBudget() {
  const schedule = SCHEDULE[state.currentPace];
  let planned = 0;

  for (const day of schedule) {
    for (const ev of day.events) {
      planned += ev.cost;
    }
  }

  const remaining = TRIP.totalBudget - planned;

  // По категориям
  const byCategory = {};
  for (const cat of EXPENSE_CATEGORIES) {
    byCategory[cat.key] = 0;
  }

  for (const day of schedule) {
    for (const ev of day.events) {
      if (byCategory[ev.category] !== undefined) {
        byCategory[ev.category] += ev.cost;
      }
    }
  }

  return { total: TRIP.totalBudget, planned, remaining, byCategory };
}

function renderBudget() {
  const budget = calculateBudget();
  const percent = Math.min((budget.planned / budget.total) * 100, 100);

  // Кольцо
  const ringContainer = document.getElementById("budget-ring");
  if (ringContainer) {
    const radius = 58;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    ringContainer.innerHTML = `
      <svg class="budget-ring__svg" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r="${radius}" fill="none" stroke="var(--color-border)" stroke-width="10" />
        <circle cx="70" cy="70" r="${radius}" fill="none" stroke="var(--color-purple)" stroke-width="10"
          stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
          stroke-linecap="round" transform="rotate(-90 70 70)" class="budget-ring__progress" />
      </svg>
      <div class="budget-ring__text">
        <span class="budget-ring__percent">${Math.round(percent)}%</span>
        <span class="budget-ring__label">запланировано</span>
      </div>`;
  }

  // Суммы
  const summaryEl = document.getElementById("budget-summary");
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div class="budget-summary__row">
        <span class="budget-summary__label">Бюджет</span>
        <span class="budget-summary__value budget-summary__value--total">${formatNumber(budget.total)} ₽</span>
      </div>
      <div class="budget-summary__row">
        <span class="budget-summary__label">Запланировано</span>
        <span class="budget-summary__value">${formatNumber(budget.planned)} ₽</span>
      </div>
      <div class="budget-summary__row">
        <span class="budget-summary__label">Остаток</span>
        <span class="budget-summary__value ${budget.remaining < 0 ? "budget-summary__value--negative" : "budget-summary__value--positive"}">${formatNumber(budget.remaining)} ₽</span>
      </div>`;
  }

  // Категории
  const catEl = document.getElementById("budget-categories");
  if (catEl) {
    let html = "";
    for (const cat of EXPENSE_CATEGORIES) {
      const amount = budget.byCategory[cat.key] || 0;
      const catPercent = budget.planned > 0 ? (amount / budget.planned) * 100 : 0;
      html += `
        <div class="budget-cat">
          <div class="budget-cat__header">
            <span class="budget-cat__dot" style="background:${cat.color}"></span>
            <span class="budget-cat__label">${cat.label}</span>
            <span class="budget-cat__amount">${formatNumber(amount)} ₽</span>
          </div>
          <div class="budget-cat__bar">
            <div class="budget-cat__fill" style="width:${catPercent}%;background:${cat.color}"></div>
          </div>
        </div>`;
    }
    catEl.innerHTML = html;
  }
}

// ------------------------------------------------------------
// 14. БРОНИРОВАНИЯ
// ------------------------------------------------------------

function renderBookings() {
  const container = document.getElementById("bookings-grid");
  if (!container) return;

  const confirmed = state.bookings.filter((b) => b.status === "confirmed").length;
  const total = state.bookings.length;

  let html = `<div class="bookings-counter">
    <span class="bookings-counter__num">${confirmed}</span>
    <span class="bookings-counter__sep">/</span>
    <span class="bookings-counter__total">${total}</span>
    <span class="bookings-counter__label">подтверждено</span>
  </div>`;

  for (const b of state.bookings) {
    const isConfirmed = b.status === "confirmed";
    html += `
      <article class="booking-card" data-booking-id="${b.id}">
        <div class="booking-card__icon booking-card__icon--${b.type}">
          ${BOOKING_ICONS[b.type] || ""}
        </div>
        <div class="booking-card__body">
          <h3 class="booking-card__title">${b.title}</h3>
          <p class="booking-card__detail">${b.detail}</p>
        </div>
        <div class="booking-card__footer">
          <span class="booking-status ${isConfirmed ? "booking-status--confirmed" : "booking-status--pending"}">
            ${isConfirmed ? "Подтверждено" : "Ожидает"}
          </span>
          ${!isConfirmed ? `<button class="booking-card__btn" data-confirm="${b.id}" type="button">Подтвердить</button>` : ""}
        </div>
      </article>`;
  }

  container.innerHTML = html;
}

function confirmBooking(bookingId) {
  const booking = state.bookings.find((b) => b.id === bookingId);
  if (!booking || booking.status === "confirmed") return;

  booking.status = "confirmed";
  saveBookings();
  renderBookings();
  renderEvents();
  showToast("Бронирование подтверждено");
}

// ------------------------------------------------------------
// 15. ЧЕК-ЛИСТ
// ------------------------------------------------------------

function renderChecklist() {
  const container = document.getElementById("checklist-grid");
  if (!container) return;

  const totalItems = state.checklist.length;
  const checkedItems = state.checklist.filter((i) => i.checked).length;
  const progressPercent = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  let html = `
    <div class="checklist-progress">
      <div class="checklist-progress__header">
        <span class="checklist-progress__label">Общий прогресс</span>
        <span class="checklist-progress__value">${checkedItems} из ${totalItems} · ${progressPercent}%</span>
      </div>
      <div class="checklist-progress__bar">
        <div class="checklist-progress__fill" style="width:${progressPercent}%"></div>
      </div>
    </div>`;

  for (const cat of CHECKLIST_CATEGORIES) {
    const items = state.checklist.filter((item) => item.category === cat.key);
    const checkedCount = items.filter((i) => i.checked).length;

    html += `
      <div class="checklist-category">
        <div class="checklist-category__header">
          <h3 class="checklist-category__title">${cat.label}</h3>
          <span class="checklist-category__count">${checkedCount}/${items.length}</span>
        </div>
        <ul class="checklist-category__list">`;

    for (const item of items) {
      html += `
          <li class="checklist-item">
            <label class="checklist-item__label">
              <input type="checkbox" class="checklist-item__input"
                data-checklist-id="${item.id}"
                ${item.checked ? "checked" : ""} />
              <span class="checklist-item__checkbox"></span>
              <span class="checklist-item__text">${item.text}</span>
            </label>
          </li>`;
    }

    html += `</ul></div>`;
  }

  container.innerHTML = html;
}

function toggleChecklistItem(itemId) {
  const item = state.checklist.find((c) => c.id === itemId);
  if (!item) return;
  item.checked = !item.checked;
  saveChecklist();
  renderChecklist();
}

// ------------------------------------------------------------
// 16. СБРОС ДАННЫХ
// ------------------------------------------------------------

function resetData() {
  localStorage.removeItem("route_bookings");
  localStorage.removeItem("route_checklist");
  state.bookings = JSON.parse(JSON.stringify(BOOKINGS_DEFAULT));
  state.checklist = JSON.parse(JSON.stringify(CHECKLIST_DEFAULT));
  state.currentDay = 0;
  state.currentPace = "calm";
  renderAll();
  showToast("Данные сброшены");
}

// ------------------------------------------------------------
// 16a. ВКЛАДКИ И КОМПАКТНЫЙ ВИД «СЕГОДНЯ»
// ------------------------------------------------------------

let activeTab = "today";

function setActiveTab(tab) {
  activeTab = tab;

  document.querySelectorAll(".mobile-nav__btn").forEach((btn) => {
    btn.classList.toggle("mobile-nav__btn--active", btn.dataset.tab === tab);
  });

  applyTabVisibility();
  if (tab === "today") renderTodayView();
}

function applyTabVisibility() {
  const isMobile = window.matchMedia("(max-width: 600px)").matches;
  document.querySelectorAll("[data-tab-content]").forEach((el) => {
    if (!isMobile) {
      el.style.display = "";
      return;
    }
    const tab = el.getAttribute("data-tab-content");
    el.style.display = tab === activeTab ? "" : "none";
  });
}

function renderTodayView() {
  const container = document.getElementById("today-view");
  if (!container) return;

  const meta = DAY_META[state.currentDay];
  const schedule = SCHEDULE[state.currentPace];
  const dayData = schedule[state.currentDay];

  let nextEvent = null;
  if (dayData && dayData.events.length > 0) {
    nextEvent = dayData.events[0];
    for (const ev of dayData.events) {
      const now = new Date();
      const [h, m] = ev.time.split(":").map(Number);
      const evTime = new Date();
      evTime.setHours(h, m, 0, 0);
      if (evTime >= now) { nextEvent = ev; break; }
    }
  }

  const nextCheck = state.checklist.find((c) => !c.checked);

  const confirmed = state.bookings.filter((b) => b.status === "confirmed").length;
  const total = state.bookings.length;

  let html = `
    <div class="today-card">
      <div class="today-card__header">
        <span class="today-card__day-label">День ${meta.day}</span>
        <span class="today-card__date">${meta.date}, ${meta.weekday}</span>
      </div>
      <div class="today-card__city">${meta.city}</div>

      <div class="today-card__divider"></div>

      <div class="today-card__section">
        <div class="today-card__section-label">Ближайшее событие</div>
        ${nextEvent ? `
          <div class="today-card__event">
            <span class="today-card__event-time">${nextEvent.time}</span>
            <div class="today-card__event-body">
              <span class="today-card__event-name">${nextEvent.name}</span>
              ${nextEvent.bookingId ? renderTodayBookingBadge(nextEvent.bookingId) : ""}
            </div>
          </div>
        ` : `<div class="today-card__empty">Событий на сегодня нет</div>`}
      </div>

      <div class="today-card__divider"></div>

      <div class="today-card__section">
        <div class="today-card__section-label">Бронирования</div>
        <div class="today-card__bookings">
          <span class="today-card__bookings-num">${confirmed}/${total}</span>
          <span class="today-card__bookings-label">подтверждено</span>
        </div>
      </div>

      <div class="today-card__divider"></div>

      <div class="today-card__section">
        <div class="today-card__section-label">Следующая задача</div>
        ${nextCheck ? `
          <div class="today-card__check">
            <span class="today-card__check-dot"></span>
            <span class="today-card__check-text">${nextCheck.text}</span>
          </div>
        ` : `<div class="today-card__empty">Все задачи выполнены!</div>`}
      </div>
    </div>`;

  container.innerHTML = html;
}

function renderTodayBookingBadge(bookingId) {
  const booking = state.bookings.find((b) => b.id === bookingId);
  if (!booking) return "";
  const cls = booking.status === "confirmed" ? "today-badge--confirmed" : "today-badge--pending";
  const txt = booking.status === "confirmed" ? "Подтв." : "Ожидает";
  return `<span class="today-badge ${cls}">${txt}</span>`;
}

// ------------------------------------------------------------
// 17. UI-СОСТОЯНИЯ
// ------------------------------------------------------------

function setUIState(newState) {
  state.uiState = newState;
  const main = document.getElementById("app-main");
  if (main) {
    main.setAttribute("data-state", newState);
  }
  updateDemoPanelActive(newState);
}

function updateDemoPanelActive(stateName) {
  document.querySelectorAll(".demo-panel__btn").forEach((btn) => {
    btn.classList.toggle("demo-panel__btn--active", btn.dataset.demo === stateName);
  });
}

function renderSkeleton() {
  const container = document.getElementById("content-loading");
  if (!container) return;

  let html = `
    <div class="skeleton-section">
      <div class="skeleton-block skeleton-block--pace">
        <div class="skeleton-line skeleton-line--label"></div>
        <div class="skeleton-row">
          <div class="skeleton-pill"></div>
          <div class="skeleton-pill"></div>
        </div>
      </div>
    </div>
    <div class="skeleton-section">
      <div class="skeleton-block skeleton-block--days">
        <div class="skeleton-row">
          <div class="skeleton-day"></div>
          <div class="skeleton-day"></div>
          <div class="skeleton-day"></div>
          <div class="skeleton-day"></div>
          <div class="skeleton-day"></div>
        </div>
      </div>
    </div>`;

  for (let i = 0; i < 3; i++) {
    html += `
      <div class="skeleton-section">
        <div class="skeleton-card">
          <div class="skeleton-card__top">
            <div class="skeleton-line skeleton-line--time"></div>
            <div class="skeleton-line skeleton-line--badge"></div>
          </div>
          <div class="skeleton-line skeleton-line--title"></div>
          <div class="skeleton-line skeleton-line--short"></div>
        </div>
      </div>`;
  }

  html += `
    <div class="skeleton-section">
      <div class="skeleton-block skeleton-block--budget">
        <div class="skeleton-ring"></div>
        <div class="skeleton-lines">
          <div class="skeleton-line skeleton-line--row"></div>
          <div class="skeleton-line skeleton-line--row"></div>
          <div class="skeleton-line skeleton-line--row"></div>
        </div>
      </div>
    </div>`;

  container.innerHTML = html;
}

// Имитация загрузки с последующим переходом в success
function simulateLoading(callback) {
  setUIState("loading");
  renderSkeleton();
  setTimeout(() => {
    setUIState("success");
    if (callback) callback();
  }, 1500);
}

// ------------------------------------------------------------
// 18. ТОСТЫ
// ------------------------------------------------------------

let toastTimeout = null;

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("toast--visible");

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("toast--visible");
  }, 3000);
}

// ------------------------------------------------------------
// 19. РЕНДЕР ВСЕГО
// ------------------------------------------------------------

function renderAll() {
  renderRouteLine();
  renderDayButtons();
  renderEvents();
  renderPaceToggle();
  renderBudget();
  renderBookings();
  renderChecklist();
  renderTodayView();
  renderSkeleton();
  startCountdown();
  applyTabVisibility();
}

// ------------------------------------------------------------
// 20. ИНИЦИАЛИЗАЦИЯ
// ------------------------------------------------------------

function initApp() {
  loadState();
  renderAll();
  setUIState("success");

  // Делегирование: клики по кнопкам дней
  document.getElementById("day-buttons")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".day-btn");
    if (btn) {
      const dayIndex = parseInt(btn.dataset.day, 10);
      if (!isNaN(dayIndex)) selectDay(dayIndex);
    }
  });

  // Клики по переключателю темпа
  document.getElementById("pace-calm")?.addEventListener("click", () => togglePace("calm"));
  document.getElementById("pace-packed")?.addEventListener("click", () => togglePace("packed"));

  // Клики по подтверждению бронирования
  document.getElementById("bookings-grid")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-confirm]");
    if (btn) confirmBooking(btn.dataset.confirm);
  });

  // Клики по чек-листу
  document.getElementById("checklist-grid")?.addEventListener("change", (e) => {
    if (e.target.matches("[data-checklist-id]")) {
      toggleChecklistItem(e.target.dataset.checklistId);
    }
  });

  // Кнопка сброса
  document.getElementById("btn-reset")?.addEventListener("click", resetData);

  // Кнопка «Повторить» (из состояния error → loading → success)
  document.getElementById("btn-retry")?.addEventListener("click", () => {
    simulateLoading();
  });

  // Кнопка «Вернуться к плану» (из состояния empty → success)
  document.getElementById("btn-back-success")?.addEventListener("click", () => {
    setUIState("success");
  });

  // Мобильная навигация
  document.getElementById("mobile-nav")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".mobile-nav__btn");
    if (btn && btn.dataset.tab) {
      setActiveTab(btn.dataset.tab);
    }
  });

  // Переопределение видимости при ресайзе
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      applyTabVisibility();
      if (activeTab === "today") renderTodayView();
    }, 100);
  });

  // Панель демо состояний
  document.getElementById("demo-panel")?.addEventListener("click", (e) => {
    // Сворачивание/разворачивание
    if (e.target.closest(".demo-panel__toggle")) {
      document.getElementById("demo-panel")?.classList.toggle("demo-panel--open");
      return;
    }
    // Кнопки состояний
    const demoBtn = e.target.closest("[data-demo]");
    if (demoBtn) {
      const demoState = demoBtn.dataset.demo;
      if (demoState === "loading") {
        simulateLoading();
      } else {
        setUIState(demoState);
      }
    }
  });
}

// Запуск
document.addEventListener("DOMContentLoaded", initApp);
