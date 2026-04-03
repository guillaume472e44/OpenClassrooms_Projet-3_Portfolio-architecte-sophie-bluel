import { createDeletionGallery } from "./createDeletionGallery.js";

export function createAddPhoto() {
  const backBtn = document.querySelector(".dialog__header__backBtn");
  backBtn.style.display = "block";
  backBtn.addEventListener("click", backToGallery);

  const addPhoto = document.querySelector(".add-photo");
  addPhoto.style.display = "block";

  const addPhotoBtn = document.getElementById("add-photo-Btn");
  addPhotoBtn.style.display = "inline";
  // TODO => add eventlistener
}

function backToGallery() {
  removeAddPhoto();
  createDeletionGallery();
}

export function removeAddPhoto() {
  const backBtn = document.querySelector(".dialog__header__backBtn");
  backBtn.style.display = "none";
  backBtn.removeEventListener("click", backToGallery);

  const addPhoto = document.querySelector(".add-photo");
  addPhoto.style.display = "none";

  const addPhotoBtn = document.getElementById("add-photo-Btn");
  addPhotoBtn.style.display = "none";
}
