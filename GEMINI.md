# Baobao - Quebec French Platform Guidelines

## 1. Audio Architecture & Voice Quality
* **Studio Audio Priority:** All vocabulary items must prioritize pre-rendered neural audio files stored in `public/audio/words/{wordId}.mp3` (generated via `edge-tts` with `fr-CA-SylvieNeural`).
* **Web Speech Fallback:** When using `SpeechSynthesis` as a fallback, maintain natural human pitch (`1.0`) and rate (`0.95`), and strictly prioritize French voices (`Google français`, `fr-CA`, `Amélie`, `Nicolas`, `Chantal`). Never allow English voices to read French phonetics.
* **Asset Location:** All custom audio files belong in `public/audio/words/`; visual assets belong in `public/illustrations/`.

## 2. Child-First (0-Text) UI & Spatial Guardrails
* **Full Database Discovery:** Ensure all 664 words in `vocabulary.json` remain discoverable in child view via the visual category explorer (*L'Imagier*).
* **Dynamic Scene Shuffling:** Physical rooms must support dynamic item rotation (`Surprise 🎲`) to expose children to diverse objects from each room's category pool.
* **Top-Right Control Docking:** Non-gameplay controls (Surprise, Labels toggle, Sound mute, Parent gate) must always be consolidated in the **top-right corner dock**.
* **Canvas Clearance:** Maintain a safe top margin (minimum 25–30% of the screen height) free of interactive hotspots to prevent button overlap.
* **Testing & Parent Affordances:** Always provide toggleable word labels (`🏷️ Mots`) so parents and therapists can verify pronunciation and spelling.

## 3. Environment & Local Server Configuration
* **Port Management:** Configure local ports directly in `vite.config.ts` (`server.port` and `strictPort: true`). Avoid relying on PowerShell CLI argument chaining (`npm run dev -- --port XXXX`).
* **Static Hosting Compatibility:** Keep all asset paths relative (`base: './'`) to preserve 100% compatibility with GitHub Pages (`github.io`).
