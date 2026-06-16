# Zaara's Nursery

One-time static site for selling potted plants. No backend — you edit a JSON file and push to update things.

Real photos are in place (`images/001.jpg`–`052.jpg`, named by plant number; `Banner.jpg` is the overview shot used as the hero banner and link-preview image). Plant names in `data/plants.json` were identified from the photos and plant tags — double-check the few generic ones (`Succulent Cutting`, `Succulent Mix`, etc.) where the handwritten tag was missing or illegible, and prices (currently random within ₹10–₹30) before going live.

## Before going live

1. **WhatsApp number** — open `js/app.js` and set `WHATSAPP_NUMBER` to your real number with country code, digits only (e.g. `919876543210`).
2. **UPI ID** — open `index.html` and replace the placeholder text inside `<code id="upi-id">` with your real UPI ID.
3. **Double-check plant names/prices** — skim `data/plants.json` for anything you'd rename or re-price.

## Updating inventory after a sale

Open `data/plants.json`, find the plant by `number`, and change its `status` to `"reserved"` or `"sold"`:

```json
{ "number": "007", "name": "Money Plant", "price": 150, "status": "sold", "photo": "images/007.jpg" }
```

Commit and push — GitHub Pages rebuilds automatically and the tile will show as dimmed/unavailable.

## Running locally

```
python3 -m http.server
```

Then open http://localhost:8000 in a browser.

## Deploying

1. `git init` in this folder (if not already done) and push to a new GitHub repo.
2. In the repo's Settings → Pages, set the source to the `main` branch, root folder.
3. Your site will be live at `https://<username>.github.io/<repo-name>/`.
