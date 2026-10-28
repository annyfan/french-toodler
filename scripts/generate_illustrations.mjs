import fs from 'fs';
import path from 'path';

const VOCAB_PATH = path.resolve('src/data/vocabulary.json');
const SCENES_PATH = path.resolve('src/data/scenes.json');
const OUT_DIR = path.resolve('public/illustrations');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const words = JSON.parse(fs.readFileSync(VOCAB_PATH, 'utf-8'));

// 1. Bespoke Hand-crafted SVG Illustrations for key toddler items & room scenes
const BESPOKE_SVGS = {
  'fur_divan.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="80" cy="112" rx="68" ry="8" fill="rgba(0,0,0,0.12)" />
    <!-- Wooden Legs -->
    <polygon points="26,92 20,110 28,110 32,92" fill="#8B5A2B" />
    <polygon points="134,92 128,110 136,110 140,92" fill="#8B5A2B" />
    <polygon points="46,92 44,106 50,106 52,92" fill="#6B4226" />
    <polygon points="114,92 110,106 116,106 118,92" fill="#6B4226" />
    <!-- Main Couch Backrest -->
    <rect x="18" y="24" width="124" height="64" rx="28" fill="#F4A261" stroke="#E76F51" stroke-width="4" />
    <path d="M 32 30 Q 80 38 128 30" stroke="#F8B279" stroke-width="3" fill="none" stroke-linecap="round" />
    <!-- Left Armrest -->
    <rect x="10" y="44" width="28" height="52" rx="14" fill="#E76F51" stroke="#C44525" stroke-width="3" />
    <ellipse cx="24" cy="52" rx="10" ry="6" fill="#F4A261" />
    <!-- Right Armrest -->
    <rect x="122" y="44" width="28" height="52" rx="14" fill="#E76F51" stroke="#C44525" stroke-width="3" />
    <ellipse cx="136" cy="52" rx="10" ry="6" fill="#F4A261" />
    <!-- Seat Cushions -->
    <rect x="28" y="58" width="50" height="38" rx="12" fill="#E9C46A" stroke="#E76F51" stroke-width="3" />
    <rect x="82" y="58" width="50" height="38" rx="12" fill="#E9C46A" stroke="#E76F51" stroke-width="3" />
    <!-- Cute Throw Pillows -->
    <!-- Pillow 1 (Teal Polka-dot) -->
    <rect x="32" y="50" width="26" height="24" rx="7" transform="rotate(-10 45 62)" fill="#2A9D8F" stroke="#264653" stroke-width="2" />
    <circle cx="40" cy="58" r="2" fill="#E9C46A" />
    <circle cx="48" cy="64" r="2" fill="#E9C46A" />
    <!-- Pillow 2 (Heart Pillow) -->
    <path d="M 112 50 C 112 44 122 42 122 48 C 122 54 112 62 112 62 C 112 62 102 54 102 48 C 102 42 112 44 112 50 Z" fill="#E63946" stroke="#9B2226" stroke-width="2" />
  </svg>`,

  'fur_television.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="70" cy="114" rx="48" ry="6" fill="rgba(0,0,0,0.15)" />
    <!-- Antennas -->
    <line x1="70" y1="30" x2="44" y2="8" stroke="#6C757D" stroke-width="4" stroke-linecap="round" />
    <line x1="70" y1="30" x2="96" y2="8" stroke="#6C757D" stroke-width="4" stroke-linecap="round" />
    <circle cx="44" cy="8" r="5" fill="#E63946" />
    <circle cx="96" cy="8" r="5" fill="#E63946" />
    <!-- TV Legs -->
    <polygon points="34,92 24,112 32,112 40,92" fill="#6B4226" />
    <polygon points="106,92 100,112 108,112 116,92" fill="#6B4226" />
    <!-- Outer TV Body (Retro Mint) -->
    <rect x="20" y="24" width="100" height="74" rx="20" fill="#2A9D8F" stroke="#1D6F65" stroke-width="4" />
    <!-- Screen Bezel -->
    <rect x="28" y="32" width="66" height="58" rx="14" fill="#1D3557" />
    <!-- Screen Face (Cute Smiley Display) -->
    <rect x="31" y="35" width="60" height="52" rx="10" fill="#A8DADC" />
    <!-- Happy eyes & mouth -->
    <circle cx="50" cy="56" r="4" fill="#1D3557" />
    <circle cx="72" cy="56" r="4" fill="#1D3557" />
    <circle cx="51" cy="54" r="1.5" fill="#FFFFFF" />
    <circle cx="73" cy="54" r="1.5" fill="#FFFFFF" />
    <path d="M 54 65 Q 61 74 68 65" stroke="#1D3557" stroke-width="3" fill="none" stroke-linecap="round" />
    <ellipse cx="44" cy="62" rx="3" ry="2" fill="#F4A261" />
    <ellipse cx="78" cy="62" rx="3" ry="2" fill="#F4A261" />
    <!-- Control Dials -->
    <circle cx="106" cy="44" r="7" fill="#E9C46A" stroke="#C9A24D" stroke-width="2" />
    <circle cx="106" cy="64" r="7" fill="#E76F51" stroke="#B84931" stroke-width="2" />
    <!-- Speaker Grille -->
    <line x1="99" y1="80" x2="113" y2="80" stroke="#1D6F65" stroke-width="2" stroke-linecap="round" />
    <line x1="99" y1="85" x2="113" y2="85" stroke="#1D6F65" stroke-width="2" stroke-linecap="round" />
  </svg>`,

  'hou_lampe.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 130" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="50" cy="124" rx="30" ry="5" fill="rgba(0,0,0,0.12)" />
    <!-- Base -->
    <ellipse cx="50" cy="120" rx="22" ry="7" fill="#E76F51" stroke="#9B2226" stroke-width="3" />
    <!-- Pole -->
    <line x1="50" y1="120" x2="50" y2="52" stroke="#6C757D" stroke-width="6" stroke-linecap="round" />
    <!-- Warm Light Glow Background -->
    <ellipse cx="50" cy="54" rx="42" ry="24" fill="#FFEAA7" opacity="0.45" />
    <!-- Lamp Shade -->
    <polygon points="32,54 68,54 78,20 22,20" fill="#FFD166" stroke="#E76F51" stroke-width="3" />
    <ellipse cx="50" cy="20" rx="28" ry="6" fill="#F4A261" />
    <ellipse cx="50" cy="54" rx="18" ry="5" fill="#FFEAA7" stroke="#E76F51" stroke-width="2" />
    <!-- Cute Pull Cord with Bead -->
    <line x1="62" y1="54" x2="62" y2="72" stroke="#4A5568" stroke-width="2" />
    <circle cx="62" cy="74" r="3.5" fill="#E63946" />
    <!-- Cute stars on lampshade -->
    <circle cx="50" cy="36" r="3" fill="#E63946" />
    <circle cx="36" cy="38" r="2.5" fill="#2A9D8F" />
    <circle cx="64" cy="38" r="2.5" fill="#2A9D8F" />
  </svg>`,

  'fur_table.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="80" cy="112" rx="66" ry="8" fill="rgba(0,0,0,0.15)" />
    <!-- Table Legs -->
    <polygon points="26,58 20,110 28,110 34,58" fill="#8B5A2B" />
    <polygon points="46,58 42,104 48,104 52,58" fill="#6B4226" />
    <polygon points="114,58 110,104 116,104 120,58" fill="#6B4226" />
    <polygon points="134,58 126,110 134,110 140,58" fill="#8B5A2B" />
    <!-- Table Top Wood Board -->
    <ellipse cx="80" cy="56" rx="68" ry="20" fill="#DDB892" stroke="#8B5A2B" stroke-width="4" />
    <!-- Checkered / Gingham Tablecloth -->
    <path d="M 24 54 Q 80 66 136 54 L 140 76 Q 110 82 80 78 Q 50 82 20 76 Z" fill="#FFD166" stroke="#E76F51" stroke-width="3" />
    <!-- Tablecloth Pattern Dots / Checks -->
    <circle cx="40" cy="65" r="3" fill="#E76F51" />
    <circle cx="60" cy="68" r="3" fill="#E76F51" />
    <circle cx="80" cy="69" r="3" fill="#E76F51" />
    <circle cx="100" cy="68" r="3" fill="#E76F51" />
    <circle cx="120" cy="65" r="3" fill="#E76F51" />
  </svg>`,

  'fur_chaise.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 130" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="50" cy="124" rx="34" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Back Legs -->
    <polygon points="32,70 26,122 32,122 36,70" fill="#6B4226" />
    <polygon points="68,70 64,122 70,122 74,70" fill="#6B4226" />
    <!-- Chair Backrest Posts -->
    <line x1="30" y1="20" x2="32" y2="70" stroke="#8B5A2B" stroke-width="6" stroke-linecap="round" />
    <line x1="70" y1="20" x2="68" y2="70" stroke="#8B5A2B" stroke-width="6" stroke-linecap="round" />
    <!-- Top Backrest Arch -->
    <path d="M 24 30 Q 50 16 76 30" stroke="#8B5A2B" stroke-width="8" fill="none" stroke-linecap="round" />
    <line x1="42" y1="26" x2="42" y2="68" stroke="#DDB892" stroke-width="4" stroke-linecap="round" />
    <line x1="58" y1="26" x2="58" y2="68" stroke="#DDB892" stroke-width="4" stroke-linecap="round" />
    <!-- Front Legs -->
    <polygon points="24,76 18,122 26,122 30,76" fill="#8B5A2B" />
    <polygon points="76,76 72,122 80,122 84,76" fill="#8B5A2B" />
    <!-- Padded Seat -->
    <rect x="18" y="66" width="64" height="18" rx="8" fill="#E76F51" stroke="#9B2226" stroke-width="3" />
    <ellipse cx="50" cy="74" rx="26" ry="6" fill="#F4A261" />
  </svg>`,

  'fur_frigidaire.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 150" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="55" cy="144" rx="42" ry="6" fill="rgba(0,0,0,0.14)" />
    <!-- Fridge Feet -->
    <rect x="24" y="136" width="10" height="6" rx="2" fill="#4A5568" />
    <rect x="76" y="136" width="10" height="6" rx="2" fill="#4A5568" />
    <!-- Main Refrigerator Body (Mint Blue/Green) -->
    <rect x="18" y="12" width="74" height="126" rx="16" fill="#A8DADC" stroke="#457B9D" stroke-width="4" />
    <!-- Door Divider Line -->
    <line x1="18" y1="52" x2="92" y2="52" stroke="#457B9D" stroke-width="3" />
    <!-- Top Freezer Handle -->
    <rect x="24" y="32" width="5" height="14" rx="2.5" fill="#F1FAEE" stroke="#1D3557" stroke-width="1.5" />
    <!-- Bottom Main Door Handle -->
    <rect x="24" y="62" width="5" height="24" rx="2.5" fill="#F1FAEE" stroke="#1D3557" stroke-width="1.5" />
    <!-- Cute Fridge Magnets -->
    <!-- Strawberry magnet -->
    <circle cx="58" cy="34" r="6" fill="#E63946" />
    <polygon points="56,27 60,27 58,25" fill="#2A9D8F" />
    <!-- Yellow star magnet -->
    <polygon points="46,74 49,80 56,80 50,84 52,90 46,86 40,90 42,84 36,80 43,80" fill="#FFD166" />
    <!-- Cute photo/note with red pin -->
    <rect x="62" y="70" width="20" height="22" rx="2" fill="#FFFFFF" stroke="#CCD6DD" stroke-width="1" />
    <circle cx="72" cy="73" r="2" fill="#E63946" />
    <path d="M 66 82 Q 72 86 78 82" stroke="#2A9D8F" stroke-width="1.5" fill="none" />
  </svg>`,

  'fur_lit.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="80" cy="114" rx="68" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Wooden Bed Frame Back (Headboard) -->
    <rect x="16" y="24" width="22" height="88" rx="8" fill="#8B5A2B" stroke="#6B4226" stroke-width="3" />
    <circle cx="27" cy="22" r="7" fill="#DDB892" stroke="#8B5A2B" stroke-width="2" />
    <!-- Wooden Footboard -->
    <rect x="134" y="52" width="16" height="60" rx="6" fill="#8B5A2B" stroke="#6B4226" stroke-width="3" />
    <circle cx="142" cy="50" r="5" fill="#DDB892" stroke="#8B5A2B" stroke-width="2" />
    <!-- Mattress & Bedding Base -->
    <rect x="28" y="70" width="112" height="34" rx="8" fill="#DDB892" stroke="#8B5A2B" stroke-width="3" />
    <!-- Cozy Pillows -->
    <ellipse cx="48" cy="62" rx="16" ry="10" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2" transform="rotate(-5 48 62)" />
    <ellipse cx="44" cy="58" rx="14" ry="9" fill="#E0F2FE" stroke="#BAE6FD" stroke-width="2" />
    <!-- Quilt / Duvet (Polka Dot Sky Blue) -->
    <path d="M 54 66 L 138 66 L 138 98 L 54 98 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="3" />
    <!-- Folded top sheet -->
    <rect x="54" y="66" width="18" height="32" rx="4" fill="#FEF08A" stroke="#EAB308" stroke-width="2" />
    <!-- Quilt Star Pattern -->
    <polygon points="90,74 92,78 96,78 93,81 94,85 90,82 86,85 87,81 84,78 88,78" fill="#FFFFFF" />
    <polygon points="118,80 120,84 124,84 121,87 122,91 118,88 114,91 115,87 112,84 116,84" fill="#FFFFFF" />
  </svg>`,

  'fur_garderobe.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 150" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="60" cy="144" rx="48" ry="6" fill="rgba(0,0,0,0.14)" />
    <!-- Wardrobe Legs -->
    <rect x="22" y="136" width="12" height="8" rx="3" fill="#6B4226" />
    <rect x="86" y="136" width="12" height="8" rx="3" fill="#6B4226" />
    <!-- Main Wardrobe Body -->
    <rect x="18" y="20" width="84" height="118" rx="10" fill="#DDB892" stroke="#8B5A2B" stroke-width="4" />
    <!-- Crown Molding Top Arch -->
    <path d="M 14 26 C 36 12 84 12 106 26 Z" fill="#B08968" stroke="#8B5A2B" stroke-width="3" />
    <!-- Doors Center Split -->
    <line x1="60" y1="26" x2="60" y2="114" stroke="#8B5A2B" stroke-width="3" />
    <!-- Left Door Panel -->
    <rect x="24" y="32" width="30" height="76" rx="4" fill="#E6CCB2" stroke="#8B5A2B" stroke-width="2" />
    <circle cx="53" cy="72" r="3.5" fill="#7F5539" />
    <!-- Right Door Panel -->
    <rect x="66" y="32" width="30" height="76" rx="4" fill="#E6CCB2" stroke="#8B5A2B" stroke-width="2" />
    <circle cx="67" cy="72" r="3.5" fill="#7F5539" />
    <!-- Bottom Drawer -->
    <rect x="24" y="116" width="72" height="16" rx="4" fill="#B08968" stroke="#8B5A2B" stroke-width="2" />
    <rect x="52" y="122" width="16" height="4" rx="2" fill="#7F5539" />
  </svg>`,

  'out_arbre.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 160" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="70" cy="152" rx="46" ry="7" fill="rgba(0,0,0,0.15)" />
    <!-- Tree Trunk -->
    <path d="M 60 90 L 54 150 Q 70 154 86 150 L 80 90 Z" fill="#8B5A2B" stroke="#6B4226" stroke-width="4" />
    <path d="M 66 110 Q 72 124 68 140" stroke="#6B4226" stroke-width="3" fill="none" stroke-linecap="round" />
    <!-- Foliage Layers (Lush Rounded Clouds) -->
    <circle cx="70" cy="62" r="46" fill="#2D6A4F" />
    <circle cx="44" cy="74" r="32" fill="#40916C" />
    <circle cx="96" cy="74" r="32" fill="#40916C" />
    <circle cx="70" cy="46" r="34" fill="#52B788" />
    <circle cx="48" cy="46" r="26" fill="#74C69D" />
    <circle cx="92" cy="46" r="26" fill="#74C69D" />
    <!-- Juicy Red Apples in the Tree -->
    <circle cx="46" cy="50" r="5" fill="#E63946" />
    <circle cx="88" cy="54" r="5" fill="#E63946" />
    <circle cx="64" cy="32" r="5" fill="#E63946" />
    <circle cx="74" cy="70" r="5" fill="#E63946" />
  </svg>`,

  'out_soleil.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
    <!-- Sun Rays (Alternating playful rounded shapes) -->
    <g fill="#FFAA00" stroke="#FF8800" stroke-width="2">
      <circle cx="60" cy="14" r="8" />
      <circle cx="60" cy="106" r="8" />
      <circle cx="14" cy="60" r="8" />
      <circle cx="106" cy="60" r="8" />
      <circle cx="28" cy="28" r="7" />
      <circle cx="92" cy="92" r="7" />
      <circle cx="28" cy="92" r="7" />
      <circle cx="92" cy="28" r="7" />
    </g>
    <!-- Sun Core Face -->
    <circle cx="60" cy="60" r="38" fill="#FFD166" stroke="#FF9F1C" stroke-width="4" />
    <!-- Anime/Toddler Eyes -->
    <ellipse cx="48" cy="54" rx="5" ry="6" fill="#1D3557" />
    <ellipse cx="72" cy="54" rx="5" ry="6" fill="#1D3557" />
    <circle cx="50" cy="52" r="2" fill="#FFFFFF" />
    <circle cx="74" cy="52" r="2" fill="#FFFFFF" />
    <!-- Rosy Cheeks -->
    <ellipse cx="42" cy="62" rx="5" ry="3" fill="#FF85A1" />
    <ellipse cx="78" cy="62" rx="5" ry="3" fill="#FF85A1" />
    <!-- Warm Smiling Mouth -->
    <path d="M 52 65 Q 60 74 68 65" stroke="#1D3557" stroke-width="3.5" fill="none" stroke-linecap="round" />
  </svg>`,

  'out_nuage.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 90" width="100%" height="100%">
    <!-- Cloud Shadow -->
    <ellipse cx="65" cy="80" rx="50" ry="8" fill="rgba(0,0,0,0.08)" />
    <!-- Puffy Cloud Body -->
    <path d="M 32 64 C 18 64 12 48 24 38 C 22 24 38 16 50 24 C 60 12 80 12 90 24 C 104 16 118 28 114 42 C 124 52 118 64 104 64 Z" fill="#FFFFFF" stroke="#90E0EF" stroke-width="4" />
    <!-- Cute Eyes -->
    <circle cx="52" cy="46" r="3.5" fill="#1D3557" />
    <circle cx="76" cy="46" r="3.5" fill="#1D3557" />
    <!-- Rosy Cheeks -->
    <ellipse cx="44" cy="50" rx="4" ry="2.5" fill="#FFB4D6" />
    <ellipse cx="84" cy="50" rx="4" ry="2.5" fill="#FFB4D6" />
    <!-- Smile -->
    <path d="M 58 52 Q 64 58 70 52" stroke="#1D3557" stroke-width="2.5" fill="none" stroke-linecap="round" />
  </svg>`,

  'out_balancoire.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 140" width="100%" height="100%">
    <!-- Top Tree Branch or Bar -->
    <line x1="10" y1="18" x2="110" y2="18" stroke="#8B5A2B" stroke-width="10" stroke-linecap="round" />
    <circle cx="36" cy="18" r="4" fill="#2D6A4F" />
    <circle cx="84" cy="18" r="4" fill="#2D6A4F" />
    <!-- Swing Ropes -->
    <line x1="36" y1="18" x2="36" y2="100" stroke="#DDA15E" stroke-width="4" stroke-linecap="round" />
    <line x1="84" y1="18" x2="84" y2="100" stroke="#DDA15E" stroke-width="4" stroke-linecap="round" />
    <!-- Little green leaves on rope -->
    <path d="M 36 45 Q 44 42 42 48 Z" fill="#52B788" />
    <path d="M 84 60 Q 76 56 78 63 Z" fill="#52B788" />
    <!-- Wooden Plank Seat -->
    <rect x="24" y="98" width="72" height="14" rx="5" fill="#BC6C25" stroke="#6B4226" stroke-width="3" />
    <ellipse cx="60" cy="102" rx="30" ry="3" fill="#DDA15E" />
  </svg>`,

  'ani_chat.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 110" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="55" cy="102" rx="36" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Curled Tail -->
    <path d="M 82 86 C 96 86 102 68 96 58 C 92 52 86 56 88 62 C 90 66 86 78 78 80" stroke="#F4A261" stroke-width="8" fill="none" stroke-linecap="round" />
    <!-- Cat Body -->
    <ellipse cx="55" cy="74" rx="28" ry="24" fill="#F4A261" stroke="#E76F51" stroke-width="3" />
    <!-- Cat Ears -->
    <polygon points="34,44 26,16 50,30" fill="#F4A261" stroke="#E76F51" stroke-width="3" stroke-linejoin="round" />
    <polygon points="76,44 84,16 60,30" fill="#F4A261" stroke="#E76F51" stroke-width="3" stroke-linejoin="round" />
    <polygon points="35,40 30,22 46,31" fill="#FFB4D6" />
    <polygon points="75,40 80,22 64,31" fill="#FFB4D6" />
    <!-- Head -->
    <circle cx="55" cy="52" r="28" fill="#F4A261" stroke="#E76F51" stroke-width="3" />
    <!-- Big Sparkling Anime Eyes -->
    <ellipse cx="44" cy="48" rx="6" ry="7" fill="#264653" />
    <ellipse cx="66" cy="48" rx="6" ry="7" fill="#264653" />
    <circle cx="46" cy="45" r="2.5" fill="#FFFFFF" />
    <circle cx="68" cy="45" r="2.5" fill="#FFFFFF" />
    <!-- Pink Nose & Cute Whiskers -->
    <polygon points="55,56 52,60 58,60" fill="#E63946" />
    <path d="M 52 60 Q 55 65 50 67" stroke="#264653" stroke-width="2" fill="none" />
    <path d="M 58 60 Q 55 65 60 67" stroke="#264653" stroke-width="2" fill="none" />
    <line x1="26" y1="56" x2="40" y2="57" stroke="#264653" stroke-width="2" stroke-linecap="round" />
    <line x1="26" y1="62" x2="40" y2="61" stroke="#264653" stroke-width="2" stroke-linecap="round" />
    <line x1="84" y1="56" x2="70" y2="57" stroke="#264653" stroke-width="2" stroke-linecap="round" />
    <line x1="84" y1="62" x2="70" y2="61" stroke="#264653" stroke-width="2" stroke-linecap="round" />
  </svg>`,

  'ani_chien.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 110" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="55" cy="102" rx="36" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Wagging Tail -->
    <path d="M 80 78 Q 96 60 92 50" stroke="#B08968" stroke-width="8" fill="none" stroke-linecap="round" />
    <!-- Body -->
    <ellipse cx="55" cy="74" rx="28" ry="24" fill="#DDB892" stroke="#B08968" stroke-width="3" />
    <!-- Floppy Puppy Ears -->
    <path d="M 28 36 C 14 36 10 68 24 74 C 32 70 34 50 32 36 Z" fill="#9C6644" stroke="#7F5539" stroke-width="2.5" />
    <path d="M 82 36 C 96 36 100 68 86 74 C 78 70 76 50 78 36 Z" fill="#9C6644" stroke="#7F5539" stroke-width="2.5" />
    <!-- Head -->
    <circle cx="55" cy="50" r="28" fill="#DDB892" stroke="#B08968" stroke-width="3" />
    <!-- Big Friendly Eyes -->
    <ellipse cx="44" cy="46" rx="5" ry="6" fill="#2C3E50" />
    <ellipse cx="66" cy="46" rx="5" ry="6" fill="#2C3E50" />
    <circle cx="46" cy="44" r="2" fill="#FFFFFF" />
    <circle cx="68" cy="44" r="2" fill="#FFFFFF" />
    <!-- Big Shiny Dog Nose -->
    <ellipse cx="55" cy="58" rx="8" ry="6" fill="#2C3E50" />
    <circle cx="57" cy="56" r="2" fill="#FFFFFF" />
    <!-- Cute Happy Tongue -->
    <path d="M 52 64 C 52 74 58 74 58 64 Z" fill="#FF6B6B" stroke="#E63946" stroke-width="1.5" />
  </svg>`,

  'ani_oiseau.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="50" cy="94" rx="24" ry="4" fill="rgba(0,0,0,0.12)" />
    <!-- Feet -->
    <line x1="44" y1="74" x2="44" y2="92" stroke="#F4A261" stroke-width="3" stroke-linecap="round" />
    <line x1="56" y1="74" x2="56" y2="92" stroke="#F4A261" stroke-width="3" stroke-linecap="round" />
    <!-- Plump Blue Body -->
    <circle cx="50" cy="52" r="28" fill="#48CAE4" stroke="#0077B6" stroke-width="3" />
    <circle cx="44" cy="58" r="18" fill="#90E0EF" />
    <!-- Cute Wing -->
    <ellipse cx="36" cy="56" rx="14" ry="10" fill="#0096C7" stroke="#0077B6" stroke-width="2" transform="rotate(-15 36 56)" />
    <!-- Big Eye -->
    <circle cx="62" cy="46" r="5" fill="#1D3557" />
    <circle cx="64" cy="44" r="2" fill="#FFFFFF" />
    <!-- Orange Beak -->
    <polygon points="74,50 88,54 74,60" fill="#FFB703" stroke="#FB8500" stroke-width="2" />
    <!-- Musical Note -->
    <path d="M 76 26 L 86 20 L 86 36 M 86 36 A 4 4 0 1 1 82 32" stroke="#E63946" stroke-width="2.5" fill="#E63946" stroke-linecap="round" />
  </svg>`,

  'ani_ecureuil.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 110" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="55" cy="102" rx="34" ry="5" fill="rgba(0,0,0,0.12)" />
    <!-- Huge Fluffy Tail -->
    <path d="M 40 80 C 10 70 8 20 40 18 C 56 16 54 36 44 48 C 38 56 46 72 54 78 Z" fill="#9C6644" stroke="#7F5539" stroke-width="3" />
    <!-- Body -->
    <ellipse cx="62" cy="74" rx="22" ry="24" fill="#B08968" stroke="#7F5539" stroke-width="3" />
    <ellipse cx="66" cy="76" rx="14" ry="16" fill="#EDE0D4" />
    <!-- Head -->
    <circle cx="66" cy="46" r="18" fill="#B08968" stroke="#7F5539" stroke-width="3" />
    <polygon points="68,30 64,18 76,26" fill="#B08968" stroke="#7F5539" stroke-width="2" />
    <!-- Big Eye -->
    <circle cx="72" cy="44" r="4" fill="#2C3E50" />
    <circle cx="73" cy="43" r="1.5" fill="#FFFFFF" />
    <!-- Nose & Mouth -->
    <circle cx="82" cy="48" r="2.5" fill="#2C3E50" />
    <!-- Holding Acorn -->
    <ellipse cx="76" cy="68" rx="7" ry="9" fill="#7F5539" stroke="#583101" stroke-width="1.5" />
    <path d="M 69 64 Q 76 60 83 64 Z" fill="#583101" />
  </svg>`,

  'toy_livre.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="60" cy="94" rx="46" ry="5" fill="rgba(0,0,0,0.14)" />
    <!-- Book Cover Spine (Red/Purple) -->
    <path d="M 16 36 Q 60 44 60 44 Q 60 44 104 36 L 106 82 Q 60 90 60 90 Q 60 90 14 82 Z" fill="#7209B7" stroke="#480CA8" stroke-width="3" />
    <!-- White Pages Left -->
    <path d="M 18 34 Q 60 40 60 40 L 60 84 Q 18 78 18 34 Z" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2" />
    <!-- White Pages Right -->
    <path d="M 102 34 Q 60 40 60 40 L 60 84 Q 102 78 102 34 Z" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2" />
    <!-- Cute Rainbow on Left Page -->
    <path d="M 30 60 A 12 12 0 0 1 48 60" stroke="#FF595E" stroke-width="3" fill="none" />
    <path d="M 33 60 A 9 9 0 0 1 45 60" stroke="#FFCA3A" stroke-width="3" fill="none" />
    <path d="M 36 60 A 6 6 0 0 1 42 60" stroke="#1982C4" stroke-width="3" fill="none" />
    <!-- Lines of Text / Magic Star on Right Page -->
    <line x1="68" y1="50" x2="94" y2="50" stroke="#94A3B8" stroke-width="3" stroke-linecap="round" />
    <line x1="68" y1="58" x2="90" y2="58" stroke="#94A3B8" stroke-width="3" stroke-linecap="round" />
    <line x1="68" y1="66" x2="84" y2="66" stroke="#94A3B8" stroke-width="3" stroke-linecap="round" />
    <!-- Ribbon Bookmark -->
    <path d="M 60 40 L 60 92 L 64 88 L 68 92 L 68 40 Z" fill="#E63946" />
  </svg>`,

  'toy_ballon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 110" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="55" cy="102" rx="36" ry="6" fill="rgba(0,0,0,0.15)" />
    <!-- Ball Core Sphere -->
    <circle cx="55" cy="54" r="44" fill="#3A86FF" stroke="#1D3557" stroke-width="3.5" />
    <!-- Vibrant Curved Beach Ball Stripes -->
    <path d="M 55 10 C 35 24 25 54 28 80 C 16 68 12 40 24 22 Z" fill="#FF006E" />
    <path d="M 55 10 C 68 24 78 48 76 78 C 88 66 94 44 84 22 Z" fill="#FFBE0B" />
    <path d="M 28 80 C 44 94 70 92 76 78 C 65 60 45 60 28 80 Z" fill="#06D6A0" />
    <!-- Top Cap -->
    <ellipse cx="55" cy="14" rx="10" ry="5" fill="#FFFFFF" stroke="#1D3557" stroke-width="2" />
    <!-- Glossy Reflection Highlight -->
    <ellipse cx="42" cy="30" rx="8" ry="14" fill="#FFFFFF" opacity="0.45" transform="rotate(-30 42 30)" />
  </svg>`,

  'toy_toutou.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 120" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="55" cy="114" rx="36" ry="5" fill="rgba(0,0,0,0.12)" />
    <!-- Round Ears -->
    <circle cx="32" cy="30" r="14" fill="#B08968" stroke="#7F5539" stroke-width="3" />
    <circle cx="32" cy="30" r="7" fill="#DDB892" />
    <circle cx="78" cy="30" r="14" fill="#B08968" stroke="#7F5539" stroke-width="3" />
    <circle cx="78" cy="30" r="7" fill="#DDB892" />
    <!-- Body -->
    <ellipse cx="55" cy="80" rx="30" ry="26" fill="#B08968" stroke="#7F5539" stroke-width="3" />
    <ellipse cx="55" cy="82" rx="18" ry="16" fill="#DDB892" />
    <!-- Cute Red Bow Tie -->
    <polygon points="45,64 55,68 45,72" fill="#E63946" stroke="#9B2226" stroke-width="2" />
    <polygon points="65,64 55,68 65,72" fill="#E63946" stroke="#9B2226" stroke-width="2" />
    <circle cx="55" cy="68" r="3" fill="#D62828" />
    <!-- Head -->
    <circle cx="55" cy="48" r="28" fill="#B08968" stroke="#7F5539" stroke-width="3" />
    <!-- Eyes -->
    <circle cx="44" cy="44" r="4.5" fill="#2C3E50" />
    <circle cx="66" cy="44" r="4.5" fill="#2C3E50" />
    <circle cx="45" cy="42" r="1.5" fill="#FFFFFF" />
    <circle cx="67" cy="42" r="1.5" fill="#FFFFFF" />
    <!-- Snout & Nose -->
    <ellipse cx="55" cy="54" rx="12" ry="8" fill="#DDB892" />
    <ellipse cx="55" cy="52" rx="5" ry="3.5" fill="#2C3E50" />
    <path d="M 52 56 Q 55 60 58 56" stroke="#2C3E50" stroke-width="2" fill="none" stroke-linecap="round" />
  </svg>`,

  'toy_bloc.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 110" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="60" cy="104" rx="46" ry="5" fill="rgba(0,0,0,0.12)" />
    <!-- Block 1 (Bottom Left - Red 'A') -->
    <rect x="18" y="56" width="42" height="42" rx="6" fill="#E63946" stroke="#9B2226" stroke-width="3" />
    <text x="39" y="86" font-family="Arial, sans-serif" font-weight="900" font-size="26" fill="#FFFFFF" text-anchor="middle">A</text>
    <!-- Block 2 (Bottom Right - Blue 'B') -->
    <rect x="62" y="56" width="42" height="42" rx="6" fill="#1D3557" stroke="#0D1B2A" stroke-width="3" />
    <text x="83" y="86" font-family="Arial, sans-serif" font-weight="900" font-size="26" fill="#FFD166" text-anchor="middle">B</text>
    <!-- Block 3 (Top Center - Yellow 'C') -->
    <rect x="39" y="14" width="42" height="42" rx="6" fill="#FFD166" stroke="#E09F3E" stroke-width="3" />
    <text x="60" y="44" font-family="Arial, sans-serif" font-weight="900" font-size="26" fill="#E63946" text-anchor="middle">C</text>
  </svg>`,

  'toy_poupee.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="50" cy="114" rx="28" ry="4" fill="rgba(0,0,0,0.12)" />
    <!-- Yarn Hair Pigtails -->
    <circle cx="28" cy="38" r="10" fill="#E07A5F" />
    <circle cx="72" cy="38" r="10" fill="#E07A5F" />
    <circle cx="24" cy="46" r="6" fill="#FFB4D6" />
    <circle cx="76" cy="46" r="6" fill="#FFB4D6" />
    <!-- Legs -->
    <line x1="42" y1="96" x2="42" y2="112" stroke="#FFDBB5" stroke-width="6" stroke-linecap="round" />
    <line x1="58" y1="96" x2="58" y2="112" stroke="#FFDBB5" stroke-width="6" stroke-linecap="round" />
    <ellipse cx="40" cy="112" rx="5" ry="3" fill="#E63946" />
    <ellipse cx="60" cy="112" rx="5" ry="3" fill="#E63946" />
    <!-- Cute Polka Dot Dress -->
    <polygon points="50,56 26,96 74,96" fill="#FF70A6" stroke="#D81159" stroke-width="3" stroke-linejoin="round" />
    <circle cx="44" cy="74" r="2.5" fill="#FFFFFF" />
    <circle cx="56" cy="74" r="2.5" fill="#FFFFFF" />
    <circle cx="50" cy="86" r="2.5" fill="#FFFFFF" />
    <!-- Head -->
    <circle cx="50" cy="38" r="22" fill="#FFDBB5" stroke="#E07A5F" stroke-width="2.5" />
    <path d="M 30 32 C 40 20 60 20 70 32" fill="#E07A5F" />
    <!-- Button Eyes & Smile -->
    <circle cx="42" cy="38" r="3" fill="#264653" />
    <circle cx="58" cy="38" r="3" fill="#264653" />
    <ellipse cx="38" cy="42" rx="3" ry="2" fill="#FF85A1" />
    <ellipse cx="62" cy="42" rx="3" ry="2" fill="#FF85A1" />
    <path d="M 46 44 Q 50 48 54 44" stroke="#E63946" stroke-width="2" fill="none" stroke-linecap="round" />
  </svg>`,

  'foo_pomme.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="50" cy="92" rx="32" ry="5" fill="rgba(0,0,0,0.12)" />
    <!-- Apple Body -->
    <path d="M 50 30 C 34 14 14 24 16 54 C 18 76 42 88 50 90 C 58 88 82 76 84 54 C 86 24 66 14 50 30 Z" fill="#E63946" stroke="#9B2226" stroke-width="3" />
    <!-- Apple Stem -->
    <path d="M 50 28 Q 52 14 62 10" stroke="#6F4E37" stroke-width="5" fill="none" stroke-linecap="round" />
    <!-- Leaf -->
    <path d="M 54 20 Q 72 16 68 28 Q 54 28 54 20 Z" fill="#2A9D8F" stroke="#1D6F65" stroke-width="2" />
    <!-- Specular Highlight -->
    <ellipse cx="32" cy="44" rx="6" ry="14" fill="#FFA5AB" transform="rotate(-25 32 44)" />
  </svg>`,

  'foo_banane.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="50" cy="92" rx="34" ry="5" fill="rgba(0,0,0,0.12)" />
    <!-- Bright Yellow Banana -->
    <path d="M 18 28 C 36 14 74 24 88 64 C 76 76 44 68 24 44 C 16 36 16 30 18 28 Z" fill="#FFD166" stroke="#E2AC00" stroke-width="3.5" />
    <path d="M 88 64 C 82 78 50 82 24 54 C 44 68 76 68 88 64 Z" fill="#E2AC00" />
    <!-- Tips -->
    <circle cx="16" cy="28" r="3.5" fill="#6F4E37" />
    <circle cx="89" cy="65" r="3.5" fill="#6F4E37" />
    <path d="M 32 32 Q 54 38 72 52" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.6" fill="none" />
  </svg>`,

  'foo_lait.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="50" cy="114" rx="28" ry="4" fill="rgba(0,0,0,0.12)" />
    <!-- Bottle Cap -->
    <rect x="36" y="16" width="28" height="12" rx="4" fill="#3A86FF" stroke="#1D3557" stroke-width="2.5" />
    <!-- Glass Bottle Body -->
    <rect x="28" y="28" width="44" height="82" rx="10" fill="#F8F9FA" stroke="#CBD5E1" stroke-width="3.5" />
    <!-- Blue Milk Label with Cow Spot -->
    <rect x="30" y="52" width="40" height="34" rx="5" fill="#60A5FA" />
    <circle cx="50" cy="69" r="10" fill="#FFFFFF" />
    <path d="M 46 66 Q 50 62 54 66 Q 56 72 50 74 Q 44 72 46 66 Z" fill="#1E3A8A" />
  </svg>`,

  'foo_biscuit.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="50" cy="92" rx="34" ry="5" fill="rgba(0,0,0,0.12)" />
    <!-- Golden Cookie with a Cute Bite Taken Out -->
    <path d="M 50 14 C 70 14 86 30 86 50 C 86 54 84 56 80 54 C 76 52 72 56 74 60 C 76 64 72 68 68 66 C 64 64 60 68 64 74 C 66 78 64 82 58 84 C 55 85 53 86 50 86 C 30 86 14 70 14 50 C 14 30 30 14 50 14 Z" fill="#E9C46A" stroke="#C9A24D" stroke-width="3.5" />
    <!-- Chocolate Chips -->
    <circle cx="34" cy="38" r="4.5" fill="#6F4E37" />
    <circle cx="48" cy="30" r="4" fill="#6F4E37" />
    <circle cx="62" cy="40" r="4.5" fill="#6F4E37" />
    <circle cx="36" cy="60" r="4" fill="#6F4E37" />
    <circle cx="50" cy="54" r="5" fill="#6F4E37" />
    <circle cx="46" cy="72" r="3.5" fill="#6F4E37" />
    <!-- Crumb -->
    <circle cx="82" cy="74" r="2.5" fill="#E9C46A" />
  </svg>`,

  'hou_tasse.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 100" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="50" cy="92" rx="34" ry="5" fill="rgba(0,0,0,0.12)" />
    <!-- Curly Steam Wisps -->
    <path d="M 40 24 Q 46 16 42 8" stroke="#CBD5E1" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <path d="M 54 22 Q 60 14 56 6" stroke="#CBD5E1" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <!-- Cup Handle -->
    <path d="M 70 42 C 90 42 90 74 70 74" stroke="#F4A261" stroke-width="7" fill="none" stroke-linecap="round" />
    <!-- Ceramic Mug Body -->
    <rect x="22" y="32" width="56" height="54" rx="14" fill="#FFB703" stroke="#FB8500" stroke-width="3.5" />
    <!-- Red Heart on Mug -->
    <path d="M 50 54 C 50 50 56 48 56 52 C 56 56 50 62 50 62 C 50 62 44 56 44 52 C 44 48 50 50 50 54 Z" fill="#E63946" />
  </svg>`,

  'clo_pyjama.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 120" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="55" cy="114" rx="34" ry="4" fill="rgba(0,0,0,0.12)" />
    <!-- Pyjama Onesie -->
    <path d="M 40 18 L 18 36 L 28 48 L 38 40 L 38 78 L 30 110 L 48 110 L 55 86 L 62 110 L 80 110 L 72 78 L 72 40 L 82 48 L 92 36 L 70 18 Z" fill="#A0C4FF" stroke="#3A86FF" stroke-width="3" stroke-linejoin="round" />
    <!-- Collar & Zipper -->
    <ellipse cx="55" cy="22" rx="12" ry="6" fill="#FFFFFF" stroke="#3A86FF" stroke-width="2" />
    <line x1="55" y1="26" x2="55" y2="76" stroke="#3A86FF" stroke-width="2.5" stroke-dasharray="3,2" />
    <!-- Yellow Stars on Pyjama -->
    <polygon points="46,50 48,53 52,53 49,55 50,59 46,57 42,59 43,55 40,53 44,53" fill="#FFD166" />
    <polygon points="64,62 66,65 70,65 67,67 68,71 64,69 60,71 61,67 58,65 62,65" fill="#FFD166" />
  </svg>`,

  'veh_bicyclette.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 110" width="100%" height="100%">
    <!-- Shadow -->
    <ellipse cx="70" cy="104" rx="58" ry="5" fill="rgba(0,0,0,0.14)" />
    <!-- Back Wheel -->
    <circle cx="34" cy="74" r="24" fill="none" stroke="#2C3E50" stroke-width="6" />
    <circle cx="34" cy="74" r="6" fill="#CBD5E1" stroke="#2C3E50" stroke-width="2" />
    <!-- Front Wheel -->
    <circle cx="106" cy="74" r="24" fill="none" stroke="#2C3E50" stroke-width="6" />
    <circle cx="106" cy="74" r="6" fill="#CBD5E1" stroke="#2C3E50" stroke-width="2" />
    <!-- Frame (Bright Cherry Red) -->
    <line x1="34" y1="74" x2="68" y2="74" stroke="#E63946" stroke-width="6" stroke-linecap="round" />
    <line x1="68" y1="74" x2="96" y2="44" stroke="#E63946" stroke-width="6" stroke-linecap="round" />
    <line x1="34" y1="74" x2="56" y2="44" stroke="#E63946" stroke-width="6" stroke-linecap="round" />
    <line x1="56" y1="44" x2="90" y2="44" stroke="#E63946" stroke-width="6" stroke-linecap="round" />
    <line x1="96" y1="44" x2="106" y2="74" stroke="#E63946" stroke-width="6" stroke-linecap="round" />
    <!-- Handlebar & Cute Front Basket -->
    <line x1="96" y1="44" x2="94" y2="28" stroke="#6C757D" stroke-width="5" stroke-linecap="round" />
    <line x1="88" y1="28" x2="104" y2="28" stroke="#2C3E50" stroke-width="5" stroke-linecap="round" />
    <rect x="96" y="32" width="18" height="14" rx="3" fill="#DDB892" stroke="#8B5A2B" stroke-width="2" />
    <!-- Seat -->
    <path d="M 48 42 Q 58 38 68 42" stroke="#2C3E50" stroke-width="8" stroke-linecap="round" fill="none" />
  </svg>`,
};

