export function createDeletionGallery() {
  const thumbnails = document.querySelector(".deletion-gallery__thumbnails");
  thumbnails.textContent = "";

  const gallery = document.querySelectorAll(".gallery figure");
  gallery.forEach((work) => thumbnails.appendChild(createThumbnail(work)));
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
  figure.appendChild(deleteBtn);

  return figure;
}
