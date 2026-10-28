import asyncio
import os
import edge_tts

VOICE = "fr-CA-SylvieNeural"  # Canadian French (Quebec) friendly studio voice
OUT_DIR = os.path.join("public", "audio", "categories")

os.makedirs(OUT_DIR, exist_ok=True)

CATEGORIES = [
    (1, "Les effets sonores et les bruits"),
    (2, "Les animaux"),
    (3, "Les véhicules"),
    (4, "Les jouets"),
    (5, "La nourriture et les boissons"),
    (6, "Les vêtements"),
    (7, "Les parties du corps"),
    (8, "Les objets de la maison"),
    (9, "Les meubles et les pièces"),
    (10, "Les choses de dehors"),
    (11, "Les endroits où aller"),
    (12, "La famille et les personnes"),
    (13, "Les jeux et la routine"),
    (14, "Les verbes et les actions"),
    (15, "Les mots descriptifs"),
    (16, "Le temps et les moments"),
    (17, "Les pronoms"),
    (18, "Les questions"),
    (19, "Les prépositions et les positions"),
    (20, "Les quantités et les chiffres"),
    (21, "Les petits mots de liaison"),
]

async def generate_category_audio(cat_id, text):
    out_file = os.path.join(OUT_DIR, f"cat_{cat_id}.mp3")
    try:
        communicate = edge_tts.Communicate(text, VOICE, rate="-5%")
        await communicate.save(out_file)
        print(f"Generated cat_{cat_id}.mp3 for '{text}'")
    except Exception as e:
        print(f"Error on cat_{cat_id}: {e}")

async def main():
    print(f"Generating studio Canadian French MP3s for all 21 categories using {VOICE}...")
    tasks = [generate_category_audio(cat_id, text) for cat_id, text in CATEGORIES]
    await asyncio.gather(*tasks)
    print(f"All category audio files generated successfully in {OUT_DIR}!")

if __name__ == "__main__":
    asyncio.run(main())
