// Fill in your real WhatsApp number (with country code, no + or spaces) before going live.
const WHATSAPP_NUMBER = "91XXXXXXXXXX";
const PLACEHOLDER_PHOTO = "images/placeholder.svg";

const grid = document.getElementById("plant-grid");
const overlay = document.getElementById("modal-overlay");
const modalPhoto = document.getElementById("modal-photo");
const modalName = document.getElementById("modal-name");
const modalNumber = document.getElementById("modal-number");
const modalPrice = document.getElementById("modal-price");
const modalReserve = document.getElementById("modal-reserve");
const modalClose = document.getElementById("modal-close");

function reserveLink(plant) {
  const message = `Hi, I'd like to reserve Plant #${plant.number}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function openModal(plant) {
  modalPhoto.src = plant.photo;
  modalPhoto.onerror = () => { modalPhoto.src = PLACEHOLDER_PHOTO; };
  modalPhoto.alt = plant.name;
  modalName.textContent = plant.name;
  modalNumber.textContent = `Plant #${plant.number}`;
  modalPrice.textContent = `₹${plant.price}`;
  modalReserve.href = reserveLink(plant);
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
    info.innerHTML = `
      <div class="tile-number">#${plant.number}</div>
      <div class="tile-price">₹${plant.price}</div>
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
