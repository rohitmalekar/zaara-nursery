const PLACEHOLDER_PHOTO = "images/placeholder.svg";

const grid = document.getElementById("plant-grid");
const overlay = document.getElementById("modal-overlay");
const modalPhoto = document.getElementById("modal-photo");
const modalName = document.getElementById("modal-name");
const modalNumber = document.getElementById("modal-number");
const modalClose = document.getElementById("modal-close");
const modalPrice = document.getElementById("modal-price");

function openModal(plant) {
  modalPhoto.src = plant.photo;
  modalPhoto.onerror = () => { modalPhoto.src = PLACEHOLDER_PHOTO; };
  modalPhoto.alt = plant.name;
  modalName.textContent = plant.name;
  modalNumber.textContent = `Plant #${plant.number}`;
  modalPrice.textContent = plant.price ? `₹${plant.price}` : '';
  modalPrice.style.display = plant.price ? '' : 'none';
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
    tile.className = isAvailable ? "tile" : "tile sold";
    if (!isAvailable) tile.setAttribute("disabled", "true");

    const imgWrap = document.createElement("div");
    imgWrap.className = "tile-img-wrap";

    const img = document.createElement("img");
    img.src = plant.photo;
    img.alt = plant.name;
    img.onerror = () => { img.src = PLACEHOLDER_PHOTO; };
    imgWrap.appendChild(img);

    if (!isAvailable) {
      const stamp = document.createElement("div");
      stamp.className = "sold-stamp";
      const stampText = document.createElement("span");
      stampText.textContent = "SOLD";
      stamp.appendChild(stampText);
      imgWrap.appendChild(stamp);
    }

    tile.appendChild(imgWrap);

    const info = document.createElement("div");
    info.className = "tile-info";
    info.innerHTML = `
      <div class="tile-row">
        <span class="tile-number">#${plant.number}</span>
        <span class="tile-leaf">🌱</span>
      </div>
      <span class="tile-name">${plant.name}</span>
      ${plant.price ? `<span class="tile-price">₹${plant.price}</span>` : ''}
    `;
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
