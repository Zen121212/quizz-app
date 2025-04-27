const tabLogin = document.getElementById("tab-login");
const tabRegister = document.getElementById("tab-register");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const errorMessageLog = document.getElementById("error-message");
const errorMessageReg = document.getElementById("error-message-reg");
const popup = document.getElementById("popup");

tabLogin.addEventListener("click", () => {
  tabLogin.classList.add("active");
  loginForm.classList.add("active");
  tabRegister.classList.remove("active");
  registerForm.classList.remove("active");
});

tabRegister.addEventListener("click", () => {
  tabRegister.classList.add("active");
  registerForm.classList.add("active");
  tabLogin.classList.remove("active");
  loginForm.classList.remove("active");
});

// check if users exist in localStorage if not set it into array and then push user admin
// console.log(JSON.parse(localStorage.getItem("users")));
let users = localStorage.getItem("users");
if (users) {
  users = JSON.parse(users);
} else {
  users = [];
}

// check if admin already exists
const adminExists = users.some((user) => user.email === "admin@quiz.com");
if (!adminExists) {
  // console.log("users array empty");
  users.push({ email: "admin@quiz.com", password: "admin123", is_admin: 1 });
  localStorage.setItem("users", JSON.stringify(users));
  // console.log("admin user inserted");
}

// LOGIN
function handleLogin(e) {
  e.preventDefault();
  // console.log("submit");
  const emailInput = document.getElementById("login-email").value.trim();
  const passwordInput = document.getElementById("login-password").value.trim();

  // console.log("logging in with:", email, password);

  const users = JSON.parse(localStorage.getItem("users"));

  // console.log("users in localStorage:", users);

  let user;
  for (const u of users) {
    if (u.email === emailInput && u.password === passwordInput) {
      user = u;
      break;
    }
  }

  // console.log("user", user);
  if (user) {
    // console.log("user authenticated:", user);
    if (emailInput === "admin@quiz.com" && passwordInput === "admin123") {
      // console.log("go to dashboard");
      location.href = "pages/dashboard.html";
    } else {
      // console.log("go to home");
      location.href = "pages/home.html";
    }
    // storing logged-in user in localStorage
    const { name, lastName, email, is_admin } = user;
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ name, lastName, email, is_admin })
    );
    // localStorage.setItem("loggedInUser", JSON.stringify(user));
  } else {
    // alert("invalid credentials");
    errorMessageLog.innerText = "invalid credentials";
  }
}
loginForm.addEventListener("submit", handleLogin);

// REGISTER
function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById("register-name").value.trim();
  const lastName = document.getElementById("register-last-name").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  // check if user already exists

  let userExists = false;
  for (const user of users) {
    // using email as a unique identifier
    if (user.email === email) {
      userExists = true;
      break;
    }
  }
  if (userExists) {
    // alert("User already exists");
    errorMessageReg.innerText = "user already exists with this email";
    return;
  }

  users.push({ name, lastName, email, password, scores: [], is_admin: 0 });
  localStorage.setItem("users", JSON.stringify(users));

  // alert("Registered!");
  errorMessageLog.innerText = "";
  popup.classList.remove("hidden");
  setTimeout(() => {
    popup.classList.add("hidden"); // Hide after 4 seconds
  }, 4000);
  // call function showForm to switch tab to login after registered
  showForm("login");
}
registerForm.addEventListener("submit", handleRegister);

// return back to login tab after register
function showForm(formType) {
  if (formType === "login") {
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
    tabRegister.classList.remove("active");
    tabLogin.classList.add("active");
  }
}
