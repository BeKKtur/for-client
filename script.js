/* =========================================================
   ✏️ НАСТРОЙКИ ШАБЛОНА
   Здесь можно менять имя, тексты и цвета.
========================================================= */

const config = {
  name: "Имя девушки",

  texts: {
    heroText:
      "Иногда человеку хочется сказать намного больше, чем получается обычным сообщением. Поэтому я решил оставить эти слова здесь.",

    date: "для тебя",

    message1:
      "Я не знаю, каким будет этот день, когда ты откроешь эту страницу. Но я точно знаю одно — ты заслуживаешь услышать хорошие слова.",

    message2:
      "Мне нравится в тебе то, что невозможно описать одним предложением. Твоя улыбка, твой характер, твои реакции, твои маленькие привычки — всё это делает тебя именно тобой.",

    message3:
      "И если сегодня тебе вдруг станет грустно, просто вспомни: где-то есть человек, который считает тебя невероятной.",

    signature: "С любовью",
    from: "от меня ♡",

    reason1Title: "Потому что с тобой спокойно",
    reason1Text:
      "Есть люди, рядом с которыми не нужно ничего изображать. Просто быть собой — и этого достаточно.",

    reason2Title: "Потому что ты особенная",
    reason2Text:
      "Не потому что идеальная, а потому что настоящая. Именно это и хочется ценить.",

    reason3Title: "Потому что ты умеешь улыбать",
    reason3Text:
      "Иногда одного твоего сообщения достаточно, чтобы обычный день стал намного приятнее.",

    reason4Title: "Потому что ты — это ты",
    reason4Text:
      "И, наверное, этого объяснения на самом деле вполне достаточно.",

    secretTitle: "Здесь спрятано кое-что ещё.",
    secretText: "Нажми на сердечко, если хочешь открыть.",
    secretResultTitle: "Ты — моё любимое уведомление.",
    secretResultText:
      "И если бы можно было сохранить один момент навсегда, я бы выбрал тот, где ты улыбаешься.",

    endingTitle: "Будь счастлива.<br>Это главное.",
    loveButton: "Я тебя люблю"
  },

  colors: {
    primary: "#e9a0bb",
    primaryStrong: "#ff719e",
    background: "#120d18",
    background2: "#1b1221",
    text: "#fff4f7",
    muted: "#bcaab3",
    gold: "#e8c6a0"
  }
};

/* Применяем цвета */
const root = document.documentElement;

Object.entries(config.colors).forEach(([key, value]) => {
  root.style.setProperty(`--${key.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}`, value);
});

/* Применяем имя */
document.querySelectorAll('[data-config="name"]').forEach((element) => {
  element.textContent = config.name;
});

document.title = `Для ${config.name} ♡`;

/* Применяем тексты */
document.querySelectorAll("[data-config]").forEach((element) => {
  const key = element.dataset.config;

  if (key === "name") return;

  if (config.texts[key] !== undefined) {
    element.innerHTML = config.texts[key];
  }
});

/* Звёзды */
const stars = document.getElementById("stars");

for (let i = 0; i < 80; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 3}s`;
  star.style.animationDuration = `${2 + Math.random() * 3}s`;
  stars.appendChild(star);
}

/* Тема */
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("girl-page-theme-2");

if (savedTheme === "light") {
  document.documentElement.dataset.theme = "light";
  themeBtn.textContent = "☾";
}

themeBtn.addEventListener("click", () => {
  const light = document.documentElement.dataset.theme === "light";

  if (light) {
    document.documentElement.removeAttribute("data-theme");
    themeBtn.textContent = "☼";
    localStorage.setItem("girl-page-theme-2", "dark");
  } else {
    document.documentElement.dataset.theme = "light";
    themeBtn.textContent = "☾";
    localStorage.setItem("girl-page-theme-2", "light");
  }
});

/* Раскрывающиеся причины */
document.querySelectorAll(".reason").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".reason").forEach((other) => {
      if (other !== item) other.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});

/* Секрет */
const openSecret = document.getElementById("openSecret");
const secretContent = document.getElementById("secretContent");
const lock = document.getElementById("lock");

function openTheSecret() {
  secretContent.hidden = false;
  openSecret.textContent = "Секрет открыт ♡";
  openSecret.disabled = true;
  lock.textContent = "♥";
  createHeartBurst(lock);
}

openSecret.addEventListener("click", openTheSecret);
lock.addEventListener("click", openTheSecret);

/* Кнопка "Я тебя люблю" */
const loveBtn = document.getElementById("loveBtn");
const loveResult = document.getElementById("loveResult");

loveBtn.addEventListener("click", () => {
  loveResult.textContent = `${config.name}, это сообщение специально для тебя ♡`;

  for (let i = 0; i < 18; i++) {
    setTimeout(() => createFloatingHeart(loveBtn), i * 45);
  }
});

/* Сердечки */
function createFloatingHeart(element) {
  const rect = element.getBoundingClientRect();
  const heart = document.createElement("span");

  heart.textContent = Math.random() > .2 ? "♥" : "♡";
  heart.style.position = "fixed";
  heart.style.left = `${rect.left + rect.width / 2 + (Math.random() - .5) * 80}px`;
  heart.style.top = `${rect.top}px`;
  heart.style.color = "var(--primary)";
  heart.style.fontSize = `${14 + Math.random() * 17}px`;
  heart.style.pointerEvents = "none";
  heart.style.zIndex = "100";
  heart.style.transition = "transform 1.4s ease, opacity 1.4s ease";

  document.body.appendChild(heart);

  requestAnimationFrame(() => {
    heart.style.transform =
      `translate(${(Math.random() - .5) * 160}px, ${-100 - Math.random() * 160}px) rotate(${(Math.random() - .5) * 80}deg)`;
    heart.style.opacity = "0";
  });

  setTimeout(() => heart.remove(), 1500);
}

function createHeartBurst(element) {
  for (let i = 0; i < 14; i++) {
    setTimeout(() => createFloatingHeart(element), i * 50);
  }
}
