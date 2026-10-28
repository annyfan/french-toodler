import asyncio
import edge_tts
import os

async def test():
    os.makedirs('public/audio/words', exist_ok=True)
    words = [('ani_08', 'Le chat'), ('ani_11', 'Le chien'), ('fur_04', 'Le divan'), ('foo_46', 'La pomme')]
    for wid, text in words:
        communicate = edge_tts.Communicate(text, "fr-CA-SylvieNeural")
        await communicate.save(f"public/audio/words/{wid}.mp3")
        print(f"Generated {wid}: {text}")

asyncio.run(test())
