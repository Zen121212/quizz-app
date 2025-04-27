const loggedInUserString = localStorage.getItem("loggedInUser");
let loggedInUser = null;

if (loggedInUserString) {
  try {
    loggedInUser = JSON.parse(loggedInUserString);
  } catch (e) {
    console.error("Error parsing loggedInUser from localStorage:", e);
    loggedInUser = null;
  }
}

const isAdmin = loggedInUser && loggedInUser.is_admin === 1;

if (!isAdmin) {
  window.location.href = "/index.html";
}

const users = JSON.parse(localStorage.getItem("users")) || [];
const dashboardContainer = document.getElementById("dashboard-container");

const user = JSON.parse(localStorage.getItem("loggedInUser"));
const userName = document.getElementById("user-name");
userName.innerHTML = `Admin`;

// filter out admin
const filteredUsers = users.filter((user) => user.email !== "admin@quiz.com");
// console.log("Filtered Users (no admin):", filteredUsers);

if (!filteredUsers.length) {
  dashboardContainer.innerHTML = `<p class="no-exams">No User Registered.</p>`;
} else {
  let cardsHTML = `<div class="user-cards">`;

  filteredUsers.forEach((user) => {
    const fullName = `${user.name} ${user.lastName}`;
    const email = user.email;

    const quizScoresHTML =
      user.scores && user.scores.length > 0
        ? user.scores
            .map(
              (score) => `
            <div class="quiz-item">
              <strong>${score.title}</strong>
              <span>${score.score} / ${score.numberOfQuestions}</span>
            </div>
          `
            )
            .join("")
        : `<p class="no-scores">No Quizz taken yet</p>`;

    cardsHTML += `
      <div class="user-card">
        <div class="user-info">
          <h3>${fullName}</h3>
          <p>${email}</p>
        </div>
        <div class="quiz-scores">
          ${quizScoresHTML}
        </div>
      </div>
    `;
  });

  cardsHTML += `</div>`;
  dashboardContainer.innerHTML = cardsHTML;
}
