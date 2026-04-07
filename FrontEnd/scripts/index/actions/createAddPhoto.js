import { createDeletionGallery } from "./createDeletionGallery.js";
import {
  handleFileInput,
  removeInfo,
  resetPreview,
  inputsWatcher,
  validateForm,
} from "./addWork.js";

// Affichage zone ajout photo
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

// création bordure sur le label lors du focus sur l'input file
function addOutline() {
  const label = document.querySelector(".add-photo__file label");
  label.style.border = "2px solid blue";
}
function removeOutline() {
  const label = document.querySelector(".add-photo__file label");
  label.style.border = "2px solid transparent";
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