// 2. High-Accuracy Semantic Emoji Mapping for all 664 words
// Maps specific word ids, french words, or concepts to Unicode emojis for Twemoji SVG download
const EMOJI_MAP = {
  // Category 1: Sons / SFX
  'sfx_01': '💥', 'sfx_02': '🐑', 'sfx_03': '🐓', 'sfx_04': '🦆',
  'sfx_05': '🦁', 'sfx_06': '😋', 'sfx_07': '🐱', 'sfx_08': '🐮',
  'sfx_09': '😮', 'sfx_10': '🚂', 'sfx_11': '🚗', 'sfx_12': '🐶',

  // Category 2: Animals
  'ani_01': '🐝', 'ani_02': '🐑', 'ani_03': '🐊', 'ani_04': '🫏',
  'ani_05': '🐾', 'ani_06': '🐛', 'ani_07': '🦆', 'ani_08': '🐱',
  'ani_09': '🐴', 'ani_10': '🦌', 'ani_11': '🐶', 'ani_12': '🐷',
  'ani_13': '🐓', 'ani_14': '🦃', 'ani_15': '🐿️', 'ani_16': '🐘',
  'ani_17': '🐜', 'ani_18': '🦒', 'ani_19': '🐸', 'ani_20': '🦉',
  'ani_21': '🐰', 'ani_22': '🦁', 'ani_23': '🐺', 'ani_24': '🐑',
  'ani_25': '🪿', 'ani_26': '🐦', 'ani_27': '🫎', 'ani_28': '🐻',
  'ani_29': '🧸', 'ani_30': '🐼', 'ani_31': '🦋', 'ani_32': '🐧',
  'ani_33': '🐟', 'ani_34': '🐔', 'ani_35': '🍗', 'ani_36': '🐵',
  'ani_37': '🐭', 'ani_38': '🐯', 'ani_39': '🐢', 'ani_40': '🐮',
  'ani_41': '🦓',

  // Category 3: Vehicles
  'veh_01': '🚗', 'veh_02': '🚌', 'veh_03': '✈️', 'veh_04': '⛵',
  'veh_05': '🚲', 'veh_06': '🚛', 'veh_07': '🚒', 'veh_08': '🚁',
  'veh_09': '🏍️', 'veh_10': '🩼', 'veh_11': '🚜', 'veh_12': '🚂',
  'veh_13': '🛷', 'veh_14': '🚲',

  // Category 4: Toys
  'toy_01': '⚾', 'toy_02': '🎈', 'toy_03': '🪄', 'toy_04': '🧱',
  'toy_05': '🫧', 'toy_06': '🎁', 'toy_07': '🧩', 'toy_08': '🧴',
  'toy_09': '🖍️', 'toy_10': '✏️', 'toy_11': '🎨', 'toy_12': '📖',
  'toy_13': '🎮', 'toy_14': '🧸', 'toy_15': '🧱', 'toy_16': '📚',
  'toy_17': '🎨', 'toy_18': '🪆', 'toy_19': '🖊️', 'toy_20': '🧸',

  // Category 5: Food & Drinks
  'foo_01': '🍌', 'foo_02': '🍩', 'foo_03': '🧈', 'foo_04': '🥜',
  'foo_05': '🍪', 'foo_06': '🍘', 'foo_07': '🌽', 'foo_08': '🍬',
  'foo_09': '☕', 'foo_10': '🥕', 'foo_11': '🥣', 'foo_12': '🥣',
  'foo_13': '🥔', 'foo_14': '🍫', 'foo_15': '🎃', 'foo_16': '🥤',
  'foo_17': '🍏', 'foo_18': '🍓', 'foo_19': '🥒', 'foo_20': '🍦',
  'foo_21': '🥞', 'foo_22': '💧', 'foo_23': '🍓', 'foo_24': '🧀',
  'foo_25': '🎂', 'foo_26': '🧊', 'foo_27': '🍬', 'foo_28': '🍔',
  'foo_29': '🫘', 'foo_30': '🍮', 'foo_31': '🧃', 'foo_32': '🥛',
  'foo_33': '🍈', 'foo_34': '🧁', 'foo_35': '🥜', 'foo_36': '🍝',
  'foo_37': '🍽️', 'foo_38': '🥚', 'foo_39': '🍊', 'foo_40': '🍞',
  'foo_41': '🥔', 'foo_42': '🍟', 'foo_43': '🍕', 'foo_44': '🟢',
  'foo_45': '🐟', 'foo_46': '🍎', 'foo_47': '🍿', 'foo_48': '🍧',
  'foo_49': '🍮', 'foo_50': '🍗', 'foo_51': '🍇', 'foo_52': '🍇',
  'foo_53': '🥪', 'foo_54': '🥫', 'foo_55': '🧂', 'foo_56': '🍲',
  'foo_57': '🍝', 'foo_58': '🍭', 'foo_59': '🐟', 'foo_60': '🍞',
  'foo_61': '🍦', 'foo_62': '🥩', 'foo_63': '💊', 'foo_64': '🥛',

  // Category 6: Clothing
  'clo_01': '🧦', 'clo_02': '👶', 'clo_03': '👢', 'clo_04': '🔘',
  'clo_05': '🪢', 'clo_06': '👕', 'clo_07': '👒', 'clo_08': '👔',
  'clo_09': '🧦', 'clo_10': '📿', 'clo_11': '👶', 'clo_12': '👟',
  'clo_13': '🧣', 'clo_14': '🧤', 'clo_15': '🧥', 'clo_16': '👖',
  'clo_17': '🧥', 'clo_18': '🧤', 'clo_19': '👖', 'clo_20': '🥿',
  'clo_21': '📿', 'clo_22': '🩲', 'clo_23': '👕', 'clo_24': '👗',
  'clo_25': '🩳', 'clo_26': '👞', 'clo_27': '🤐',

  // Category 7: Body Parts
  'bod_01': '🤰', 'bod_02': '🩹', 'bod_03': '👄', 'bod_04': '💪',
  'bod_05': '💇', 'bod_06': '🦷', 'bod_07': '☝️', 'bod_08': '🤷',
  'bod_09': '🍑', 'bod_10': '🦵', 'bod_11': '🦵', 'bod_12': '😊',
  'bod_13': '👅', 'bod_14': '💋', 'bod_15': '✋', 'bod_16': '🧔',
  'bod_17': '🥸', 'bod_18': '👃', 'bod_19': '🔘', 'bod_20': '👂',
  'bod_21': '🦶', 'bod_22': '🚹', 'bod_23': '🦶', 'bod_24': '👤',
  'bod_25': '🚺', 'bod_26': '😀', 'bod_27': '👀',

  // Category 8: Household items
  'hou_01': '💵', 'hou_02': '🧹', 'hou_03': '🍽️', 'hou_04': '🧹',
  'hou_05': '📦', 'hou_06': '🥣', 'hou_07': '🍾', 'hou_08': '🪮',
  'hou_09': '🪥', 'hou_10': '📷', 'hou_11': '✂️', 'hou_12': '🔑',
  'hou_13': '🔩', 'hou_14': '🔪', 'hou_15': '🛋️', 'hou_16': '🥄',
  'hou_17': '🍴', 'hou_18': '⏰', 'hou_19': '🖼️', 'hou_20': '💡',
  'hou_21': '💡', 'hou_22': '👓', 'hou_23': '🔨', 'hou_24': '💊',
  'hou_25': '⌚', 'hou_26': '🧻', 'hou_27': '🛌', 'hou_28': '🧺',
  'hou_29': '📄', 'hou_30': '🪮', 'hou_31': '📸', 'hou_32': '🪴',
  'hou_33': '🍽️', 'hou_34': '🍯', 'hou_35': '🗑️', 'hou_36': '📻',
  'hou_37': '🎀', 'hou_38': '👜', 'hou_39': '🧼', 'hou_40': '🪣',
  'hou_41': '🧖', 'hou_42': '🧻', 'hou_43': '🪙', 'hou_44': '☕',
  'hou_45': '☎️', 'hou_46': '🥛', 'hou_47': '🗑️',

  // Category 9: Furniture & Rooms
  'fur_01': '🛁', 'fur_02': '🪑', 'fur_03': '👶', 'fur_04': '🪑',
  'fur_05': '🪑', 'fur_06': '🪑', 'fur_07': '🛏️', 'fur_08': '🍳',
  'fur_09': '🛋️', 'fur_10': '🚿', 'fur_11': '🚪', 'fur_12': '🪜',
  'fur_13': '🚰', 'fur_14': '🪟', 'fur_15': '🔥', 'fur_16': '🪵',
  'fur_17': '🧊', 'fur_18': '🚗', 'fur_19': '🚪', 'fur_20': '🧼',
  'fur_21': '🛏️', 'fur_22': '🪜', 'fur_23': '👶', 'fur_24': '🚪',
  'fur_25': '🍳', 'fur_26': '🚪', 'fur_27': '🚽', 'fur_28': '🚽',
  'fur_29': '🛋️', 'fur_30': '🌀', 'fur_31': '📦', 'fur_32': '🪑',
  'fur_33': '📺', 'fur_34': '🗄️',

  // Category 10: Outside Things
  'out_01': '🌳', 'out_02': '🪴', 'out_03': '🎪', 'out_04': '🪵',
  'out_05': '⛄', 'out_06': '⛅', 'out_07': '🏡', 'out_08': '🚩',
  'out_09': '💧', 'out_10': '🪜', 'out_11': '⭐', 'out_12': '🌸',
  'out_13': '🌱', 'out_14': '🛝', 'out_15': '🌻', 'out_16': '🌙',
  'out_17': '❄️', 'out_18': '☁️', 'out_19': '🪣', 'out_20': '🪨',
  'out_21': '🏊', 'out_22': '🌧️', 'out_23': '🪨', 'out_24': '⚙️',
  'out_25': '🛣️', 'out_26': '🏖️', 'out_27': '☀️', 'out_28': '🏠',
  'out_29': '🚜', 'out_30': '🚶', 'out_31': '🚿', 'out_32': '💨',
  'out_33': '🏡',

  // Category 11: Places
  'pla_01': '🏞️', 'pla_02': '⛺', 'pla_03': '🏡', 'pla_04': '🎪',
  'pla_05': '🌳', 'pla_06': '🏫', 'pla_07': '⛪', 'pla_08': '🚜',
  'pla_09': '🎉', 'pla_10': '🌲', 'pla_11': '⛽', 'pla_12': '🏪',
  'pla_13': '🏠', 'pla_14': '🌳', 'pla_15': '🧺', 'pla_16': '🏖️',
  'pla_17': '🛝', 'pla_18': '🏢', 'pla_19': '🦁',

  // Category 12: People
  'peo_01': '🧑‍🤝‍🧑', 'peo_02': '👶', 'peo_03': '🧍', 'peo_04': '🤡',
  'peo_05': '🤠', 'peo_06': '🩺', 'peo_07': '🧒', 'peo_08': '📬',
  'peo_09': '👧', 'peo_10': '👦', 'peo_11': '👦', 'peo_12': '👩‍🏫',
  'peo_13': '👥', 'peo_14': '👵', 'peo_15': '👴', 'peo_16': '👩',
  'peo_17': '👩', 'peo_18': '👨', 'peo_19': '🐾', 'peo_20': '👩‍🏫',
  'peo_21': '👨', 'peo_22': '👨', 'peo_23': '👤', 'peo_24': '👮',
  'peo_25': '🧑‍🚒', 'peo_26': '👩‍🏫', 'peo_27': '👧', 'peo_28': '⭐',
  'peo_29': '👩',

  // Category 13: Games & Routines
  'rou_01': '🛍️', 'rou_02': '📞', 'rou_03': '🛁', 'rou_04': '👋',
  'rou_05': '🌙', 'rou_06': '👏', 'rou_07': '👋', 'rou_08': '🤫',
  'rou_09': '🍎', 'rou_10': '🙈', 'rou_11': '🥞', 'rou_12': '🥪',
  'rou_13': '😴', 'rou_14': '✋', 'rou_15': '🚽', 'rou_16': '🚶',
  'rou_17': '🙆', 'rou_18': '🧔', 'rou_19': '🏃', 'rou_20': '🪶',
  'rou_21': '🙏', 'rou_22': '🙅', 'rou_23': '👍', 'rou_24': '🙆',
  'rou_25': '📱', 'rou_26': '🔄', 'rou_27': '🤲', 'rou_28': '🍲',
  'rou_29': '👏',
};

