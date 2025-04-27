function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "/index.html";
}

document.getElementById("logoutBtn").addEventListener("click", logout);
