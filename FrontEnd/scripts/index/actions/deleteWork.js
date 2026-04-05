import { removeAPIData } from "../API/APImanagement.js";

export function deleteWork(e) {
  const id = e.target.offsetParent.dataset.id;
  const title = e.target.offsetParent.dataset.title;

  removeAPIData(id).then((response) => {
    const apiInfo = document.querySelector(".apiInfo");

    if (response === "deleted") {
      apiInfo.innerHTML = `<span>"${title}"</span> supprimé avec succès !`;
      apiInfo.classList.add("success");

      const gallery = [...document.querySelectorAll(".gallery figure")];
      const galleryFigure = gallery.find((figure) => figure.dataset.id === id);
      galleryFigure.remove();

      const thumbnails = [
        ...document.querySelectorAll(".deletion-gallery__thumbnails figure"),
      ];
      const thumbnail = thumbnails.find((figure) => figure.dataset.id === id);
      thumbnail
        .querySelector(".delete-button")
        .removeEventListener("click", deleteWork);
      thumbnail.remove();
    } else {
      apiInfo.textContent = "une erreur est survenue";
      apiInfo.classList.add("error");
    }
  });
}
