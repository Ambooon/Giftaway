document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    let isValid = true;

    if (password.length < 6) {
      isValid = false;
      showError("passwordError", "Password must be at least 6 characters long");
    }

    if (password !== confirmPassword) {
      isValid = false;
      showError("confirmPasswordError", "Passwords do not match");
    }

    if (isValid) {
      fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            document.getElementById("username").value = "";
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            document.getElementById("confirmPassword").value = "";

            alert("Registration successful!");
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          document.getElementById("formMessage").innerText =
            "An error occurred";
        });
    }
  });

function showError(id, message) {
  document.getElementById(id).innerText = message;
}

function clearErrors() {
  document.querySelectorAll(".error").forEach((el) => (el.innerText = ""));
  document.getElementById("formMessage").innerText = "";
}
