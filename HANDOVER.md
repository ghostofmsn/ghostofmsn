# The Ghost of MSN: handover notes

Live site: https://ghostofmsn.netlify.app
Repo: github.com/ghostofmsn/ghostofmsn (branch `main`). Every push to `main` redeploys Netlify automatically.

## How the site is built

- **`index.html`** is the whole site: one self-contained file (HTML, CSS, JS, images as data URIs). This is what Netlify serves.
- **`src/extensions/ext*.js` / `ext*.css`** are the readable sources of the features, added in numbered layers (ext2 … ext45). Each one is already pasted into `index.html`: JS just before the last `</script>`, CSS just before the last `</style>`. Later layers wrap earlier functions (e.g. `goPlace`, `openThing`, `openGallery`) by reassigning them.
- **`src/room3d/*.mjs`** is the 3D room (Three.js). It's bundled into the first `<script>var R3D=…</script>` in `index.html` with:
  `npx esbuild index3d.mjs --bundle --minify --format=iife --global-name=R3D --outfile=r3d.js`
  then replace the old `var R3D=` script with the new bundle.
- **`netlify/functions/db.mjs`** is a tiny shared database (Netlify Blobs) at `/api/db`: `GET ?c=name`, `POST {op: add|set|update, c, id, doc}`. It's used by letters from strangers, the cybercafé and other shared walls.
- Visitor data (journal, collection, positions, ghost avatar) is saved in localStorage under the `XS` object (`xsave()` writes it).

## Safest way to change something

1. Edit the relevant `src/` file and make the same change inside `index.html` (or add a new `extNN.js` and paste it before the last `</script>`).
2. Check the JS still parses: extract the second `<script>` block and run `node --check`.
3. Commit and push to `main`. Netlify deploys in about a minute.

## Rules the owner set

- Reply in English. Do the work rather than describe it.
- Real images, not vector drawings. Free images only (Wikimedia Commons, museum CC0) with credit lines. Copyrighted scans, album covers and posters are linked or loaded live, never copied into the repo.
- No personal photos of the owner on the public site.
- Avoid these words in copy: immersive, journey, unforgettable, "where X meets Y", elevate, unlock, authentic, premium experience, next-level.

## Open requests (not done yet)

- A weekly film shortlist room: real posters (loaded live from Wikipedia), IMDb / Rotten Tomatoes / Letterboxd ratings, fed every Friday.
- The room's right wall: she still sees a window there. Remove it (it's the round `win` on the back wall, or something on the right, so check `room3d.mjs`).
- Move the blue ceiling pendant lamp (`pend` in `room3d.mjs`) more toward the middle without overlapping the other ceiling lights.
