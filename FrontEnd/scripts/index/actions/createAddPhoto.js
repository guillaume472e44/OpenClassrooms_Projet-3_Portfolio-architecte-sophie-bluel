import { createDeletionGallery } from "./createDeletionGallery.js";
import { postData } from "../API/APImanagement.js";
import { createWork } from "./createWork.js";

export function createAddPhoto() {
  const backBtn = document.querySelector(".dialog__header__backBtn");
  backBtn.style.display = "block";
  backBtn.addEventListener("click", backToGallery);

  const addPhoto = document.querySelector(".add-photo");
  addPhoto.style.display = "block";

  const fileInput = document.querySelector("#inputFile");
  fileInput.addEventListener("focus", addOutline);
  fileInput.addEventListener("blur", removeOutline);
  fileInput.addEventListener("change", handleFileInput);
  fileInput.addEventListener("change", inputsWatcher);
  fileInput.focus();

  const titleInput = document.querySelector("#inputTitle");
  titleInput.addEventListener("change", inputsWatcher);

  populateCategories();
  const categoryInput = document.querySelector("#inputCategory");
  categoryInput.addEventListener("change", inputsWatcher);

  const addPhotoBtn = document.getElementById("add-photo-Btn");
  addPhotoBtn.style.display = "inline";

  addPhoto.querySelector("form").addEventListener("submit", validateForm);
}

// Input file
function addOutline() {
  const label = document.querySelector(".add-photo__file label");
  label.style.border = "2px solid blue";
}
function removeOutline() {
  const label = document.querySelector(".add-photo__file label");
  label.style.border = "2px solid transparent";
}

function handleFileInput(e) {
  const type = this.files[0].type;
  const size = this.files[0].size;

  if (size >= 4000000 || (type !== "image/png" && type !== "image/jpeg")) {
    if (size >= 4000000) {
      displayInfo("fichier trop volumineux", "error");
    } else {
      displayInfo("format image incorrect", "error");
    }
    this.value = "";
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
// Suppression preview si on quitte la zone "add photo"
function resetPreview() {
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

// Ajout des catégories dans l'input select
function populateCategories() {
  const select = document.getElementById("inputCategory");
  select.querySelectorAll("option").forEach((option) => option.remove());

  const categories = document.querySelectorAll(".filters button");
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.getAttribute("data-category");
    option.textContent = option.value !== "0" ? category.textContent : "";
    select.appendChild(option);
  });
}

// validation formulaire
function validateForm(e) {
  e.preventDefault();

  if (e.target.inputCategory.value === "0") {
    displayInfo("Veuillez choisir une catégorie", "error");
  } else {
    const formData = new FormData();
    formData.append("image", e.target.inputFile.files[0]);
    formData.append("title", e.target.inputTitle.value);
    formData.append("category", e.target.inputCategory.value);

    postData(formData).then((response) => {
      displayInfo("élément ajouté succès !", "success");
      createWork(response);
    });
    resetPreview();
    e.currentTarget.reset();
  }
}

// Vérifie si tous les inputs sont renseignés
function inputsWatcher() {
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

// Affiche un message informatif à l'utilisateur
function displayInfo(message, type) {
  const formInfo = document.querySelector(".formInfo");
  formInfo.textContent = message;
  formInfo.style.display = "block";
  if (type === "error") {
    formInfo.classList.add("error");
  } else if (type === "success") {
    formInfo.classList.add("success");
  }
}
function removeInfo() {
  const formInfo = document.querySelector(".formInfo");
  formInfo.textContent = "";
  formInfo.style.display = "none";
  formInfo.classList.remove("error", "success");
}

// retour à la zone de suppression
function backToGallery() {
  removeAddPhoto();
  createDeletionGallery();
}

// reset listeners et contenu
export function removeAddPhoto() {
  const backBtn = document.querySelector(".dialog__header__backBtn");
  backBtn.removeEventListener("click", backToGallery);
  backBtn.style.display = "none";

  const addPhoto = document.querySelector(".add-photo");

  if (document.getElementById("inputFile").value) resetPreview();

  const fileInput = document.querySelector(".add-photo__file input");
  fileInput.removeEventListener("focus", addOutline);
  fileInput.removeEventListener("blur", removeOutline);
  fileInput.removeEventListener("change", handleFileInput);
  fileInput.removeEventListener("change", inputsWatcher);

  const titleInput = document.querySelector("#inputTitle");
  titleInput.removeEventListener("change", inputsWatcher);

  const categoryInput = document.querySelector("#inputCategory");
  categoryInput.removeEventListener("change", inputsWatcher);

  addPhoto.querySelector("form").reset();

  removeInfo();

  addPhoto.style.display = "none";

  const addPhotoBtn = document.getElementById("add-photo-Btn");
  addPhoto.querySelector("form").removeEventListener("submit", validateForm);
  addPhotoBtn.style.display = "none";
  addPhotoBtn.classList.add("disabled");
}
