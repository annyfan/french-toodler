import * as fs from 'fs';
const words: any[] = JSON.parse(fs.readFileSync('src/data/vocabulary.json', 'utf8'));
const scenes: any[] = JSON.parse(fs.readFileSync('src/data/scenes.json', 'utf8'));
const wordMap = new Map(words.map((w: any) => [w.id, w]));

for (const s of scenes) {
  console.log(`Scene ${s.id} (${s.name_fr}):`);
  for (const it of s.items) {
    const found = wordMap.get(it.wordId);
    if (!found) {
      console.log(`  MISSING: ${it.wordId} (${it.label})`);
    } else {
      console.log(`  OK: ${it.wordId} -> ${found.fr}`);
    }
  }
}
