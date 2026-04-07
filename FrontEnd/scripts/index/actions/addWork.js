import { postData } from "../API/APImanagement.js";
import { createWork } from "./createWork.js";

// Vérification de l'input file avant de créer la preview
export function handleFileInput(e) {
  const type = e.target.files[0].type;
  const size = e.target.files[0].size;

  if (size >= 4000000 || (type !== "image/png" && type !== "image/jpeg")) {
    if (size >= 4000000) {
      displayInfo("fichier trop volumineux", "error");
    } else {
      displayInfo("format image incorrect", "error");
    }
    e.target.value = "";
  } else {
    createPreview(e);
  }
}

// preview de l'image à ajouter
function createPreview(e) {
  const preview = document.createElement("img");
  preview.src = URL.createObjectURL(e.target.files[0]);
  preview.alt = "preview image";
  preview.classList.add("preview");
  document.querySelectorAll(".add-photo__file > *").forEach((element) => {
    element.style.opacity = 0;
    if (element.nodeName === "INPUT") element.disabled = true;
  });
  document.querySelector(".add-photo__file").appendChild(preview);
}
// Suppression preview si on valide le formulaire ou quitte la zone "add photo"
export function resetPreview() {
  document.getElementById("inputFile").value = "";
  document.querySelectorAll(".add-photo__file > *").forEach((element) => {
    if (element.nodeName !== "INPUT") {
      element.style.opacity = 1;
    } else {
      element.disabled = false;
    }
  });
  document.querySelector(".add-photo__file .preview").remove();
}

// Vérifie si tous les inputs sont renseignés
export function inputsWatcher() {
  const file = document.querySelector("#inputFile").value ? true : false;
  const title = document.querySelector("#inputTitle").value ? true : false;
  const category =
    document.querySelector("#inputCategory").value !== "0" ? true : false;

  if (file) removeInfo();

  const addPhotoBtn = document.getElementById("add-photo-Btn");
  if (file && title && category) {
    addPhotoBtn.classList.remove("disabled");
  } else {
    addPhotoBtn.classList.add("disabled");
  }
}

// validation formulaire
export function validateForm(e) {
  e.preventDefault();

  if (e.target.inputCategory.value === "0") {
    displayInfo("Veuillez choisir une catégorie", "error");
  } else {
    const formData = new FormData();
    formData.append("image", e.target.inputFile.files[0]);
    formData.append("title", e.target.inputTitle.value);
    formData.append("category", e.target.inputCategory.value);

    postData(formData).then((response) => {
      if (response) {
        displayInfo(`"${response.title}" ajouté avec succès !`, "success");
        createWork(response);
      } else {
        displayInfo("une erreur est survenue", "error");
      }
    });

    resetPreview();
    e.currentTarget.reset();
  }
}

// Affiche un message informatif à l'utilisateur
export function displayInfo(message, type) {
  const formInfo = document.querySelector(".formInfo");
  formInfo.textContent = message;
  formInfo.style.display = "block";
  formInfo.classList.add(type);
}
export function removeInfo() {
  const formInfo = document.querySelector(".formInfo");
  formInfo.textContent = "";
  formInfo.style.display = "none";
  formInfo.classList.remove("error", "success");
}
