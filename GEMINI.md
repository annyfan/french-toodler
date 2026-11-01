# Baobao - Quebec French Platform Guidelines

## 1. Audio Architecture & Voice Quality
* **Audio by Default Must Be French:** All audio playback must default strictly to French. Never allow English or other non-French voices to read French words, phrases, or phonetics.
* **Studio Audio Priority:** All vocabulary items and sentences must prioritize pre-rendered neural audio files stored in `public/audio/words/{wordId}.mp3` and `public/audio/sentences/{wordId}_{example}_{pronoun}.mp3` (generated via `edge-tts` with `fr-CA-SylvieNeural`).
* **Web Speech Fallback:** When using `SpeechSynthesis` as a fallback, maintain natural human pitch (`1.0`) and rate (`0.95`), and strictly prioritize French voices (`Google français`, `fr-CA`, `Amélie`, `Nicolas`, `Chantal`).
* **Asset Location:** All custom audio files belong in `public/audio/words/` or `public/audio/sentences/`; visual assets belong in `public/illustrations/`.

## 2. Child-First (0-Text) UI & Spatial Guardrails
* **Full Database Discovery:** Ensure all 664 words in `vocabulary.json` remain discoverable in child view via the visual category explorer (*L'Imagier*).
* **Dynamic Scene Shuffling:** Physical rooms must support dynamic item rotation (`Surprise 🎲`) to expose children to diverse objects from each room's category pool.
* **Top-Right Control Docking:** Non-gameplay controls (Surprise, Labels toggle, Sound mute, Parent gate) must always be consolidated in the **top-right corner dock**.
* **Canvas Clearance:** Maintain a safe top margin (minimum 25–30% of the screen height) free of interactive hotspots to prevent button overlap.
* **Bilingual Translations in Grey & `🏷️ Mots` Visibility Toggle:** All text elements (vocabulary words, full sentences, subject pronouns, categories, interactive cues) must include English and Chinese translations styled in grey (`color grey` / `text-slate-400` / `text-slate-500`). The `🏷️ Mots` toggle button in the top-right dock controls translation visibility across all toddler modules (`ExploratoryScene`, `PictureDictionary`, `SentenceBuilder`, `SimonSays`). When toggled on, translations appear in grey; when toggled off, translations are hidden to support the child-first 0-text experience.

## 3. Environment & Local Server Configuration
* **Port Management:** Configure local ports directly in `vite.config.ts` (`server.port` and `strictPort: true`). Avoid relying on PowerShell CLI argument chaining (`npm run dev -- --port XXXX`).
* **Static Hosting Compatibility:** Keep all asset paths relative (`base: './'`) to preserve 100% compatibility with GitHub Pages (`github.io`).

## 4. Visual Aesthetics & Toddler Cognition (Ages 3–4)
* **Unified Visual Style:** All illustrations, icons, graphics, items, and scene backgrounds must adhere strictly to a unified visual style: simple, colorful, cute, cheerful, and immediately understandable for toddlers aged 3 to 4 years old (storybook vector aesthetic, rounded soft contours, clean uncluttered silhouettes, and joyful palettes).
* **Generous Image Sizing (No Tiny Images):** Visuals are the primary learning anchor for pre-literate toddlers. Images, icons, and illustrations must never be too small, cramped, or hard to recognize. Ensure large tap targets, prominent dimensions, and high visual contrast across all screens.
* **Universal Visual Comprehension (Every Word & Sentence Has An Image):** Because toddlers cannot read text, every vocabulary word, action, descriptor, and full sentence must have clear, prominent visual imagery (illustrations, subject-action-object graphics) to reinforce meaning and enable self-guided comprehension alongside French pronunciation.
