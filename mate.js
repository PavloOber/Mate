// Configuración de la aplicación
const translations = {
  es: {
    title: "Práctica Matemática",
    practiceTypes: "Tipos de práctica",
    multiplication: "Multiplicación",
    addition: "Suma",
    subtraction: "Resta",
    multiplicationTitle: "Tablas de multiplicar",
    multiplicationInstructions:
      "Practicaremos 7 problemas aleatorios de la tabla que selecciones.",
    additionTitle: "Suma (1-100)",
    additionInstructions:
      "Practicaremos 7 problemas aleatorios de suma con números del 1 al 100.",
    subtractionTitle: "Resta (-100 a 100)",
    subtractionInstructions:
      "Practicaremos 7 problemas aleatorios de resta con números del -100 al 100.",
    practiceTitle: "Práctica de",
    errorsText: "Errores:",
    submitBtn: "Comprobar",
    resultsTitle: "Resultados",
    successMessage: "¡Felicidades! Has completado la práctica.",
    tryAgain: "Intentar otra vez",
    newPractice: "Nueva práctica",
    score: "Puntuación:",
    time: "Tiempo:",
    errors: "Errores:",
    seconds: "segundos",
    footer: "© 2023 Práctica Matemática",
    encouragement: "¡Sigue practicando! Lo harás mejor la próxima vez.",
    historyTitle: "Tu Historial",
    backToPractice: "Volver a practicar",
    historyBtnText: "Historial",
    showHistoryText: "Ver mi historial completo",
  },
  eu: {
    title: "Matematika Praktika",
    practiceTypes: "Praktika motak",
    multiplication: "Biderketa",
    addition: "Batuketa",
    subtraction: "Kenketa",
    multiplicationTitle: "Biderketa taulak",
    multiplicationInstructions:
      "Aukeratutako taulako 7 problema ausaz praktikatuko ditugu.",
    additionTitle: "Batuketa (1-100)",
    additionInstructions:
      "1etik 100era bitarteko zenbakiekin 7 batuketa ausaz praktikatuko ditugu.",
    subtractionTitle: "Kenketa (-100etik 100era)",
    subtractionInstructions:
      "-100etik 100era bitarteko zenbakiekin 7 kenketa ausaz praktikatuko ditugu.",
    practiceTitle: "Praktika:",
    errorsText: "Akatsak:",
    submitBtn: "Egiaztatu",
    resultsTitle: "Emaitzak",
    successMessage: "Zorionak! Praktika osatu duzu.",
    tryAgain: "Saiatu berriro",
    newPractice: "Praktika berria",
    score: "Puntuazioa:",
    time: "Denbora:",
    errors: "Akatsak:",
    seconds: "segundo",
    footer: "© 2023 Matematika Praktika",
    encouragement: "Jarraitu praktikatzen! Hobeto egingo duzu hurrengoan.",
    historyTitle: "Zure Historiala",
    backToPractice: "Praktikara itzuli",
    historyBtnText: "Historial",
    showHistoryText: "Nire historia osoa ikusi",
  },
};

const state = {
  currentLanguage: "es",
  currentPracticeType: "multiplication",
  selectedTable: 1,
  currentQuestion: 0,
  errors: 0,
  questions: [],
  answers: [],
  startTime: null,
  timerInterval: null,
  history: [],
};

