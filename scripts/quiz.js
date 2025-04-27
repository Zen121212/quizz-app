import { quizzesInLocalStorage } from "./quizData.js";

quizzesInLocalStorage();

// get quizzes and user info
const quizzes = JSON.parse(localStorage.getItem("quizzes"));
const user = JSON.parse(localStorage.getItem("loggedInUser"));
const users = JSON.parse(localStorage.getItem("users"));
const userIndex = users.findIndex((u) => u.email === user.email);
const currentUser = users[userIndex];

// get user name
const userName = document.getElementById("user-name");
userName.innerHTML = `${user.name}`;

// get quiz from URL
const urlParams = new URLSearchParams(window.location.search);
const quizId = parseInt(urlParams.get("quizId"));
const selectedQuiz = quizzes.find((quiz) => quiz.id === quizId);

// check if quiz already taken
const takenQuiz =
  currentUser?.scores?.find((s) => s.quizId === selectedQuiz?.id) || null;

const questionContainer = document.getElementById("quiz-container");

if (selectedQuiz) {
  let questionsHTML = selectedQuiz.questions
    .map((q, index) => {
      let optionsHTML = q.options
        .map((op) => {
          const isChecked = takenQuiz?.answers?.[index] === op ? "checked" : "";
          return `<label><input type="radio" name="q${index}" value="${op}" ${isChecked}> ${op}</label><br>`;
        })
        .join("");

      return `<div class="question-block">
        <h4>${q.text}</h4>
        ${optionsHTML}
      </div>`;
    })
    .join("");

  questionContainer.innerHTML = `
    <h2>${selectedQuiz.title}</h2>
    ${questionsHTML}
    <button id="submitBtn" class="submit-button">Submit</button>
    <div id="result" class="result hidden"></div>
  `;

  const submitBtn = document.getElementById("submitBtn");

  // if quiz already taken disable inputs and show result
  if (takenQuiz) {
    selectedQuiz.questions.forEach((_, index) => {
      const inputs = document.querySelectorAll(`input[name="q${index}"]`);
      inputs.forEach((input) => (input.disabled = true));
    });

    submitBtn.disabled = true;

    const resultBox = document.getElementById("result");
    resultBox.classList.remove("hidden");
    resultBox.innerHTML = `
      <h3>Your Score: <strong>${takenQuiz.score} / ${selectedQuiz.questions.length}</strong></h3>
    `;
  }

  if (!takenQuiz || !takenQuiz.isSubmit) {
    submitBtn.addEventListener("click", handleSubmit);
  }
} else {
  questionContainer.innerHTML = `<p>Quiz not found.</p>`;
}

function handleSubmit() {
  const resultBox = document.getElementById("result");
  const submitBtn = document.getElementById("submitBtn");
  resultBox.classList.remove("hidden");

  let score = 0;

  selectedQuiz.questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    const inputs = document.querySelectorAll(`input[name="q${index}"]`);

    inputs.forEach((input) => {
      input.disabled = true;
    });

    if (selected && selected.value === q.correctAnswer) {
      score += 1;
    }
  });

  resultBox.innerHTML = `<h3>Your Score: ${score} / ${selectedQuiz.questions.length}</h3>`;
  submitBtn.disabled = true;

  // save to user scores
  if (!currentUser.scores) {
    currentUser.scores = [];
  }

  currentUser.scores.push({
    quizId: selectedQuiz.id,
    title: selectedQuiz.title,
    score: score,
    numberOfQuestions: selectedQuiz.questions.length,
    isSubmit: true,
  });

  users[userIndex] = currentUser;
  localStorage.setItem("users", JSON.stringify(users));
}

const backBtn = document.getElementById("backBtn");
backBtn.addEventListener("click", () => {
  window.location.href = "home.html";
});
