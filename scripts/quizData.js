const quizzes = [
  {
    id: 1,
    title: "JavaScript & DOM Manipulation",
    image: "../assets/images/card-images/js.png", // Replace with actual image path
    description:
      "Test your knowledge on JavaScript fundamentals and how to manipulate the DOM.",
    questions: [
      {
        questionId: 1,
        text: "Which method is used to select an element by ID in JavaScript?",
        options: [
          "getElementByClassName",
          "getElementByTagName",
          "getElementById",
          "querySelectorAll",
        ],
        correctAnswer: "getElementById",
      },
      {
        questionId: 2,
        text: "Which property would you use to change the content of an HTML element using JavaScript?",
        options: ["innerContent", "text", "innerHTML", "content"],
        correctAnswer: "innerHTML",
      },
      {
        questionId: 3,
        text: "What does `document.querySelector('.my-class')` do?",

        options: [
          "Selects all elements with class 'my-class'",
          "Selects the first element with class 'my-class'",
          "Selects an element by ID",
          "Throws an error",
        ],
        correctAnswer: "Selects the first element with class 'my-class'",
      },
    ],
  },
  {
    id: 2,
    title: "HTML & CSS",
    image: "../assets/images/card-images/html-5.png",
    description:
      "Explore the fundamentals of building web pages using HTML and CSS.",
    questions: [
      {
        questionId: 1,
        text: "Which HTML tag is used to define an unordered list?",
        options: ["ol", "ul", "list", "li"],
        correctAnswer: "ul",
      },
      {
        questionId: 2,
        text: "Which CSS property is used to change text color?",

        options: ["background-color", "font-color", "color", "text-color"],
        correctAnswer: "color",
      },
      {
        questionId: 3,
        text: "How do you make text bold in HTML?",
        options: ["strong", "b", "bold", "Both strong and b"],
        correctAnswer: "Both strong and b",
      },
    ],
  },
  {
    id: 3,
    title: "Internet Protocols",
    image: "../assets/images/card-images/browser.png",
    description:
      "Challenge yourself on how data travels across the internet using different protocols.",
    questions: [
      {
        questionId: 1,
        text: "What does HTTP stand for?",

        options: [
          "HyperText Transmission Protocol",
          "HyperText Transfer Protocol",
          "HighText Transfer Protocol",
          "Hyper Transfer Text Protocol",
        ],
        correctAnswer: "HyperText Transfer Protocol",
      },
      {
        questionId: 2,
        text: "Which port does HTTPS typically use?",
        options: ["80", "21", "443", "22"],
        correctAnswer: "443",
      },
      {
        questionId: 3,
        text: "Which protocol is used for sending emails?",
        options: ["FTP", "SMTP", "HTTP", "DNS"],
        correctAnswer: "SMTP",
      },
    ],
  },
];

// Call this only when needed
export function quizzesInLocalStorage() {
  if (!localStorage.getItem("quizzes")) {
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
  }
}
