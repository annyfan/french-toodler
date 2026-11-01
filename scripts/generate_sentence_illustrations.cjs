/**
 * Batch Sentence Illustration Generator & Audit Tool
 * 
 * Verifies which sentence illustrations exist in public/illustrations/sentences/
 * and prepares prompt manifests for continuous AI generation featuring Yannick.
 */

const fs = require('fs');
const path = require('path');

const SENTENCES_FILE = path.join(__dirname, '..', 'src', 'data', 'sentences.json');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'illustrations', 'sentences');

// Ensure output dir exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const rawData = fs.readFileSync(SENTENCES_FILE, 'utf8');
const exercises = JSON.parse(rawData);

console.log(`=== BAOBAO SENTENCE ILLUSTRATION AUDIT ===`);
console.log(`Total sentence exercises: ${exercises.length}`);

let totalExamples = 0;
let existingImages = 0;
const missing = [];

exercises.forEach(ex => {
  ['A', 'B'].forEach(exampleKey => {
    totalExamples++;
    const fileNameJpg = `${ex.id}_${exampleKey}.jpg`;
    const fileNamePng = `${ex.id}_${exampleKey}.png`;
    const fullPathJpg = path.join(OUTPUT_DIR, fileNameJpg);
    const fullPathPng = path.join(OUTPUT_DIR, fileNamePng);

    const exists = fs.existsSync(fullPathJpg) || fs.existsSync(fullPathPng);
    if (exists) {
      existingImages++;
    } else {
      const sentenceFr = ex.examples[exampleKey]?.sentences?.je || '';
      const sentenceEn = ex.examples[exampleKey]?.translations?.en?.je || '';
      const sentenceZh = ex.examples[exampleKey]?.translations?.zh?.je || '';
      
      missing.push({
        id: `${ex.id}_${exampleKey}`,
        wordId: ex.id,
        exampleKey,
        word: ex.word,
        type: ex.type,
        french: sentenceFr,
        english: sentenceEn,
        chinese: sentenceZh,
        targetFile: fileNameJpg,
        prompt: `High-quality toddler children's picture book illustration of 4-year-old boy Yannick performing the action for "${sentenceFr}" (${sentenceEn}). Yannick has a cute round face, rosy pink cheeks, friendly sparkling brown eyes, joyful happy smile, soft messy brown hair with a cowlick. Outfit: signature emerald-green striped hoodie, blue denim overalls dungarees with colorful buttons, yellow sneakers. Whimsical storybook vector art style, rounded contours, clean uncluttered background, warm bright cheerful colors, 4:3 aspect ratio, completely textless.`
      });
    }
  });
});

console.log(`Generated / Ready: ${existingImages} / ${totalExamples} (${Math.round((existingImages / totalExamples) * 100)}%)`);
console.log(`Pending Generation: ${missing.length}`);

// Save missing prompts manifest for automated generation
const manifestPath = path.join(__dirname, '..', 'src', 'data', 'sentence_illustration_manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(missing, null, 2), 'utf8');
console.log(`Saved generation manifest to ${manifestPath}`);

// Print next 10 items to generate when quota resets
console.log('\n--- NEXT 10 SENTENCES QUEUED FOR GENERATION ---');
missing.slice(0, 10).forEach((item, idx) => {
  console.log(`${idx + 1}. [${item.id}] ${item.french} (${item.english}) -> ${item.targetFile}`);
});
