export async function getDatas(endpoint) {
  try {
    const response = await fetch(`http://localhost:5678/api/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Statut de réponse : ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    displayAPIError(error.message, ".errorInfo__getData");
  }
}

export async function removeData(id) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Erreur http, status : ${response.status}`);
    }
    return "deleted";
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function postData(formData) {
  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Erreur http, status : ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

// Affichage message d'erreur sur l'interface utilisateur
function displayAPIError(message, DOMSelector) {
  const errorInfo = document.querySelector(DOMSelector);
  errorInfo.textContent = message;
  errorInfo.classList.add("active");
}
