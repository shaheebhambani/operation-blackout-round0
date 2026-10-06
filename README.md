# OPERATION BLACKOUT
Mobile-first cinematic opening for the Amity campus cyber investigation game. Static React + Vite site, no backend, all sound synthesised with Web Audio (no audio files).

## Run locally
    npm install
    npm run dev

## Deploy to Netlify
- Drag-and-drop: run `npm run build`, then drop the `dist/` folder on app.netlify.com/drop.
- Git: push to GitHub, "Add new site" > "Import from Git". `netlify.toml` already sets build `npm run build` and publish `dist`.

## Editing
- Story text: `L` array in `src/App.jsx`. Clue: the `Trace` component.
- Timings: the arrays passed to `useSeq` (milliseconds between beats).
- Colours: CSS variables at the top of `src/styles.css`.
- Audio: `src/audio.js`. Browsers block autoplay, so "AUDIO LINK OFFLINE / TAP TO ENABLE" appears until the first tap.
- Recurring motif: `[ GHOST // 0x00 ]` / `GHOST_SIG // UNKNOWN`.
