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
  },
};

// Estado de la aplicación
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

// Elementos del DOM
const elements = {
  headerTitle: document.getElementById("header-title"),
  practiceTypes: document.getElementById("practice-types"),
  multiplicationText: document.getElementById("multiplication-text"),
  additionText: document.getElementById("addition-text"),
  subtractionText: document.getElementById("subtraction-text"),
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
};

// Inicialización de la aplicación
function init() {
  loadHistory();
  setupEventListeners();
  generateMultiplicationButtons();
  switchLanguage("es");
}

// Configuración de event listeners
function setupEventListeners() {
  // Idioma
  document
    .getElementById("lang-es")
    .addEventListener("click", () => switchLanguage("es"));
  document
    .getElementById("lang-eu")
    .addEventListener("click", () => switchLanguage("eu"));
  document
    .getElementById("sidebar-history-btn")
    .addEventListener("click", showHistory);

  // Tipo de práctica
  document.querySelectorAll(".practice-type-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.currentPracticeType = btn.dataset.type;
      updatePracticeSelection();
    });
  });

  // Botones de práctica
  document
    .getElementById("start-addition")
    .addEventListener("click", startPractice);
  document
    .getElementById("start-subtraction")
    .addEventListener("click", startPractice);

  // Envío de respuestas
  document.getElementById("submit-btn").addEventListener("click", checkAnswer);
  document.getElementById("answer-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkAnswer();
  });

  // Resultados
  document.getElementById("try-again-btn").addEventListener("click", tryAgain);
  document
    .getElementById("new-practice-btn")
    .addEventListener("click", newPractice);
  document
    .getElementById("show-history")
    .addEventListener("click", showHistory);
  document
    .getElementById("back-to-practice")
    .addEventListener("click", backToPractice);
}

// Generación de botones de multiplicación
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

// Cambio de idioma
function switchLanguage(lang) {
  state.currentLanguage = lang;
  updateTexts();
  updateLanguageButtons();
}

// Actualización de textos según idioma
function updateTexts() {
  const lang = translations[state.currentLanguage];

  // Actualizar todos los textos
  Object.keys(elements).forEach((key) => {
    if (elements[key] && lang[key]) {
      elements[key].textContent = lang[key];
    }
  });

  // Actualizar título de práctica
  updatePracticeTitle();
}

// Actualización de botones de idioma
function updateLanguageButtons() {
  document
    .getElementById("lang-es")
    .classList.toggle("bg-blue-500", state.currentLanguage === "es");
  document
    .getElementById("lang-es")
    .classList.toggle("hover:bg-blue-500", state.currentLanguage !== "es");
  document
    .getElementById("lang-eu")
    .classList.toggle("bg-blue-500", state.currentLanguage === "eu");
  document
    .getElementById("lang-eu")
    .classList.toggle("hover:bg-blue-500", state.currentLanguage !== "eu");
}

// Actualización de selección de práctica
function updatePracticeSelection() {
  // Actualizar botones activos
  document.querySelectorAll(".practice-type-btn").forEach((btn) => {
    btn.classList.toggle(
      "active-practice",
      btn.dataset.type === state.currentPracticeType
    );
  });

  // Mostrar pantalla de selección correcta
  document.querySelectorAll(".practice-selection").forEach((el) => {
    el.classList.toggle(
      "hidden",
      el.id !== `${state.currentPracticeType}-selection`
    );
  });

  // Actualizar textos
  updatePracticeTitle();
}

// Actualización del título de práctica
function updatePracticeTitle() {
  const lang = translations[state.currentLanguage];
  let practiceText = lang[state.currentPracticeType];

  if (state.currentPracticeType === "multiplication") {
    practiceText = `${lang.multiplication} (${state.selectedTable})`;
  }

  elements.currentPracticeType.textContent = practiceText;
}

