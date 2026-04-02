const form = document.getElementById("login-form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const requestBody = JSON.stringify({
    email: e.target.email.value,
    password: e.target.password.value,
  });

  login(requestBody);

  form.reset();
}

async function login(requestBody) {
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: requestBody,
    });
    if (!response.ok) {
      throw new Error(`Response status : ${response.status}`);
    } else {
      const loginResponse = await response.json();

      window.localStorage.setItem("userId", loginResponse.userId);
      window.localStorage.setItem("token", loginResponse.token);

      form.removeEventListener("submit", handleSubmit);

      window.location = "./index.html";
    }
  } catch (error) {
    displayErrorMsg(error);
    console.error(error.message);
  }
}

// Affichage erreur
function displayErrorMsg(error) {
  const errorMsg = document.querySelector(".errorMsg");

  if (error.message === "Response status : 401") {
    errorMsg.textContent = "Erreur dans l’identifiant ou le mot de passe";
  } else {
    errorMsg.textContent = error;
  }

  errorMsg.classList.add("active");
}
