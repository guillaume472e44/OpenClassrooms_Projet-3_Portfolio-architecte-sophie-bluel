export function createFilterBtn(category) {
  const filters = document.querySelector(".filters");
  const button = document.createElement("button");
  button.textContent = category.name;
  button.dataset.category = category.id;

  button.classList.add("filter__button");
  if (category.id === 0) button.classList.add("active");

  filters.appendChild(button);

  button.addEventListener("click", handleFiltersBtn);
}

// Filtrage des travaux
function handleFiltersBtn(e) {
  const categoryId = e.target.dataset.category;
  updateFiltersBtnStyle(categoryId);

  const figures = document.querySelectorAll(".gallery figure");
  figures.forEach((figure) => {
    figure.style.display = "block";
    if (figure.dataset.categoryId !== categoryId && categoryId !== "0") {
      figure.style.display = "none";
    }
  });
}

// Mise à jour style des boutons
function updateFiltersBtnStyle(id) {
  const buttons = document.querySelectorAll(".filter__button");
  buttons.forEach((btn) => {
    if (btn.dataset.category === id) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}