// Inicio de práctica
function startPractice() {
  // Ocultar historial si está visible
  document.getElementById("history-screen").classList.add("hidden");

  // Resto del código existente...
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

// Generación de preguntas
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
          a: a,
          b: b,
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

// Mostrar pregunta actual
function showQuestion() {
  const question = state.questions[state.currentQuestion];
  document.getElementById("question").textContent = question.text;
  document.getElementById("answer-input").focus();
}

// Iniciar temporizador
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

// Obtener chiste de la API
async function getJoke() {
  try {
    const response = await fetch("https://v2.jokeapi.dev/joke/Any?lang=es");
    const data = await response.json();

    if (data.error) {
      return "¡Ups! El chiste se escapó...";
    }

    if (data.type === "single") {
      return data.joke;
    } else {
      return `${data.setup} ... ${data.delivery}`;
    }
  } catch (error) {
    console.error("Error fetching joke:", error);
    return "¿Sabes por qué los programadores siempre confunden Halloween con Navidad? Porque Oct 31 == Dec 25";
  }
}

// Comprobar respuesta
function checkAnswer() {
  const input = document.getElementById("answer-input");
  const userAnswer = parseInt(input.value);
  const correctAnswer = state.questions[state.currentQuestion].answer;

  if (isNaN(userAnswer)) return;

  // Registrar respuesta
  state.answers.push({
    question: state.questions[state.currentQuestion],
    userAnswer: userAnswer,
    isCorrect: userAnswer === correctAnswer,
  });

  // Comprobar si es correcta
  if (userAnswer !== correctAnswer) {
    state.errors++;
    document.getElementById("error-count").textContent = state.errors;
    input.classList.add("wrong-answer");
    setTimeout(() => input.classList.remove("wrong-answer"), 500);

    if (state.errors >= 3) {
      endPractice(false);
      return;
    }
  } else {
    input.classList.add("correct-answer");
    setTimeout(() => input.classList.remove("correct-answer"), 500);
  }

  // Siguiente pregunta o finalizar
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

// Finalizar práctica
async function endPractice(success) {
  clearInterval(state.timerInterval);

  const endTime = new Date();
  const seconds = Math.floor((endTime - state.startTime) / 1000);
  const correctAnswers = state.answers.filter((a) => a.isCorrect).length;
  const joke = await getJoke();

  // Guardar en historial
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
    success: success,
    joke: joke,
  });

  // Mostrar resultados
  document.getElementById("score").textContent = `${
    translations[state.currentLanguage].score
  } ${correctAnswers}/${state.questions.length}`;
  document.getElementById("time-taken").textContent = `${
    translations[state.currentLanguage].time
  } ${seconds} ${translations[state.currentLanguage].seconds}`;
  document.getElementById("errors-made").textContent = `${
    translations[state.currentLanguage].errors
  } ${state.errors}`;
  document.getElementById("joke-text").textContent = joke;

  updateResultMessage(success);

  document.getElementById("practice-screen").classList.add("hidden");
  document.getElementById("results-screen").classList.remove("hidden");
}

// Determinar dificultad
function getDifficulty() {
  if (state.currentPracticeType === "multiplication") {
    if (state.selectedTable <= 5) return "Fácil";
    if (state.selectedTable <= 8) return "Media";
    return "Difícil";
  }
  return state.currentPracticeType === "addition" ? "Media" : "Difícil";
}

// Actualizar mensaje de resultados
function updateResultMessage(success) {
  const lang = translations[state.currentLanguage];
  const resultEmoji = document.getElementById("result-emoji");
  const resultMessage = document.getElementById("result-message");

  if (success) {
    resultEmoji.textContent = "🎉";
    resultMessage.textContent = lang.successMessage;
  } else {
    resultEmoji.textContent = "💪";
    resultMessage.textContent = lang.encouragement;
  }
}

// Añadir al historial
function addToHistory(result) {
  state.history.unshift(result); // Añade al inicio del array
  if (state.history.length > 10) {
    state.history.pop(); // Limita a 10 intentos
  }
  saveHistory();
}

// Guardar historial en localStorage
function saveHistory() {
  localStorage.setItem("mathPracticeHistory", JSON.stringify(state.history));
}

// Cargar historial desde localStorage
function loadHistory() {
  const saved = localStorage.getItem("mathPracticeHistory");
  if (saved) {
    state.history = JSON.parse(saved);
  }
}

// Mostrar historial
function showHistory() {
  // Ocultar todas las pantallas de ejercicios
  document
    .querySelectorAll(".practice-selection, #practice-screen, #results-screen")
    .forEach((el) => {
      el.classList.add("hidden");
    });

  // Mostrar solo el historial
  document.getElementById("history-screen").classList.remove("hidden");

  // Cargar y mostrar el historial
  const container = document.getElementById("history-container");
  container.innerHTML = "";

  if (state.history.length === 0) {
    container.innerHTML =
      '<p class="text-gray-500 text-center">Aún no tienes ningún intento registrado</p>';
  } else {
    state.history.forEach((item, index) => {
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

// Intentar de nuevo
function tryAgain() {
  document.getElementById("results-screen").classList.add("hidden");
  startPractice();
}

// Nueva práctica
function newPractice() {
  document.getElementById("results-screen").classList.add("hidden");
  document
    .getElementById(`${state.currentPracticeType}-selection`)
    .classList.remove("hidden");
}

// Volver a practicar desde historial
function backToPractice() {
  // Ocultar historial
  document.getElementById("history-screen").classList.add("hidden");

  // Mostrar la selección de práctica correspondiente
  document
    .getElementById(`${state.currentPracticeType}-selection`)
    .classList.remove("hidden");
}

// Iniciar aplicación
document.addEventListener("DOMContentLoaded", init);
