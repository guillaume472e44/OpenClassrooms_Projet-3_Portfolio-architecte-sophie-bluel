import { createAddPhoto } from "./createAddPhoto.js";
import { deleteWork } from "./deleteWork.js";

export function createDeletionGallery() {
  const deletionGallery = document.querySelector(".deletion-gallery");
  deletionGallery.style.display = "block";

  const thumbnails = document.querySelector(".deletion-gallery__thumbnails");
  thumbnails.textContent = "";

  const gallery = document.querySelectorAll(".gallery figure");
  gallery.forEach((work) => thumbnails.appendChild(createThumbnail(work)));

  const gotoAddPhoto = document.getElementById("goto__add-photo");
  gotoAddPhoto.style.display = "inline";
  gotoAddPhoto.addEventListener("click", handleAddPhotoBtn);
}

function createThumbnail(work) {
  const figure = document.createElement("figure");
  figure.classList.add("thumbnail");
  figure.dataset.id = work.dataset.id;
  figure.dataset.title = work.firstChild.alt;

  const img = document.createElement("img");
  img.src = work.firstChild.src;
  img.alt = work.firstChild.alt;
  figure.appendChild(img);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-button");
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./assets/icons/trash.svg";
  deleteIcon.alt = "supprimer un élément";
  deleteBtn.appendChild(deleteIcon);
  deleteBtn.addEventListener("click", deleteWork);
  figure.appendChild(deleteBtn);

  return figure;
}

function handleAddPhotoBtn() {
  removeDeletionGallery();
  createAddPhoto();
}

export function removeDeletionGallery() {
  const deleteBtns = document.querySelectorAll(".delete-button");
  // TODO => remove delete listeners

  const deletionGallery = document.querySelector(".deletion-gallery");
  deletionGallery.style.display = "none";

  const apiInfo = document.querySelector(".apiInfo");
  apiInfo.classList.remove("success");
  apiInfo.classList.remove("error");
  apiInfo.textContent = "";

  const gotoAddPhoto = document.getElementById("goto__add-photo");
  gotoAddPhoto.removeEventListener("click", handleAddPhotoBtn);
  gotoAddPhoto.style.display = "none";
}
