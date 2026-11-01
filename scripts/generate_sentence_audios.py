import json
import os
import asyncio
import edge_tts
import time

VOICE = "fr-CA-SylvieNeural"
RATE = "-5%"
CONCURRENCY = 12

OUTPUT_DIR = os.path.join("public", "audio", "sentences")
SENTENCES_JSON = os.path.join("src", "data", "sentences.json")

async def generate_one(sem, item, progress):
    word_id = item["word_id"]
    example = item["example"]
    pronoun = item["pronoun"]
    text = item["text"]
    filename = f"{word_id}_{example}_{pronoun}.mp3"
    filepath = os.path.join(OUTPUT_DIR, filename)

    if os.path.exists(filepath) and os.path.getsize(filepath) > 1000:
        progress["skipped"] += 1
        return

    async with sem:
        for attempt in range(3):
            try:
                communicate = edge_tts.Communicate(text, VOICE, rate=RATE)
                await communicate.save(filepath)
                progress["generated"] += 1
                break
            except Exception as e:
                if attempt == 2:
                    print(f"\n[ERROR] Failed {filename}: {e}")
                    progress["failed"] += 1
                await asyncio.sleep(1 + attempt)

        done = progress["generated"] + progress["skipped"] + progress["failed"]
        if done % 100 == 0 or done == progress["total"]:
            elapsed = time.time() - progress["start"]
            rate = done / elapsed if elapsed > 0 else 0
            eta = (progress["total"] - done) / rate if rate > 0 else 0
            print(f"Progress: {done}/{progress['total']} ({done*100/progress['total']:.1f}%) | "
                  f"New: {progress['generated']} | Skip: {progress['skipped']} | "
                  f"Speed: {rate:.1f} audios/s | ETA: {eta:.0f}s", end="\r")

async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    with open(SENTENCES_JSON, "r", encoding="utf-8") as f:
        data = json.load(f)

    items = []
    for ex in data:
        word_id = ex["id"]
        for ex_key in ["A", "B"]:
            example_data = ex.get("examples", {}).get(ex_key, {})
            sentences = example_data.get("sentences", {})
            for pronoun, text in sentences.items():
                if text and text.strip():
                    items.append({
                        "word_id": word_id,
                        "example": ex_key,
                        "pronoun": pronoun,
                        "text": text.strip()
                    })

    total = len(items)
    print(f"Total sentences to process: {total}")
    progress = {
        "total": total,
        "generated": 0,
        "skipped": 0,
        "failed": 0,
        "start": time.time()
    }

    sem = asyncio.Semaphore(CONCURRENCY)
    tasks = [generate_one(sem, item, progress) for item in items]
    await asyncio.gather(*tasks)

    elapsed = time.time() - progress["start"]
    print(f"\nFinished in {elapsed:.1f}s: {progress['generated']} generated, {progress['skipped']} skipped, {progress['failed']} failed.")

if __name__ == "__main__":
    asyncio.run(main())
