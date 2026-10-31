import asyncio
import json
import os
import re
import unicodedata
import edge_tts

VOICE = "fr-CA-SylvieNeural" # Canadian French (Quebec) friendly studio voice
OUT_DIR = os.path.join("public", "audio", "words")
GRAMMAR_PATH = os.path.join("src", "data", "grammarPairs.json")

os.makedirs(OUT_DIR, exist_ok=True)

def slugify(text: str) -> str:
    # Normalize and remove accents for filename slug
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')
    text = re.sub(r'[^\w\s-]', '', text.lower()).strip()
    return re.sub(r'[-\s]+', '_', text)

def clean_french_text(text: str) -> str:
    if not text:
        return ""
    cleaned = (
        text.replace('/', ' ou ')
        .replace('\\', '')
        .replace('&', ' et ')
        .replace('pis', 'puis')
        .replace('(', '')
        .replace(')', '')
        .replace('?', '')
        .strip()
    )
    return cleaned

semaphore = asyncio.Semaphore(8)

async def generate_file(filename: str, text: str):
    out_file = os.path.join(OUT_DIR, filename)
    if os.path.exists(out_file) and os.path.getsize(out_file) > 1000:
        return # already generated
    clean_text = clean_french_text(text)
    if not clean_text:
        return
    async with semaphore:
        try:
            communicate = edge_tts.Communicate(clean_text, VOICE, rate="-5%")
            await communicate.save(out_file)
            print(f"Generated {filename}: {clean_text}")
        except Exception as e:
            print(f"Error on {filename} ({clean_text}): {e}")

async def main():
    tasks = []

    # 1. Grammar Pairs (Sentences)
    with open(GRAMMAR_PATH, "r", encoding="utf-8") as f:
        pairs = json.load(f)

    for p in pairs:
        pid = p["id"]
        # Level 1 sentence
        tasks.append(generate_file(f"pair_{pid}_l1.mp3", p["level1"]))
        # Level 2 sentence
        tasks.append(generate_file(f"pair_{pid}_l2.mp3", p["level2"]))

        # Block words
        for b in p.get("blocks", []):
            b_clean = re.sub(r'[,.?!]', '', b).strip()
            if b_clean:
                slug = slugify(b_clean)
                tasks.append(generate_file(f"block_{slug}.mp3", b_clean))

    # 2. Simon Says prompts and feedback
    simon_items = {
        "simon_prompt_nez": "Simon dit : Touche le nez !",
        "simon_prompt_yeux": "Simon dit : Touche les yeux !",
        "simon_prompt_bouche": "Simon dit : Touche la bouche !",
        "simon_prompt_oreilles": "Simon dit : Touche les oreilles !",
        "simon_prompt_mains": "Simon dit : Touche les mains !",
        "simon_prompt_jump": "Simon dit : Saute ! Saute !",
        "simon_prompt_sleep": "Simon dit : Fais dodo !",
        "simon_prompt_eat": "Simon dit : Miam miam ! Mange !",
        "simon_prompt_dance": "Simon dit : Danse !",

        "simon_retry_nez": "Touche le nez !",
        "simon_retry_yeux": "Touche les yeux !",
        "simon_retry_bouche": "Touche la bouche !",
        "simon_retry_oreilles": "Touche les oreilles !",
        "simon_retry_mains": "Touche les mains !",
        "simon_retry_jump": "Saute ! Saute !",
        "simon_retry_sleep": "Fais dodo !",
        "simon_retry_eat": "Miam miam ! Mange !",
        "simon_retry_dance": "Danse !",

        "simon_bravo": "Bravo ! C'est super !"
    }

    for key, text in simon_items.items():
        tasks.append(generate_file(f"{key}.mp3", text))

    print(f"Total audio files to process: {len(tasks)}")
    
    # Process in chunks of 20
    chunk_size = 20
    for i in range(0, len(tasks), chunk_size):
        chunk = tasks[i:i + chunk_size]
        await asyncio.gather(*chunk)
        print(f"Progress: {min(i + chunk_size, len(tasks))}/{len(tasks)} done")

    print("All activity audio files generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
