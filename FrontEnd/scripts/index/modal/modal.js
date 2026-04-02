import { createDeletionGallery } from "../actions/createDeletionGallery.js";

export function openModal() {
  const dialog = document.getElementById("edit-mode");
  const closeBtn = document.querySelector(".dialog__header__closeBtn");

  document.body.style.overflowY = "hidden"; // remove scroll

  dialog.showModal();
  dialog.addEventListener("close", closeModal);
  closeBtn.addEventListener("click", closeModal);

  createDeletionGallery();
}

function closeModal(e) {
  const dialog = document.getElementById("edit-mode");
  const closeBtn = document.querySelector(".dialog__header__closeBtn");

  document.body.style.overflowY = "auto"; // add scroll

  dialog.removeEventListener("close", closeModal);

  if (e.type === "click") {
    closeBtn.removeEventListener("click", closeModal);
    dialog.close();
  }
}
