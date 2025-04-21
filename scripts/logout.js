// Function to handle logout
function logout() {
  // Clear sessionStorage data
  sessionStorage.removeItem("loggedInUser");
  window.location.href = "/index.html"; // Update to the correct path
}

// Add event listener to the logout button
document.getElementById("logoutBtn").addEventListener("click", logout);