const elements = {
  headerTitle: document.getElementById("header-title"),
  practiceTypes: document.getElementById("practice-types"),
  multiplicationTitle: document.getElementById("multiplication-title"),
  multiplicationInstructions: document.getElementById(
    "multiplication-instructions"
  ),
  additionTitle: document.getElementById("addition-title"),
  additionInstructions: document.getElementById("addition-instructions"),
  subtractionTitle: document.getElementById("subtraction-title"),
  subtractionInstructions: document.getElementById("subtraction-instructions"),
  practiceTitle: document.getElementById("practice-title"),
  currentPracticeType: document.getElementById("current-practice-type"),
  errorsText: document.getElementById("errors-text"),
  submitBtn: document.getElementById("submit-btn"),
  resultsTitle: document.getElementById("results-title"),
  resultMessage: document.getElementById("result-message"),
  tryAgainBtn: document.getElementById("try-again-btn"),
  newPracticeBtn: document.getElementById("new-practice-btn"),
  footerText: document.getElementById("footer-text"),
  multiplicationGrid: document.getElementById("multiplication-grid"),
  jokeText: document.getElementById("joke-text"),
  historyTitle: document.getElementById("history-title"),
  historyContainer: document.getElementById("history-container"),
  backToPractice: document.getElementById("back-to-practice"),
  historyBtnText: document.getElementById("history-btn-text"),
  showHistoryText: document.getElementById("show-history-text"),
  score: document.getElementById("score"),
  timeTaken: document.getElementById("time-taken"),
  errorsMade: document.getElementById("errors-made"),
};

function safeAddListener(id, event, handler) {
  const el = document.getElementById(id);
  if (el) el.addEventListener(event, handler);
}

function init() {
  loadHistory();
  setupEventListeners();
  generateMultiplicationButtons();
  switchLanguage("es");
}

function setupEventListeners() {
  safeAddListener("lang-es", "click", () => switchLanguage("es"));
  safeAddListener("lang-eu", "click", () => switchLanguage("eu"));
  safeAddListener("sidebar-history-btn", "click", showHistory);
  safeAddListener("start-addition", "click", startPractice);
  safeAddListener("start-subtraction", "click", startPractice);
  safeAddListener("submit-btn", "click", checkAnswer);
  safeAddListener("try-again-btn", "click", tryAgain);
  safeAddListener("new-practice-btn", "click", newPractice);
  safeAddListener("show-history", "click", showHistory);
  safeAddListener("back-to-practice", "click", backToPractice);

  const input = document.getElementById("answer-input");
  if (input) {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") checkAnswer();
    });
  }

  document.querySelectorAll(".practice-type-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.currentPracticeType = btn.dataset.type;
      updatePracticeSelection();
    });
  });
}

function generateMultiplicationButtons() {
  for (let i = 1; i <= 10; i++) {
    const btn = document.createElement("button");
    btn.className = "number-btn";
    btn.dataset.number = i;
    btn.textContent = i;
    btn.addEventListener("click", () => {
      state.selectedTable = i;
      startPractice();
    });
    elements.multiplicationGrid.appendChild(btn);
  }
}

function switchLanguage(lang) {
  state.currentLanguage = lang;
  updateTexts();
  updateLanguageButtons();
}

function updateTexts() {
  const lang = translations[state.currentLanguage];
  document.title = lang.title;

  Object.keys(elements).forEach((key) => {
    if (elements[key] && lang[key]) {
      elements[key].textContent = lang[key];
    }
  });

  updatePracticeTitle();
}

function updateLanguageButtons() {
  document
    .getElementById("lang-es")
    .classList.toggle("bg-blue-500", state.currentLanguage === "es");
  document
    .getElementById("lang-eu")
    .classList.toggle("bg-blue-500", state.currentLanguage === "eu");
}

function updatePracticeSelection() {
  document.querySelectorAll(".practice-type-btn").forEach((btn) => {
    btn.classList.toggle(
      "active-practice",
      btn.dataset.type === state.currentPracticeType
    );
  });

  document.querySelectorAll(".practice-selection").forEach((el) => {
    el.classList.toggle(
      "hidden",
      el.id !== `${state.currentPracticeType}-selection`
    );
  });

  updatePracticeTitle();
}

function updatePracticeTitle() {
  const lang = translations[state.currentLanguage];
  let practiceText = lang[state.currentPracticeType];
  if (state.currentPracticeType === "multiplication") {
    practiceText = `${lang.multiplication} (${state.selectedTable})`;
  }
  elements.currentPracticeType.textContent = practiceText;
}

