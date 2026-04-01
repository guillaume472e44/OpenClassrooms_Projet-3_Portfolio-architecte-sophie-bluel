export async function getDatas(endpoint) {
  try {
    const response = await fetch(`http://localhost:5678/api/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Statut de réponse : ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    displayAPIError(error.message, ".errorInfo__getData");
  }
}

// Affichage message d'erreur sur l'interface utilisateur
function displayAPIError(message, DOMSelector) {
  const errorInfo = document.querySelector(DOMSelector);
  errorInfo.textContent = message;
  errorInfo.classList.add("active");
}
