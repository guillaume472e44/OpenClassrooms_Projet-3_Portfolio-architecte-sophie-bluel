import { getDatas } from "./API/APImanagement.js";
import { createWork } from "./actions/createWork.js";
import { createFilterBtn } from "./actions/createFilterBtn.js";
import { openModal } from "./modal/modal.js";
export * from "./edit-mode/editMode.js";

// Ajout des travaux dans la gellerie
getDatas("works").then((worksDatas) => populateGallery(worksDatas));
function populateGallery(works) {
  const gallery = document.querySelector(".gallery");
  gallery.textContent = "";

  if (!works.length) {
    const p = document.createElement("p");
    p.textContent = "Aucuns résultats trouvés";
    p.classList.add("noResults");
    gallery.appendChild(p);
  } else {
    works.forEach((work) => createWork(work));
  }
}

// boutons filtres travaux
getDatas("categories").then((categoriesDatas) =>
  populateFilters(categoriesDatas),
);
function populateFilters(categories) {
  const noFilterBtn = { id: 0, name: "Tous" }; // bouton "Tous"
  [noFilterBtn, ...categories].forEach((category) => createFilterBtn(category));
}

// Fonction de déconnexion
export function logout() {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("userId");

  document.querySelector(".logoutBtn").removeEventListener("click", logout);
  document.querySelector(".modifier").removeEventListener("click", openModal);

  location.reload();
}
