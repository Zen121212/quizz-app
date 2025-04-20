// welcome message with user name and lastName
const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
const userName = document.getElementById("user-name");
userName.innerHTML = `${user.name} ${user.lastName}`;
console.log(user);

// display question
const questionContainer = document.getElementById("questions-container");
console.log(questionContainer);

console.log(quizzes);
const quizCardsHTML = quizzes
  .map(
    (quiz) => `
    <li>
      <a href="quiz.html?quizId=${quiz.id}">
        <article class="quiz-card">
            <div>
                <img src="${quiz.image}" alt="${quiz.title}" style="width: 100%; height: auto; border-radius: 8px;">
                <h2>${quiz.title}</h2>
                <p>${quiz.description}</p>
            </div>
        </article>
      </a>
    </li>
  `
  )
  .join("");
questionContainer.innerHTML = quizCardsHTML;

// console.log(quizzes);
// quizzes.forEach((quiz) => {
//   let questionsItems = quiz.questions
//     .map((q, index) => {
//       let optionsHTML = q.options
//         .map((op, i) => {
//           return `<label><input type="radio" name="q${index}" value="${op}">${op}</label><br>`;
//         })
//         .join("");
//       return `<div class="question-block">
//         <h4>${q.text}</h4>
//         ${optionsHTML}
//       </div>`;
//     })
//     .join("");
//   questionContainer.innerHTML += `<h3>#${quiz.title}</h3>${questionsItems}`;
// });