// Generic thematic fallback by category
const CATEGORY_DEFAULT_EMOJI = {
  1: '🔊', 2: '🐾', 3: '🚗', 4: '🧸', 5: '🍎', 6: '👕', 7: '👃',
  8: '☕', 9: '🛋️', 10: '🌳', 11: '🏫', 12: '👶', 13: '🎮', 14: '⚡',
  15: '✨', 16: '⏳', 17: '👤', 18: '❓', 19: '🧭', 20: '🔢', 21: '🔗'
};

// Verb & Abstract semantic keywords mapper
const SEMANTIC_KEYWORDS = [
  // Actions / Verbs
  { k: ['manger', 'eat'], e: '🍽️' },
  { k: ['boire', 'drink'], e: '🥤' },
  { k: ['dormir', 'sleep', 'dodo'], e: '😴' },
  { k: ['courir', 'run'], e: '🏃' },
  { k: ['marcher', 'walk'], e: '🚶' },
  { k: ['sauter', 'jump'], e: '🦘' },
  { k: ['danser', 'dance'], e: '💃' },
  { k: ['chanter', 'sing'], e: '🎤' },
  { k: ['écouter', 'hear', 'listen'], e: '👂' },
  { k: ['regarder', 'voir', 'look', 'see'], e: '👀' },
  { k: ['toucher', 'touch'], e: '👉' },
  { k: ['parler', 'dire', 'talk', 'say'], e: '🗣️' },
  { k: ['donner', 'give'], e: '🤲' },
  { k: ['prendre', 'take'], e: '✊' },
  { k: ['jouer', 'play'], e: '🎲' },
  { k: ['rire', 'laugh'], e: '😄' },
  { k: ['pleurer', 'cry'], e: '😢' },
  { k: ['laver', 'wash', 'bain'], e: '🧼' },
  { k: ['brosser', 'brush'], e: '🪥' },
  { k: ['aimer', 'love'], e: '❤️' },
  { k: ['aider', 'help'], e: '🤝' },
  { k: ['attraper', 'catch'], e: '🤹' },
  { k: ['tomber', 'fall'], e: '🤸' },
  { k: ['monter', 'climb', 'up'], e: '🧗' },
  { k: ['glisser', 'slide'], e: '🛝' },
  { k: ['ouvrir', 'open'], e: '📂' },
  { k: ['fermer', 'close'], e: '📁' },
  { k: ['allumer', 'light', 'on'], e: '💡' },
  { k: ['éteindre', 'off'], e: '🌑' },
  { k: ['couper', 'cut'], e: '✂️' },
  { k: ['dessiner', 'draw'], e: '🎨' },
  { k: ['lire', 'read'], e: '📖' },
  { k: ['nager', 'swim'], e: '🏊' },
  { k: ['embrasser', 'kiss'], e: '😘' },
  { k: ['câlin', 'hug'], e: '🤗' },
  { k: ['tirer', 'pull'], e: '🪢' },
  { k: ['pousser', 'push'], e: '🛒' },
  { k: ['lancer', 'throw'], e: '⚾' },
  { k: ['trouver', 'find'], e: '🔍' },
  { k: ['cacher', 'hide'], e: '🙈' },
  { k: ['acheter', 'buy'], e: '🛍️' },
  { k: ['nettoyer', 'clean'], e: '✨' },
  { k: ['attendre', 'wait'], e: '⏳' },

  // Descriptors & Qualities
  { k: ['chaud', 'hot'], e: '🔥' },
  { k: ['froid', 'cold'], e: '❄️' },
  { k: ['grand', 'big'], e: '🐘' },
  { k: ['petit', 'small'], e: '🐭' },
  { k: ['bon', 'good', 'tasty'], e: '😋' },
  { k: ['beau', 'belle', 'pretty'], e: '🌸' },
  { k: ['content', 'heureux', 'happy'], e: '😊' },
  { k: ['triste', 'sad'], e: '😢' },
  { k: ['fâché', 'angry'], e: '😠' },
  { k: ['fatigué', 'tired'], e: '🥱' },
  { k: ['propre', 'clean'], e: '✨' },
  { k: ['sale', 'dirty'], e: '🧦' },
  { k: ['doux', 'soft'], e: '🧸' },
  { k: ['dur', 'hard'], e: '🪨' },
  { k: ['vite', 'fast'], e: '⚡' },
  { k: ['lent', 'slow'], e: '🐢' },
  { k: ['lourd', 'heavy'], e: '🏋️' },
  { k: ['léger', 'light'], e: '🪶' },
  { k: ['rouge', 'red'], e: '🔴' },
  { k: ['bleu', 'blue'], e: '🔵' },
  { k: ['jaune', 'yellow'], e: '🟡' },
  { k: ['vert', 'green'], e: '🟢' },
  { k: ['orange'], e: '🟠' },
  { k: ['rose', 'pink'], e: '🌸' },
  { k: ['noir', 'black'], e: '⚫' },
  { k: ['blanc', 'white'], e: '⚪' },

  // Time
  { k: ['aujourd hui', "aujourd'hui", 'today'], e: '📅' },
  { k: ['demain', 'tomorrow'], e: '🌅' },
  { k: ['hier', 'yesterday'], e: '🌇' },
  { k: ['nuit', 'night', 'soir'], e: '🌙' },
  { k: ['matin', 'morning'], e: '☀️' },
  { k: ['après', 'after'], e: '➡️' },
  { k: ['avant', 'before'], e: '⬅️' },
  { k: ['bientôt', 'soon'], e: '⏰' },
  { k: ['maintenant', 'now'], e: '⏱️' },

  // Pronouns
  { k: ['moi', 'me', 'je'], e: '🙋' },
  { k: ['toi', 'you', 'tu'], e: '👉' },
  { k: ['lui', 'il', 'him', 'he'], e: '👦' },
  { k: ['elle', 'her', 'she'], e: '👧' },
  { k: ['nous', 'we'], e: '🧑‍🤝‍🧑' },
  { k: ['vous', 'you all'], e: '👥' },
  { k: ['eux', 'ils', 'elles', 'them'], e: '👨‍👩‍👧' },

  // Questions
  { k: ['où', 'where'], e: '🗺️' },
  { k: ['pourquoi', 'why'], e: '❓' },
  { k: ['quand', 'when'], e: '⏰' },
  { k: ['comment', 'how'], e: '💡' },
  { k: ['qui', 'who'], e: '👤' },
  { k: ['quoi', 'what'], e: '❔' },

  // Prepositions / Locations
  { k: ['dans', 'dedans', 'in', 'inside'], e: '📥' },
  { k: ['dehors', 'out', 'outside'], e: '📤' },
  { k: ['sur', 'on'], e: '⬆️' },
  { k: ['sous', 'under'], e: '⬇️' },
  { k: ['en haut', 'up'], e: '🔝' },
  { k: ['en bas', 'down'], e: '🔻' },
  { k: ['à côté', 'beside', 'next'], e: '↔️' },
  { k: ['derrière', 'behind'], e: '🔙' },
  { k: ['devant', 'in front'], e: '🔜' },
  { k: ['avec', 'with'], e: '🤝' },
  { k: ['sans', 'without'], e: '🚫' },

  // Quantifiers
  { k: ['beaucoup', 'a lot', 'many'], e: '🔟' },
  { k: ['un peu', 'a little'], e: '🤏' },
  { k: ['tout', 'all'], e: '💯' },
  { k: ['plus', 'more'], e: '➕' },
  { k: ['moins', 'less'], e: '➖' },
  { k: ['un', 'one'], e: '1️⃣' },
  { k: ['deux', 'two'], e: '2️⃣' },
  { k: ['trois', 'three'], e: '3️⃣' },
  { k: ['encore', 'again'], e: '🔁' }
];

