const PLACEHOLDER_PHOTO = "images/placeholder.svg";

const grid = document.getElementById("plant-grid");
const overlay = document.getElementById("modal-overlay");
const modalPhoto = document.getElementById("modal-photo");
const modalName = document.getElementById("modal-name");
const modalNumber = document.getElementById("modal-number");
const modalClose = document.getElementById("modal-close");

function openModal(plant) {
  modalPhoto.src = plant.photo;
  modalPhoto.onerror = () => { modalPhoto.src = PLACEHOLDER_PHOTO; };
  modalPhoto.alt = plant.name;
  modalName.textContent = plant.name;
  modalNumber.textContent = `Plant #${plant.number}`;
  overlay.classList.add("open");
}

function closeModal() {
  overlay.classList.remove("open");
}

function renderGrid(plants) {
  grid.innerHTML = "";
  plants.forEach((plant) => {
    const isAvailable = plant.status === "available";

    const tile = document.createElement(isAvailable ? "button" : "div");
    tile.className = "tile";
    if (!isAvailable) tile.setAttribute("disabled", "true");

    const img = document.createElement("img");
    img.src = plant.photo;
    img.alt = plant.name;
    img.onerror = () => { img.src = PLACEHOLDER_PHOTO; };
    tile.appendChild(img);

    if (!isAvailable) {
      const badge = document.createElement("span");
      badge.className = "status-badge";
      badge.textContent = plant.status;
      tile.appendChild(badge);
    }

    const info = document.createElement("div");
    info.className = "tile-info";
    info.innerHTML = `<span class="tile-number">#${plant.number}</span><span class="tile-leaf">🌱</span>`;
    tile.appendChild(info);

    if (isAvailable) {
      tile.addEventListener("click", () => openModal(plant));
    }

    grid.appendChild(tile);
  });
}

modalClose.addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

fetch("data/plants.json")
  .then((res) => res.json())
  .then((plants) => renderGrid(plants))
  .catch((err) => {
    grid.innerHTML = "<p>Could not load plant inventory.</p>";
    console.error(err);
  });