function startPractice() {
  generateQuestions();
  state.currentQuestion = 0;
  state.errors = 0;
  state.answers = [];

  document
    .querySelectorAll(".practice-selection")
    .forEach((el) => el.classList.add("hidden"));
  document.getElementById("practice-screen").classList.remove("hidden");
  document.getElementById(
    "progress"
  ).textContent = `1/${state.questions.length}`;
  document.getElementById("error-count").textContent = "0";
  document.getElementById("answer-input").value = "";

  startTimer();
  showQuestion();
}

function generateQuestions() {
  state.questions = [];
  const count = 7;

  for (let i = 0; i < count; i++) {
    let question;
    switch (state.currentPracticeType) {
      case "multiplication":
        const multiplier = Math.floor(Math.random() * 10) + 1;
        question = {
          type: "multiplication",
          a: state.selectedTable,
          b: multiplier,
          answer: state.selectedTable * multiplier,
          text: `${state.selectedTable} × ${multiplier} = ?`,
        };
        break;
      case "addition":
        const a = Math.floor(Math.random() * 100) + 1;
        const b = Math.floor(Math.random() * 100) + 1;
        question = {
          type: "addition",
          a,
          b,
          answer: a + b,
          text: `${a} + ${b} = ?`,
        };
        break;
      case "subtraction":
        const x = Math.floor(Math.random() * 201) - 100;
        const y = Math.floor(Math.random() * 201) - 100;
        question = {
          type: "subtraction",
          a: x,
          b: y,
          answer: x - y,
          text: `${x} - ${y} = ?`,
        };
        break;
    }
    state.questions.push(question);
  }
}

function showQuestion() {
  const question = state.questions[state.currentQuestion];
  document.getElementById("question").textContent = question.text;
  document.getElementById("answer-input").focus();
}

function startTimer() {
  state.startTime = new Date();
  clearInterval(state.timerInterval);

  state.timerInterval = setInterval(() => {
    const now = new Date();
    const seconds = Math.floor((now - state.startTime) / 1000);
    document.getElementById("timer").textContent = `${
      translations[state.currentLanguage].time
    } ${seconds}${translations[state.currentLanguage].seconds}`;
  }, 1000);
}

async function getJoke() {
  try {
    const response = await fetch("https://v2.jokeapi.dev/joke/Any?lang=es");
    const data = await response.json();
    if (data.error) return "¡Ups! El chiste se escapó...";
    return data.type === "single"
      ? data.joke
      : `${data.setup} ... ${data.delivery}`;
  } catch (error) {
    return "¿Sabes por qué los programadores siempre confunden Halloween con Navidad? Porque Oct 31 == Dec 25";
  }
}

function checkAnswer() {
  const input = document.getElementById("answer-input");
  const userAnswer = parseInt(input.value);
  const correctAnswer = state.questions[state.currentQuestion].answer;
  if (isNaN(userAnswer)) return;

  state.answers.push({
    question: state.questions[state.currentQuestion],
    userAnswer,
    isCorrect: userAnswer === correctAnswer,
  });

  if (userAnswer !== correctAnswer) {
    state.errors++;
    document.getElementById("error-count").textContent = state.errors;
    input.classList.add("wrong-answer");
    setTimeout(() => input.classList.remove("wrong-answer"), 500);
    if (state.errors >= 3) return endPractice(false);
  } else {
    input.classList.add("correct-answer");
    setTimeout(() => input.classList.remove("correct-answer"), 500);
  }

  state.currentQuestion++;
  if (state.currentQuestion >= state.questions.length) {
    endPractice(true);
  } else {
    document.getElementById("progress").textContent = `${
      state.currentQuestion + 1
    }/${state.questions.length}`;
    input.value = "";
    showQuestion();
  }
}

