// Fonction de création de travaux de la galerie
export function createWork(work) {
  const gallery = document.querySelector(".gallery");
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");

  img.src = work.imageUrl;
  img.width = 305;
  img.height = 407;
  img.alt = work.title;

  figcaption.textContent = work.title;

  figure.appendChild(img);
  figure.appendChild(figcaption);
  figure.dataset.categoryId = work.categoryId;
  figure.dataset.id = work.id;

  gallery.appendChild(figure);
}
