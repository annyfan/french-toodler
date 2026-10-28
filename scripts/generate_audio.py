import asyncio
import json
import os
import edge_tts

VOICE = "fr-CA-SylvieNeural" # Canadian French (Quebec) friendly studio voice
OUT_DIR = os.path.join("public", "audio", "words")
VOCAB_PATH = os.path.join("src", "data", "vocabulary.json")

os.makedirs(OUT_DIR, exist_ok=True)

with open(VOCAB_PATH, "r", encoding="utf-8") as f:
    vocab = json.load(f)

semaphore = asyncio.Semaphore(8) # 8 concurrent requests

async def generate_word_audio(word_item):
    wid = word_item["id"]
    fr_text = word_item["fr"]
    out_file = os.path.join(OUT_DIR, f"{wid}.mp3")

    if os.path.exists(out_file) and os.path.getsize(out_file) > 1000:
        return # already generated

    # Clean text (remove slashes, brackets)
    clean_text = fr_text.replace('/', ' ou ').replace('\\', '').strip()
    
    async with semaphore:
        try:
            communicate = edge_tts.Communicate(clean_text, VOICE, rate="-5%")
            await communicate.save(out_file)
        except Exception as e:
            print(f"Error on {wid} ({clean_text}): {e}")

async def main():
    print(f"Starting audio generation for {len(vocab)} vocabulary words using {VOICE}...")
    tasks = [generate_word_audio(item) for item in vocab]
    
    # Process with progress tracking
    total = len(tasks)
    chunk_size = 50
    for i in range(0, total, chunk_size):
        chunk = tasks[i:i + chunk_size]
        await asyncio.gather(*chunk)
        completed = min(i + chunk_size, total)
        print(f"Progress: {completed}/{total} audio files processed...")

    print("All audio files generated successfully in public/audio/words/!")

if __name__ == "__main__":
    asyncio.run(main())