async function endPractice(success) {
  clearInterval(state.timerInterval);
  const endTime = new Date();
  const seconds = Math.floor((endTime - state.startTime) / 1000);
  const correctAnswers = state.answers.filter((a) => a.isCorrect).length;
  const joke = await getJoke();

  addToHistory({
    date: new Date().toLocaleString(),
    type:
      state.currentPracticeType === "multiplication"
        ? `Tabla del ${state.selectedTable}`
        : translations[state.currentLanguage][state.currentPracticeType],
    difficulty: getDifficulty(),
    score: correctAnswers,
    total: state.questions.length,
    errors: state.errors,
    time: seconds,
    success,
    joke,
  });

  elements.score.textContent = `${
    translations[state.currentLanguage].score
  } ${correctAnswers}/${state.questions.length}`;
  elements.timeTaken.textContent = `${
    translations[state.currentLanguage].time
  } ${seconds} ${translations[state.currentLanguage].seconds}`;
  elements.errorsMade.textContent = `${
    translations[state.currentLanguage].errors
  } ${state.errors}`;
  elements.jokeText.textContent = joke;
  updateResultMessage(success);

  document.getElementById("practice-screen").classList.add("hidden");
  document.getElementById("results-screen").classList.remove("hidden");
}

function getDifficulty() {
  if (state.currentPracticeType === "multiplication") {
    if (state.selectedTable <= 5) return "Fácil";
    if (state.selectedTable <= 8) return "Media";
    return "Difícil";
  }
  return state.currentPracticeType === "addition" ? "Media" : "Difícil";
}

function updateResultMessage(success) {
  const lang = translations[state.currentLanguage];
  document.getElementById("result-emoji").textContent = success ? "🎉" : "💪";
  elements.resultMessage.textContent = success
    ? lang.successMessage
    : lang.encouragement;
}

function addToHistory(result) {
  state.history.unshift(result);
  if (state.history.length > 10) state.history.pop();
  saveHistory();
}

function saveHistory() {
  localStorage.setItem("mathPracticeHistory", JSON.stringify(state.history));
}

function loadHistory() {
  const saved = localStorage.getItem("mathPracticeHistory");
  if (saved) state.history = JSON.parse(saved);
}

function showHistory() {
  const container = document.getElementById("history-container");
  container.innerHTML = "";

  // Ocultar todas las vistas menos el historial
  document
    .querySelectorAll(".practice-selection")
    .forEach((el) => el.classList.add("hidden"));
  document.getElementById("practice-screen").classList.add("hidden");
  document.getElementById("results-screen").classList.add("hidden");
  document.getElementById("history-screen").classList.remove("hidden");

  // Rellenar historial
  if (state.history.length === 0) {
    container.innerHTML =
      '<p class="text-gray-500 text-center">Aún no tienes ningún intento registrado</p>';
  } else {
    state.history.forEach((item) => {
      const card = document.createElement("div");
      card.className = `history-card ${
        item.success ? "history-card-success" : "history-card-failure"
      }`;

      card.innerHTML = `
        <div class="history-card-header">
          <span>${item.type} - ${item.date}</span>
          <span>${item.score}/${item.total}</span>
        </div>
        <div>Dificultad: ${item.difficulty}</div>
        <div>Tiempo: ${item.time}s</div>
        <div>Errores: ${item.errors}</div>
        <div class="history-card-joke">${item.joke}</div>
      `;

      container.appendChild(card);
    });
  }
}

function tryAgain() {
  document.getElementById("results-screen").classList.add("hidden");
  startPractice();
}

function newPractice() {
  document.getElementById("results-screen").classList.add("hidden");
  document
    .getElementById(`${state.currentPracticeType}-selection`)
    .classList.remove("hidden");
}

function backToPractice() {
  document.getElementById("history-screen").classList.add("hidden");

  document
    .getElementById(`${state.currentPracticeType}-selection`)
    .classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", init);
