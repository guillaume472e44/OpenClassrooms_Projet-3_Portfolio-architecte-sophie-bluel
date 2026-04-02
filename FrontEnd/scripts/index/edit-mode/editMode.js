import { isAuthenticated } from "./isAuthenticated.js";
import { logout } from "../index.js";
import { openModal } from "../modal/modal.js";

// Modification de l'interface
if (isAuthenticated) {
  // Affichage du bandeau noir en haut de la page
  const editBanner = document.querySelector(".editMode__banner");
  editBanner.style.display = "block";

  // Remplacement lien "login" par boutton "logout"
  const loginLink = document.querySelector(".loginLink");
  loginLink.style.display = "none";
  const logoutBtn = document.querySelector(".logoutBtn");
  logoutBtn.style.display = "block";
  logoutBtn.addEventListener("click", logout);

  // Masquage boutons de filtres
  const filters = document.querySelector(".filters");
  filters.style.display = "none";

  // Affichage bouton de modification
  const modifierBtn = document.querySelector(".modifier");
  modifierBtn.style.display = "inline-flex";
  modifierBtn.addEventListener("click", openModal);
}
