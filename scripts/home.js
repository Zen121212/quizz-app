import { quizzesInLocalStorage } from "./quizData.js";

quizzesInLocalStorage();

const quizzes = JSON.parse(localStorage.getItem("quizzes"));

// welcome message with user name and lastName
const user = JSON.parse(localStorage.getItem("loggedInUser"));
const userName = document.getElementById("user-name");
userName.innerHTML = `${user.name} ${user.lastName}`;
// console.log(user);

// get user's scores from localStorage
const users = JSON.parse(localStorage.getItem("users")) || [];
const currentUser = users.find((u) => u.email === user.email);
const userScores = currentUser ? currentUser.scores : [];

// display question
const questionContainer = document.getElementById("questions-container");
// console.log(questionContainer);

// console.log(quizzes);
const quizCardsHTML = quizzes
  .map((quiz) => {
    // find user's score for this quiz
    const userQuizScore = userScores.find((score) => score.quizId === quiz.id);

    // if user has taken the quiz, use that data
    let score = 0;
    let totalQuestions = quiz.questions.length;
    let statusMessage = `<p class="status in-progress">In progress...</p>`;

    if (userQuizScore) {
      score = userQuizScore.score;
      if (userQuizScore?.isSubmit) {
        statusMessage = `<p class="status completed">Completed</p>`;
      }
    }

    return `
      <li>
        <a href="quiz.html?quizId=${quiz.id}">
          <article class="quiz-card">
              <div>
                  <img src="${quiz.image}" alt="${quiz.title}" style="width: 100%; height: auto; border-radius: 8px;">
                  <p>Score: ${score} / ${totalQuestions}</p>
                  <h2>${quiz.title}</h2>
                  <p>${quiz.description}</p>
                  ${statusMessage}
              </div>
          </article>
        </a>
      </li>
    `;
  })
  .join("");

questionContainer.innerHTML = quizCardsHTML;
