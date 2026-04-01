import { getDatas } from "./API/APImanagement.js";
import { createWork } from "./actions/createWork.js";

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