function toCodePoint(unicodeSurrogates) {
  const r = [];
  let c = 0, p = 0, i = 0;
  while (i < unicodeSurrogates.length) {
    c = unicodeSurrogates.charCodeAt(i++);
    if (p) {
      r.push((0x10000 + ((p - 0xD800) << 10) + (c - 0xDC00)).toString(16));
      p = 0;
    } else if (0xD800 <= c && c <= 0xDBFF) {
      p = c;
    } else {
      r.push(c.toString(16));
    }
  }
  return r.filter(x => x !== 'fe0f').join('-');
}

function resolveEmojiForWord(w) {
  if (EMOJI_MAP[w.id]) return EMOJI_MAP[w.id];

  const normFr = w.fr.toLowerCase();
  const normEn = w.en.toLowerCase();

  for (const { k, e } of SEMANTIC_KEYWORDS) {
    if (k.some(kw => normFr.includes(kw) || normEn.includes(kw))) {
      return e;
    }
  }

  return CATEGORY_DEFAULT_EMOJI[w.categoryId] || '🎈';
}

// Download Cache to avoid repeated fetches
const downloadCache = new Map();

async function fetchTwemojiSvg(emoji) {
  const code = toCodePoint(emoji);
  if (downloadCache.has(code)) {
    return downloadCache.get(code);
  }

  const urls = [
    `https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/${code}.svg`,
    `https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/${code}.svg`
  ];

  for (const url of urls) {
    try {
      const resp = await fetch(url);
      if (resp.ok) {
        const svg = await resp.text();
        downloadCache.set(code, svg);
        return svg;
      }
    } catch (e) {
      // try next
    }
  }

  // Fallback simple clean SVG badge with emoji
  const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="4" />
    <text x="50" y="66" font-size="52" text-anchor="middle">${emoji}</text>
  </svg>`;
  downloadCache.set(code, fallbackSvg);
  return fallbackSvg;
}

async function run() {
  console.log(`Processing illustrations for ${words.length} vocabulary words...`);

  let bespokeCount = 0;
  let downloadedCount = 0;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const assetName = word.illustrationAsset;
    const targetAssetPath = path.join(OUT_DIR, assetName);
    const targetIdPath = path.join(OUT_DIR, `${word.id}.svg`);

    let svgContent = '';

    // Check bespoke custom SVG first
    if (BESPOKE_SVGS[assetName]) {
      svgContent = BESPOKE_SVGS[assetName];
      bespokeCount++;
    } else {
      const emoji = resolveEmojiForWord(word);
      svgContent = await fetchTwemojiSvg(emoji);
      downloadedCount++;
    }

    // Save under both asset filename and wordId.svg
    fs.writeFileSync(targetAssetPath, svgContent, 'utf-8');
    fs.writeFileSync(targetIdPath, svgContent, 'utf-8');

    if ((i + 1) % 50 === 0 || i === words.length - 1) {
      console.log(`[${i + 1}/${words.length}] Processed illustrations... (Bespoke: ${bespokeCount}, Vector/Twemoji: ${downloadedCount})`);
    }
  }

  console.log('Finished generating illustrations in public/illustrations/ !');

  // Fix scenes.json with accurate wordIds
  console.log('Fixing scenes.json mapping to vocabulary...');
  const scenes = JSON.parse(fs.readFileSync(SCENES_PATH, 'utf-8'));
  const wordMap = new Map(words.map(w => [w.id, w]));

  const FIXED_SCENE_ITEMS = {
    salon: [
      { wordId: 'fur_09', x: 48, y: 62, size: 155, label: 'divan/sofa' },
      { wordId: 'ani_08', x: 52, y: 62, size: 75, label: 'chat' },
      { wordId: 'fur_33', x: 82, y: 56, size: 110, label: 'télévision' },
      { wordId: 'hou_20', x: 16, y: 52, size: 90, label: 'lampe' },
      { wordId: 'toy_16', x: 26, y: 72, size: 65, label: 'livre' },
      { wordId: 'toy_02', x: 74, y: 76, size: 65, label: 'ballon' },
      { wordId: 'toy_20', x: 36, y: 60, size: 68, label: 'toutou' }
    ],
    cuisine: [
      { wordId: 'fur_17', x: 18, y: 52, size: 135, label: 'frigidaire/frigo' },
      { wordId: 'fur_32', x: 62, y: 66, size: 140, label: 'table' },
      { wordId: 'fur_04', x: 40, y: 66, size: 85, label: 'chaise' },
      { wordId: 'foo_46', x: 56, y: 55, size: 52, label: 'pomme' },
      { wordId: 'foo_01', x: 62, y: 55, size: 52, label: 'banane' },
      { wordId: 'foo_32', x: 68, y: 52, size: 52, label: 'lait' },
      { wordId: 'foo_05', x: 74, y: 58, size: 48, label: 'biscuit' },
      { wordId: 'hou_44', x: 50, y: 58, size: 48, label: 'tasse' }
    ],
    cour: [
      { wordId: 'out_01', x: 16, y: 50, size: 150, label: 'arbre' },
      { wordId: 'out_27', x: 50, y: 22, size: 85, label: 'soleil' },
      { wordId: 'out_18', x: 28, y: 24, size: 80, label: 'nuage' },
      { wordId: 'ani_11', x: 34, y: 74, size: 90, label: 'chien' },
      { wordId: 'ani_26', x: 20, y: 40, size: 55, label: 'oiseau' },
      { wordId: 'ani_15', x: 12, y: 66, size: 55, label: 'écureuil' },
      { wordId: 'out_03', x: 64, y: 56, size: 120, label: 'balançoire' },
      { wordId: 'veh_05', x: 84, y: 72, size: 95, label: 'bicyclette' }
    ],
    chambre: [
      { wordId: 'fur_21', x: 45, y: 62, size: 150, label: 'lit' },
      { wordId: 'toy_20', x: 36, y: 55, size: 68, label: 'toutou' },
      { wordId: 'fur_19', x: 84, y: 56, size: 120, label: 'garde-robe' },
      { wordId: 'toy_04', x: 20, y: 76, size: 70, label: 'bloc' },
      { wordId: 'toy_18', x: 62, y: 74, size: 68, label: 'poupée' },
      { wordId: 'clo_23', x: 54, y: 55, size: 58, label: 'pyjama' }
    ]
  };

  for (const scene of scenes) {
    if (FIXED_SCENE_ITEMS[scene.id]) {
      scene.items = FIXED_SCENE_ITEMS[scene.id];
    }
  }

  fs.writeFileSync(SCENES_PATH, JSON.stringify(scenes, null, 2), 'utf-8');
  console.log('scenes.json updated successfully!');
}

run().catch(err => {
  console.error('Generation error:', err);
  process.exit(1);
});
