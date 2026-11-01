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

  // 1. Banane (foo_01 / foo_banane)
  'foo_banane.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="48" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Yellow peel back -->
    <path d="M 40 45 Q 30 75 55 98 Q 75 80 55 50 Z" fill="#FACC15" stroke="#CA8A04" stroke-width="2.5" />
    <path d="M 85 42 Q 105 68 85 96 Q 70 82 78 50 Z" fill="#FACC15" stroke="#CA8A04" stroke-width="2.5" />
    <!-- Creamy peeled banana fruit core -->
    <path d="M 52 95 Q 60 55 64 25 C 66 18 76 18 78 25 Q 80 55 74 95 Z" fill="#FEF08A" stroke="#EAB308" stroke-width="2" />
    <!-- Banana inner fruit soft ribs -->
    <path d="M 64 25 Q 67 55 64 94" stroke="#FDE047" stroke-width="2" fill="none" />
    <path d="M 72 25 Q 73 55 70 94" stroke="#FDE047" stroke-width="2" fill="none" />
    <ellipse cx="70" cy="22" rx="5" ry="3" fill="#CA8A04" />
    <!-- Peel front flaps folding down -->
    <path d="M 54 62 Q 42 75 32 82 Q 44 88 56 74 Z" fill="#FDE047" stroke="#CA8A04" stroke-width="2.5" />
    <path d="M 72 62 Q 88 74 98 80 Q 86 88 70 74 Z" fill="#FDE047" stroke="#CA8A04" stroke-width="2.5" />
    <path d="M 62 65 Q 64 82 62 92 Q 68 82 68 65 Z" fill="#FACC15" stroke="#CA8A04" stroke-width="2" />
    <!-- Banana base stem -->
    <path d="M 56 92 Q 62 108 66 112 Q 72 110 70 92 Z" fill="#65A30D" stroke="#4D7C0F" stroke-width="2" />
    <!-- Highlights & cute sparkles -->
    <circle cx="62" cy="38" r="2" fill="#FFFFFF" />
    <path d="M 62 44 L 62 56" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
    <polygon points="96,30 98,34 102,36 98,38 96,42 94,38 90,36 94,34" fill="#FBBF24" />
  </svg>`,

  // 2. Céréale (foo_11 / foo_cereale) - colorful cereal loops in a bowl of milk with spoon
  'foo_cereale.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Bowl Outer -->
    <path d="M 22 56 C 24 96 116 96 118 56 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="3.5" />
    <!-- Bowl Base Foot -->
    <ellipse cx="70" cy="94" rx="28" ry="6" fill="#0284C7" />
    <ellipse cx="70" cy="92" rx="26" ry="5" fill="#38BDF8" />
    <!-- Bowl Rim Rim Inner -->
    <ellipse cx="70" cy="56" rx="48" ry="18" fill="#BAE6FD" stroke="#0284C7" stroke-width="3" />
    <!-- Milk level -->
    <ellipse cx="70" cy="57" rx="44" ry="15" fill="#FFFFFF" />
    <!-- Colorful Cereal Loops floating in milk -->
    <!-- Red loop -->
    <ellipse cx="48" cy="54" rx="8" ry="5" fill="#EF4444" stroke="#DC2626" stroke-width="1.5" />
    <ellipse cx="48" cy="54" rx="3.5" ry="2" fill="#FFFFFF" />
    <!-- Orange loop -->
    <ellipse cx="66" cy="52" rx="7.5" ry="4.5" fill="#F97316" stroke="#EA580C" stroke-width="1.5" />
    <ellipse cx="66" cy="52" rx="3" ry="1.8" fill="#FFFFFF" />
    <!-- Green loop -->
    <ellipse cx="84" cy="54" rx="8" ry="5" fill="#22C55E" stroke="#16A34A" stroke-width="1.5" />
    <ellipse cx="84" cy="54" rx="3.5" ry="2" fill="#FFFFFF" />
    <!-- Yellow loop -->
    <ellipse cx="54" cy="62" rx="7.5" ry="4.5" fill="#EAB308" stroke="#CA8A04" stroke-width="1.5" />
    <ellipse cx="54" cy="62" rx="3" ry="1.8" fill="#FFFFFF" />
    <!-- Purple loop -->
    <ellipse cx="72" cy="63" rx="8" ry="5" fill="#A855F7" stroke="#9333EA" stroke-width="1.5" />
    <ellipse cx="72" cy="63" rx="3.5" ry="2" fill="#FFFFFF" />
    <!-- Blue loop -->
    <ellipse cx="90" cy="61" rx="7" ry="4.5" fill="#3B82F6" stroke="#2563EB" stroke-width="1.5" />
    <ellipse cx="90" cy="61" rx="3" ry="1.8" fill="#FFFFFF" />
    <!-- Pink loop -->
    <ellipse cx="38" cy="60" rx="6.5" ry="4" fill="#EC4899" stroke="#DB2777" stroke-width="1.5" />
    <ellipse cx="38" cy="60" rx="2.5" ry="1.5" fill="#FFFFFF" />
    <!-- Spoon sticking out -->
    <path d="M 96 32 C 98 18 108 12 116 16 C 122 20 118 32 106 48 L 92 64 Z" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2.5" />
    <ellipse cx="112" cy="22" rx="7" ry="5" fill="#F8FAFC" />
    <!-- Bowl Highlight & Face/Dots -->
    <path d="M 32 68 Q 70 90 108 68" stroke="#E0F2FE" stroke-width="3" fill="none" stroke-linecap="round" />
    <circle cx="64" cy="78" r="3" fill="#0369A1" />
    <circle cx="76" cy="78" r="3" fill="#0369A1" />
    <path d="M 68 83 Q 70 86 72 83" stroke="#0369A1" stroke-width="2" fill="none" stroke-linecap="round" />
  </svg>`,

  // 3. Cheerios (foo_12 / foo_cheerios) - Yellow box + golden oat O's
  'foo_cheerios.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Cheerios Iconic Yellow Box in background -->
    <g transform="translate(18, 14)">
      <!-- Box 3D Side -->
      <polygon points="12,14 22,6 22,78 12,88" fill="#D97706" stroke="#B45309" stroke-width="2" />
      <!-- Box Top -->
      <polygon points="12,14 22,6 68,6 58,14" fill="#FDE047" stroke="#B45309" stroke-width="2" />
      <!-- Box Front -->
      <rect x="22" y="6" width="56" height="78" rx="4" fill="#FBBF24" stroke="#B45309" stroke-width="2.5" />
      <!-- Red heart/banner on box -->
      <ellipse cx="50" cy="34" rx="18" ry="14" fill="#EF4444" />
      <circle cx="50" cy="34" r="8" fill="#FEF08A" stroke="#CA8A04" stroke-width="2" />
      <circle cx="50" cy="34" r="3.5" fill="#EF4444" />
      <!-- Mini cheerios rings on box -->
      <circle cx="38" cy="62" r="5" fill="#FDE047" stroke="#D97706" stroke-width="1.5" />
      <circle cx="50" cy="66" r="5" fill="#FDE047" stroke="#D97706" stroke-width="1.5" />
      <circle cx="62" cy="60" r="5" fill="#FDE047" stroke="#D97706" stroke-width="1.5" />
    </g>
    <!-- Foreground Bowl of Cheerios with Milk -->
    <g transform="translate(44, 46)">
      <path d="M 8 36 C 10 66 74 66 76 36 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="3" />
      <ellipse cx="42" cy="36" rx="34" ry="12" fill="#FEE2E2" stroke="#B91C1C" stroke-width="2.5" />
      <ellipse cx="42" cy="37" rx="31" ry="10" fill="#FFFFFF" />
      <!-- Floating golden toasted O's -->
      <ellipse cx="26" cy="36" rx="5.5" ry="3.5" fill="#FDE047" stroke="#CA8A04" stroke-width="1.5" />
      <ellipse cx="26" cy="36" rx="2" ry="1.2" fill="#FFFFFF" />
      <ellipse cx="38" cy="34" rx="6" ry="3.8" fill="#F59E0B" stroke="#B45309" stroke-width="1.5" />
      <ellipse cx="38" cy="34" rx="2.2" ry="1.4" fill="#FFFFFF" />
      <ellipse cx="50" cy="37" rx="5.5" ry="3.5" fill="#FDE047" stroke="#CA8A04" stroke-width="1.5" />
      <ellipse cx="50" cy="37" rx="2" ry="1.2" fill="#FFFFFF" />
      <ellipse cx="60" cy="35" rx="5.5" ry="3.5" fill="#F59E0B" stroke="#B45309" stroke-width="1.5" />
      <ellipse cx="60" cy="35" rx="2" ry="1.2" fill="#FFFFFF" />
      <ellipse cx="34" cy="40" rx="5.5" ry="3.5" fill="#FDE047" stroke="#CA8A04" stroke-width="1.5" />
      <ellipse cx="34" cy="40" rx="2" ry="1.2" fill="#FFFFFF" />
      <ellipse cx="46" cy="41" rx="5.5" ry="3.5" fill="#F59E0B" stroke="#B45309" stroke-width="1.5" />
      <ellipse cx="46" cy="41" rx="2" ry="1.2" fill="#FFFFFF" />
    </g>
    <!-- Loose Cheerios on table -->
    <circle cx="34" cy="106" r="6" fill="#F59E0B" stroke="#B45309" stroke-width="1.8" />
    <circle cx="34" cy="106" r="2.5" fill="#FFF" />
    <circle cx="48" cy="110" r="5" fill="#FDE047" stroke="#CA8A04" stroke-width="1.8" />
    <circle cx="48" cy="110" r="2" fill="#FFF" />
    <circle cx="118" cy="106" r="6" fill="#F59E0B" stroke="#B45309" stroke-width="1.8" />
    <circle cx="118" cy="106" r="2.5" fill="#FFF" />
  </svg>`,

  // 4. Chips (foo_13 / foo_chips) - Potato chip bag & golden wavy chips
  'foo_chips.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Crinkle potato chip bag (Blue/Red shiny bag) -->
    <g transform="translate(20, 16) rotate(-8)">
      <!-- Bag Body -->
      <path d="M 8 16 L 58 12 L 64 82 L 4 86 Z" fill="#DC2626" stroke="#991B1B" stroke-width="2.5" />
      <!-- Top crimp -->
      <path d="M 6 16 L 9 11 L 14 16 L 19 11 L 24 16 L 29 11 L 34 16 L 39 11 L 44 16 L 49 11 L 54 16 L 59 11" stroke="#991B1B" stroke-width="2" fill="none" />
      <!-- Bottom crimp -->
      <path d="M 4 86 L 8 90 L 13 86 L 18 90 L 23 86 L 28 90 L 33 86 L 38 90 L 43 86 L 48 90 L 53 86 L 58 90 L 63 86" stroke="#991B1B" stroke-width="2" fill="none" />
      <!-- Yellow splash / starburst on bag -->
      <polygon points="34,30 42,34 50,28 48,38 56,44 46,48 48,58 38,54 32,62 30,52 20,50 28,42 24,34 34,36" fill="#FDE047" stroke="#EAB308" stroke-width="1.5" />
      <!-- Chip icon on bag -->
      <ellipse cx="36" cy="45" rx="10" ry="6" fill="#F59E0B" stroke="#B45309" stroke-width="1.5" />
      <!-- Bag shine highlight -->
      <path d="M 14 22 L 20 80" stroke="rgba(255,255,255,0.4)" stroke-width="3" stroke-linecap="round" />
    </g>
    <!-- Crisp wavy golden potato chips overflowing -->
    <!-- Chip 1 (standing wavy) -->
    <g transform="translate(74, 52) rotate(15)">
      <path d="M 4 20 Q 14 4 28 10 Q 36 24 24 34 Q 10 32 4 20 Z" fill="#FBBF24" stroke="#D97706" stroke-width="2.5" />
      <path d="M 8 18 Q 16 10 24 14" stroke="#FDE047" stroke-width="2" fill="none" />
      <path d="M 10 24 Q 18 16 26 22" stroke="#D97706" stroke-width="1.5" fill="none" opacity="0.6" />
    </g>
    <!-- Chip 2 (large curved front chip) -->
    <g transform="translate(56, 70) rotate(-10)">
      <path d="M 6 18 Q 20 2 38 12 Q 44 28 28 34 Q 10 30 6 18 Z" fill="#F59E0B" stroke="#B45309" stroke-width="2.5" />
      <path d="M 12 16 Q 24 8 34 16" stroke="#FEF08A" stroke-width="2.5" fill="none" />
      <circle cx="20" cy="22" r="0.8" fill="#FFF" />
      <circle cx="28" cy="20" r="0.8" fill="#FFF" />
      <circle cx="24" cy="26" r="0.8" fill="#FFF" />
    </g>
    <!-- Chip 3 (side chip) -->
    <g transform="translate(92, 74) rotate(35)">
      <path d="M 4 14 Q 16 2 30 8 Q 34 20 22 26 Q 8 22 4 14 Z" fill="#FBBF24" stroke="#D97706" stroke-width="2.5" />
      <path d="M 8 12 Q 18 6 26 12" stroke="#FEF08A" stroke-width="2" fill="none" />
    </g>
    <!-- Little crisp crumbs -->
    <circle cx="52" cy="108" r="2" fill="#F59E0B" />
    <circle cx="98" cy="106" r="1.5" fill="#FBBF24" />
    <circle cx="106" cy="104" r="2.5" fill="#D97706" />
  </svg>`,

  // 5. Citrouille (foo_15 / foo_citrouille) - Natural harvest garden pumpkin (no Halloween face)
  'foo_citrouille.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="7" fill="rgba(0,0,0,0.15)" />
    <!-- Natural farm pumpkin (lobes back to front) -->
    <!-- Far outer ribs/lobes -->
    <ellipse cx="38" cy="72" rx="26" ry="34" fill="#EA580C" stroke="#C2410C" stroke-width="2.5" />
    <ellipse cx="102" cy="72" rx="26" ry="34" fill="#EA580C" stroke="#C2410C" stroke-width="2.5" />
    <!-- Mid ribs/lobes -->
    <ellipse cx="50" cy="74" rx="26" ry="36" fill="#F97316" stroke="#C2410C" stroke-width="2.5" />
    <ellipse cx="90" cy="74" rx="26" ry="36" fill="#F97316" stroke="#C2410C" stroke-width="2.5" />
    <!-- Center prominent lobe -->
    <ellipse cx="70" cy="76" rx="24" ry="37" fill="#FB923C" stroke="#C2410C" stroke-width="3" />
    <!-- Rib depth shadow creases -->
    <path d="M 70 40 Q 64 76 70 112" stroke="#EA580C" stroke-width="2.5" fill="none" />
    <path d="M 70 40 Q 76 76 70 112" stroke="#FB923C" stroke-width="1.5" fill="none" />
    <!-- Highlights -->
    <path d="M 66 48 Q 62 76 66 102" stroke="#FED7AA" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.8" />
    <!-- Sturdy Green Stem & Leaf -->
    <!-- Vine tendril curling -->
    <path d="M 72 32 Q 88 18 94 28 Q 98 36 90 38" stroke="#15803D" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <!-- Leaf -->
    <path d="M 74 34 Q 92 36 94 48 Q 80 52 74 38 Z" fill="#22C55E" stroke="#15803D" stroke-width="2" />
    <path d="M 76 36 L 88 44" stroke="#15803D" stroke-width="1.5" />
    <!-- Wooden Stem -->
    <path d="M 64 42 C 62 26 66 18 72 16 C 78 16 78 26 76 42 Z" fill="#65A30D" stroke="#3F6212" stroke-width="2.5" />
    <ellipse cx="70" cy="18" rx="6" ry="3" fill="#84CC16" stroke="#3F6212" stroke-width="1.5" />
  </svg>`,

  // 6. Coke (foo_16 / foo_coke) - Red soda can + glass of bubbly cola with straw
  'foo_coke.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Glass of bubbly cola on right -->
    <g transform="translate(68, 20)">
      <!-- Striped Straw -->
      <path d="M 28 6 L 36 -10 L 46 -6" stroke="#DC2626" stroke-width="5" stroke-linecap="round" fill="none" />
      <path d="M 28 6 L 36 -10 L 46 -6" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fill="none" />
      <!-- Glass base shadow -->
      <ellipse cx="26" cy="88" rx="18" ry="4" fill="rgba(0,0,0,0.15)" />
      <!-- Glass body -->
      <polygon points="10,22 42,22 38,88 14,88" fill="rgba(240,249,255,0.4)" stroke="#94A3B8" stroke-width="2" />
      <!-- Dark bubbly cola liquid -->
      <polygon points="12,32 40,32 37,86 15,86" fill="#3B1808" stroke="#1F0D04" stroke-width="1.5" />
      <ellipse cx="26" cy="32" rx="14" ry="4" fill="#58240D" />
      <!-- Fizzy soda bubbles -->
      <circle cx="20" cy="46" r="1.5" fill="#FBBF24" opacity="0.8" />
      <circle cx="28" cy="54" r="2" fill="#FBBF24" opacity="0.8" />
      <circle cx="22" cy="66" r="1.5" fill="#FBBF24" opacity="0.8" />
      <circle cx="32" cy="72" r="2" fill="#FBBF24" opacity="0.8" />
      <circle cx="18" cy="78" r="1.2" fill="#FBBF24" opacity="0.8" />
      <circle cx="30" cy="40" r="1.8" fill="#FDE047" />
      <!-- Ice cubes in glass -->
      <rect x="18" y="34" width="10" height="9" rx="2" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.6)" stroke-width="1" />
      <!-- Glass reflection highlight -->
      <line x1="16" y1="26" x2="18" y2="84" stroke="rgba(255,255,255,0.6)" stroke-width="2" stroke-linecap="round" />
    </g>
    <!-- Classic Red Soda Can on left -->
    <g transform="translate(16, 28)">
      <!-- Can Top silver rim -->
      <ellipse cx="28" cy="12" rx="20" ry="7" fill="#CBD5E1" stroke="#64748B" stroke-width="2" />
      <ellipse cx="28" cy="12" rx="15" ry="4.5" fill="#94A3B8" />
      <!-- Pop Tab -->
      <ellipse cx="28" cy="11" rx="5" ry="2.5" fill="#E2E8F0" stroke="#475569" stroke-width="1" />
      <!-- Can Body -->
      <rect x="8" y="12" width="40" height="68" fill="#DC2626" stroke="#991B1B" stroke-width="2.5" />
      <!-- Can Bottom rim -->
      <path d="M 8 80 C 8 88 48 88 48 80 Z" fill="#94A3B8" stroke="#64748B" stroke-width="2" />
      <!-- Iconic White Curved Wave Ribbon -->
      <path d="M 8 36 Q 28 62 48 42 L 48 50 Q 28 70 8 44 Z" fill="#FFFFFF" />
      <!-- Can shine vertical stripe -->
      <rect x="12" y="14" width="5" height="64" fill="rgba(255,255,255,0.35)" />
      <!-- Cold condensation droplets -->
      <circle cx="38" cy="28" r="1.5" fill="#BAE6FD" />
      <circle cx="42" cy="58" r="1.5" fill="#BAE6FD" />
      <circle cx="36" cy="68" r="1.2" fill="#BAE6FD" />
    </g>
  </svg>`,

  // 7. Compote aux pommes (foo_17 / foo_compote) - Applesauce jar & bowl with spoon & apple slice
  'foo_compote.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Compote glass jar in background -->
    <g transform="translate(20, 26)">
      <!-- Jar Lid (Gold screw lid) -->
      <rect x="12" y="4" width="34" height="10" rx="3" fill="#EAB308" stroke="#A16207" stroke-width="2" />
      <line x1="16" y1="9" x2="42" y2="9" stroke="#CA8A04" stroke-width="1.5" />
      <!-- Glass jar body -->
      <rect x="8" y="14" width="42" height="54" rx="8" fill="#FEF08A" stroke="#CA8A04" stroke-width="2.5" />
      <!-- Golden applesauce texture inside -->
      <path d="M 10 26 Q 28 20 48 26 L 48 64 Q 28 68 10 64 Z" fill="#FACC15" />
      <!-- Label on jar with apple icon -->
      <rect x="14" y="32" width="30" height="24" rx="4" fill="#FFFFFF" stroke="#CA8A04" stroke-width="1" />
      <circle cx="29" cy="44" r="7" fill="#EF4444" />
      <path d="M 29 36 Q 32 34 33 37" stroke="#15803D" stroke-width="1.5" fill="none" />
      <!-- Jar glass shine -->
      <path d="M 12 18 L 12 62" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
    </g>
    <!-- Foreground Bowl of fresh golden applesauce with spoon -->
    <g transform="translate(62, 50)">
      <!-- Bowl -->
      <path d="M 6 24 C 8 54 62 54 64 24 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="2.5" />
      <ellipse cx="35" cy="24" rx="29" ry="10" fill="#BAE6FD" stroke="#0284C7" stroke-width="2" />
      <!-- Applesauce surface in bowl -->
      <ellipse cx="35" cy="25" rx="26" ry="8" fill="#FACC15" />
      <path d="M 16 25 Q 35 30 54 25" stroke="#EAB308" stroke-width="2" fill="none" />
      <!-- Spoon dipping in -->
      <path d="M 44 8 C 50 -6 58 -8 64 -4 C 68 2 62 12 50 24 L 38 30 Z" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2" />
      <ellipse cx="40" cy="28" rx="6" ry="4" fill="#FACC15" stroke="#CA8A04" stroke-width="1.5" />
    </g>
    <!-- Fresh apple wedge leaning on side -->
    <g transform="translate(18, 76) rotate(-15)">
      <path d="M 4 24 C 6 10 22 2 32 10 C 26 22 16 28 4 24 Z" fill="#FEE2E2" stroke="#DC2626" stroke-width="2" />
      <!-- Red peel edge -->
      <path d="M 4 24 C 6 10 22 2 32 10" stroke="#DC2626" stroke-width="3.5" fill="none" />
      <!-- Little apple seed -->
      <ellipse cx="20" cy="14" rx="2" ry="3.5" transform="rotate(20 20 14)" fill="#78350F" />
    </g>
  </svg>`,

  // 8. Confiture (foo_18 / foo_confiture) - Strawberry jam jar with gingham cloth lid & dripping spoon
  'foo_confiture.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Jam Jar -->
    <g transform="translate(36, 18)">
      <!-- Glass jar body -->
      <rect x="8" y="28" width="52" height="60" rx="12" fill="#FEE2E2" stroke="#B91C1C" stroke-width="3" />
      <!-- Thick red jam filling -->
      <rect x="11" y="36" width="46" height="49" rx="8" fill="#DC2626" />
      <!-- Strawberry seed specks in jam -->
      <circle cx="20" cy="46" r="1.2" fill="#FEF08A" />
      <circle cx="34" cy="42" r="1.2" fill="#FEF08A" />
      <circle cx="48" cy="48" r="1.2" fill="#FEF08A" />
      <circle cx="26" cy="58" r="1.2" fill="#FEF08A" />
      <circle cx="42" cy="62" r="1.2" fill="#FEF08A" />
      <circle cx="32" cy="74" r="1.2" fill="#FEF08A" />
      <!-- Glass reflection highlight -->
      <path d="M 14 34 L 14 80" stroke="rgba(255,255,255,0.6)" stroke-width="2.5" stroke-linecap="round" />
      <!-- Cute Label with little strawberry -->
      <rect x="18" y="50" width="32" height="24" rx="4" fill="#FFFFFF" stroke="#EF4444" stroke-width="1.5" />
      <path d="M 34 56 C 30 56 28 60 30 64 C 32 68 34 70 34 70 C 34 70 36 68 38 64 C 40 60 38 56 34 56 Z" fill="#EF4444" />
      <polygon points="32,56 34,54 36,56 34,55" fill="#22C55E" />
      <!-- Cloth Gingham Cover (Vichy red and white) -->
      <ellipse cx="34" cy="20" rx="30" ry="12" fill="#EF4444" stroke="#991B1B" stroke-width="2" />
      <!-- Gingham squares pattern -->
      <path d="M 14 16 L 54 16 M 10 20 L 58 20 M 14 24 L 54 24" stroke="#FFFFFF" stroke-width="2.5" />
      <path d="M 22 10 L 22 30 M 34 8 L 34 32 M 46 10 L 46 30" stroke="#FFFFFF" stroke-width="2.5" />
      <!-- Wavy cloth skirt -->
      <path d="M 6 22 Q 12 30 18 24 Q 24 32 34 26 Q 44 32 50 24 Q 56 30 62 22 Z" fill="#EF4444" stroke="#991B1B" stroke-width="2" />
      <!-- String tie ribbon with bow -->
      <ellipse cx="34" cy="26" rx="26" ry="4" fill="none" stroke="#FEF08A" stroke-width="2" />
      <circle cx="48" cy="26" r="3" fill="#FDE047" />
      <path d="M 48 26 Q 54 34 58 36 M 48 26 Q 52 38 48 40" stroke="#FDE047" stroke-width="2" fill="none" />
    </g>
    <!-- Spoon with dripping jam beside jar -->
    <g transform="translate(88, 38) rotate(18)">
      <path d="M 8 0 C 14 -12 24 -14 28 -8 C 32 -2 24 8 14 16 L 4 60 Z" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2" />
      <!-- Jam on spoon scoop -->
      <ellipse cx="20" cy="4" rx="8" ry="6" fill="#DC2626" />
      <!-- Glistening drip of jam -->
      <path d="M 20 8 Q 22 18 20 22 C 18 24 16 22 18 18 Z" fill="#DC2626" />
      <circle cx="20" cy="28" r="2.5" fill="#DC2626" />
    </g>
  </svg>`,

  // 9. Cornichon (foo_19 / foo_cornichon) - Bumpy curved pickled gherkin with pickle jar
  'foo_cornichon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Glass Pickle Jar in background -->
    <g transform="translate(18, 20)">
      <!-- Green Screw Lid -->
      <rect x="12" y="4" width="34" height="10" rx="3" fill="#15803D" stroke="#166534" stroke-width="2" />
      <!-- Jar Body -->
      <rect x="8" y="14" width="42" height="64" rx="10" fill="#DCFCE7" stroke="#16A34A" stroke-width="2.5" opacity="0.9" />
      <!-- Pickles floating inside brine -->
      <path d="M 20 30 Q 14 50 24 66" stroke="#4D7C0F" stroke-width="8" stroke-linecap="round" fill="none" />
      <path d="M 36 34 Q 42 52 34 68" stroke="#4D7C0F" stroke-width="8" stroke-linecap="round" fill="none" />
      <!-- Floating dill sprig & mustard seeds -->
      <circle cx="16" cy="40" r="1.5" fill="#EAB308" />
      <circle cx="30" cy="48" r="1.5" fill="#EAB308" />
      <circle cx="22" cy="62" r="1.5" fill="#EAB308" />
      <circle cx="38" cy="28" r="1.5" fill="#EAB308" />
      <!-- Glass reflection -->
      <line x1="12" y1="20" x2="12" y2="70" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
    </g>
    <!-- Foreground Big Bumpy Pickled Gherkin (Cornichon) -->
    <g transform="translate(52, 46) rotate(-12)">
      <!-- Pickle Curved Body -->
      <path d="M 10 32 C 6 12 28 4 48 8 C 66 12 76 28 68 44 C 54 52 28 50 10 32 Z" fill="#65A30D" stroke="#3F6212" stroke-width="3" />
      <!-- Pickle darker green underside -->
      <path d="M 12 34 C 28 48 54 50 66 42" stroke="#4D7C0F" stroke-width="3" fill="none" />
      <!-- Characteristic Gherkin Bumps / Warts -->
      <ellipse cx="22" cy="18" rx="3.5" ry="2.5" fill="#84CC16" stroke="#3F6212" stroke-width="1.2" />
      <ellipse cx="38" cy="14" rx="4" ry="3" fill="#84CC16" stroke="#3F6212" stroke-width="1.2" />
      <ellipse cx="54" cy="20" rx="3.5" ry="2.5" fill="#84CC16" stroke="#3F6212" stroke-width="1.2" />
      <ellipse cx="30" cy="28" rx="4" ry="2.8" fill="#84CC16" stroke="#3F6212" stroke-width="1.2" />
      <ellipse cx="48" cy="30" rx="3.5" ry="2.5" fill="#84CC16" stroke="#3F6212" stroke-width="1.2" />
      <ellipse cx="60" cy="32" rx="3" ry="2" fill="#84CC16" stroke="#3F6212" stroke-width="1.2" />
      <ellipse cx="18" cy="28" rx="3" ry="2" fill="#84CC16" stroke="#3F6212" stroke-width="1.2" />
      <!-- Highlight ridge -->
      <path d="M 24 12 Q 44 10 58 16" stroke="#BEF264" stroke-width="2" fill="none" stroke-linecap="round" />
    </g>
    <!-- Sliced wavy pickle round on bottom right -->
    <g transform="translate(94, 80) rotate(15)">
      <ellipse cx="16" cy="14" rx="14" ry="10" fill="#84CC16" stroke="#3F6212" stroke-width="2.5" />
      <ellipse cx="16" cy="14" rx="10" ry="7" fill="#A3E635" />
      <!-- Pickled seeds pattern inside -->
      <circle cx="13" cy="13" r="1.2" fill="#4D7C0F" />
      <circle cx="16" cy="11" r="1.2" fill="#4D7C0F" />
      <circle cx="19" cy="13" r="1.2" fill="#4D7C0F" />
      <circle cx="16" cy="16" r="1.2" fill="#4D7C0F" />
    </g>
  </svg>`,

  // 10. Gomme (foo_27 / foo_gomme) - Bubblegum pack & giant blown pink bubble
  'foo_gomme.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Giant Shiny Blown Pink Bubblegum Bubble -->
    <g transform="translate(68, 14)">
      <!-- Bubble Shadow -->
      <circle cx="32" cy="38" r="32" fill="#F472B6" stroke="#DB2777" stroke-width="3" />
      <!-- Shading gradient / 3D sphere look -->
      <circle cx="30" cy="36" r="28" fill="#EC4899" />
      <ellipse cx="26" cy="30" rx="22" ry="18" fill="#F472B6" />
      <ellipse cx="22" cy="24" rx="14" ry="10" fill="#FBCFE8" />
      <!-- Curved glossy bubble highlights -->
      <path d="M 14 18 C 16 12 26 10 32 12" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none" />
      <circle cx="38" cy="16" r="2" fill="#FFFFFF" />
      <!-- Bubble knot / stem where blown -->
      <path d="M 8 58 Q 4 64 0 66 Q 6 68 10 64 Z" fill="#DB2777" />
    </g>
    <!-- Bubblegum Pack (slide-open pack with gum sticks) -->
    <g transform="translate(12, 46) rotate(-10)">
      <!-- Gum stick sticking out in silver foil -->
      <rect x="22" y="-12" width="18" height="34" rx="2" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5" />
      <!-- Pink gum tip exposed -->
      <rect x="22" y="-18" width="18" height="10" rx="2" fill="#F472B6" stroke="#DB2777" stroke-width="1.5" />
      <!-- Main Gum Pack (retro blue & pink) -->
      <rect x="8" y="6" width="46" height="58" rx="6" fill="#38BDF8" stroke="#0284C7" stroke-width="2.5" />
      <!-- Bright pink banner across pack -->
      <rect x="8" y="24" width="46" height="22" fill="#EC4899" stroke="#BE185D" stroke-width="1.5" />
      <!-- "GUM" letter graphic motif / star -->
      <circle cx="31" cy="35" r="7" fill="#FDE047" />
      <polygon points="31,29 33,33 37,35 33,37 31,41 29,37 25,35 29,33" fill="#EF4444" />
      <!-- Diagonal stripes -->
      <path d="M 8 16 L 24 6 M 8 52 L 40 64" stroke="#BAE6FD" stroke-width="2" />
    </g>
    <!-- Loose unwrapped pink bubblegum chew piece on ground -->
    <g transform="translate(24, 96)">
      <rect x="0" y="0" width="28" height="12" rx="3" fill="#F472B6" stroke="#DB2777" stroke-width="2" />
      <line x1="8" y1="2" x2="8" y2="10" stroke="#FBCFE8" stroke-width="1.5" />
      <line x1="16" y1="2" x2="16" y2="10" stroke="#FBCFE8" stroke-width="1.5" />
    </g>
  </svg>`,

  // 11. Jell-O (foo_30 / foo_jello) - Translucent ruby wobbly molded gelatin dome on plate
  'foo_jello.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- White Ceramic Serving Plate -->
    <ellipse cx="70" cy="88" rx="54" ry="18" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="3" />
    <ellipse cx="70" cy="88" rx="44" ry="13" fill="#F1F5F9" stroke="#E2E8F0" stroke-width="2" />
    <!-- Ruby Red Translucent Molded Gelatin Dome -->
    <!-- Wobbly Base -->
    <path d="M 32 82 C 32 82 30 52 42 34 C 52 20 88 20 98 34 C 110 52 108 82 108 82 C 108 94 32 94 32 82 Z" fill="#DC2626" stroke="#991B1B" stroke-width="3" />
    <!-- Fluted Mold Segments / Ribs -->
    <path d="M 44 38 Q 40 64 36 84" stroke="#B91C1C" stroke-width="2.5" fill="none" />
    <path d="M 58 26 Q 54 62 50 88" stroke="#B91C1C" stroke-width="2.5" fill="none" />
    <path d="M 70 24 Q 70 62 70 90" stroke="#EF4444" stroke-width="2" fill="none" />
    <path d="M 82 26 Q 86 62 90 88" stroke="#B91C1C" stroke-width="2.5" fill="none" />
    <path d="M 96 38 Q 100 64 104 84" stroke="#B91C1C" stroke-width="2.5" fill="none" />
    <!-- Top Crown indentation -->
    <ellipse cx="70" cy="28" rx="20" ry="7" fill="#EF4444" stroke="#991B1B" stroke-width="2" />
    <ellipse cx="70" cy="27" rx="14" ry="4.5" fill="#F87171" />
    <!-- Translucent Glistening Highlights -->
    <path d="M 46 44 Q 48 64 46 76" stroke="#FECACA" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <path d="M 64 34 Q 66 54 65 74" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none" />
    <ellipse cx="72" cy="26" rx="4" ry="2" fill="#FFFFFF" />
    <!-- Wobble motion vibration lines -->
    <path d="M 22 52 Q 26 56 22 60" stroke="#F87171" stroke-width="2" fill="none" stroke-linecap="round" />
    <path d="M 18 46 Q 22 56 18 66" stroke="#F87171" stroke-width="2" fill="none" stroke-linecap="round" />
    <path d="M 118 52 Q 114 56 118 60" stroke="#F87171" stroke-width="2" fill="none" stroke-linecap="round" />
    <path d="M 122 46 Q 118 56 122 66" stroke="#F87171" stroke-width="2" fill="none" stroke-linecap="round" />
  </svg>`,

  // 12. Noix (foo_35 / foo_noix) - Cracked walnut showing brain-like kernel + hazelnut
  'foo_noix.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Whole Walnut on left background -->
    <g transform="translate(18, 40) rotate(-15)">
      <!-- Oval bumpy woody shell -->
      <path d="M 10 30 C 8 12 24 2 38 6 C 52 10 54 36 44 48 C 32 58 12 50 10 30 Z" fill="#B45309" stroke="#78350F" stroke-width="2.5" />
      <!-- Center seam of walnut shell -->
      <path d="M 38 6 C 34 24 32 38 40 49" stroke="#78350F" stroke-width="2.5" fill="none" />
      <!-- Wrinkles / texture grooves on shell -->
      <path d="M 22 18 Q 28 26 24 38" stroke="#92400E" stroke-width="2" fill="none" />
      <path d="M 44 18 Q 48 28 42 38" stroke="#92400E" stroke-width="2" fill="none" />
    </g>
    <!-- Big Cracked Open Walnut showing golden brain-shaped kernel (Center) -->
    <g transform="translate(44, 28)">
      <!-- Outer wooden shell cup -->
      <path d="M 6 36 C 4 14 26 4 48 8 C 66 12 70 34 66 56 C 60 76 10 74 6 36 Z" fill="#92400E" stroke="#78350F" stroke-width="3" />
      <!-- Inner shell rim -->
      <path d="M 10 36 C 8 18 26 10 46 14 C 62 18 64 36 60 52 C 54 68 14 66 10 36 Z" fill="#FDE68A" stroke="#B45309" stroke-width="2" />
      <!-- Walnut Kernel (Brain-like golden convoluted lobes) -->
      <!-- Left lobe -->
      <path d="M 16 36 C 14 24 22 18 30 20 C 34 22 32 30 28 32 C 34 34 34 44 28 48 C 22 52 16 48 16 36 Z" fill="#D97706" stroke="#92400E" stroke-width="2" />
      <circle cx="24" cy="26" r="3" fill="#FBBF24" />
      <circle cx="23" cy="40" r="3" fill="#FBBF24" />
      <!-- Right lobe -->
      <path d="M 40 22 C 48 20 54 26 52 38 C 50 48 44 54 38 50 C 34 46 38 38 34 34 C 36 28 36 24 40 22 Z" fill="#D97706" stroke="#92400E" stroke-width="2" />
      <circle cx="45" cy="28" r="3" fill="#FBBF24" />
      <circle cx="44" cy="42" r="3" fill="#FBBF24" />
      <!-- Center dividing septum -->
      <line x1="33" y1="16" x2="33" y2="58" stroke="#78350F" stroke-width="2.5" />
    </g>
    <!-- Hazelnut / Noisette in shell on bottom right -->
    <g transform="translate(94, 62) rotate(15)">
      <!-- Hazelnut acorn-like woody body -->
      <path d="M 6 18 C 6 6 26 4 28 18 C 30 30 18 36 16 36 C 14 36 4 30 6 18 Z" fill="#B45309" stroke="#78350F" stroke-width="2.5" />
      <!-- Pale top cap (hilar scar) -->
      <ellipse cx="17" cy="10" rx="10" ry="5" fill="#FDE68A" stroke="#78350F" stroke-width="2" />
      <!-- Vertical wood grain -->
      <path d="M 12 14 Q 10 24 16 34" stroke="#78350F" stroke-width="1.5" fill="none" />
      <path d="M 22 14 Q 24 24 18 34" stroke="#78350F" stroke-width="1.5" fill="none" />
    </g>
  </svg>`,

  // 13. Nouilles / pâtes (foo_36 / foo_nouilles) - Asian noodle bowl with curly noodles lifted by chopsticks
  'foo_nouilles.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Chopsticks lifting curly yellow noodles -->
    <g transform="translate(56, 12)">
      <!-- Chopstick 1 -->
      <line x1="0" y1="20" x2="68" y2="6" stroke="#92400E" stroke-width="3" stroke-linecap="round" />
      <!-- Chopstick 2 -->
      <line x1="0" y1="26" x2="68" y2="10" stroke="#78350F" stroke-width="3" stroke-linecap="round" />
      <!-- Lifted curly yellow noodles hanging from sticks -->
      <path d="M 22 22 Q 18 34 24 44 Q 20 54 26 66" stroke="#FBBF24" stroke-width="3" fill="none" stroke-linecap="round" />
      <path d="M 28 20 Q 34 32 28 44 Q 34 54 30 68" stroke="#FDE047" stroke-width="3.5" fill="none" stroke-linecap="round" />
      <path d="M 36 21 Q 40 34 34 46 Q 42 56 36 68" stroke="#F59E0B" stroke-width="3" fill="none" stroke-linecap="round" />
    </g>
    <!-- Ceramic Noodle Bowl (Red with white decorative rim) -->
    <g transform="translate(24, 46)">
      <!-- Bowl base foot -->
      <ellipse cx="46" cy="54" rx="20" ry="5" fill="#991B1B" />
      <!-- Bowl body -->
      <path d="M 6 18 C 8 56 84 56 86 18 Z" fill="#DC2626" stroke="#991B1B" stroke-width="3" />
      <!-- Bowl Rim -->
      <ellipse cx="46" cy="18" rx="40" ry="14" fill="#FEE2E2" stroke="#991B1B" stroke-width="2.5" />
      <!-- Delicious warm broth -->
      <ellipse cx="46" cy="19" rx="36" ry="11" fill="#D97706" />
      <!-- Tangle of curly yellow noodles in bowl -->
      <path d="M 18 18 Q 24 14 30 20 Q 36 24 44 18 Q 52 14 60 20 Q 68 24 74 18" stroke="#FDE047" stroke-width="3.5" fill="none" stroke-linecap="round" />
      <path d="M 22 22 Q 30 26 38 20 Q 48 24 56 18 Q 66 22 72 22" stroke="#FBBF24" stroke-width="3.5" fill="none" stroke-linecap="round" />
      <path d="M 30 16 Q 42 12 50 17" stroke="#F59E0B" stroke-width="3" fill="none" stroke-linecap="round" />
      <!-- Soft boiled egg half -->
      <ellipse cx="32" cy="18" rx="8" ry="6" fill="#FFFFFF" />
      <ellipse cx="33" cy="18" rx="4.5" ry="3.5" fill="#F97316" />
      <!-- Green scallion rings -->
      <circle cx="58" cy="17" r="2.5" fill="#22C55E" stroke="#15803D" stroke-width="1" />
      <circle cx="66" cy="20" r="2" fill="#22C55E" stroke="#15803D" stroke-width="1" />
      <!-- Decorative pattern on bowl -->
      <path d="M 16 30 Q 46 44 76 30" stroke="#FEE2E2" stroke-width="2" fill="none" />
      <circle cx="46" cy="38" r="3" fill="#FEF08A" />
    </g>
    <!-- Steaming fragrant vapor curls -->
    <path d="M 38 34 Q 42 24 38 16" stroke="rgba(255,255,255,0.7)" stroke-width="2" fill="none" stroke-linecap="round" />
    <path d="M 100 34 Q 104 24 100 16" stroke="rgba(255,255,255,0.7)" stroke-width="2" fill="none" stroke-linecap="round" />
  </svg>`,

  // 14. Nourriture (foo_37 / foo_nourriture) - Toddler divided meal plate: sandwich triangles, broccoli florets, carrots, apples
  'foo_nourriture.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="56" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Rimmed Toddler Sectioned Meal Plate -->
    <circle cx="70" cy="62" r="50" fill="#F0FDF4" stroke="#86EFAC" stroke-width="4" />
    <circle cx="70" cy="62" r="44" fill="#FFFFFF" stroke="#BBF7D0" stroke-width="2" />
    <!-- Plate Dividers -->
    <line x1="70" y1="18" x2="70" y2="106" stroke="#86EFAC" stroke-width="3" />
    <line x1="70" y1="62" x2="114" y2="62" stroke="#86EFAC" stroke-width="3" />
    <!-- Left Section: 2 Golden Toasted Sandwich Triangles -->
    <g transform="translate(28, 38)">
      <!-- Sandwich bottom piece -->
      <polygon points="6,46 34,46 34,16" fill="#F59E0B" stroke="#B45309" stroke-width="2" />
      <polygon points="9,43 31,43 31,21" fill="#FEF3C7" />
      <rect x="14" y="38" width="18" height="4" fill="#EF4444" />
      <rect x="18" y="34" width="14" height="4" fill="#22C55E" />
      <!-- Sandwich top piece -->
      <polygon points="2,40 30,40 2,12" fill="#FBBF24" stroke="#B45309" stroke-width="2" />
      <polygon points="5,37 25,37 5,17" fill="#FFFBEB" />
      <rect x="4" y="30" width="16" height="4" fill="#F59E0B" />
      <rect x="6" y="26" width="14" height="4" fill="#EF4444" />
    </g>
    <!-- Top-Right Section: Fresh Green Broccoli Florets -->
    <g transform="translate(76, 26)">
      <!-- Broccoli Stalk -->
      <rect x="14" y="18" width="6" height="10" fill="#86EFAC" stroke="#16A34A" stroke-width="1.5" />
      <!-- Broccoli florets bush -->
      <circle cx="10" cy="14" r="7" fill="#22C55E" />
      <circle cx="17" cy="10" r="8" fill="#16A34A" />
      <circle cx="24" cy="14" r="7" fill="#22C55E" />
      <circle cx="17" cy="15" r="6" fill="#15803D" />
      <!-- Mini secondary floret -->
      <circle cx="28" cy="22" r="5" fill="#22C55E" />
      <circle cx="7" cy="22" r="4.5" fill="#16A34A" />
    </g>
    <!-- Bottom-Right Section: Baby Carrot Sticks & Red Apple Slice -->
    <g transform="translate(78, 68)">
      <!-- 2 Orange Carrot sticks -->
      <rect x="6" y="8" width="22" height="6" rx="3" transform="rotate(-15 17 11)" fill="#F97316" stroke="#C2410C" stroke-width="1.5" />
      <rect x="8" y="20" width="22" height="6" rx="3" transform="rotate(-5 19 23)" fill="#FB923C" stroke="#C2410C" stroke-width="1.5" />
      <!-- Crisp Apple Slice -->
      <path d="M 12 32 C 18 24 30 24 34 32 C 28 36 18 36 12 32 Z" fill="#FEE2E2" stroke="#DC2626" stroke-width="2" />
      <path d="M 12 32 C 18 24 30 24 34 32" stroke="#DC2626" stroke-width="3" fill="none" />
    </g>
    <!-- Toddler Spoon on left side -->
    <g transform="translate(10, 48) rotate(-15)">
      <rect x="0" y="22" width="6" height="32" rx="3" fill="#38BDF8" stroke="#0284C7" stroke-width="1.5" />
      <ellipse cx="3" cy="14" rx="7" ry="10" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5" />
    </g>
  </svg>`,

  // 15. Pois (foo_44 / foo_pois) - Fresh green pea pod split open with round peas inside
  'foo_pois.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Pea Stem with Leaf and Curly Tendril -->
    <g transform="translate(18, 22)">
      <!-- Tendril -->
      <path d="M 14 26 Q 8 16 16 12 Q 24 8 20 2 Q 16 0 14 6" stroke="#16A34A" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <!-- Calyx / Little leaf -->
      <path d="M 14 26 Q 22 20 30 22 Q 24 30 14 26 Z" fill="#4ADE80" stroke="#16A34A" stroke-width="2" />
      <!-- Stem -->
      <path d="M 10 32 L 18 24" stroke="#16A34A" stroke-width="3.5" stroke-linecap="round" />
    </g>
    <!-- Open Pea Pod (Curved boat shape) -->
    <g transform="translate(20, 36)">
      <!-- Back shell of open pod -->
      <path d="M 8 20 C 14 4 64 6 98 32 C 86 52 36 54 8 20 Z" fill="#15803D" stroke="#166534" stroke-width="2.5" />
      <!-- Inner pod bed (lighter tender green) -->
      <path d="M 12 20 C 20 8 62 10 94 32 C 82 48 38 50 12 20 Z" fill="#86EFAC" />
      <!-- Row of plump round sweet peas resting in pod -->
      <!-- Pea 1 -->
      <circle cx="26" cy="22" r="8.5" fill="#22C55E" stroke="#16A34A" stroke-width="2" />
      <circle cx="24" cy="19" r="2.5" fill="#86EFAC" />
      <!-- Pea 2 -->
      <circle cx="42" cy="24" r="9.5" fill="#4ADE80" stroke="#16A34A" stroke-width="2" />
      <circle cx="39" cy="20" r="3" fill="#BBF7D0" />
      <!-- Pea 3 -->
      <circle cx="58" cy="28" r="9.5" fill="#22C55E" stroke="#16A34A" stroke-width="2" />
      <circle cx="55" cy="24" r="3" fill="#86EFAC" />
      <!-- Pea 4 -->
      <circle cx="74" cy="33" r="8.5" fill="#4ADE80" stroke="#16A34A" stroke-width="2" />
      <circle cx="72" cy="29" r="2.5" fill="#BBF7D0" />
      <!-- Front shell lip of pod holding peas -->
      <path d="M 8 20 C 24 38 64 48 98 32 C 82 56 32 54 8 20 Z" fill="#22C55E" stroke="#15803D" stroke-width="2.5" />
      <path d="M 14 26 C 30 42 66 50 94 34" stroke="#86EFAC" stroke-width="2" fill="none" />
    </g>
    <!-- Loose round peas rolling outside pod -->
    <!-- Loose pea 1 -->
    <circle cx="38" cy="100" r="8" fill="#4ADE80" stroke="#16A34A" stroke-width="2" />
    <circle cx="36" cy="97" r="2.5" fill="#FFFFFF" />
    <!-- Loose pea 2 -->
    <circle cx="58" cy="102" r="7" fill="#22C55E" stroke="#16A34A" stroke-width="2" />
    <circle cx="56" cy="99" r="2" fill="#BBF7D0" />
  </svg>`,

  // 16. Popsicle (foo_48 / foo_popsicle) - Rocket / double ice pop on wooden stick with drips
  'foo_popsicle.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="46" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Popsicle tilted playfully -->
    <g transform="translate(70, 56) rotate(22)">
      <!-- Wooden Craft Stick -->
      <rect x="-8" y="16" width="16" height="42" rx="8" fill="#FDE68A" stroke="#D97706" stroke-width="2.5" />
      <line x1="-2" y1="26" x2="-2" y2="48" stroke="#F59E0B" stroke-width="1.5" />
      <!-- Popsicle Frozen Body (Layered Rocket / Firecracker Pop) -->
      <!-- Bottom Layer (Electric Blue Raspberry) -->
      <path d="M -24 8 L 24 8 L 24 24 C 24 28 -24 28 -24 24 Z" fill="#0284C7" stroke="#0369A1" stroke-width="2.5" />
      <path d="M -24 8 L 24 8" stroke="#0369A1" stroke-width="2" />
      <!-- Middle Layer (Lime / White Lemonade) -->
      <rect x="-24" y="-12" width="48" height="20" fill="#FFFFFF" stroke="#0369A1" stroke-width="2.5" />
      <rect x="-22" y="-10" width="44" height="16" fill="#F8FAFC" />
      <!-- Top Layer (Cherry Red Cone/Round) -->
      <path d="M -24 -12 L 24 -12 L 18 -42 C 14 -52 -14 -52 -18 -42 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="2.5" />
      <!-- Rounded flute grooves in popsicle -->
      <line x1="-10" y1="-46" x2="-12" y2="22" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" stroke-linecap="round" />
      <line x1="8" y1="-46" x2="6" y2="22" stroke="rgba(0,0,0,0.12)" stroke-width="2.5" stroke-linecap="round" />
      <!-- Glossy frozen shine -->
      <path d="M -16 -40 L -20 18" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
      <!-- Melting sweet drip -->
      <path d="M 22 22 Q 28 32 24 36 C 22 38 20 36 21 30 Z" fill="#0284C7" />
    </g>
    <!-- Droplet falling on ground -->
    <ellipse cx="106" cy="106" rx="4" ry="2.5" fill="#0284C7" />
    <!-- Cold Frost / Star Sparkles -->
    <polygon points="34,26 36,30 40,32 36,34 34,38 32,34 28,32 32,30" fill="#38BDF8" />
    <polygon points="108,34 109,37 112,38 109,39 108,42 107,39 104,38 107,37" fill="#F87171" />
  </svg>`,

  // 17. Pouding (foo_49 / foo_pouding) - Creamy chocolate pudding cup with whipped cream swirl & cherry
  'foo_pouding.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Glass Dessert Cup / Goblet -->
    <!-- Base Foot -->
    <ellipse cx="70" cy="98" rx="26" ry="6" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2.5" />
    <!-- Stem -->
    <rect x="66" y="82" width="8" height="18" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2" />
    <!-- Glass Cup Bowl -->
    <path d="M 26 44 C 28 84 112 84 114 44 Z" fill="rgba(241,245,249,0.5)" stroke="#94A3B8" stroke-width="2.5" />
    <!-- Rich Creamy Chocolate Pudding Filling -->
    <path d="M 29 48 C 31 80 109 80 111 48 Z" fill="#58240D" stroke="#3B1808" stroke-width="2" />
    <ellipse cx="70" cy="48" rx="41" ry="12" fill="#78350F" />
    <!-- Creamy pudding swirl texture -->
    <path d="M 40 48 Q 70 56 100 48" stroke="#92400E" stroke-width="2.5" fill="none" />
    <!-- Fluffy Cloud of Whipped Cream on top -->
    <path d="M 48 46 C 44 38 52 30 60 34 C 64 26 76 26 80 32 C 88 28 96 36 92 46 Z" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" />
    <circle cx="62" cy="38" r="6" fill="#F8FAFC" />
    <circle cx="78" cy="38" r="6" fill="#F8FAFC" />
    <!-- Whipped Cream Swirl tip -->
    <path d="M 68 30 Q 72 20 74 16 Q 74 22 72 28" stroke="#E2E8F0" stroke-width="2" fill="#FFFFFF" />
    <!-- Glossy Red Maraschino Cherry with Stem -->
    <circle cx="76" cy="18" r="7" fill="#DC2626" stroke="#991B1B" stroke-width="1.5" />
    <circle cx="74" cy="16" r="2" fill="#FCA5A5" />
    <path d="M 76 12 Q 86 2 92 8" stroke="#15803D" stroke-width="2" fill="none" stroke-linecap="round" />
    <!-- Spoon tucked in cup -->
    <g transform="translate(86, 18) rotate(25)">
      <rect x="0" y="0" width="7" height="38" rx="3.5" fill="#CBD5E1" stroke="#64748B" stroke-width="1.5" />
      <ellipse cx="3.5" cy="4" rx="6" ry="7" fill="#E2E8F0" />
      <path d="M -1 20 Q 3.5 24 8 20" fill="#58240D" />
    </g>
    <!-- Glass shine -->
    <path d="M 36 56 C 40 74 60 78 60 78" stroke="rgba(255,255,255,0.6)" stroke-width="2" fill="none" stroke-linecap="round" />
  </svg>`,

  // 18. Raisin sec (foo_52 / foo_raisin_sec) - Little red raisin snack box + wrinkled dark raisins
  'foo_raisin_sec.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Iconic Red Raisin Snack Box in background -->
    <g transform="translate(24, 22) rotate(-8)">
      <!-- 3D Box Side -->
      <polygon points="10,18 20,10 20,74 10,82" fill="#991B1B" stroke="#7F1D1D" stroke-width="2" />
      <!-- 3D Box Top Flaps (Open box showing raisins) -->
      <polygon points="10,18 20,10 66,10 56,18" fill="#DC2626" stroke="#7F1D1D" stroke-width="2" />
      <!-- Open top flap -->
      <polygon points="20,10 30,-2 56,-2 46,10" fill="#EF4444" stroke="#7F1D1D" stroke-width="1.5" />
      <!-- Box Front Face -->
      <rect x="20" y="10" width="48" height="72" rx="4" fill="#DC2626" stroke="#991B1B" stroke-width="2.5" />
      <!-- Golden sunburst graphic on box -->
      <circle cx="44" cy="38" r="14" fill="#FDE047" stroke="#EAB308" stroke-width="1.5" />
      <!-- Cluster of mini raisins on box graphic -->
      <circle cx="41" cy="36" r="3" fill="#3B1808" />
      <circle cx="47" cy="36" r="3" fill="#3B1808" />
      <circle cx="44" cy="42" r="3" fill="#3B1808" />
      <!-- White banner on box -->
      <rect x="24" y="56" width="40" height="14" rx="2" fill="#FFFFFF" />
      <line x1="28" y1="63" x2="60" y2="63" stroke="#DC2626" stroke-width="2" />
    </g>
    <!-- Foreground Scatter of Dark Wrinkled Sweet Raisins -->
    <!-- Raisin 1 (Large prominent wrinkly raisin) -->
    <g transform="translate(76, 68)">
      <ellipse cx="14" cy="12" rx="14" ry="10" fill="#3B1808" stroke="#1F0D04" stroke-width="2" />
      <!-- Wrinkle creases -->
      <path d="M 6 10 Q 14 6 22 10" stroke="#58240D" stroke-width="2" fill="none" />
      <path d="M 8 14 Q 16 18 22 13" stroke="#58240D" stroke-width="2" fill="none" />
      <path d="M 12 7 Q 16 12 14 17" stroke="#2D1105" stroke-width="1.5" fill="none" />
      <circle cx="10" cy="9" r="1" fill="#78350F" />
    </g>
    <!-- Raisin 2 -->
    <g transform="translate(100, 78) rotate(25)">
      <ellipse cx="12" cy="9" rx="12" ry="8" fill="#451A03" stroke="#1F0D04" stroke-width="2" />
      <path d="M 4 8 Q 12 5 18 8" stroke="#78350F" stroke-width="1.8" fill="none" />
      <path d="M 6 11 Q 12 13 18 10" stroke="#78350F" stroke-width="1.8" fill="none" />
    </g>
    <!-- Raisin 3 -->
    <g transform="translate(68, 86) rotate(-15)">
      <ellipse cx="11" cy="8" rx="11" ry="7" fill="#3B1808" stroke="#1F0D04" stroke-width="1.8" />
      <path d="M 4 7 Q 11 5 17 8" stroke="#58240D" stroke-width="1.5" fill="none" />
    </g>
    <!-- Raisin 4 -->
    <g transform="translate(90, 92)">
      <ellipse cx="9" cy="7" rx="9" ry="6" fill="#451A03" stroke="#1F0D04" stroke-width="1.8" />
      <path d="M 3 6 Q 9 4 15 7" stroke="#78350F" stroke-width="1.5" fill="none" />
    </g>
    <!-- Raisin 5 (near box) -->
    <g transform="translate(48, 96)">
      <ellipse cx="8" cy="6" rx="8" ry="5.5" fill="#3B1808" stroke="#1F0D04" stroke-width="1.5" />
    </g>
  </svg>`,

  // 19. Sauce (foo_54 / foo_sauce) - White ceramic gravy/sauce boat pouring rich golden-brown sauce
  'foo_sauce.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- White Sauce Boat / Gravy Boat tipped at an angle pouring -->
    <g transform="translate(64, 46) rotate(-22)">
      <!-- Sauce Boat Foot -->
      <ellipse cx="0" cy="30" rx="18" ry="5" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2" />
      <!-- Handle on right -->
      <path d="M 28 4 C 44 4 44 24 24 24" stroke="#E2E8F0" stroke-width="5" fill="none" stroke-linecap="round" />
      <path d="M 28 4 C 44 4 44 24 24 24" stroke="#94A3B8" stroke-width="2" fill="none" stroke-linecap="round" />
      <!-- Boat Bowl Body -->
      <path d="M -38 -2 C -40 24 24 30 32 4 C 20 8 -24 6 -38 -2 Z" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2.5" />
      <!-- Warm Savory Sauce inside boat -->
      <ellipse cx="-4" cy="6" rx="26" ry="8" fill="#B45309" />
      <ellipse cx="-4" cy="5" rx="22" ry="6" fill="#D97706" />
      <!-- Boat Pouring Lip / Spout -->
      <path d="M -38 -2 C -48 -6 -54 2 -46 8 L -36 12 Z" fill="#F8FAFC" stroke="#94A3B8" stroke-width="2" />
    </g>
    <!-- Liquid stream of rich glossy sauce pouring down -->
    <g transform="translate(18, 38)">
      <!-- Pouring Ribbon -->
      <path d="M 32 10 Q 24 30 26 58 Q 24 64 20 68" stroke="#B45309" stroke-width="5" fill="none" stroke-linecap="round" />
      <path d="M 32 10 Q 24 30 26 58 Q 24 64 20 68" stroke="#D97706" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <!-- Splash droplets -->
      <circle cx="20" cy="74" r="2.5" fill="#D97706" />
      <circle cx="28" cy="66" r="1.5" fill="#B45309" />
      <circle cx="14" cy="62" r="1.5" fill="#D97706" />
      <!-- Puddle of delicious sauce on plate below -->
      <ellipse cx="28" cy="72" rx="18" ry="6" fill="#B45309" />
      <ellipse cx="28" cy="71" rx="14" ry="4" fill="#D97706" />
      <ellipse cx="26" cy="70" rx="6" ry="2" fill="#F59E0B" />
    </g>
    <!-- Delicious steam aroma swirls -->
    <path d="M 72 26 Q 76 18 72 10" stroke="rgba(217,119,6,0.6)" stroke-width="2" fill="none" stroke-linecap="round" />
    <path d="M 86 32 Q 90 22 86 14" stroke="rgba(217,119,6,0.6)" stroke-width="2" fill="none" stroke-linecap="round" />
  </svg>`,

  // 20. Thon (foo_59 / foo_thon) - Canned tuna: opened round tin can with flaky cooked pink tuna & fork
  'foo_thon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Canned Tuna Metal Tin Can -->
    <g transform="translate(30, 36)">
      <!-- Can Lower Body -->
      <rect x="4" y="24" width="72" height="34" fill="#0284C7" stroke="#0369A1" stroke-width="2.5" />
      <!-- Can Bottom Rim -->
      <ellipse cx="40" cy="58" rx="36" ry="10" fill="#94A3B8" stroke="#64748B" stroke-width="2.5" />
      <!-- Label on Tuna Can -->
      <rect x="4" y="28" width="72" height="22" fill="#38BDF8" />
      <!-- Fish silhouette logo on blue can label -->
      <path d="M 30 39 Q 40 33 46 39 Q 40 45 30 39 Z" fill="#FFFFFF" />
      <polygon points="44,39 50,35 50,43" fill="#FFFFFF" />
      <!-- Can Top Metal Rim -->
      <ellipse cx="40" cy="24" rx="36" ry="12" fill="#CBD5E1" stroke="#64748B" stroke-width="2.5" />
      <!-- Inside Can: Delicious cooked flaky pink tuna meat -->
      <ellipse cx="40" cy="24" rx="32" ry="10" fill="#FDA4AF" stroke="#E11D48" stroke-width="1.5" />
      <!-- Flaked tuna texture lines -->
      <path d="M 18 23 Q 28 20 38 24" stroke="#F43F5E" stroke-width="2" fill="none" />
      <path d="M 32 26 Q 44 22 56 25" stroke="#F43F5E" stroke-width="2" fill="none" />
      <path d="M 22 26 Q 36 28 48 27" stroke="#FECDD3" stroke-width="2" fill="none" />
      <path d="M 44 21 Q 54 20 62 23" stroke="#F43F5E" stroke-width="1.8" fill="none" />
      <!-- Metal Lid peeled back open -->
      <g transform="translate(4, 12)">
        <ellipse cx="36" cy="0" rx="32" ry="8" transform="rotate(-30 36 0)" fill="#E2E8F0" stroke="#64748B" stroke-width="2" />
        <ellipse cx="36" cy="0" rx="28" ry="6" transform="rotate(-30 36 0)" fill="#CBD5E1" />
        <circle cx="16" cy="-8" r="4" fill="#94A3B8" />
      </g>
    </g>
    <!-- Silver Fork resting across can scooping tuna flake -->
    <g transform="translate(74, 16) rotate(32)">
      <!-- Fork handle -->
      <rect x="0" y="0" width="6" height="52" rx="3" fill="#CBD5E1" stroke="#64748B" stroke-width="1.5" />
      <!-- Fork tines -->
      <path d="M -4 46 L 10 46 L 10 60 L 8 60 L 8 50 L 5 50 L 5 60 L 3 60 L 3 50 L 0 50 L 0 60 L -2 60 L -2 50 L -4 50 Z" fill="#E2E8F0" stroke="#64748B" stroke-width="1" />
      <!-- Fork scooped tuna morsel -->
      <ellipse cx="3" cy="56" rx="5" ry="3" fill="#FDA4AF" stroke="#E11D48" stroke-width="1" />
    </g>
    <!-- Fresh lemon slice on left -->
    <g transform="translate(14, 76) rotate(-15)">
      <path d="M 4 20 C 6 8 22 4 30 10 C 26 22 16 26 4 20 Z" fill="#FEF08A" stroke="#EAB308" stroke-width="2" />
      <path d="M 4 20 C 6 8 22 4 30 10" stroke="#EAB308" stroke-width="3" fill="none" />
      <polygon points="16,14 12,18 20,18" fill="#FACC15" />
    </g>
  </svg>`,

  // 21. Yogourt (foo_64 / foo_yogourt) - Yogurt pot with foil lid peeled open, fruit swirl & spoon
  'foo_yogourt.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Yogurt Pot / Tub -->
    <g transform="translate(36, 26)">
      <!-- Tapered Tub Body -->
      <polygon points="8,26 60,26 52,78 16,78" fill="#F472B6" stroke="#DB2777" stroke-width="3" />
      <!-- White decorative band on tub -->
      <polygon points="10,40 58,40 55,62 13,62" fill="#FFFFFF" />
      <!-- Cute Strawberry & swirl logo on cup -->
      <path d="M 34 46 C 30 46 28 50 30 54 C 32 58 34 60 34 60 C 34 60 36 58 38 54 C 40 50 38 46 34 46 Z" fill="#EF4444" />
      <polygon points="32,46 34,44 36,46" fill="#22C55E" />
      <!-- Swirl under strawberry -->
      <path d="M 24 56 Q 34 62 44 56" stroke="#EC4899" stroke-width="2" fill="none" stroke-linecap="round" />
      <!-- Top Rim of Pot -->
      <ellipse cx="34" cy="26" rx="28" ry="9" fill="#FCE7F3" stroke="#DB2777" stroke-width="2.5" />
      <!-- Creamy Yogurt Surface inside tub -->
      <ellipse cx="34" cy="27" rx="25" ry="7.5" fill="#FFF1F2" />
      <!-- Berry Puree swirl in yogurt -->
      <path d="M 18 26 Q 28 31 38 27 Q 48 23 52 27" stroke="#F43F5E" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <!-- Peel-back Silver/Pink Foil Lid -->
      <g transform="translate(6, 4)">
        <path d="M 6 22 C 8 8 38 6 52 16 C 42 12 18 14 6 22 Z" fill="#FBCFE8" stroke="#DB2777" stroke-width="2" />
        <ellipse cx="28" cy="14" rx="20" ry="5" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5" />
      </g>
    </g>
    <!-- Toddler Spoon resting inside the yogurt with creamy dollop -->
    <g transform="translate(72, 12) rotate(22)">
      <!-- Spoon handle -->
      <rect x="0" y="0" width="7" height="42" rx="3.5" fill="#38BDF8" stroke="#0284C7" stroke-width="1.8" />
      <!-- Spoon bowl dipping into yogurt -->
      <ellipse cx="3.5" cy="42" rx="7" ry="9" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5" />
      <!-- Creamy pink yogurt dollop on spoon -->
      <ellipse cx="3.5" cy="40" rx="5" ry="6" fill="#FFF1F2" />
      <ellipse cx="3.5" cy="40" rx="3" ry="3.5" fill="#F43F5E" />
    </g>
    <!-- Fresh strawberry beside the yogurt pot -->
    <g transform="translate(20, 80) rotate(-12)">
      <path d="M 16 6 C 8 6 4 14 6 22 C 8 28 16 34 16 34 C 16 34 24 28 26 22 C 28 14 24 6 16 6 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="2" />
      <polygon points="12,6 16,10 20,6 16,3" fill="#22C55E" />
      <circle cx="12" cy="14" r="0.8" fill="#FEF08A" />
      <circle cx="18" cy="16" r="0.8" fill="#FEF08A" />
      <circle cx="14" cy="22" r="0.8" fill="#FEF08A" />
      <circle cx="20" cy="24" r="0.8" fill="#FEF08A" />
    </g>
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

  'veh_poussette.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <!-- Soft ground shadow -->
    <ellipse cx="68" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Lower Frame & Axles -->
    <line x1="36" y1="98" x2="68" y2="76" stroke="#94A3B8" stroke-width="5" stroke-linecap="round" />
    <line x1="96" y1="98" x2="68" y2="76" stroke="#94A3B8" stroke-width="5" stroke-linecap="round" />
    <!-- Under-seat Storage Basket -->
    <path d="M 44 86 L 86 86 L 78 96 L 50 96 Z" fill="#64748B" stroke="#475569" stroke-width="2" stroke-linejoin="round" />
    <line x1="56" y1="88" x2="54" y2="94" stroke="#94A3B8" stroke-width="1.5" />
    <line x1="66" y1="88" x2="65" y2="94" stroke="#94A3B8" stroke-width="1.5" />
    <line x1="76" y1="88" x2="74" y2="94" stroke="#94A3B8" stroke-width="1.5" />
    <!-- Wheels -->
    <circle cx="36" cy="98" r="14" fill="#1E293B" />
    <circle cx="36" cy="98" r="9" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="2" />
    <circle cx="36" cy="98" r="4" fill="#0EA5E9" />
    <circle cx="96" cy="98" r="12" fill="#1E293B" />
    <circle cx="96" cy="98" r="7.5" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="2" />
    <circle cx="96" cy="98" r="3.5" fill="#0EA5E9" />
    <!-- Main Handle Beam -->
    <line x1="96" y1="98" x2="30" y2="24" stroke="#334155" stroke-width="5.5" stroke-linecap="round" />
    <path d="M 30 24 Q 22 20 18 28" stroke="#0F172A" stroke-width="7" fill="none" stroke-linecap="round" />
    <!-- Stroller Seat Body -->
    <path d="M 44 76 L 82 76 Q 88 76 90 70 L 92 56 Q 92 50 86 50 L 50 50 Q 42 50 42 58 L 42 70 Q 42 76 44 76 Z" fill="#06D6A0" stroke="#059669" stroke-width="3" />
    <path d="M 46 72 L 80 72 Q 84 72 86 68 L 88 56 L 46 56 L 46 66 Q 46 72 46 72 Z" fill="#E6FFFA" />
    <!-- Cute Teddy Bear in Stroller -->
    <circle cx="58" cy="52" r="11" fill="#FBBF24" stroke="#D97706" stroke-width="1.5" />
    <circle cx="49" cy="43" r="4.5" fill="#FBBF24" stroke="#D97706" stroke-width="1.5" />
    <circle cx="49" cy="43" r="2.5" fill="#FDE68A" />
    <circle cx="67" cy="43" r="4.5" fill="#FBBF24" stroke="#D97706" stroke-width="1.5" />
    <circle cx="67" cy="43" r="2.5" fill="#FDE68A" />
    <circle cx="54" cy="50" r="1.5" fill="#78350F" />
    <circle cx="62" cy="50" r="1.5" fill="#78350F" />
    <ellipse cx="58" cy="55" rx="3.5" ry="2.5" fill="#FEF3C7" />
    <ellipse cx="58" cy="54" rx="1.5" ry="1" fill="#78350F" />
    <!-- Folding Sun Canopy -->
    <path d="M 42 52 C 40 22 84 20 88 52 Z" fill="#118AB2" stroke="#073B4C" stroke-width="3.5" />
    <path d="M 45 52 C 44 28 78 26 84 52" stroke="#06D6A0" stroke-width="3" fill="none" />
    <path d="M 48 52 C 48 34 72 32 80 52" stroke="#48CAE4" stroke-width="2" fill="none" />
    <path d="M 88 52 Q 92 46 95 50" stroke="#FFD166" stroke-width="3" fill="none" stroke-linecap="round" />
    <!-- Front Bumper Bar -->
    <path d="M 72 62 Q 86 56 86 66" stroke="#EF476F" stroke-width="5" fill="none" stroke-linecap="round" />
    <circle cx="78" cy="60" r="2.5" fill="#FFD166" />
    <circle cx="83" cy="62" r="2.5" fill="#FFD166" />
  </svg>`,

  'veh_tricycle.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <!-- Soft ground shadow -->
    <ellipse cx="68" cy="110" rx="56" ry="6" fill="rgba(0,0,0,0.14)" />
    <!-- Far Rear Wheel -->
    <circle cx="28" cy="84" r="16" fill="#334155" />
    <circle cx="28" cy="84" r="10" fill="#FDE68A" stroke="#E2E8F0" stroke-width="1.5" />
    <circle cx="28" cy="84" r="4.5" fill="#EF476F" />
    <!-- Rear Step Platform / Tray -->
    <rect x="26" y="84" width="22" height="7" rx="3" fill="#D90429" stroke="#9B2226" stroke-width="1.5" />
    <!-- Near Rear Wheel -->
    <circle cx="40" cy="92" r="18" fill="#1E293B" />
    <circle cx="40" cy="92" r="11" fill="#FFD166" stroke="#CBD5E1" stroke-width="2" />
    <circle cx="40" cy="92" r="5" fill="#EF476F" />
    <!-- Main Sturdy Frame -->
    <path d="M 38 88 L 64 80 L 98 48" stroke="#EF476F" stroke-width="7" stroke-linecap="round" fill="none" />
    <line x1="64" y1="80" x2="64" y2="72" stroke="#475569" stroke-width="6" stroke-linecap="round" />
    <!-- Bucket Saddle -->
    <path d="M 50 72 Q 54 58 64 58 Q 74 58 78 72 Q 64 76 50 72 Z" fill="#118AB2" stroke="#073B4C" stroke-width="2.5" />
    <path d="M 53 68 Q 64 72 75 68" stroke="#48CAE4" stroke-width="2" fill="none" stroke-linecap="round" />
    <!-- Big Front Wheel with Direct-Drive Pedals -->
    <circle cx="98" cy="80" r="25" fill="#1E293B" />
    <circle cx="98" cy="80" r="16" fill="#FFD166" stroke="#F59E0B" stroke-width="2.5" />
    <line x1="98" y1="64" x2="98" y2="96" stroke="#F59E0B" stroke-width="2" />
    <line x1="82" y1="80" x2="114" y2="80" stroke="#F59E0B" stroke-width="2" />
    <line x1="87" y1="69" x2="109" y2="91" stroke="#F59E0B" stroke-width="2" />
    <line x1="87" y1="91" x2="109" y2="69" stroke="#F59E0B" stroke-width="2" />
    <circle cx="98" cy="80" r="6" fill="#EF476F" stroke="#9B2226" stroke-width="1.5" />
    <!-- Pedals on Front Hub -->
    <line x1="98" y1="80" x2="88" y2="66" stroke="#64748B" stroke-width="4.5" stroke-linecap="round" />
    <rect x="80" y="62" width="12" height="6" rx="2" fill="#06D6A0" stroke="#059669" stroke-width="1.5" />
    <line x1="98" y1="80" x2="108" y2="94" stroke="#64748B" stroke-width="4.5" stroke-linecap="round" />
    <rect x="104" y="92" width="12" height="6" rx="2" fill="#06D6A0" stroke="#059669" stroke-width="1.5" />
    <!-- Front Fork & Handlebars -->
    <line x1="98" y1="48" x2="98" y2="80" stroke="#D90429" stroke-width="6" stroke-linecap="round" />
    <line x1="98" y1="48" x2="96" y2="28" stroke="#94A3B8" stroke-width="6" stroke-linecap="round" />
    <path d="M 82 32 Q 96 26 110 32" stroke="#475569" stroke-width="5" fill="none" stroke-linecap="round" />
    <rect x="76" y="29" width="8" height="7" rx="3" fill="#118AB2" stroke="#073B4C" stroke-width="1" />
    <rect x="108" y="29" width="8" height="7" rx="3" fill="#118AB2" stroke="#073B4C" stroke-width="1" />
    <path d="M 76 33 Q 70 36 68 42" stroke="#FFD166" stroke-width="2" fill="none" stroke-linecap="round" />
    <path d="M 76 34 Q 72 40 70 46" stroke="#EF476F" stroke-width="2" fill="none" stroke-linecap="round" />
    <path d="M 116 33 Q 122 36 124 42" stroke="#FFD166" stroke-width="2" fill="none" stroke-linecap="round" />
    <path d="M 116 34 Q 120 40 122 46" stroke="#EF476F" stroke-width="2" fill="none" stroke-linecap="round" />
    <ellipse cx="104" cy="24" rx="4.5" ry="4" fill="#FFD166" stroke="#B45309" stroke-width="1.5" />
    <circle cx="102" cy="22" r="1" fill="#FFF" />
  </svg>`,

  'toy_colle.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="68" cy="112" rx="46" ry="6" fill="rgba(0,0,0,0.14)" />
    <g transform="translate(90, 68) rotate(22)">
      <rect x="-12" y="-28" width="24" height="34" rx="6" fill="#8B5CF6" stroke="#6D28D9" stroke-width="2.5" />
      <rect x="-10" y="-26" width="6" height="30" rx="3" fill="#A78BFA" opacity="0.6" />
      <line x1="-12" y1="-20" x2="12" y2="-20" stroke="#6D28D9" stroke-width="2" />
      <line x1="-12" y1="-14" x2="12" y2="-14" stroke="#6D28D9" stroke-width="2" />
    </g>
    <g transform="translate(54, 62) rotate(-8)">
      <path d="M -12 -28 C -12 -42 12 -42 12 -28 L 12 -12 L -12 -12 Z" fill="#C084FC" stroke="#A855F7" stroke-width="2" />
      <path d="M -8 -30 C -8 -38 0 -38 4 -32" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round" />
      <rect x="-16" y="-12" width="32" height="52" rx="5" fill="#FFFFFF" stroke="#3B82F6" stroke-width="3" />
      <rect x="-16" y="2" width="32" height="28" fill="#3B82F6" />
      <polygon points="0,8 2,13 7,13 3,16 5,21 0,18 -5,21 -3,16 -7,13 -2,13" fill="#FBBF24" />
      <line x1="-10" y1="24" x2="10" y2="24" stroke="#93C5FD" stroke-width="2" stroke-linecap="round" />
      <rect x="-15" y="40" width="30" height="12" rx="4" fill="#F59E0B" stroke="#D97706" stroke-width="2.5" />
      <line x1="-8" y1="42" x2="-8" y2="50" stroke="#B45309" stroke-width="1.5" />
      <line x1="0" y1="42" x2="0" y2="50" stroke="#B45309" stroke-width="1.5" />
      <line x1="8" y1="42" x2="8" y2="50" stroke="#B45309" stroke-width="1.5" />
    </g>
    <polygon points="26,34 28,39 33,39 29,42 31,47 26,44 21,47 23,42 19,39 24,39" fill="#EC4899" />
    <circle cx="108" cy="38" r="4" fill="#FDE047" />
    <circle cx="34" cy="78" r="3" fill="#A855F7" />
  </svg>`,

  'toy_crayon_couleur.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.14)" />
    <path d="M 22 96 C 28 40 112 36 122 88" stroke="#EF476F" stroke-width="3" fill="none" opacity="0.6" stroke-linecap="round" />
    <path d="M 26 98 C 32 46 108 42 118 90" stroke="#FFD166" stroke-width="3" fill="none" opacity="0.6" stroke-linecap="round" />
    <path d="M 30 100 C 36 52 104 48 114 92" stroke="#06D6A0" stroke-width="3" fill="none" opacity="0.6" stroke-linecap="round" />
    <path d="M 34 102 C 40 58 100 54 110 94" stroke="#118AB2" stroke-width="3" fill="none" opacity="0.6" stroke-linecap="round" />
    <g transform="translate(42, 68) rotate(-24)">
      <rect x="-6" y="-30" width="12" height="66" rx="2" fill="#EF476F" stroke="#BE123C" stroke-width="1.5" />
      <line x1="-2" y1="-30" x2="-2" y2="36" stroke="#FDA4AF" stroke-width="1.5" />
      <polygon points="-6,-30 6,-30 0,-48" fill="#FDE68A" stroke="#D97706" stroke-width="1.2" />
      <polygon points="-2,-42 2,-42 0,-48" fill="#EF476F" />
    </g>
    <g transform="translate(60, 64) rotate(-8)">
      <rect x="-6" y="-34" width="12" height="74" rx="2" fill="#FFD166" stroke="#D97706" stroke-width="1.5" />
      <line x1="-2" y1="-34" x2="-2" y2="40" stroke="#FEF08A" stroke-width="1.5" />
      <polygon points="-6,-34 6,-34 0,-52" fill="#FDE68A" stroke="#D97706" stroke-width="1.2" />
      <polygon points="-2,-46 2,-46 0,-52" fill="#F59E0B" />
    </g>
    <g transform="translate(80, 64) rotate(8)">
      <rect x="-6" y="-34" width="12" height="74" rx="2" fill="#06D6A0" stroke="#059669" stroke-width="1.5" />
      <line x1="-2" y1="-34" x2="-2" y2="40" stroke="#A7F3D0" stroke-width="1.5" />
      <polygon points="-6,-34 6,-34 0,-52" fill="#FDE68A" stroke="#D97706" stroke-width="1.2" />
      <polygon points="-2,-46 2,-46 0,-52" fill="#059669" />
    </g>
    <g transform="translate(98, 68) rotate(24)">
      <rect x="-6" y="-30" width="12" height="66" rx="2" fill="#118AB2" stroke="#075985" stroke-width="1.5" />
      <line x1="-2" y1="-30" x2="-2" y2="36" stroke="#BAE6FD" stroke-width="1.5" />
      <polygon points="-6,-30 6,-30 0,-48" fill="#FDE68A" stroke="#D97706" stroke-width="1.2" />
      <polygon points="-2,-42 2,-42 0,-48" fill="#0369A1" />
    </g>
    <circle cx="28" cy="30" r="3" fill="#FFD166" />
    <circle cx="116" cy="32" r="3.5" fill="#EF476F" />
  </svg>`,

  'toy_histoire.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.15)" />
    <path d="M 40 88 C 30 50 60 25 90 20" stroke="#FDE047" stroke-width="3" fill="none" stroke-dasharray="3,3" opacity="0.8" />
    <path d="M 100 88 C 110 55 80 30 55 24" stroke="#F472B6" stroke-width="2.5" fill="none" stroke-dasharray="3,3" opacity="0.7" />
    <path d="M 104 14 A 14 14 0 0 0 92 36 A 15 15 0 0 1 104 14 Z" fill="#FBBF24" stroke="#D97706" stroke-width="1.5" />
    <rect x="58" y="38" width="24" height="34" fill="#818CF8" stroke="#4338CA" stroke-width="2" />
    <rect x="56" y="34" width="7" height="6" fill="#818CF8" />
    <rect x="67" y="34" width="6" height="6" fill="#818CF8" />
    <rect x="77" y="34" width="7" height="6" fill="#818CF8" />
    <path d="M 66 72 L 66 58 C 66 54 74 54 74 58 L 74 72 Z" fill="#312E81" />
    <rect x="42" y="46" width="14" height="26" fill="#A5B4FC" stroke="#4338CA" stroke-width="1.5" />
    <polygon points="40,46 58,46 49,26" fill="#F43F5E" stroke="#BE123C" stroke-width="1.5" />
    <line x1="49" y1="26" x2="49" y2="18" stroke="#D97706" stroke-width="1.5" />
    <polygon points="49,18 43,21 49,24" fill="#FBBF24" />
    <rect x="84" y="46" width="14" height="26" fill="#A5B4FC" stroke="#4338CA" stroke-width="1.5" />
    <polygon points="82,46 100,46 91,26" fill="#38BDF8" stroke="#0284C7" stroke-width="1.5" />
    <line x1="91" y1="26" x2="91" y2="18" stroke="#D97706" stroke-width="1.5" />
    <polygon points="91,18 97,21 91,24" fill="#FBBF24" />
    <polygon points="32,24 34,29 39,29 35,32 37,37 32,34 27,37 29,32 25,29 30,29" fill="#FDE047" />
    <polygon points="112,42 113,46 117,46 114,48 115,52 112,50 109,52 110,48 107,46 111,46" fill="#F472B6" />
    <circle cx="50" cy="14" r="2.5" fill="#FFF" />
    <circle cx="86" cy="14" r="2" fill="#FFF" />
    <path d="M 18 92 Q 70 82 70 88 Q 70 82 122 92 L 126 98 Q 70 88 70 94 Q 70 88 14 98 Z" fill="#4338CA" stroke="#312E81" stroke-width="2" />
    <path d="M 22 90 Q 68 84 68 88 L 68 76 Q 24 72 22 84 Z" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" />
    <path d="M 118 90 Q 72 84 72 88 L 72 76 Q 116 72 118 84 Z" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" />
    <path d="M 70 88 L 70 106 L 74 102 L 78 106 L 78 88 Z" fill="#E11D48" />
  </svg>`,

  'toy_lego.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.14)" />
    <g transform="translate(24, 72)">
      <rect x="0" y="8" width="92" height="28" rx="4" fill="#1D4ED8" stroke="#1E40AF" stroke-width="2" />
      <rect x="0" y="8" width="92" height="6" fill="#3B82F6" opacity="0.6" />
      <ellipse cx="14" cy="8" rx="6" ry="2.5" fill="#60A5FA" stroke="#1D4ED8" stroke-width="1.5" />
      <ellipse cx="36" cy="8" rx="6" ry="2.5" fill="#60A5FA" stroke="#1D4ED8" stroke-width="1.5" />
      <ellipse cx="58" cy="8" rx="6" ry="2.5" fill="#60A5FA" stroke="#1D4ED8" stroke-width="1.5" />
      <ellipse cx="80" cy="8" rx="6" ry="2.5" fill="#60A5FA" stroke="#1D4ED8" stroke-width="1.5" />
    </g>
    <g transform="translate(36, 42)">
      <rect x="0" y="8" width="76" height="26" rx="4" fill="#DC2626" stroke="#991B1B" stroke-width="2" />
      <rect x="0" y="8" width="76" height="5" fill="#EF4444" opacity="0.6" />
      <rect x="8" y="2" width="10" height="6" fill="#EF4444" />
      <ellipse cx="13" cy="2" rx="5" ry="2.2" fill="#F87171" stroke="#991B1B" stroke-width="1.2" />
      <rect x="28" y="2" width="10" height="6" fill="#EF4444" />
      <ellipse cx="33" cy="2" rx="5" ry="2.2" fill="#F87171" stroke="#991B1B" stroke-width="1.2" />
      <rect x="48" y="2" width="10" height="6" fill="#EF4444" />
      <ellipse cx="53" cy="2" rx="5" ry="2.2" fill="#F87171" stroke="#991B1B" stroke-width="1.2" />
      <rect x="64" y="2" width="10" height="6" fill="#EF4444" />
      <ellipse cx="69" cy="2" rx="5" ry="2.2" fill="#F87171" stroke="#991B1B" stroke-width="1.2" />
    </g>
    <g transform="translate(56, 18)">
      <rect x="0" y="8" width="40" height="22" rx="3" fill="#EAB308" stroke="#A16207" stroke-width="2" />
      <rect x="0" y="8" width="40" height="4" fill="#FDE047" opacity="0.6" />
      <rect x="6" y="3" width="10" height="5" fill="#FACC15" />
      <ellipse cx="11" cy="3" rx="5" ry="2" fill="#FEF08A" stroke="#A16207" stroke-width="1.2" />
      <rect x="24" y="3" width="10" height="5" fill="#FACC15" />
      <ellipse cx="29" cy="3" rx="5" ry="2" fill="#FEF08A" stroke="#A16207" stroke-width="1.2" />
    </g>
    <g transform="translate(14, 84)">
      <rect x="0" y="6" width="30" height="18" rx="3" fill="#16A34A" stroke="#15803D" stroke-width="1.8" />
      <rect x="0" y="6" width="30" height="4" fill="#4ADE80" opacity="0.6" />
      <rect x="4" y="2" width="8" height="4" fill="#22C55E" />
      <ellipse cx="8" cy="2" rx="4" ry="1.8" fill="#86EFAC" stroke="#15803D" stroke-width="1" />
      <rect x="18" y="2" width="8" height="4" fill="#22C55E" />
      <ellipse cx="22" cy="2" rx="4" ry="1.8" fill="#86EFAC" stroke="#15803D" stroke-width="1" />
    </g>
  </svg>`,

  'toy_pate_modeler.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.14)" />
    <g transform="translate(24, 46)">
      <path d="M 4 18 L 10 58 Q 28 62 46 58 L 52 18 Z" fill="#FACC15" stroke="#CA8A04" stroke-width="2.5" />
      <path d="M 7 28 L 10 48 Q 28 52 46 48 L 49 28 Z" fill="#FFFFFF" />
      <ellipse cx="28" cy="38" rx="14" ry="7" fill="#EF4444" />
      <ellipse cx="28" cy="38" rx="8" ry="4" fill="#FFFFFF" />
      <ellipse cx="28" cy="18" rx="25" ry="6" fill="#F59E0B" stroke="#B45309" stroke-width="2" />
      <path d="M 12 18 C 12 4 44 4 44 18 C 48 10 38 -2 28 -2 C 18 -2 8 8 12 18 Z" fill="#EC4899" stroke="#DB2777" stroke-width="2" />
    </g>
    <g transform="translate(12, 92) rotate(-14)">
      <ellipse cx="14" cy="8" rx="16" ry="6" fill="#2563EB" stroke="#1D4ED8" stroke-width="2" />
      <ellipse cx="14" cy="6" rx="12" ry="4" fill="#3B82F6" />
    </g>
    <path d="M 68 96 C 68 84 82 82 88 90 C 94 98 108 94 114 86" stroke="#06D6A0" stroke-width="10" stroke-linecap="round" fill="none" />
    <path d="M 68 96 C 68 84 82 82 88 90 C 94 98 108 94 114 86" stroke="#34D399" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6" />
    <polygon points="98,54 102,62 110,63 104,69 106,77 98,72 90,77 92,69 86,63 94,62" fill="#F59E0B" stroke="#D97706" stroke-width="2" />
    <path d="M 116 70 C 116 64 122 62 122 66 C 122 72 116 78 116 78 C 116 78 110 72 110 66 C 110 62 116 64 116 70 Z" fill="#A855F7" stroke="#7E22CE" stroke-width="1.8" />
    <g transform="translate(86, 32) rotate(28)">
      <rect x="-18" y="-4" width="36" height="8" rx="2" fill="#FDE68A" stroke="#B45309" stroke-width="1.5" />
      <rect x="-24" y="-2" width="6" height="4" rx="1" fill="#D97706" />
      <rect x="18" y="-2" width="6" height="4" rx="1" fill="#D97706" />
    </g>
  </svg>`,

  'toy_jouet.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="56" ry="6" fill="rgba(0,0,0,0.14)" />
    <g transform="translate(32, 42)">
      <rect x="14" y="2" width="6" height="54" rx="2" fill="#FDE68A" stroke="#D97706" stroke-width="1.5" />
      <ellipse cx="17" cy="58" rx="22" ry="5" fill="#D97706" />
      <ellipse cx="17" cy="52" rx="20" ry="6" fill="#3B82F6" stroke="#1D4ED8" stroke-width="1.5" />
      <ellipse cx="17" cy="43" rx="17" ry="5.5" fill="#10B981" stroke="#059669" stroke-width="1.5" />
      <ellipse cx="17" cy="34" rx="14" ry="5" fill="#FBBF24" stroke="#D97706" stroke-width="1.5" />
      <ellipse cx="17" cy="25" rx="11" ry="4.5" fill="#F97316" stroke="#C2410C" stroke-width="1.5" />
      <ellipse cx="17" cy="16" rx="8" ry="4" fill="#EF4444" stroke="#B91C1C" stroke-width="1.5" />
      <circle cx="17" cy="6" r="6" fill="#EC4899" stroke="#BE185D" stroke-width="1.5" />
    </g>
    <g transform="translate(74, 52)">
      <rect x="-2" y="-12" width="4" height="14" fill="#94A3B8" />
      <circle cx="0" cy="-12" r="5" fill="#DC2626" stroke="#991B1B" stroke-width="1.2" />
      <polygon points="-24,14 24,14 0,-4" fill="#8B5CF6" stroke="#6D28D9" stroke-width="2" />
      <polygon points="-16,14 16,14 0,-4" fill="#F59E0B" />
      <polygon points="-8,14 8,14 0,-4" fill="#06D6A0" />
      <rect x="-26" y="14" width="52" height="6" rx="3" fill="#EC4899" stroke="#BE185D" stroke-width="1.5" />
      <polygon points="-22,20 22,20 0,42" fill="#3B82F6" stroke="#1D4ED8" stroke-width="2" />
      <circle cx="0" cy="42" r="2.5" fill="#475569" />
    </g>
    <g transform="translate(98, 76)">
      <path d="M 0 14 C 2 4 12 0 20 0 C 26 0 30 6 28 14 Z" fill="#F43F5E" stroke="#BE123C" stroke-width="2" />
      <circle cx="18" cy="6" r="2" fill="#FFF" />
      <circle cx="4" cy="18" r="6" fill="#FBBF24" stroke="#D97706" stroke-width="1.5" />
      <circle cx="4" cy="18" r="2" fill="#1E293B" />
      <circle cx="24" cy="18" r="6" fill="#FBBF24" stroke="#D97706" stroke-width="1.5" />
      <circle cx="24" cy="18" r="2" fill="#1E293B" />
      <path d="M 0 12 Q -8 8 -12 14" stroke="#D97706" stroke-width="1.5" fill="none" />
    </g>
    <polygon points="68,26 70,30 74,30 71,33 72,37 68,34 64,37 65,33 62,30 66,30" fill="#FBBF24" />
    <circle cx="118" cy="42" r="3" fill="#38BDF8" />
  </svg>`,

  // 1. Beurre de pinotte (foo_04 / foo_beurre_pinotte.svg)
  'foo_beurre_pinotte.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Peanut Butter Jar in background -->
    <g transform="translate(18, 22)">
      <!-- Red screw-on lid -->
      <rect x="12" y="6" width="40" height="12" rx="4" fill="#DC2626" stroke="#991B1B" stroke-width="2" />
      <line x1="16" y1="12" x2="48" y2="12" stroke="#EF4444" stroke-width="1.5" />
      <!-- Clear glass jar body -->
      <rect x="8" y="18" width="48" height="62" rx="10" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5" />
      <!-- Creamy golden peanut butter inside -->
      <rect x="11" y="24" width="42" height="53" rx="6" fill="#D97706" />
      <!-- Peanut Butter Label with peanuts graphic -->
      <rect x="14" y="34" width="36" height="30" rx="4" fill="#FFFFFF" stroke="#B45309" stroke-width="1.2" />
      <path d="M 24 44 C 22 40 26 36 30 38 C 34 36 38 40 36 44 C 38 48 34 52 30 50 C 26 52 22 48 24 44 Z" fill="#F59E0B" stroke="#B45309" stroke-width="1.2" />
      <line x1="26" y1="44" x2="34" y2="44" stroke="#92400E" stroke-width="1" />
      <!-- Jar glass shine -->
      <line x1="12" y1="22" x2="12" y2="74" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
    </g>
    <!-- Slice of toast with creamy peanut butter spread -->
    <g transform="translate(62, 44)">
      <!-- Toast crust -->
      <path d="M 12 16 C 14 6 28 6 36 10 C 44 6 58 6 60 16 L 64 56 C 64 62 58 66 52 66 L 20 66 C 14 66 8 62 8 56 Z" fill="#B45309" stroke="#78350F" stroke-width="2.5" />
      <!-- Toast interior crumb -->
      <path d="M 15 18 C 17 10 28 10 36 13 C 44 10 55 10 57 18 L 60 54 C 60 58 56 62 50 62 L 22 62 C 16 62 12 58 12 54 Z" fill="#FDE68A" />
      <!-- Thick wavy peanut butter spread on toast -->
      <path d="M 18 24 Q 34 18 50 24 Q 56 34 52 46 Q 36 56 22 50 Q 16 38 18 24 Z" fill="#D97706" stroke="#B45309" stroke-width="1.5" />
      <!-- Swirl ripples in peanut butter -->
      <path d="M 22 30 Q 36 38 48 28" stroke="#F59E0B" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <path d="M 24 42 Q 36 48 46 38" stroke="#F59E0B" stroke-width="2.5" fill="none" stroke-linecap="round" />
    </g>
    <!-- Spreading Knife -->
    <g transform="translate(76, 26) rotate(32)">
      <!-- Handle -->
      <rect x="0" y="0" width="8" height="32" rx="4" fill="#38BDF8" stroke="#0284C7" stroke-width="1.5" />
      <!-- Blade -->
      <path d="M 1 32 L 7 32 L 8 64 C 8 70 0 70 0 64 Z" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5" />
      <!-- Dollop of peanut butter on blade tip -->
      <ellipse cx="4" cy="62" rx="5" ry="4" fill="#D97706" />
    </g>
    <!-- Whole Peanuts in shell on table -->
    <g transform="translate(18, 92)">
      <path d="M 6 12 C 4 8 8 4 12 5 C 16 4 20 8 18 12 C 20 16 16 20 12 19 C 8 20 4 16 6 12 Z" fill="#FBBF24" stroke="#B45309" stroke-width="1.5" />
      <ellipse cx="12" cy="12" rx="1.5" ry="2.5" fill="#D97706" />
      <!-- Second peanut -->
      <path d="M 24 14 C 22 10 25 7 28 8 C 31 7 34 10 33 14 C 34 17 31 20 28 19 C 25 20 22 17 24 14 Z" fill="#F59E0B" stroke="#B45309" stroke-width="1.5" />
    </g>
  </svg>`,

  // 2. Bavette (clo_02 / clo_bavette.svg) - Toddler/Baby Bib with catch pocket
  'clo_bavette.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="50" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Bib Body (Soft silicone sunny yellow & mint) -->
    <g transform="translate(32, 10)">
      <!-- Neck straps extending up -->
      <path d="M 12 28 C 10 6 30 2 38 2 C 46 2 66 6 64 28 C 58 20 50 16 38 16 C 26 16 18 20 12 28 Z" fill="#FDE047" stroke="#EAB308" stroke-width="2.5" />
      <!-- Snap button on strap -->
      <circle cx="20" cy="8" r="3.5" fill="#38BDF8" stroke="#0284C7" stroke-width="1.5" />
      <circle cx="20" cy="8" r="1.5" fill="#FFFFFF" />
      <!-- Main Bib Shield / Chest Area -->
      <path d="M 8 28 C 4 56 6 82 12 92 C 18 100 58 100 64 92 C 70 82 72 56 68 28 C 58 38 48 40 38 40 C 28 40 18 38 8 28 Z" fill="#FACC15" stroke="#EAB308" stroke-width="3" />
      <!-- Chest decoration: cute smiling bear face -->
      <g transform="translate(38, 54)">
        <!-- Bear ears -->
        <circle cx="-12" cy="-10" r="4.5" fill="#F59E0B" stroke="#B45309" stroke-width="1.2" />
        <circle cx="12" cy="-10" r="4.5" fill="#F59E0B" stroke="#B45309" stroke-width="1.2" />
        <!-- Bear head -->
        <circle cx="0" cy="0" r="14" fill="#FEF3C7" stroke="#B45309" stroke-width="1.5" />
        <!-- Eyes -->
        <circle cx="-5" cy="-2" r="1.8" fill="#78350F" />
        <circle cx="5" cy="-2" r="1.8" fill="#78350F" />
        <!-- Muzzle -->
        <ellipse cx="0" cy="4" rx="5" ry="3.5" fill="#FFFFFF" />
        <ellipse cx="0" cy="3" rx="2" ry="1.2" fill="#78350F" />
        <path d="M -2 5 Q 0 7 2 5" stroke="#78350F" stroke-width="1" fill="none" />
      </g>
      <!-- Deep Crumb Catch Pocket at bottom -->
      <path d="M 6 82 C 10 98 66 98 70 82 C 60 88 16 88 6 82 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="2.5" />
      <!-- Pocket rim rolled edge -->
      <path d="M 6 82 Q 38 90 70 82" stroke="#0284C7" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <!-- Little food crumbs inside pocket -->
      <circle cx="28" cy="88" r="2" fill="#EF4444" />
      <circle cx="38" cy="90" r="2.5" fill="#F59E0B" />
      <circle cx="48" cy="88" r="2" fill="#22C55E" />
    </g>
  </svg>`,

  // 3. Couche (clo_11 / clo_couche.svg) - Toddler Training Diaper
  'clo_couche.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Clean Toddler Diaper -->
    <g transform="translate(24, 20)">
      <!-- Diaper Puffy White Main Body -->
      <path d="M 12 18 C 12 60 20 84 46 84 C 72 84 80 60 80 18 C 66 22 26 22 12 18 Z" fill="#FFFFFF" stroke="#94A3B8" stroke-width="3" />
      <!-- Elastic Leg Ruffles / Gathers -->
      <!-- Left leg gather -->
      <path d="M 12 36 Q 6 52 14 68 Q 20 78 28 82" stroke="#60A5FA" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="3,2" />
      <!-- Right leg gather -->
      <path d="M 80 36 Q 86 52 78 68 Q 72 78 64 82" stroke="#60A5FA" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="3,2" />
      <!-- Stretchy Colorful Waistband -->
      <path d="M 10 16 Q 46 22 82 16 L 82 28 Q 46 34 10 28 Z" fill="#BAE6FD" stroke="#38BDF8" stroke-width="2" />
      <!-- Waistband elastic rib lines -->
      <line x1="22" y1="18" x2="22" y2="28" stroke="#38BDF8" stroke-width="1.5" />
      <line x1="34" y1="19" x2="34" y2="30" stroke="#38BDF8" stroke-width="1.5" />
      <line x1="46" y1="20" x2="46" y2="31" stroke="#38BDF8" stroke-width="1.5" />
      <line x1="58" y1="19" x2="58" y2="30" stroke="#38BDF8" stroke-width="1.5" />
      <line x1="70" y1="18" x2="70" y2="28" stroke="#38BDF8" stroke-width="1.5" />
      <!-- Adhesive Side Fastener Tape Tabs -->
      <!-- Left Tab (Fastened with grip tape) -->
      <rect x="6" y="24" width="16" height="12" rx="3" fill="#38BDF8" stroke="#0284C7" stroke-width="1.5" />
      <rect x="8" y="26" width="5" height="8" rx="1" fill="#FDE047" />
      <!-- Right Tab (Fastened with grip tape) -->
      <rect x="70" y="24" width="16" height="12" rx="3" fill="#38BDF8" stroke="#0284C7" stroke-width="1.5" />
      <rect x="79" y="26" width="5" height="8" rx="1" fill="#FDE047" />
      <!-- Cute Pastel Prints on Diaper Front (Little stars & hearts) -->
      <!-- Yellow Star -->
      <polygon points="46,42 48,46 52,47 49,50 50,54 46,52 42,54 43,50 40,47 44,46" fill="#FDE047" stroke="#EAB308" stroke-width="1" />
      <!-- Pink Heart -->
      <path d="M 32 46 C 30 42 34 40 36 43 C 38 40 42 42 40 46 C 38 49 36 52 36 52 C 36 52 34 49 32 46 Z" fill="#F472B6" />
      <!-- Blue Cloud -->
      <ellipse cx="60" cy="48" rx="6" ry="4" fill="#93C5FD" />
      <circle cx="56" cy="46" r="3" fill="#93C5FD" />
      <circle cx="63" cy="46" r="3" fill="#93C5FD" />
      <!-- Wetness indicator strip (yellow turning to green/blue) -->
      <path d="M 46 60 L 46 78" stroke="#EAB308" stroke-width="3" stroke-linecap="round" />
    </g>
  </svg>`,

  // 4. Bouton (clo_04 / clo_bouton.svg) - Clothing Button with Needle & Thread
  'clo_bouton.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="50" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Big Glossy 4-Hole Garment Button -->
    <g transform="translate(36, 16)">
      <!-- Button Outer Rim Base -->
      <circle cx="34" cy="44" r="40" fill="#EF4444" stroke="#B91C1C" stroke-width="3.5" />
      <!-- Button Recessed Dish Rim -->
      <circle cx="34" cy="44" r="32" fill="#DC2626" stroke="#991B1B" stroke-width="2" />
      <!-- Button Center Flat Face -->
      <circle cx="34" cy="44" r="26" fill="#EF4444" />
      <!-- 4 Clean Button Holes with shadow rims -->
      <!-- Top-Left Hole -->
      <circle cx="25" cy="35" r="4" fill="#7F1D1D" stroke="#991B1B" stroke-width="1" />
      <!-- Top-Right Hole -->
      <circle cx="43" cy="35" r="4" fill="#7F1D1D" stroke="#991B1B" stroke-width="1" />
      <!-- Bottom-Left Hole -->
      <circle cx="25" cy="53" r="4" fill="#7F1D1D" stroke="#991B1B" stroke-width="1" />
      <!-- Bottom-Right Hole -->
      <circle cx="43" cy="53" r="4" fill="#7F1D1D" stroke="#991B1B" stroke-width="1" />
      <!-- White Thread sewn through holes in Cross Stitch "X" -->
      <line x1="25" y1="35" x2="43" y2="53" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" />
      <line x1="43" y1="35" x2="25" y2="53" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" />
      <!-- Button Glossy Curved Highlight -->
      <path d="M 12 34 C 16 18 36 12 52 14" stroke="#FCA5A5" stroke-width="3.5" stroke-linecap="round" fill="none" />
      <circle cx="58" cy="20" r="2.5" fill="#FFFFFF" />
    </g>
    <!-- Silver Sewing Needle & Looped Thread threading through button -->
    <g transform="translate(86, 12) rotate(25)">
      <!-- Looping thread -->
      <path d="M 8 18 Q 28 6 34 22 Q 38 38 18 34" stroke="#F8FAFC" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <!-- Silver Needle -->
      <path d="M 6 0 L 10 0 L 9 52 L 8 58 L 7 52 Z" fill="#E2E8F0" stroke="#64748B" stroke-width="1.5" />
      <!-- Needle eye hole -->
      <ellipse cx="8" cy="6" rx="1.5" ry="3" fill="#334155" />
    </g>
    <!-- Secondary mini button resting on side -->
    <g transform="translate(14, 76)">
      <circle cx="16" cy="16" r="14" fill="#38BDF8" stroke="#0284C7" stroke-width="2" />
      <circle cx="16" cy="16" r="10" fill="#0284C7" />
      <circle cx="13" cy="13" r="1.5" fill="#0C4A6E" />
      <circle cx="19" cy="13" r="1.5" fill="#0C4A6E" />
      <circle cx="13" cy="19" r="1.5" fill="#0C4A6E" />
      <circle cx="19" cy="19" r="1.5" fill="#0C4A6E" />
      <line x1="13" y1="13" x2="19" y2="19" stroke="#FFF" stroke-width="1.5" />
      <line x1="19" y1="13" x2="13" y2="19" stroke="#FFF" stroke-width="1.5" />
    </g>
  </svg>`,

  // 5. Ceinture (clo_05 / clo_ceinture.svg) - Leather Belt with Buckle & Holes
  'clo_ceinture.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Curled Leather Belt -->
    <g transform="translate(20, 20)">
      <!-- Back loop of belt strap -->
      <path d="M 28 36 C 28 8 78 8 84 36 C 88 56 68 76 38 78" stroke="#78350F" stroke-width="16" fill="none" stroke-linecap="round" />
      <!-- Stitching on back loop -->
      <path d="M 30 36 C 30 12 76 12 82 36" stroke="#D97706" stroke-width="1" stroke-dasharray="2,2" fill="none" />
      <!-- Front coiled strap layer -->
      <path d="M 20 62 C 20 62 48 76 80 62 C 92 56 100 44 94 30 C 88 16 66 18 56 26" stroke="#B45309" stroke-width="16" fill="none" stroke-linecap="round" />
      <!-- Edge stitching detail -->
      <path d="M 22 58 C 42 70 76 64 88 54" stroke="#FDE68A" stroke-width="1.2" stroke-dasharray="3,2" fill="none" />
      <path d="M 22 66 C 42 78 76 72 88 62" stroke="#FDE68A" stroke-width="1.2" stroke-dasharray="3,2" fill="none" />
      <!-- Punched Adjustment Grommet Holes on strap end -->
      <circle cx="78" cy="58" r="2.5" fill="#451A03" stroke="#FDE68A" stroke-width="0.8" />
      <circle cx="68" cy="62" r="2.5" fill="#451A03" stroke="#FDE68A" stroke-width="0.8" />
      <circle cx="58" cy="65" r="2.5" fill="#451A03" stroke="#FDE68A" stroke-width="0.8" />
      <circle cx="48" cy="66" r="2.5" fill="#451A03" stroke="#FDE68A" stroke-width="0.8" />
      <circle cx="38" cy="66" r="2.5" fill="#451A03" stroke="#FDE68A" stroke-width="0.8" />
      <!-- Strap tapered rounded tip -->
      <path d="M 20 54 C 14 58 14 66 20 70 Z" fill="#B45309" stroke="#78350F" stroke-width="1" />
      <!-- Metal Belt Buckle in foreground -->
      <g transform="translate(10, 24)">
        <!-- Belt strap going through buckle -->
        <rect x="14" y="6" width="16" height="20" fill="#B45309" stroke="#78350F" stroke-width="1.5" />
        <!-- Leather keeper loop -->
        <rect x="24" y="4" width="6" height="24" rx="2" fill="#78350F" stroke="#451A03" stroke-width="1" />
        <!-- Shiny Silver Buckle Frame -->
        <rect x="0" y="0" width="22" height="32" rx="5" fill="none" stroke="#E2E8F0" stroke-width="5" />
        <rect x="0" y="0" width="22" height="32" rx="5" fill="none" stroke="#64748B" stroke-width="1.5" />
        <!-- Buckle Prong / Tongue -->
        <line x1="0" y1="16" x2="18" y2="16" stroke="#94A3B8" stroke-width="3" stroke-linecap="round" />
        <circle cx="0" cy="16" r="2" fill="#CBD5E1" />
        <!-- Buckle shine -->
        <line x1="3" y1="4" x2="3" y2="12" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
      </g>
    </g>
  </svg>`,

  // 6. Collants (clo_09 / clo_collants.svg) - Toddler Tights (Waist to full feet, distinct from socks)
  'clo_collants.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Full-length Toddler Tights laid out -->
    <g transform="translate(35, 12)">
      <!-- Waistband at top -->
      <rect x="10" y="0" width="50" height="10" rx="3" fill="#A855F7" stroke="#7E22CE" stroke-width="2" />
      <line x1="12" y1="5" x2="58" y2="5" stroke="#E9D5FF" stroke-width="1.5" stroke-dasharray="2,2" />
      <!-- Panty / Hip Gusset Portion -->
      <path d="M 12 10 L 58 10 L 56 34 L 35 38 L 14 34 Z" fill="#C084FC" stroke="#7E22CE" stroke-width="2" />
      <!-- Left Leg (Waist down to foot) -->
      <path d="M 14 34 L 18 78 L 20 90 C 20 96 10 98 4 96 C -2 94 0 88 4 86 L 8 76 L 35 38 Z" fill="#D8B4FE" stroke="#7E22CE" stroke-width="2.5" />
      <!-- Left Foot / Toe cap -->
      <path d="M 4 86 C 0 88 -2 94 4 96 C 10 98 20 96 20 90 L 16 86 Z" fill="#A855F7" stroke="#7E22CE" stroke-width="1.5" />
      <!-- Right Leg (Waist down to foot) -->
      <path d="M 35 38 L 44 76 L 48 86 C 52 88 54 94 48 96 C 42 98 32 96 32 90 L 34 78 L 56 34 Z" fill="#D8B4FE" stroke="#7E22CE" stroke-width="2.5" />
      <!-- Right Foot / Toe cap -->
      <path d="M 48 86 C 54 94 52 88 48 96 C 42 98 32 96 32 90 L 36 86 Z" fill="#A855F7" stroke="#7E22CE" stroke-width="1.5" />
      <!-- Cute Polka Dots on both legs -->
      <!-- Left Leg dots -->
      <circle cx="21" cy="46" r="3" fill="#FFFFFF" />
      <circle cx="20" cy="60" r="3" fill="#F472B6" />
      <circle cx="17" cy="74" r="3" fill="#FFFFFF" />
      <!-- Right Leg dots -->
      <circle cx="47" cy="46" r="3" fill="#FFFFFF" />
      <circle cx="43" cy="60" r="3" fill="#F472B6" />
      <circle cx="39" cy="74" r="3" fill="#FFFFFF" />
      <!-- Hip bow detail -->
      <polygon points="35,16 30,13 30,19" fill="#F472B6" />
      <polygon points="35,16 40,13 40,19" fill="#F472B6" />
      <circle cx="35" cy="16" r="2" fill="#EC4899" />
    </g>
  </svg>`,

  // 7. Gant (clo_14 / clo_gant.svg) - 5-Finger Winter Glove (5 separate fingers clearly shown)
  'clo_gant.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Main 5-Finger Glove (Front & Center) -->
    <g transform="translate(38, 12)">
      <!-- Ribbed Knitted Cuff at wrist -->
      <rect x="16" y="74" width="36" height="22" rx="4" fill="#0284C7" stroke="#0369A1" stroke-width="2.5" />
      <!-- Cuff knit ribbing lines -->
      <line x1="22" y1="74" x2="22" y2="96" stroke="#38BDF8" stroke-width="2" />
      <line x1="28" y1="74" x2="28" y2="96" stroke="#38BDF8" stroke-width="2" />
      <line x1="34" y1="74" x2="34" y2="96" stroke="#38BDF8" stroke-width="2" />
      <line x1="40" y1="74" x2="40" y2="96" stroke="#38BDF8" stroke-width="2" />
      <line x1="46" y1="74" x2="46" y2="96" stroke="#38BDF8" stroke-width="2" />
      <!-- Glove Palm & 5 Individual Fingers -->
      <!-- Palm body -->
      <path d="M 14 74 L 14 44 C 14 44 14 36 20 36 L 48 36 C 54 36 54 44 54 74 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="2.5" />
      <!-- 1. Thumb (pointing left) -->
      <path d="M 16 58 C 8 54 2 46 2 38 C 2 32 8 32 12 36 L 18 46 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="2" />
      <!-- 2. Index finger -->
      <path d="M 18 38 L 18 16 C 18 10 25 10 25 16 L 25 38 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="2" />
      <!-- 3. Middle finger (tallest) -->
      <path d="M 26 36 L 26 8 C 26 2 34 2 34 8 L 34 36 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="2" />
      <!-- 4. Ring finger -->
      <path d="M 35 38 L 35 14 C 35 8 43 8 43 14 L 43 38 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="2" />
      <!-- 5. Pinky finger (shortest) -->
      <path d="M 44 42 L 44 24 C 44 18 51 18 51 24 L 51 44 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="2" />
      <!-- Contrast Palm Grip Patch (showing individual finger grips) -->
      <ellipse cx="34" cy="56" rx="12" ry="10" fill="#0284C7" opacity="0.4" />
      <circle cx="21" cy="24" r="2.5" fill="#0284C7" opacity="0.4" />
      <circle cx="30" cy="18" r="2.5" fill="#0284C7" opacity="0.4" />
      <circle cx="39" cy="22" r="2.5" fill="#0284C7" opacity="0.4" />
      <circle cx="47" cy="30" r="2.2" fill="#0284C7" opacity="0.4" />
      <circle cx="8" cy="40" r="2.5" fill="#0284C7" opacity="0.4" />
    </g>
    <!-- Second glove in background at an angle -->
    <g transform="translate(18, 28) rotate(-22)">
      <rect x="10" y="58" width="24" height="16" rx="3" fill="#0369A1" stroke="#075985" stroke-width="2" />
      <path d="M 8 58 L 8 36 L 32 36 L 32 58 Z" fill="#0284C7" stroke="#075985" stroke-width="2" />
      <path d="M 8 36 L 8 16 C 8 12 14 12 14 16 L 14 36 Z" fill="#0284C7" stroke="#075985" stroke-width="1.5" />
      <path d="M 15 36 L 15 10 C 15 6 21 6 21 10 L 21 36 Z" fill="#0284C7" stroke="#075985" stroke-width="1.5" />
      <path d="M 22 36 L 22 14 C 22 10 28 10 28 14 L 28 36 Z" fill="#0284C7" stroke="#075985" stroke-width="1.5" />
    </g>
  </svg>`,

  // 8. Mitaine (clo_18 / clo_mitaine.svg) - Cozy Winter Mittens on a Safety String (Thumb + Rounded pouch)
  'clo_mitaine.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Connecting Safety Yarn String / Cord -->
    <path d="M 38 78 Q 70 30 102 78" stroke="#FDE047" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="4,2" />
    <!-- Left Mitten -->
    <g transform="translate(18, 36) rotate(-15)">
      <!-- Fluffy Sherpa / Fleece Cuff -->
      <rect x="8" y="44" width="32" height="16" rx="8" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2" />
      <circle cx="14" cy="52" r="5" fill="#F8FAFC" />
      <circle cx="24" cy="52" r="5" fill="#F8FAFC" />
      <circle cx="34" cy="52" r="5" fill="#F8FAFC" />
      <!-- Rounded Mitten Hand Pouch (all 4 fingers together) -->
      <path d="M 10 44 L 10 20 C 10 4 38 4 38 20 L 38 44 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="2.5" />
      <!-- Separate Thumb sticking out to side -->
      <path d="M 12 34 C 4 32 0 24 2 18 C 6 14 12 18 16 26 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="2" />
      <!-- Nordic Snowflake graphic on mitten -->
      <line x1="24" y1="16" x2="24" y2="32" stroke="#FFFFFF" stroke-width="2" />
      <line x1="16" y1="24" x2="32" y2="24" stroke="#FFFFFF" stroke-width="2" />
      <line x1="18" y1="18" x2="30" y2="30" stroke="#FFFFFF" stroke-width="1.5" />
      <line x1="30" y1="18" x2="18" y2="30" stroke="#FFFFFF" stroke-width="1.5" />
    </g>
    <!-- Right Mitten -->
    <g transform="translate(80, 36) rotate(15)">
      <!-- Fluffy Sherpa / Fleece Cuff -->
      <rect x="8" y="44" width="32" height="16" rx="8" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2" />
      <circle cx="14" cy="52" r="5" fill="#F8FAFC" />
      <circle cx="24" cy="52" r="5" fill="#F8FAFC" />
      <circle cx="34" cy="52" r="5" fill="#F8FAFC" />
      <!-- Rounded Mitten Hand Pouch -->
      <path d="M 10 44 L 10 20 C 10 4 38 4 38 20 L 38 44 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="2.5" />
      <!-- Separate Thumb sticking out to right -->
      <path d="M 36 34 C 44 32 48 24 46 18 C 42 14 36 18 32 26 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="2" />
      <!-- Nordic Snowflake graphic -->
      <line x1="24" y1="16" x2="24" y2="32" stroke="#FFFFFF" stroke-width="2" />
      <line x1="16" y1="24" x2="32" y2="24" stroke="#FFFFFF" stroke-width="2" />
      <line x1="18" y1="18" x2="30" y2="30" stroke="#FFFFFF" stroke-width="1.5" />
      <line x1="30" y1="18" x2="18" y2="30" stroke="#FFFFFF" stroke-width="1.5" />
    </g>
  </svg>`,

  // 9. Jeans (clo_16 / clo_jeans.svg) - Denim Jeans with yellow stitching & copper rivets
  'clo_jeans.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Blue Denim Jeans -->
    <g transform="translate(34, 10)">
      <!-- Waistband -->
      <rect x="6" y="2" width="60" height="12" rx="2" fill="#1D4ED8" stroke="#1E3A8A" stroke-width="2.5" />
      <!-- Golden Belt Loops -->
      <rect x="12" y="0" width="4" height="14" rx="1" fill="#1E40AF" stroke="#EAB308" stroke-width="1" />
      <rect x="34" y="0" width="4" height="14" rx="1" fill="#1E40AF" stroke="#EAB308" stroke-width="1" />
      <rect x="56" y="0" width="4" height="14" rx="1" fill="#1E40AF" stroke="#EAB308" stroke-width="1" />
      <!-- Brass Waist Button -->
      <circle cx="36" cy="8" r="3.5" fill="#FBBF24" stroke="#B45309" stroke-width="1.2" />
      <!-- Main Jeans Legs Body -->
      <path d="M 6 14 L 6 82 L 28 82 L 36 42 L 44 82 L 66 82 L 66 14 Z" fill="#2563EB" stroke="#1E3A8A" stroke-width="2.5" />
      <!-- Thigh Faded Denim Wash Highlights -->
      <ellipse cx="18" cy="46" rx="6" ry="18" fill="#60A5FA" opacity="0.6" />
      <ellipse cx="54" cy="46" rx="6" ry="18" fill="#60A5FA" opacity="0.6" />
      <!-- Curved Front Pockets with yellow stitching -->
      <path d="M 6 20 C 18 20 24 28 24 38" stroke="#FDE047" stroke-width="1.8" fill="none" />
      <path d="M 66 20 C 54 20 48 28 48 38" stroke="#FDE047" stroke-width="1.8" fill="none" />
      <!-- Little Coin Pocket on right side -->
      <rect x="49" y="20" width="10" height="8" fill="none" stroke="#FDE047" stroke-width="1.2" />
      <!-- Copper Rivets on Pocket Corners -->
      <circle cx="6" cy="20" r="1.8" fill="#F97316" stroke="#9A3412" stroke-width="0.8" />
      <circle cx="24" cy="38" r="1.8" fill="#F97316" stroke="#9A3412" stroke-width="0.8" />
      <circle cx="66" cy="20" r="1.8" fill="#F97316" stroke="#9A3412" stroke-width="0.8" />
      <circle cx="48" cy="38" r="1.8" fill="#F97316" stroke="#9A3412" stroke-width="0.8" />
      <!-- Fly Stitching J-curve -->
      <path d="M 36 14 L 36 28 C 36 34 32 38 28 38" stroke="#FDE047" stroke-width="1.8" fill="none" />
      <!-- Outer & Inseam double stitching lines -->
      <line x1="8" y1="14" x2="8" y2="82" stroke="#FDE047" stroke-width="1.2" stroke-dasharray="3,2" />
      <line x1="64" y1="14" x2="64" y2="82" stroke="#FDE047" stroke-width="1.2" stroke-dasharray="3,2" />
      <!-- Folded Denim Cuffs at Ankle (showing lighter underside) -->
      <rect x="5" y="80" width="24" height="10" rx="2" fill="#93C5FD" stroke="#1E3A8A" stroke-width="2" />
      <rect x="43" y="80" width="24" height="10" rx="2" fill="#93C5FD" stroke="#1E3A8A" stroke-width="2" />
    </g>
  </svg>`,

  // 10. Pantalon (clo_19 / clo_pantalon.svg) - Toddler Khaki / Chino Trousers with Drawstring (distinct from jeans)
  'clo_pantalon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Khaki / Olive Everyday Toddler Trousers -->
    <g transform="translate(34, 10)">
      <!-- Comfortable Elastic Waistband -->
      <rect x="6" y="2" width="60" height="14" rx="4" fill="#A16207" stroke="#713F12" stroke-width="2.5" />
      <!-- Ribbed elastic lines on waistband -->
      <line x1="12" y1="2" x2="12" y2="16" stroke="#CA8A04" stroke-width="1.5" />
      <line x1="18" y1="2" x2="18" y2="16" stroke="#CA8A04" stroke-width="1.5" />
      <line x1="54" y1="2" x2="54" y2="16" stroke="#CA8A04" stroke-width="1.5" />
      <line x1="60" y1="2" x2="60" y2="16" stroke="#CA8A04" stroke-width="1.5" />
      <!-- Cute tied white drawstring cord at waist center -->
      <circle cx="36" cy="9" r="2.5" fill="#FFFFFF" />
      <path d="M 36 9 Q 30 18 26 22 M 36 9 Q 42 18 46 22" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
      <!-- Main Pant Legs Body (Warm Khaki Tan fabric) -->
      <path d="M 6 16 L 8 88 L 30 88 L 36 44 L 42 88 L 64 88 L 66 16 Z" fill="#D97706" stroke="#713F12" stroke-width="2.5" />
      <!-- Slanted Chino Side Pockets -->
      <line x1="8" y1="24" x2="22" y2="38" stroke="#713F12" stroke-width="2" stroke-linecap="round" />
      <line x1="64" y1="24" x2="50" y2="38" stroke="#713F12" stroke-width="2" stroke-linecap="round" />
      <!-- Side Cargo Flap Pocket on left leg -->
      <rect x="8" y="44" width="14" height="16" rx="2" fill="#B45309" stroke="#713F12" stroke-width="1.5" />
      <polygon points="7,44 23,44 15,48" fill="#713F12" />
      <!-- Center pleats / crease lines -->
      <line x1="19" y1="36" x2="19" y2="84" stroke="#B45309" stroke-width="1.5" />
      <line x1="53" y1="36" x2="53" y2="84" stroke="#B45309" stroke-width="1.5" />
      <!-- Clean Cuffed Hem at Ankle -->
      <rect x="7" y="84" width="24" height="6" rx="2" fill="#B45309" stroke="#713F12" stroke-width="1.5" />
      <rect x="41" y="84" width="24" height="6" rx="2" fill="#B45309" stroke="#713F12" stroke-width="1.5" />
    </g>
  </svg>`,

  // 11. Habit de neige (clo_15 / clo_habit_neige.svg) - One-Piece Toddler Snowsuit with Fur Hood & Boot Straps
  'clo_habit_neige.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Quebec One-Piece Winter Snowsuit (Combinaison / Habit de neige) -->
    <g transform="translate(32, 4)">
      <!-- Fur-trimmed Hood attached on top -->
      <path d="M 22 28 C 16 28 12 14 26 4 C 38 -2 50 2 54 14 C 56 22 52 28 46 28 Z" fill="#0D9488" stroke="#115E59" stroke-width="2.5" />
      <!-- Cozy White/Cream Faux-Fur Hood Trim -->
      <path d="M 20 26 C 14 22 14 10 24 6 C 36 0 46 4 52 14 C 54 22 50 26 46 26" stroke="#F8FAFC" stroke-width="6" stroke-linecap="round" fill="none" />
      <path d="M 20 26 C 14 22 14 10 24 6 C 36 0 46 4 52 14 C 54 22 50 26 46 26" stroke="#E2E8F0" stroke-width="2" stroke-linecap="round" stroke-dasharray="2,3" fill="none" />
      <!-- Sleeves spread out (puffy down sleeves) -->
      <!-- Left arm with mitt cuff -->
      <path d="M 20 30 L 2 50 L 8 58 L 22 44 Z" fill="#0D9488" stroke="#115E59" stroke-width="2.5" />
      <rect x="0" y="48" width="8" height="12" rx="3" fill="#F97316" stroke="#C2410C" stroke-width="1.5" />
      <!-- Right arm with mitt cuff -->
      <path d="M 54 30 L 72 50 L 66 58 L 52 44 Z" fill="#0D9488" stroke="#115E59" stroke-width="2.5" />
      <rect x="66" y="48" width="8" height="12" rx="3" fill="#F97316" stroke="#C2410C" stroke-width="1.5" />
      <!-- Full One-Piece Body: Torso & Attached Snow Pants -->
      <path d="M 18 28 L 56 28 L 56 62 L 60 96 L 42 96 L 37 66 L 32 96 L 14 96 L 18 62 Z" fill="#14B8A6" stroke="#115E59" stroke-width="3" />
      <!-- Diagonal Easy-Dress Front Zipper with pull charm -->
      <path d="M 44 26 L 32 64" stroke="#FDE047" stroke-width="3" stroke-linecap="round" />
      <circle cx="44" cy="28" r="2.5" fill="#EA580C" />
      <!-- Vibrant Orange Chest Accent Block -->
      <polygon points="20,28 36,28 26,44 18,40" fill="#F97316" />
      <!-- Reflective Safety Strip across waist -->
      <line x1="18" y1="56" x2="56" y2="56" stroke="#FEF08A" stroke-width="2.5" stroke-dasharray="4,2" />
      <!-- Reinforced Waterproof Knee Patches -->
      <rect x="18" y="74" width="10" height="12" rx="3" fill="#0F766E" stroke="#115E59" stroke-width="1.2" />
      <rect x="46" y="74" width="10" height="12" rx="3" fill="#0F766E" stroke="#115E59" stroke-width="1.2" />
      <!-- Elastic Snow-Gaiter Ankle Cuffs -->
      <rect x="13" y="94" width="16" height="6" rx="2" fill="#F97316" stroke="#C2410C" stroke-width="1.5" />
      <rect x="43" y="94" width="16" height="6" rx="2" fill="#F97316" stroke="#C2410C" stroke-width="1.5" />
      <!-- Rubber Under-Boot Stirrup Straps -->
      <path d="M 15 100 Q 21 106 27 100" stroke="#1E293B" stroke-width="2" fill="none" />
      <path d="M 45 100 Q 51 106 57 100" stroke="#1E293B" stroke-width="2" fill="none" />
    </g>
  </svg>`,

  // 12. Manteau (clo_17 / clo_manteau.svg) - Toddler Winter Coat / Duffle Jacket (Waist-length, NO snow pants)
  'clo_manteau.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Classic Warm Winter Jacket / Coat (Hip length) -->
    <g transform="translate(28, 14)">
      <!-- Coat Collar (Folded sherpa warm collar) -->
      <path d="M 24 16 L 36 28 L 48 28 L 60 16 C 54 8 30 8 24 16 Z" fill="#F8FAFC" stroke="#94A3B8" stroke-width="2" />
      <!-- Left Sleeve -->
      <path d="M 22 18 L 4 48 L 12 56 L 24 38 Z" fill="#DC2626" stroke="#991B1B" stroke-width="2.5" />
      <rect x="2" y="46" width="10" height="12" rx="2" fill="#1E293B" />
      <!-- Right Sleeve -->
      <path d="M 62 18 L 80 48 L 72 56 L 60 38 Z" fill="#DC2626" stroke="#991B1B" stroke-width="2.5" />
      <rect x="72" y="46" width="10" height="12" rx="2" fill="#1E293B" />
      <!-- Main Coat Body (Crimson Red Puffer / Wool Coat) -->
      <path d="M 22 20 L 62 20 L 68 76 L 16 76 Z" fill="#EF4444" stroke="#991B1B" stroke-width="3" />
      <!-- Center Placket Overlap -->
      <line x1="42" y1="20" x2="42" y2="76" stroke="#B91C1C" stroke-width="2.5" />
      <!-- Iconic Wooden Toggle Buttons with Rope Loops (Duffle style) -->
      <!-- Toggle 1 -->
      <path d="M 32 30 Q 42 34 52 30" stroke="#FDE68A" stroke-width="2" fill="none" />
      <rect x="39" y="27" width="6" height="8" rx="2" fill="#78350F" stroke="#451A03" stroke-width="1" />
      <!-- Toggle 2 -->
      <path d="M 32 44 Q 42 48 52 44" stroke="#FDE68A" stroke-width="2" fill="none" />
      <rect x="39" y="41" width="6" height="8" rx="2" fill="#78350F" stroke="#451A03" stroke-width="1" />
      <!-- Toggle 3 -->
      <path d="M 32 58 Q 42 62 52 58" stroke="#FDE68A" stroke-width="2" fill="none" />
      <rect x="39" y="55" width="6" height="8" rx="2" fill="#78350F" stroke="#451A03" stroke-width="1" />
      <!-- Two Large Flap Pockets -->
      <rect x="20" y="56" width="16" height="14" rx="2" fill="#DC2626" stroke="#991B1B" stroke-width="1.5" />
      <polygon points="19,56 37,56 28,60" fill="#991B1B" />
      <rect x="48" y="56" width="16" height="14" rx="2" fill="#DC2626" stroke="#991B1B" stroke-width="1.5" />
      <polygon points="47,56 65,56 56,60" fill="#991B1B" />
      <!-- Bottom Hem -->
      <line x1="16" y1="74" x2="68" y2="74" stroke="#B91C1C" stroke-width="2" />
    </g>
  </svg>`,

  // 13. Pantoufle (clo_20 / clo_pantoufle.svg) - Cozy Plush Toddler Bunny Slippers
  'clo_pantoufle.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Pair of Adorable Plush Bunny Slippers -->
    <!-- Left Bunny Slipper -->
    <g transform="translate(18, 32) rotate(-8)">
      <!-- Slipper Padded Sole -->
      <ellipse cx="30" cy="56" rx="26" ry="14" fill="#F472B6" stroke="#DB2777" stroke-width="2.5" />
      <ellipse cx="30" cy="58" rx="24" ry="11" fill="#E2E8F0" />
      <!-- Slipper Plush Upper Body -->
      <path d="M 8 52 C 8 32 30 24 50 34 C 58 40 56 56 46 58 C 30 62 10 60 8 52 Z" fill="#FCE7F3" stroke="#DB2777" stroke-width="2" />
      <!-- Foot Opening with fluffy fleece collar -->
      <ellipse cx="40" cy="38" rx="14" ry="9" fill="#F43F5E" />
      <ellipse cx="40" cy="38" rx="12" ry="7" fill="#881337" />
      <!-- Fluffy Bunny Ears standing up -->
      <!-- Left Ear -->
      <ellipse cx="16" cy="18" rx="6" ry="16" transform="rotate(-15 16 18)" fill="#FCE7F3" stroke="#DB2777" stroke-width="1.8" />
      <ellipse cx="16" cy="18" rx="3" ry="10" transform="rotate(-15 16 18)" fill="#F472B6" />
      <!-- Right Ear -->
      <ellipse cx="28" cy="18" rx="6" ry="16" transform="rotate(10 28 18)" fill="#FCE7F3" stroke="#DB2777" stroke-width="1.8" />
      <ellipse cx="28" cy="18" rx="3" ry="10" transform="rotate(10 28 18)" fill="#F472B6" />
      <!-- Embroidered Bunny Face on Toe -->
      <!-- Sleepy smiling eyes -->
      <path d="M 14 38 Q 18 42 22 38" stroke="#831843" stroke-width="2" fill="none" stroke-linecap="round" />
      <path d="M 26 38 Q 30 42 34 38" stroke="#831843" stroke-width="2" fill="none" stroke-linecap="round" />
      <!-- Pink Nose -->
      <polygon points="22,42 26,42 24,45" fill="#EC4899" />
      <!-- Rosy cheeks -->
      <circle cx="12" cy="42" r="3" fill="#FDA4AF" opacity="0.8" />
      <circle cx="34" cy="42" r="3" fill="#FDA4AF" opacity="0.8" />
    </g>
    <!-- Right Bunny Slipper -->
    <g transform="translate(68, 34) rotate(10)">
      <!-- Slipper Padded Sole -->
      <ellipse cx="30" cy="56" rx="26" ry="14" fill="#F472B6" stroke="#DB2777" stroke-width="2.5" />
      <ellipse cx="30" cy="58" rx="24" ry="11" fill="#E2E8F0" />
      <!-- Slipper Plush Upper Body -->
      <path d="M 8 52 C 8 32 30 24 50 34 C 58 40 56 56 46 58 C 30 62 10 60 8 52 Z" fill="#FCE7F3" stroke="#DB2777" stroke-width="2" />
      <!-- Foot Opening -->
      <ellipse cx="22" cy="38" rx="14" ry="9" fill="#F43F5E" />
      <ellipse cx="22" cy="38" rx="12" ry="7" fill="#881337" />
      <!-- Fluffy Bunny Ears -->
      <ellipse cx="34" cy="18" rx="6" ry="16" transform="rotate(-10 34 18)" fill="#FCE7F3" stroke="#DB2777" stroke-width="1.8" />
      <ellipse cx="34" cy="18" rx="3" ry="10" transform="rotate(-10 34 18)" fill="#F472B6" />
      <ellipse cx="46" cy="18" rx="6" ry="16" transform="rotate(15 46 18)" fill="#FCE7F3" stroke="#DB2777" stroke-width="1.8" />
      <ellipse cx="46" cy="18" rx="3" ry="10" transform="rotate(15 46 18)" fill="#F472B6" />
      <!-- Embroidered Face -->
      <path d="M 28 40 Q 32 44 36 40" stroke="#831843" stroke-width="2" fill="none" stroke-linecap="round" />
      <path d="M 40 40 Q 44 44 48 40" stroke="#831843" stroke-width="2" fill="none" stroke-linecap="round" />
      <polygon points="36,44 40,44 38,47" fill="#EC4899" />
      <circle cx="26" cy="44" r="3" fill="#FDA4AF" opacity="0.8" />
      <circle cx="48" cy="44" r="3" fill="#FDA4AF" opacity="0.8" />
    </g>
  </svg>`,

  // 14. Zip (clo_27 / clo_zip.svg) - Metal Zipper with interlocking teeth and pull-tab
  'clo_zip.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="48" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Zipper Track & Mechanism -->
    <g transform="translate(35, 10)">
      <!-- Fabric Tape on Left (Royal Blue) -->
      <path d="M 6 4 L 28 36 L 28 100 L 6 100 Z" fill="#2563EB" stroke="#1E40AF" stroke-width="2" />
      <!-- Fabric Tape on Right (Royal Blue) -->
      <path d="M 64 4 L 42 36 L 42 100 L 64 100 Z" fill="#2563EB" stroke="#1E40AF" stroke-width="2" />
      <!-- Fabric Tape Stitching lines -->
      <path d="M 10 8 L 30 38 L 30 96" stroke="#93C5FD" stroke-width="1.2" stroke-dasharray="3,2" fill="none" />
      <path d="M 60 8 L 40 38 L 40 96" stroke="#93C5FD" stroke-width="1.2" stroke-dasharray="3,2" fill="none" />
      <!-- Unzipped Separating Teeth at Top (V-Shape) -->
      <!-- Left side open teeth -->
      <line x1="14" y1="14" x2="20" y2="22" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round" />
      <line x1="18" y1="20" x2="24" y2="28" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round" />
      <line x1="22" y1="26" x2="28" y2="34" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round" />
      <!-- Right side open teeth -->
      <line x1="56" y1="14" x2="50" y2="22" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round" />
      <line x1="52" y1="20" x2="46" y2="28" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round" />
      <line x1="48" y1="26" x2="42" y2="34" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round" />
      <!-- Interlocked Closed Teeth below Slider -->
      <g transform="translate(29, 62)">
        <line x1="0" y1="0" x2="12" y2="0" stroke="#E2E8F0" stroke-width="3.5" stroke-linecap="round" />
        <line x1="0" y1="6" x2="12" y2="6" stroke="#CBD5E1" stroke-width="3.5" stroke-linecap="round" />
        <line x1="0" y1="12" x2="12" y2="12" stroke="#E2E8F0" stroke-width="3.5" stroke-linecap="round" />
        <line x1="0" y1="18" x2="12" y2="18" stroke="#CBD5E1" stroke-width="3.5" stroke-linecap="round" />
        <line x1="0" y1="24" x2="12" y2="24" stroke="#E2E8F0" stroke-width="3.5" stroke-linecap="round" />
        <line x1="0" y1="30" x2="12" y2="30" stroke="#CBD5E1" stroke-width="3.5" stroke-linecap="round" />
        <!-- Bottom Stop Bracket -->
        <rect x="0" y="34" width="12" height="4" rx="1" fill="#94A3B8" stroke="#64748B" stroke-width="1" />
      </g>
      <!-- Metal Zipper Slider Body -->
      <path d="M 24 34 L 46 34 L 42 58 L 28 58 Z" fill="#F59E0B" stroke="#B45309" stroke-width="2.5" />
      <ellipse cx="35" cy="38" rx="8" ry="4" fill="#FDE047" />
      <!-- Slider Nose & Pull-Tab Ring -->
      <rect x="32" y="44" width="6" height="8" rx="2" fill="#D97706" />
      <!-- Dangling Zipper Pull-Tab Charm (Silver with large hole) -->
      <g transform="translate(27, 50)">
        <path d="M 3 0 L 13 0 L 15 28 C 15 32 1 32 1 28 Z" fill="#FBBF24" stroke="#B45309" stroke-width="2" />
        <!-- Easy-pull hole for little fingers -->
        <circle cx="8" cy="20" r="4.5" fill="#2563EB" stroke="#B45309" stroke-width="1.5" />
        <circle cx="8" cy="6" r="2" fill="#D97706" />
      </g>
      <!-- Sparkle showing smooth zipping action -->
      <polygon points="56,42 58,45 61,46 58,47 56,50 54,47 51,46 54,45" fill="#FDE047" />
    </g>
  </svg>`,

  // 1. Collier (clo_10 / clo_collier.svg) - Toddler Beaded Necklace with Heart Pendant
  'clo_collier.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="48" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Necklace string curve -->
    <path d="M 28 20 C 24 64 42 92 70 92 C 98 92 116 64 112 20" stroke="#FDE047" stroke-width="2" fill="none" />
    <!-- Colorful round wooden beads strung along the necklace -->
    <circle cx="30" cy="24" r="6" fill="#EF4444" stroke="#DC2626" stroke-width="1.2" />
    <circle cx="33" cy="36" r="6" fill="#F59E0B" stroke="#D97706" stroke-width="1.2" />
    <circle cx="38" cy="48" r="6.5" fill="#10B981" stroke="#059669" stroke-width="1.2" />
    <circle cx="44" cy="60" r="7" fill="#3B82F6" stroke="#2563EB" stroke-width="1.2" />
    <circle cx="52" cy="71" r="7" fill="#8B5CF6" stroke="#7C3AED" stroke-width="1.2" />
    <circle cx="61" cy="80" r="7.5" fill="#EC4899" stroke="#DB2777" stroke-width="1.2" />
    <!-- Center Spacer Beads -->
    <circle cx="70" cy="84" r="5" fill="#FDE047" stroke="#CA8A04" stroke-width="1.2" />
    <circle cx="79" cy="80" r="7.5" fill="#EC4899" stroke="#DB2777" stroke-width="1.2" />
    <circle cx="88" cy="71" r="7" fill="#8B5CF6" stroke="#7C3AED" stroke-width="1.2" />
    <circle cx="96" cy="60" r="7" fill="#3B82F6" stroke="#2563EB" stroke-width="1.2" />
    <circle cx="102" cy="48" r="6.5" fill="#10B981" stroke="#059669" stroke-width="1.2" />
    <circle cx="107" cy="36" r="6" fill="#F59E0B" stroke="#D97706" stroke-width="1.2" />
    <circle cx="110" cy="24" r="6" fill="#EF4444" stroke="#DC2626" stroke-width="1.2" />
    <!-- Bead Highlights -->
    <circle cx="37" cy="46" r="2" fill="#FFFFFF" opacity="0.8" />
    <circle cx="43" cy="58" r="2" fill="#FFFFFF" opacity="0.8" />
    <circle cx="51" cy="69" r="2" fill="#FFFFFF" opacity="0.8" />
    <circle cx="60" cy="78" r="2" fill="#FFFFFF" opacity="0.8" />
    <circle cx="78" cy="78" r="2" fill="#FFFFFF" opacity="0.8" />
    <circle cx="87" cy="69" r="2" fill="#FFFFFF" opacity="0.8" />
    <!-- Golden Bail / Loop -->
    <rect x="67" y="86" width="6" height="8" rx="2" fill="#F59E0B" stroke="#B45309" stroke-width="1" />
    <!-- Big Glossy Heart Pendant dangling in center -->
    <g transform="translate(70, 100)">
      <path d="M 0 -8 C 0 -16 -16 -16 -16 -4 C -16 6 0 16 0 16 C 0 16 16 6 16 -4 C 16 -16 0 -16 0 -8 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="2.5" />
      <path d="M -8 -8 C -4 -12 -2 -8 -2 -6" stroke="#FCA5A5" stroke-width="2" stroke-linecap="round" fill="none" />
      <circle cx="-6" cy="-4" r="1.5" fill="#FFFFFF" />
    </g>
    <!-- Little star sparkles -->
    <polygon points="46,26 48,29 52,30 49,32 50,35 47,33 44,35 45,32 42,30 46,29" fill="#FDE047" />
    <polygon points="98,28 100,31 103,32 101,34 102,37 99,35 97,37 98,34 95,32 98,31" fill="#FDE047" />
  </svg>`,

  // 2. Épaule (bod_08 / bod_epaule.svg) - Toddler Shoulder with Highlight Indicator
  'bod_epaule.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Toddler Upper Body / Torso (Side-front view) -->
    <g transform="translate(24, 16)">
      <!-- Head / Neck context -->
      <path d="M 52 14 C 52 4 64 -2 72 4 C 80 10 82 20 78 28 C 76 34 70 38 68 44" fill="#FCD34D" stroke="#D97706" stroke-width="2" />
      <!-- Neck -->
      <path d="M 54 36 L 54 48 L 68 48 L 68 36 Z" fill="#FDE68A" />
      <!-- Right shoulder & arm (background) -->
      <path d="M 68 46 Q 84 52 90 70 L 80 74 Q 74 60 64 54 Z" fill="#60A5FA" stroke="#2563EB" stroke-width="2" />
      <!-- Torso wearing cute T-shirt -->
      <path d="M 28 54 L 66 48 L 64 94 L 26 94 Z" fill="#3B82F6" stroke="#1D4ED8" stroke-width="2.5" />
      <!-- Left Shoulder (Prominent in foreground) -->
      <path d="M 54 48 C 42 46 22 52 18 64 C 14 74 16 88 18 96 L 28 94 C 26 84 26 74 32 66 L 36 62" fill="#FDE68A" stroke="#D97706" stroke-width="2.5" />
      <path d="M 32 48 C 22 50 18 56 16 66 L 28 72 C 30 64 34 58 42 54 Z" fill="#60A5FA" stroke="#2563EB" stroke-width="2" />
      <!-- Arm extending down -->
      <path d="M 16 66 L 14 96 C 14 98 24 98 24 94 L 26 72 Z" fill="#FDE68A" stroke="#D97706" stroke-width="2" />
      <!-- Hand on hip -->
      <ellipse cx="20" cy="96" rx="5" ry="4" fill="#FDE68A" stroke="#D97706" stroke-width="1.5" />
    </g>
    <!-- Clear Glowing Target / Highlight Ring on the Shoulder -->
    <circle cx="48" cy="68" r="18" fill="rgba(250, 204, 21, 0.35)" stroke="#EAB308" stroke-width="3" stroke-dasharray="4,2" />
    <circle cx="48" cy="68" r="7" fill="#FACC15" stroke="#CA8A04" stroke-width="2" />
    <!-- Animated arrow indicator pointing to the shoulder -->
    <path d="M 18 42 L 36 58" stroke="#EF4444" stroke-width="3.5" stroke-linecap="round" />
    <polygon points="40,62 30,58 36,52" fill="#EF4444" />
  </svg>`,

  // 3. Fesses (bod_09 / bod_fesses.svg) - Toddler in cute patterned bloomers/shorts from behind
  'bod_fesses.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="50" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Toddler Back View with cute bloomers/shorts highlighting fesses -->
    <g transform="translate(32, 12)">
      <!-- Back of toddler head with curls -->
      <circle cx="38" cy="18" r="16" fill="#F59E0B" stroke="#B45309" stroke-width="2" />
      <circle cx="30" cy="10" r="5" fill="#FBBF24" />
      <circle cx="46" cy="10" r="5" fill="#FBBF24" />
      <circle cx="38" cy="8" r="5" fill="#FBBF24" />
      <!-- Neck -->
      <rect x="34" y="30" width="8" height="8" fill="#FDE68A" />
      <!-- Back of T-shirt -->
      <path d="M 18 36 L 58 36 L 56 56 L 20 56 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="2" />
      <!-- Two Chubby Rounded Buttocks in cute polka-dot bloomers -->
      <!-- Left cheek -->
      <ellipse cx="26" cy="68" rx="17" ry="16" fill="#F472B6" stroke="#DB2777" stroke-width="2.5" />
      <!-- Right cheek -->
      <ellipse cx="50" cy="68" rx="17" ry="16" fill="#F472B6" stroke="#DB2777" stroke-width="2.5" />
      <!-- Center seam dividing the buttocks -->
      <path d="M 38 56 Q 38 72 38 82" stroke="#BE185D" stroke-width="2" fill="none" />
      <!-- Cute white polka dots on bloomers -->
      <circle cx="20" cy="66" r="3" fill="#FFFFFF" />
      <circle cx="28" cy="74" r="3" fill="#FFFFFF" />
      <circle cx="48" cy="74" r="3" fill="#FFFFFF" />
      <circle cx="56" cy="66" r="3" fill="#FFFFFF" />
      <circle cx="38" cy="62" r="2.5" fill="#FFFFFF" />
      <!-- Chubby Toddler Legs below bloomers -->
      <path d="M 18 80 L 16 98 C 16 102 24 102 26 98 L 28 82" fill="#FDE68A" stroke="#D97706" stroke-width="2" />
      <path d="M 48 82 L 50 98 C 50 102 58 102 60 98 L 58 80" fill="#FDE68A" stroke="#D97706" stroke-width="2" />
    </g>
    <!-- Friendly sparkle & indicator bracket around the fesses -->
    <path d="M 38 74 Q 28 80 34 90" stroke="#F43F5E" stroke-width="2" fill="none" stroke-linecap="round" />
    <path d="M 102 74 Q 112 80 106 90" stroke="#F43F5E" stroke-width="2" fill="none" stroke-linecap="round" />
    <polygon points="106,62 108,65 111,66 108,67 106,70 104,67 101,66 104,65" fill="#FACC15" />
  </svg>`,

  // 4. Genou (bod_10 / bod_genou.svg) - Bent Toddler Knee with Cute Star Band-Aid & Target Ring
  'bod_genou.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Bent Toddler Leg (Thigh to bent knee to calf/foot) -->
    <g transform="translate(24, 14)">
      <!-- Shorts hem at thigh top -->
      <path d="M 10 16 L 36 12 L 40 32 L 14 36 Z" fill="#3B82F6" stroke="#1D4ED8" stroke-width="2.5" />
      <!-- Thigh -->
      <path d="M 16 34 L 40 30 L 60 52 L 40 68 Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.5" />
      <!-- Round Knee Joint (Prominent bend) -->
      <circle cx="56" cy="56" r="16" fill="#FDE68A" stroke="#D97706" stroke-width="2.5" />
      <!-- Lower leg (Calf extending down) -->
      <path d="M 40 68 L 58 58 L 54 94 L 38 94 Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.5" />
      <!-- Cute Sock & Sneaker at bottom -->
      <rect x="36" y="92" width="18" height="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" />
      <path d="M 34 98 L 58 98 C 64 98 64 106 54 106 L 32 106 C 28 106 28 98 34 98 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="2" />
      <!-- Cute Star Band-Aid / Pansement on the Knee -->
      <g transform="translate(56, 56) rotate(15)">
        <rect x="-14" y="-8" width="28" height="16" rx="4" fill="#FBCFE8" stroke="#DB2777" stroke-width="1.5" />
        <circle cx="-8" cy="0" r="1" fill="#DB2777" />
        <circle cx="8" cy="0" r="1" fill="#DB2777" />
        <!-- Yellow star in center of bandage -->
        <polygon points="0,-4 1.5,-1 5,-1 2,1 3,5 0,2.5 -3,5 -2,1 -5,-1 -1.5,-1" fill="#FDE047" stroke="#CA8A04" stroke-width="0.8" />
      </g>
    </g>
    <!-- Glowing Target Circle on the Knee Joint (Le Genou) -->
    <circle cx="80" cy="70" r="22" fill="none" stroke="#EAB308" stroke-width="3" stroke-dasharray="5,3" />
    <!-- Pointer Arrow -->
    <path d="M 112 50 L 92 64" stroke="#EF4444" stroke-width="3.5" stroke-linecap="round" />
    <polygon points="88,66 98,66 94,58" fill="#EF4444" />
  </svg>`,

  // 5. Jambe (bod_11 / bod_jambe.svg) - Full Standing Toddler Leg (Hip to Foot, distinct from bent knee)
  'bod_jambe.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="48" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Full Standing Toddler Leg from hip to foot -->
    <g transform="translate(48, 6)">
      <!-- Shorts cuff at hip -->
      <path d="M 8 10 L 36 10 L 34 26 L 6 26 Z" fill="#10B981" stroke="#059669" stroke-width="2.5" />
      <!-- Full Straight Leg (Thigh, Knee, Calf, Ankle) -->
      <path d="M 8 26 L 10 56 Q 10 64 12 70 L 14 96 L 30 96 L 32 70 Q 34 64 34 56 L 34 26 Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.5" />
      <!-- Gentle Knee contour lines -->
      <path d="M 16 56 Q 22 52 28 56" stroke="#D97706" stroke-width="2" fill="none" stroke-linecap="round" />
      <!-- Striped Sock -->
      <rect x="13" y="86" width="18" height="12" fill="#FFFFFF" stroke="#94A3B8" stroke-width="1.5" />
      <line x1="13" y1="90" x2="31" y2="90" stroke="#3B82F6" stroke-width="2" />
      <line x1="13" y1="94" x2="31" y2="94" stroke="#EF4444" stroke-width="2" />
      <!-- Toddler Sneaker / Shoe at bottom -->
      <path d="M 12 98 L 32 98 C 42 98 44 106 36 108 L 10 108 C 6 108 6 98 12 98 Z" fill="#3B82F6" stroke="#1D4ED8" stroke-width="2.5" />
      <circle cx="18" cy="104" r="2" fill="#FFFFFF" />
      <circle cx="26" cy="104" r="2" fill="#FFFFFF" />
      <path d="M 32 100 L 36 106" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
    </g>
    <!-- Vertical Height Bracket highlighting the full length of the Leg -->
    <path d="M 36 34 L 28 34 L 28 102 L 36 102" stroke="#EF4444" stroke-width="3" fill="none" stroke-linecap="round" />
    <polygon points="34,68 24,63 24,73" fill="#EF4444" />
    <!-- Secondary leg in soft outline behind -->
    <path d="M 86 32 L 96 32 L 98 90 L 88 90 Z" fill="#FEF3C7" stroke="#FDE68A" stroke-width="2" opacity="0.6" />
    <polygon points="98,36 100,39 103,40 100,41 99,44 98,41 95,40 98,39" fill="#FDE047" />
  </svg>`,

  // 6. Joue (bod_12 / bod_joue.svg) - Toddler Smiling Face Profile with Glowing Rosy Cheek
  'bod_joue.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="50" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Toddler Head 3/4 view focusing on cheek -->
    <g transform="translate(26, 12)">
      <!-- Head shape with chubby round cheek curve -->
      <path d="M 28 14 C 44 -2 74 2 82 22 C 90 42 88 72 74 86 C 58 98 34 94 24 80 C 14 66 12 30 28 14 Z" fill="#FDE68A" stroke="#D97706" stroke-width="3" />
      <!-- Soft Toddler Hair -->
      <path d="M 24 24 C 20 8 40 2 54 2 C 72 2 84 10 82 24 C 74 16 60 14 46 16 C 36 18 28 22 24 24 Z" fill="#B45309" stroke="#78350F" stroke-width="2" />
      <circle cx="30" cy="14" r="7" fill="#B45309" />
      <!-- Toddler Ear -->
      <ellipse cx="20" cy="50" rx="8" ry="11" fill="#FDE68A" stroke="#D97706" stroke-width="2" />
      <path d="M 20 46 Q 23 50 20 54" stroke="#D97706" stroke-width="1.5" fill="none" />
      <!-- Happy Eye (curved arc) -->
      <path d="M 58 42 Q 64 36 70 42" stroke="#78350F" stroke-width="3.5" stroke-linecap="round" fill="none" />
      <!-- Cute Button Nose -->
      <path d="M 78 48 Q 84 52 78 56" stroke="#D97706" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <!-- Happy Sweet Smile -->
      <path d="M 64 68 Q 72 78 80 68" stroke="#991B1B" stroke-width="3.5" stroke-linecap="round" fill="none" />
      <!-- The Star: Big Rosy Glowing Cheek (La Joue) -->
      <ellipse cx="58" cy="58" rx="15" ry="12" fill="#F472B6" stroke="#DB2777" stroke-width="2.5" />
      <ellipse cx="58" cy="58" rx="11" ry="8" fill="#FBCFE8" />
      <!-- Cute Freckles on cheek -->
      <circle cx="54" cy="56" r="1" fill="#DB2777" />
      <circle cx="58" cy="54" r="1" fill="#DB2777" />
      <circle cx="62" cy="57" r="1" fill="#DB2777" />
    </g>
    <!-- Sparkles & Indicator Arrow pointing right to the Cheek -->
    <path d="M 112 40 L 96 52" stroke="#EF4444" stroke-width="3.5" stroke-linecap="round" />
    <polygon points="92,54 102,52 98,44" fill="#EF4444" />
    <polygon points="92,26 94,30 98,31 95,33 96,37 93,35 90,37 91,33 88,31 92,30" fill="#FDE047" />
  </svg>`,

  // 7. Menton (bod_16 / bod_menton.svg) - Toddler Chin with Dimple & Indicator Arrow
  'bod_menton.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="50" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Toddler Face Close-up focusing on the Chin / Lower Jaw -->
    <g transform="translate(35, 10)">
      <!-- Head outline -->
      <path d="M 12 18 C 12 -4 58 -4 58 18 C 66 36 66 66 52 82 C 44 92 26 92 18 82 C 4 66 4 36 12 18 Z" fill="#FDE68A" stroke="#D97706" stroke-width="3" />
      <!-- Soft hair on top -->
      <path d="M 10 16 Q 35 2 60 16" stroke="#92400E" stroke-width="5" stroke-linecap="round" fill="none" />
      <!-- Eyes -->
      <circle cx="24" cy="40" r="3.5" fill="#78350F" />
      <circle cx="46" cy="40" r="3.5" fill="#78350F" />
      <!-- Cute button nose -->
      <circle cx="35" cy="48" r="3" fill="#F59E0B" />
      <!-- Big Happy Toddler Smile -->
      <path d="M 22 58 Q 35 72 48 58" stroke="#B91C1C" stroke-width="3.5" stroke-linecap="round" fill="none" />
      <path d="M 26 60 Q 35 70 44 60 Z" fill="#EF4444" />
      <!-- The Chin: Rounded Toddler Chin with cute dimple -->
      <path d="M 28 80 Q 35 88 42 80" stroke="#D97706" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <circle cx="35" cy="80" r="2" fill="#D97706" />
    </g>
    <!-- Clear Target / Highlight Ring on the Chin (Le Menton) -->
    <circle cx="70" cy="92" r="16" fill="rgba(250, 204, 21, 0.35)" stroke="#EAB308" stroke-width="2.5" stroke-dasharray="4,2" />
    <!-- Arrow pointing up to the chin -->
    <path d="M 70 114 L 70 98" stroke="#EF4444" stroke-width="3.5" stroke-linecap="round" />
    <polygon points="70,94 65,102 75,102" fill="#EF4444" />
  </svg>`,

  // 8. Nombril (bod_19 / bod_nombril.svg) - Toddler Belly Button with lifted T-shirt
  'bod_nombril.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Plump Toddler Tummy / Belly with cute spiral navel -->
    <g transform="translate(32, 12)">
      <!-- Lifted T-shirt hem at top -->
      <path d="M 8 20 C 18 10 58 10 68 20 L 72 4 C 52 -2 24 -2 4 4 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="2.5" />
      <path d="M 8 20 Q 38 28 68 20" stroke="#0284C7" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <!-- Plump Round Toddler Belly -->
      <path d="M 10 22 C 0 52 4 84 14 92 C 28 98 48 98 62 92 C 72 84 76 52 66 22 Z" fill="#FDE68A" stroke="#D97706" stroke-width="3" />
      <!-- Pants waistband at bottom -->
      <path d="M 12 88 Q 38 96 64 88 L 66 98 Q 38 106 10 98 Z" fill="#10B981" stroke="#059669" stroke-width="2" />
      <!-- Cute Belly Button (Nombril) in center -->
      <!-- Shading around navel indentation -->
      <ellipse cx="38" cy="58" rx="8" ry="6" fill="#FCD34D" stroke="#D97706" stroke-width="1.5" />
      <!-- Spiral cute navel fold -->
      <path d="M 36 56 C 36 54 40 54 41 57 C 41 60 37 61 36 59" stroke="#B45309" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <circle cx="39" cy="58" r="1.5" fill="#78350F" />
    </g>
    <!-- Big Sparkles & Indicator Ring around the Navel -->
    <circle cx="70" cy="70" r="16" fill="none" stroke="#EAB308" stroke-width="2.5" stroke-dasharray="4,2" />
    <polygon points="94,62 96,66 100,67 97,69 98,73 95,71 92,73 93,69 90,67 94,66" fill="#FDE047" />
    <polygon points="46,64 47,67 50,68 47,69 48,72 46,70 44,72 45,69 42,68 45,67" fill="#FDE047" />
  </svg>`,

  // 9. Orteil (bod_21 / bod_orteil.svg) - Toddler Foot showing all 5 toes with Big Toe highlighted
  'bod_orteil.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Toddler Chubby Foot with 5 distinct toes -->
    <g transform="translate(32, 16)">
      <!-- Foot sole and heel -->
      <path d="M 40 18 C 42 36 58 54 62 74 C 64 88 54 94 40 94 C 24 94 18 84 18 70 C 18 50 32 32 34 18 Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.5" />
      <!-- All 5 Round Wiggling Toes -->
      <!-- 1. Big Toe (Gros orteil) - Prominent -->
      <ellipse cx="22" cy="22" rx="9" ry="11" fill="#FDE68A" stroke="#D97706" stroke-width="2.5" />
      <path d="M 18 18 Q 22 14 26 18" stroke="#D97706" stroke-width="1.8" fill="none" />
      <!-- 2. Second toe -->
      <ellipse cx="36" cy="16" rx="7" ry="9" fill="#FDE68A" stroke="#D97706" stroke-width="2" />
      <path d="M 33 13 Q 36 10 39 13" stroke="#D97706" stroke-width="1.5" fill="none" />
      <!-- 3. Third toe -->
      <ellipse cx="48" cy="19" rx="6.5" ry="8" fill="#FDE68A" stroke="#D97706" stroke-width="2" />
      <!-- 4. Fourth toe -->
      <ellipse cx="58" cy="26" rx="6" ry="7.5" fill="#FDE68A" stroke="#D97706" stroke-width="2" />
      <!-- 5. Pinky toe (Petit orteil) -->
      <ellipse cx="66" cy="35" rx="5.5" ry="6.5" fill="#FDE68A" stroke="#D97706" stroke-width="2" />
      <!-- Little toenails -->
      <ellipse cx="22" cy="17" rx="4.5" ry="3" fill="#FFFFFF" opacity="0.7" />
      <ellipse cx="36" cy="13" rx="3.5" ry="2.2" fill="#FFFFFF" opacity="0.7" />
      <ellipse cx="48" cy="16" rx="3" ry="2" fill="#FFFFFF" opacity="0.7" />
    </g>
    <!-- Highlight Target Ring on the Toes -->
    <circle cx="54" cy="38" r="16" fill="rgba(250, 204, 21, 0.35)" stroke="#EAB308" stroke-width="2.5" stroke-dasharray="4,2" />
    <!-- Indicator Arrow pointing to toes -->
    <path d="M 28 58 L 44 44" stroke="#EF4444" stroke-width="3.5" stroke-linecap="round" />
    <polygon points="46,40 44,48 38,44" fill="#EF4444" />
  </svg>`,

  // 10. Pénis (bod_22 / bod_penis.svg) - Pedagogical, age-appropriate toddler male anatomy
  'bod_penis.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Pedagogical Child Anatomy: Lower abdomen & toddler male anatomy -->
    <g transform="translate(36, 12)">
      <!-- Waistline & Lower Abdomen -->
      <path d="M 8 16 C 18 12 50 12 60 16 L 62 48 C 62 76 48 88 34 88 C 20 88 6 76 6 48 Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.5" />
      <!-- Cute training pants pulled down to thighs -->
      <path d="M 4 82 C 14 94 54 94 64 82 L 68 96 C 54 104 14 104 0 96 Z" fill="#3B82F6" stroke="#1D4ED8" stroke-width="2" />
      <!-- Navel at top of belly -->
      <ellipse cx="34" cy="24" rx="3" ry="2" fill="#B45309" />
      <!-- Anatomical Contour: Testicles / Bourse -->
      <ellipse cx="30" cy="62" rx="7" ry="8" fill="#FCD34D" stroke="#D97706" stroke-width="1.8" />
      <ellipse cx="38" cy="62" rx="7" ry="8" fill="#FCD34D" stroke="#D97706" stroke-width="1.8" />
      <!-- Anatomical Contour: Penis -->
      <path d="M 30 46 C 30 40 38 40 38 46 L 38 56 C 38 59 30 59 30 56 Z" fill="#FDE68A" stroke="#D97706" stroke-width="2" />
      <!-- Rounded tip (Gland) -->
      <ellipse cx="34" cy="46" rx="4" ry="3" fill="#FCD34D" stroke="#D97706" stroke-width="1.5" />
    </g>
    <!-- Pedagogical Highlight Bracket & Sparkle -->
    <circle cx="70" cy="68" r="18" fill="rgba(250, 204, 21, 0.25)" stroke="#EAB308" stroke-width="2.5" stroke-dasharray="4,2" />
    <polygon points="104,56 106,60 110,61 107,63 108,67 105,65 102,67 103,63 100,61 104,60" fill="#FDE047" />
  </svg>`,

  // 11. Tête (bod_24 / bod_tete.svg) - Full Toddler Head with hair, ears, and overall cranial contour
  'bod_tete.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="48" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Full Head (Cranium, Hair, Face, Neck) -->
    <g transform="translate(35, 12)">
      <!-- Neck -->
      <rect x="26" y="74" width="18" height="18" rx="4" fill="#FDE68A" stroke="#D97706" stroke-width="2" />
      <path d="M 18 90 L 52 90 L 58 100 L 12 100 Z" fill="#3B82F6" stroke="#1D4ED8" stroke-width="2" />
      <!-- Ears -->
      <ellipse cx="8" cy="50" rx="6" ry="9" fill="#FDE68A" stroke="#D97706" stroke-width="2" />
      <ellipse cx="62" cy="50" rx="6" ry="9" fill="#FDE68A" stroke="#D97706" stroke-width="2" />
      <!-- Main Head Sphere / Cranium -->
      <circle cx="35" cy="46" r="32" fill="#FDE68A" stroke="#D97706" stroke-width="3" />
      <!-- Full Cap of Toddler Hair around the entire head -->
      <path d="M 6 42 C 4 14 20 2 35 2 C 50 2 66 14 64 42 C 58 32 48 30 35 32 C 22 30 12 32 6 42 Z" fill="#92400E" stroke="#78350F" stroke-width="2.5" />
      <circle cx="20" cy="12" r="8" fill="#92400E" />
      <circle cx="35" cy="8" r="8" fill="#92400E" />
      <circle cx="50" cy="12" r="8" fill="#92400E" />
      <!-- Face Features inside Head -->
      <circle cx="25" cy="48" r="3" fill="#78350F" />
      <circle cx="45" cy="48" r="3" fill="#78350F" />
      <circle cx="35" cy="54" r="2.5" fill="#F59E0B" />
      <path d="M 28 62 Q 35 70 42 62" stroke="#B91C1C" stroke-width="3" stroke-linecap="round" fill="none" />
      <ellipse cx="20" cy="56" rx="4" ry="2.5" fill="#F472B6" />
      <ellipse cx="50" cy="56" rx="4" ry="2.5" fill="#F472B6" />
    </g>
    <!-- Circular Halo / Outline encompassing the Entire Head -->
    <circle cx="70" cy="54" r="44" fill="none" stroke="#EAB308" stroke-width="3" stroke-dasharray="6,3" />
    <polygon points="118,22 120,26 124,27 121,29 122,33 119,31 116,33 117,29 114,27 118,26" fill="#FDE047" />
    <polygon points="22,22 24,26 28,27 25,29 26,33 23,31 20,33 21,29 18,27 22,26" fill="#FDE047" />
  </svg>`,

  // 12. Vagin / Vulve (bod_25 / bod_vagin.svg) - Pedagogical, age-appropriate toddler female anatomy
  'bod_vagin.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Pedagogical Child Anatomy: Lower abdomen & toddler female anatomy -->
    <g transform="translate(36, 12)">
      <!-- Waistline & Lower Abdomen -->
      <path d="M 8 16 C 18 12 50 12 60 16 L 62 48 C 62 76 48 88 34 88 C 20 88 6 76 6 48 Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.5" />
      <!-- Cute training panties pulled down to thighs -->
      <path d="M 4 82 C 14 94 54 94 64 82 L 68 96 C 54 104 14 104 0 96 Z" fill="#F472B6" stroke="#DB2777" stroke-width="2" />
      <!-- Navel at top of belly -->
      <ellipse cx="34" cy="24" rx="3" ry="2" fill="#B45309" />
      <!-- Anatomical Contour: Vulva (External female anatomy) -->
      <!-- Soft pubic mound contour -->
      <ellipse cx="34" cy="56" rx="10" ry="12" fill="#FCD34D" stroke="#D97706" stroke-width="1.8" />
      <!-- Labia contours (clean, gentle pediatric line art) -->
      <path d="M 32 50 C 31 56 31 62 33 64" stroke="#D97706" stroke-width="1.8" fill="none" stroke-linecap="round" />
      <path d="M 36 50 C 37 56 37 62 35 64" stroke="#D97706" stroke-width="1.8" fill="none" stroke-linecap="round" />
    </g>
    <!-- Pedagogical Highlight Circle & Sparkle -->
    <circle cx="70" cy="68" r="18" fill="rgba(250, 204, 21, 0.25)" stroke="#EAB308" stroke-width="2.5" stroke-dasharray="4,2" />
    <polygon points="104,56 106,60 110,61 107,63 108,67 105,65 102,67 103,63 100,61 104,60" fill="#FDE047" />
  </svg>`,

  // 13. Visage (bod_26 / bod_visage.svg) - Toddler Expressive Smiling Face (Eyes, nose, mouth, cheeks)
  'bod_visage.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Bright Smiling Toddler Face -->
    <g transform="translate(32, 10)">
      <!-- Main Face Oval -->
      <ellipse cx="38" cy="48" rx="36" ry="38" fill="#FDE68A" stroke="#D97706" stroke-width="3" />
      <!-- Left & Right Ears -->
      <ellipse cx="2" cy="48" rx="6" ry="10" fill="#FDE68A" stroke="#D97706" stroke-width="2" />
      <ellipse cx="74" cy="48" rx="6" ry="10" fill="#FDE68A" stroke="#D97706" stroke-width="2" />
      <!-- Hair Bangs on forehead -->
      <path d="M 8 32 C 16 18 38 16 38 16 C 38 16 60 18 68 32 C 60 26 48 24 38 26 C 28 24 16 26 8 32 Z" fill="#B45309" stroke="#78350F" stroke-width="2" />
      <!-- Expressive Big Sparkling Eyes -->
      <!-- Left Eye -->
      <ellipse cx="25" cy="44" rx="6" ry="8" fill="#FFFFFF" stroke="#78350F" stroke-width="1.8" />
      <circle cx="26" cy="44" r="4.5" fill="#1D4ED8" />
      <circle cx="27" cy="44" r="2.5" fill="#000000" />
      <circle cx="28" cy="42" r="1.5" fill="#FFFFFF" />
      <!-- Eyebrow -->
      <path d="M 19 32 Q 25 28 31 32" stroke="#78350F" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <!-- Right Eye -->
      <ellipse cx="51" cy="44" rx="6" ry="8" fill="#FFFFFF" stroke="#78350F" stroke-width="1.8" />
      <circle cx="50" cy="44" r="4.5" fill="#1D4ED8" />
      <circle cx="49" cy="44" r="2.5" fill="#000000" />
      <circle cx="50" cy="42" r="1.5" fill="#FFFFFF" />
      <!-- Eyebrow -->
      <path d="M 45 32 Q 51 28 57 32" stroke="#78350F" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <!-- Cute Button Nose -->
      <ellipse cx="38" cy="52" rx="3.5" ry="2.5" fill="#F59E0B" />
      <!-- Big Happy Grinning Mouth with Tongue -->
      <path d="M 24 60 C 24 78 52 78 52 60 Z" fill="#B91C1C" stroke="#991B1B" stroke-width="2.5" />
      <!-- White top teeth row -->
      <path d="M 26 60 L 50 60 C 48 64 28 64 26 60 Z" fill="#FFFFFF" />
      <!-- Pink Tongue -->
      <path d="M 32 70 C 32 66 44 66 44 70 C 44 74 32 74 32 70 Z" fill="#F472B6" />
      <!-- Rosy Cheeks -->
      <ellipse cx="16" cy="56" rx="6" ry="4" fill="#F472B6" opacity="0.8" />
      <ellipse cx="60" cy="56" rx="6" ry="4" fill="#F472B6" opacity="0.8" />
    </g>
  </svg>`,

  // 14. Aspirateur (hou_02 / hou_aspirateur.svg) - Canister Vacuum Cleaner with Hose & Wand
  'hou_aspirateur.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="56" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Vacuum Canister Body (Teal & Silver on wheels) -->
    <g transform="translate(68, 44)">
      <!-- Canister Body -->
      <path d="M 10 24 C 10 8 46 8 50 24 L 54 46 C 54 54 10 54 10 46 Z" fill="#0D9488" stroke="#115E59" stroke-width="2.5" />
      <!-- Metallic Accent Cap -->
      <ellipse cx="30" cy="20" rx="18" ry="8" fill="#5EEAD4" />
      <!-- Carrying Handle -->
      <path d="M 20 16 Q 30 8 40 16" stroke="#115E59" stroke-width="4" stroke-linecap="round" fill="none" />
      <!-- Power button -->
      <circle cx="30" cy="28" r="4" fill="#EF4444" stroke="#B91C1C" stroke-width="1.2" />
      <!-- Big Wheels -->
      <circle cx="16" cy="48" r="10" fill="#334155" stroke="#1E293B" stroke-width="2" />
      <circle cx="16" cy="48" r="4" fill="#CBD5E1" />
      <circle cx="48" cy="48" r="10" fill="#334155" stroke="#1E293B" stroke-width="2" />
      <circle cx="48" cy="48" r="4" fill="#CBD5E1" />
    </g>
    <!-- Flexible Ribbed Hose -->
    <path d="M 76 66 C 56 60 48 30 64 22 C 78 14 74 34 54 44" stroke="#94A3B8" stroke-width="6" fill="none" stroke-linecap="round" />
    <path d="M 76 66 C 56 60 48 30 64 22 C 78 14 74 34 54 44" stroke="#64748B" stroke-width="2" fill="none" stroke-dasharray="3,3" />
    <!-- Silver Vacuum Wand & Handle -->
    <g transform="translate(18, 28)">
      <!-- Ergonomic Grip Handle -->
      <path d="M 36 16 L 30 24" stroke="#0D9488" stroke-width="5" stroke-linecap="round" />
      <!-- Silver Metal Extension Wand -->
      <line x1="30" y1="24" x2="16" y2="72" stroke="#CBD5E1" stroke-width="4.5" stroke-linecap="round" />
      <!-- Floor Suction Brush Nozzle Head -->
      <g transform="translate(16, 72)">
        <polygon points="-14,8 14,8 8,0 -8,0" fill="#0D9488" stroke="#115E59" stroke-width="2" />
        <rect x="-16" y="8" width="32" height="4" rx="2" fill="#334155" />
        <!-- Suction action lines / clean sparkles -->
        <line x1="-10" y1="14" x2="-10" y2="18" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" />
        <line x1="0" y1="14" x2="0" y2="18" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" />
        <line x1="10" y1="14" x2="10" y2="18" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" />
      </g>
    </g>
    <!-- Sparkles of clean floor -->
    <polygon points="26,100 28,103 31,104 28,105 29,108 26,106 24,108 25,105 22,104 25,103" fill="#FDE047" />
  </svg>`,

  // 15. Assiette (hou_03 / hou_assiette.svg) - Toddler Dining Plate with Fork & Spoon (Flat ceramic plate)
  'hou_assiette.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Round Dining Plate seen in 3D perspective -->
    <g transform="translate(24, 20)">
      <!-- Outer Plate Rim -->
      <ellipse cx="46" cy="44" rx="44" ry="32" fill="#F8FAFC" stroke="#94A3B8" stroke-width="3" />
      <!-- Wide Colorful Rim Band (Sunny Yellow) -->
      <ellipse cx="46" cy="44" rx="40" ry="28" fill="#FDE047" stroke="#EAB308" stroke-width="2" />
      <!-- Inner Food Well -->
      <ellipse cx="46" cy="46" rx="30" ry="20" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2" />
      <!-- Plate Rim Pattern: Cute Polka Dots -->
      <circle cx="20" cy="36" r="2.5" fill="#EF4444" />
      <circle cx="32" cy="22" r="2.5" fill="#3B82F6" />
      <circle cx="46" cy="18" r="2.5" fill="#10B981" />
      <circle cx="60" cy="22" r="2.5" fill="#F59E0B" />
      <circle cx="72" cy="36" r="2.5" fill="#8B5CF6" />
      <circle cx="74" cy="52" r="2.5" fill="#EF4444" />
      <circle cx="64" cy="64" r="2.5" fill="#3B82F6" />
      <circle cx="46" cy="70" r="2.5" fill="#10B981" />
      <circle cx="28" cy="64" r="2.5" fill="#F59E0B" />
      <circle cx="18" cy="52" r="2.5" fill="#8B5CF6" />
      <!-- Clean gloss highlight -->
      <path d="M 28 40 Q 46 34 64 40" stroke="#F1F5F9" stroke-width="3" fill="none" stroke-linecap="round" />
    </g>
    <!-- Fork resting on left side of plate -->
    <g transform="translate(10, 36) rotate(-15)">
      <rect x="0" y="16" width="5" height="34" rx="2.5" fill="#38BDF8" stroke="#0284C7" stroke-width="1" />
      <path d="M -3 0 L 8 0 L 8 16 L 6 16 L 6 6 L 4 6 L 4 16 L 1 16 L 1 6 L -1 6 L -1 16 L -3 16 Z" fill="#CBD5E1" stroke="#64748B" stroke-width="0.8" />
    </g>
    <!-- Spoon resting on right side of plate -->
    <g transform="translate(116, 36) rotate(15)">
      <rect x="0" y="16" width="5" height="34" rx="2.5" fill="#38BDF8" stroke="#0284C7" stroke-width="1" />
      <ellipse cx="2.5" cy="8" rx="6" ry="9" fill="#E2E8F0" stroke="#64748B" stroke-width="1" />
    </g>
  </svg>`,

  // 16. Plat (hou_33 / hou_plat.svg) - Deep Casserole/Baking Dish with handles (distinct from flat plate)
  'hou_plat.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Deep Ceramic Serving Casserole Dish (Plat de service / Plat à four) -->
    <g transform="translate(20, 24)">
      <!-- Left Carrying Handle -->
      <path d="M 6 36 C -4 36 -4 48 6 48 Z" fill="#DC2626" stroke="#991B1B" stroke-width="2.5" />
      <ellipse cx="4" cy="42" rx="3" ry="4" fill="#FFFFFF" />
      <!-- Right Carrying Handle -->
      <path d="M 94 36 C 104 36 104 48 94 48 Z" fill="#DC2626" stroke="#991B1B" stroke-width="2.5" />
      <ellipse cx="96" cy="42" rx="3" ry="4" fill="#FFFFFF" />
      <!-- Dish Deep Base -->
      <path d="M 8 36 L 14 74 C 16 80 84 80 86 74 L 92 36 Z" fill="#EF4444" stroke="#991B1B" stroke-width="3" />
      <!-- Dish Rolled Rim -->
      <ellipse cx="50" cy="36" rx="42" ry="16" fill="#FEE2E2" stroke="#991B1B" stroke-width="2.5" />
      <!-- Steaming Golden Baked Food inside dish (Lasagna / Gratin) -->
      <ellipse cx="50" cy="36" rx="38" ry="13" fill="#F59E0B" stroke="#B45309" stroke-width="1.5" />
      <ellipse cx="50" cy="36" rx="34" ry="10" fill="#FBBF24" />
      <!-- Golden-brown toasted cheese spots -->
      <ellipse cx="36" cy="36" rx="6" ry="3.5" fill="#D97706" />
      <ellipse cx="56" cy="38" rx="8" ry="4" fill="#B45309" />
      <ellipse cx="68" cy="34" rx="5" ry="3" fill="#D97706" />
      <ellipse cx="46" cy="33" rx="4" ry="2.5" fill="#B45309" />
      <!-- Green herb parsley flecks -->
      <circle cx="32" cy="34" r="1.2" fill="#15803D" />
      <circle cx="44" cy="38" r="1.2" fill="#15803D" />
      <circle cx="60" cy="35" r="1.2" fill="#15803D" />
      <!-- White decorative stripe on dish body -->
      <path d="M 11 54 Q 50 64 89 54" stroke="#FFFFFF" stroke-width="3" fill="none" />
    </g>
    <!-- Steaming fragrant swirls rising from hot dish -->
    <path d="M 52 18 Q 56 8 52 2" stroke="rgba(239,68,68,0.7)" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <path d="M 70 16 Q 74 6 70 0" stroke="rgba(239,68,68,0.7)" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <path d="M 88 18 Q 92 8 88 2" stroke="rgba(239,68,68,0.7)" stroke-width="2.5" fill="none" stroke-linecap="round" />
  </svg>`,

  // 17. Couverte / Couverture (hou_15 / hou_couverte.svg) - Cozy Folded Patchwork Quilt / Blanket
  'hou_couverte.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Folded Thick Cozy Toddler Quilt / Blanket -->
    <g transform="translate(22, 24)">
      <!-- Bottom fold shadow/thickness -->
      <rect x="8" y="58" width="80" height="22" rx="8" fill="#0284C7" stroke="#0369A1" stroke-width="2.5" />
      <line x1="12" y1="68" x2="84" y2="68" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="3,2" />
      <!-- Middle fold layer -->
      <rect x="4" y="38" width="88" height="24" rx="8" fill="#F472B6" stroke="#DB2777" stroke-width="2.5" />
      <line x1="8" y1="50" x2="88" y2="50" stroke="#FCE7F3" stroke-width="1.5" stroke-dasharray="3,2" />
      <!-- Top Layer: 3D Angled Patchwork Blanket Top -->
      <polygon points="12,12 84,12 92,38 4,38" fill="#FDE047" stroke="#EAB308" stroke-width="2.5" />
      <!-- Patchwork Quilt Grid Squares on top fold -->
      <!-- Square 1 (Mint) -->
      <polygon points="12,12 36,12 32,38 4,38" fill="#6EE7B7" stroke="#059669" stroke-width="1.5" />
      <!-- Square 2 (Lilac) -->
      <polygon points="36,12 60,12 62,38 32,38" fill="#C084FC" stroke="#7E22CE" stroke-width="1.5" />
      <!-- Square 3 (Peach) -->
      <polygon points="60,12 84,12 92,38 62,38" fill="#FDBA74" stroke="#EA580C" stroke-width="1.5" />
      <!-- Cute prints on patches -->
      <circle cx="18" cy="25" r="4" fill="#FFFFFF" />
      <polygon points="47,20 49,23 52,24 50,26 51,29 48,27 45,29 46,26 44,24 47,23" fill="#FDE047" />
      <!-- Little heart on peach patch -->
      <path d="M 77 24 C 77 20 73 18 71 21 C 69 18 65 20 65 24 C 65 28 71 32 71 32 C 71 32 77 28 77 24 Z" fill="#EF4444" />
      <!-- Fluffy soft fringe tassels on the side corner -->
      <path d="M 4 38 L -4 44 M 4 40 L -2 48 M 4 42 L 0 52" stroke="#FDE047" stroke-width="2" stroke-linecap="round" />
    </g>
  </svg>`,

  // 18. Fourchette (hou_17 / hou_fourchette.svg) - Toddler Silverware Fork with Colorful Grip Handle
  'hou_fourchette.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="46" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Fork angled gracefully -->
    <g transform="translate(70, 56) rotate(35)">
      <!-- Ergonomic Toddler Handle (Red with white grip dots) -->
      <rect x="-9" y="8" width="18" height="52" rx="9" fill="#EF4444" stroke="#B91C1C" stroke-width="2.5" />
      <circle cx="0" cy="20" r="3" fill="#FFFFFF" />
      <circle cx="0" cy="32" r="3" fill="#FFFFFF" />
      <circle cx="0" cy="44" r="3" fill="#FFFFFF" />
      <!-- Hanging hole at handle end -->
      <circle cx="0" cy="52" r="2.5" fill="#991B1B" />
      <!-- Fork Neck (Silver Chrome) -->
      <path d="M -5 8 L -4 -16 L 4 -16 L 5 8 Z" fill="#CBD5E1" stroke="#64748B" stroke-width="1.8" />
      <!-- Fork Curved Head & 4 Shiny Tines -->
      <!-- Base of tines -->
      <path d="M -16 -16 C -16 -24 -12 -28 0 -28 C 12 -28 16 -24 16 -16 Z" fill="#E2E8F0" stroke="#64748B" stroke-width="2" />
      <!-- 4 Tines extending up -->
      <rect x="-14" y="-52" width="4" height="28" rx="2" fill="#E2E8F0" stroke="#64748B" stroke-width="1.2" />
      <rect x="-5" y="-54" width="3.5" height="30" rx="1.7" fill="#E2E8F0" stroke="#64748B" stroke-width="1.2" />
      <rect x="1.5" y="-54" width="3.5" height="30" rx="1.7" fill="#E2E8F0" stroke="#64748B" stroke-width="1.2" />
      <rect x="10" y="-52" width="4" height="28" rx="2" fill="#E2E8F0" stroke="#64748B" stroke-width="1.2" />
      <!-- Silver reflection highlight -->
      <line x1="-3" y1="-50" x2="-3" y2="-20" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" />
    </g>
    <!-- Little star sparkles -->
    <polygon points="34,22 36,25 39,26 36,27 37,30 34,28 32,30 33,27 30,26 33,25" fill="#FDE047" />
    <polygon points="106,82 107,84 110,85 107,86 108,89 106,87 104,89 105,86 102,85 105,84" fill="#FDE047" />
  </svg>`,

  // 19. Horloge (hou_18 / hou_horloge.svg) - Colorful Round Wall Clock with Numbers & Clock Hands
  'hou_horloge.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="46" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Wall Clock Hanging Ring -->
    <circle cx="70" cy="16" r="6" fill="none" stroke="#DC2626" stroke-width="3" />
    <!-- Clock Outer Frame (Cherry Red with 3D bevel) -->
    <circle cx="70" cy="62" r="46" fill="#EF4444" stroke="#B91C1C" stroke-width="3.5" />
    <circle cx="70" cy="62" r="40" fill="#FEE2E2" />
    <!-- Clock White Dial Face -->
    <circle cx="70" cy="62" r="36" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2" />
    <!-- Hour Dots / Numbers (12, 3, 6, 9 emphasized) -->
    <!-- 12 o'clock -->
    <rect x="68" y="30" width="4" height="7" rx="1" fill="#1E293B" />
    <!-- 3 o'clock -->
    <rect x="95" y="60" width="7" height="4" rx="1" fill="#1E293B" />
    <!-- 6 o'clock -->
    <rect x="68" y="87" width="4" height="7" rx="1" fill="#1E293B" />
    <!-- 9 o'clock -->
    <rect x="38" y="60" width="7" height="4" rx="1" fill="#1E293B" />
    <!-- Other hour tick dots -->
    <circle cx="84" cy="34" r="2" fill="#64748B" />
    <circle cx="98" cy="48" r="2" fill="#64748B" />
    <circle cx="98" cy="76" r="2" fill="#64748B" />
    <circle cx="84" cy="90" r="2" fill="#64748B" />
    <circle cx="56" cy="90" r="2" fill="#64748B" />
    <circle cx="42" cy="76" r="2" fill="#64748B" />
    <circle cx="42" cy="48" r="2" fill="#64748B" />
    <circle cx="56" cy="34" r="2" fill="#64748B" />
    <!-- Clock Hands (Showing 3:00) -->
    <!-- Short Hour Hand pointing to 3 -->
    <line x1="70" y1="62" x2="88" y2="62" stroke="#1E293B" stroke-width="4.5" stroke-linecap="round" />
    <!-- Long Minute Hand pointing to 12 -->
    <line x1="70" y1="62" x2="70" y2="38" stroke="#1E293B" stroke-width="3.5" stroke-linecap="round" />
    <!-- Red Second Hand pointing to 7 -->
    <line x1="70" y1="62" x2="58" y2="80" stroke="#EF4444" stroke-width="1.8" stroke-linecap="round" />
    <!-- Center Pivot Pin -->
    <circle cx="70" cy="62" r="4.5" fill="#EF4444" stroke="#B91C1C" stroke-width="1.5" />
    <circle cx="70" cy="62" r="1.5" fill="#FFFFFF" />
    <!-- Glass reflection arc -->
    <path d="M 44 42 C 52 34 68 32 78 34" stroke="rgba(255,255,255,0.7)" stroke-width="3" stroke-linecap="round" fill="none" />
  </svg>`,

  // 20. Oreiller (hou_27 / hou_oreiller.svg) - Soft Puffy Bed Pillow with cute cloud motif
  'hou_oreiller.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Plump Soft Bed Pillow angled playfully -->
    <g transform="translate(18, 22) rotate(-6)">
      <!-- Pillow Body (Fluffy pastel sky blue / mint) -->
      <path d="M 16 18 C 30 10 74 10 88 18 C 98 28 98 62 88 72 C 74 80 30 80 16 72 C 6 62 6 28 16 18 Z" fill="#BAE6FD" stroke="#0284C7" stroke-width="3" />
      <!-- Soft Pillow Cushion Center (lighter highlight) -->
      <path d="M 22 24 C 34 16 70 16 82 24 C 90 32 90 58 82 66 C 70 74 34 74 22 66 C 14 58 14 32 22 24 Z" fill="#E0F2FE" />
      <!-- Puffy corner seams -->
      <path d="M 16 18 L 26 28" stroke="#0284C7" stroke-width="2" stroke-linecap="round" />
      <path d="M 88 18 L 78 28" stroke="#0284C7" stroke-width="2" stroke-linecap="round" />
      <path d="M 16 72 L 26 62" stroke="#0284C7" stroke-width="2" stroke-linecap="round" />
      <path d="M 88 72 L 78 62" stroke="#0284C7" stroke-width="2" stroke-linecap="round" />
      <!-- Gentle fabric depression folds in center -->
      <path d="M 38 42 Q 52 48 66 42" stroke="#7DD3FC" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <path d="M 42 48 Q 52 54 62 48" stroke="#7DD3FC" stroke-width="2" fill="none" stroke-linecap="round" />
      <!-- Sleeping Sleepy Cloud Motif on Pillow -->
      <g transform="translate(52, 34)">
        <ellipse cx="0" cy="0" rx="9" ry="6" fill="#FFFFFF" />
        <circle cx="-5" cy="-2" r="5" fill="#FFFFFF" />
        <circle cx="5" cy="-2" r="5" fill="#FFFFFF" />
        <!-- Sleepy eyes -->
        <path d="M -4 0 Q -2 2 0 0" stroke="#0369A1" stroke-width="1.2" fill="none" />
        <path d="M 2 0 Q 4 2 6 0" stroke="#0369A1" stroke-width="1.2" fill="none" />
      </g>
    </g>
    <!-- Little Zzz floating up -->
    <text x="106" y="28" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="#38BDF8">Z</text>
    <text x="116" y="18" font-family="Arial, sans-serif" font-weight="bold" font-size="11" fill="#38BDF8">z</text>
    <text x="122" y="10" font-family="Arial, sans-serif" font-weight="bold" font-size="8" fill="#38BDF8">z</text>
  </svg>`,

  // 21. Papier (hou_29 / hou_papier.svg) - Sheet of Drawing Paper with Toddler Crayon Art & Pencil
  'hou_papier.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Crisp White Sheet of Paper with Dog-eared / Curled Corner -->
    <g transform="translate(26, 12)">
      <!-- Main Paper Sheet -->
      <polygon points="12,6 64,6 84,26 84,94 12,94" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2.5" />
      <!-- Folded Dog-ear top right corner -->
      <polygon points="64,6 84,26 64,26" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2" />
      <polygon points="64,6 64,26 84,26" fill="#E2E8F0" />
      <!-- Notebook Ruled lines -->
      <line x1="22" y1="36" x2="74" y2="36" stroke="#E2E8F0" stroke-width="1.5" />
      <line x1="22" y1="48" x2="74" y2="48" stroke="#E2E8F0" stroke-width="1.5" />
      <line x1="22" y1="60" x2="74" y2="60" stroke="#E2E8F0" stroke-width="1.5" />
      <line x1="22" y1="72" x2="74" y2="72" stroke="#E2E8F0" stroke-width="1.5" />
      <line x1="22" y1="84" x2="74" y2="84" stroke="#E2E8F0" stroke-width="1.5" />
      <!-- Colorful Child Crayon Drawing on the paper -->
      <!-- Smiling Sun doodle -->
      <circle cx="36" cy="46" r="8" fill="#FDE047" stroke="#F59E0B" stroke-width="1.5" />
      <path d="M 36 34 L 36 30 M 48 46 L 52 46 M 36 58 L 36 62 M 24 46 L 20 46 M 45 37 L 48 34 M 45 55 L 48 58 M 27 55 L 24 58 M 27 37 L 24 34" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round" />
      <!-- Red Crayon Heart doodle -->
      <path d="M 62 50 C 62 46 58 44 56 47 C 54 44 50 46 50 50 C 50 54 56 58 56 58 C 56 58 62 54 62 50 Z" fill="#EF4444" />
      <!-- Green Flower doodle -->
      <path d="M 44 76 L 44 86" stroke="#22C55E" stroke-width="2" />
      <circle cx="44" cy="74" r="4" fill="#EC4899" />
      <circle cx="44" cy="74" r="1.5" fill="#FDE047" />
    </g>
    <!-- Yellow Wooden Pencil lying across bottom right -->
    <g transform="translate(80, 72) rotate(-28)">
      <!-- Pencil Body -->
      <rect x="0" y="0" width="36" height="8" fill="#FACC15" stroke="#CA8A04" stroke-width="1.5" />
      <!-- Pink Eraser & Silver Ferrule -->
      <rect x="-8" y="0" width="8" height="8" rx="2" fill="#F472B6" stroke="#DB2777" stroke-width="1.2" />
      <rect x="-3" y="0" width="3" height="8" fill="#CBD5E1" />
      <!-- Sharpened Wooden Tip & Graphite Point -->
      <polygon points="36,0 46,4 36,8" fill="#FDE68A" stroke="#CA8A04" stroke-width="1.2" />
      <polygon points="42,2.5 46,4 42,5.5" fill="#1E293B" />
    </g>
  </svg>`,

  // 22. Peigne (hou_30 / hou_peigne.svg) - Classic Flat Comb with Handle & Teeth (distinct from hairbrush)
  'hou_peigne.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Flat Styling Comb angled horizontally -->
    <g transform="translate(16, 42) rotate(-8)">
      <!-- Handle on left side -->
      <path d="M 0 14 C 0 8 6 4 14 4 L 36 6 L 36 22 L 14 24 C 6 24 0 20 0 14 Z" fill="#3B82F6" stroke="#1D4ED8" stroke-width="2.5" />
      <circle cx="10" cy="14" r="3.5" fill="#FFFFFF" stroke="#1D4ED8" stroke-width="1.2" />
      <!-- Comb Spine / Backbone -->
      <rect x="34" y="6" width="76" height="12" rx="3" fill="#3B82F6" stroke="#1D4ED8" stroke-width="2.5" />
      <!-- Spine glossy highlight -->
      <line x1="38" y1="10" x2="104" y2="10" stroke="#93C5FD" stroke-width="2" stroke-linecap="round" />
      <!-- Neat Row of Comb Teeth pointing down -->
      <!-- Wide teeth section -->
      <line x1="42" y1="18" x2="42" y2="44" stroke="#1D4ED8" stroke-width="3" stroke-linecap="round" />
      <line x1="48" y1="18" x2="48" y2="44" stroke="#1D4ED8" stroke-width="3" stroke-linecap="round" />
      <line x1="54" y1="18" x2="54" y2="44" stroke="#1D4ED8" stroke-width="3" stroke-linecap="round" />
      <line x1="60" y1="18" x2="60" y2="44" stroke="#1D4ED8" stroke-width="3" stroke-linecap="round" />
      <line x1="66" y1="18" x2="66" y2="44" stroke="#1D4ED8" stroke-width="3" stroke-linecap="round" />
      <!-- Fine teeth section -->
      <line x1="72" y1="18" x2="72" y2="44" stroke="#2563EB" stroke-width="2" stroke-linecap="round" />
      <line x1="76" y1="18" x2="76" y2="44" stroke="#2563EB" stroke-width="2" stroke-linecap="round" />
      <line x1="80" y1="18" x2="80" y2="44" stroke="#2563EB" stroke-width="2" stroke-linecap="round" />
      <line x1="84" y1="18" x2="84" y2="44" stroke="#2563EB" stroke-width="2" stroke-linecap="round" />
      <line x1="88" y1="18" x2="88" y2="44" stroke="#2563EB" stroke-width="2" stroke-linecap="round" />
      <line x1="92" y1="18" x2="92" y2="44" stroke="#2563EB" stroke-width="2" stroke-linecap="round" />
      <line x1="96" y1="18" x2="96" y2="44" stroke="#2563EB" stroke-width="2" stroke-linecap="round" />
      <line x1="100" y1="18" x2="100" y2="44" stroke="#2563EB" stroke-width="2" stroke-linecap="round" />
      <line x1="104" y1="18" x2="104" y2="44" stroke="#2563EB" stroke-width="2" stroke-linecap="round" />
    </g>
    <!-- Little sparkles of clean combed hair -->
    <polygon points="112,30 114,33 117,34 114,35 115,38 112,36 110,38 111,35 108,34 111,33" fill="#FDE047" />
  </svg>`,

  // 23. Brosse (hou_08 / hou_brosse.svg) - Oval Hairbrush with Cushion Pad & Bristles with Ball Tips
  'hou_brosse.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Oval Toddler Hairbrush angled -->
    <g transform="translate(68, 54) rotate(-32)">
      <!-- Long Ergonomic Handle extending down -->
      <path d="M -6 20 L -8 64 C -8 72 8 72 8 64 L 6 20 Z" fill="#EC4899" stroke="#BE185D" stroke-width="2.5" />
      <!-- Handle hanging hole -->
      <circle cx="0" cy="58" r="3" fill="#FFFFFF" stroke="#BE185D" stroke-width="1.2" />
      <!-- Handle grip rubber pads -->
      <line x1="-5" y1="34" x2="5" y2="34" stroke="#DB2777" stroke-width="2" stroke-linecap="round" />
      <line x1="-5" y1="42" x2="5" y2="42" stroke="#DB2777" stroke-width="2" stroke-linecap="round" />
      <!-- Oval Brush Head Frame -->
      <ellipse cx="0" cy="-14" rx="26" ry="34" fill="#F472B6" stroke="#BE185D" stroke-width="3" />
      <!-- Soft Rubber Cushion Pad -->
      <ellipse cx="0" cy="-14" rx="20" ry="28" fill="#1E293B" stroke="#0F172A" stroke-width="1.5" />
      <!-- Bristles with rounded protective ball tips -->
      <!-- Center column -->
      <circle cx="0" cy="-34" r="2.5" fill="#FDE047" />
      <circle cx="0" cy="-24" r="2.5" fill="#FDE047" />
      <circle cx="0" cy="-14" r="2.5" fill="#FDE047" />
      <circle cx="0" cy="-4" r="2.5" fill="#FDE047" />
      <circle cx="0" cy="6" r="2.5" fill="#FDE047" />
      <!-- Left column -->
      <circle cx="-10" cy="-28" r="2.5" fill="#FDE047" />
      <circle cx="-11" cy="-18" r="2.5" fill="#FDE047" />
      <circle cx="-11" cy="-8" r="2.5" fill="#FDE047" />
      <circle cx="-9" cy="2" r="2.5" fill="#FDE047" />
      <!-- Right column -->
      <circle cx="10" cy="-28" r="2.5" fill="#FDE047" />
      <circle cx="11" cy="-18" r="2.5" fill="#FDE047" />
      <circle cx="11" cy="-8" r="2.5" fill="#FDE047" />
      <circle cx="9" cy="2" r="2.5" fill="#FDE047" />
    </g>
    <!-- Soft shine on brush -->
    <polygon points="34,22 36,25 39,26 36,27 37,30 34,28 32,30 33,27 30,26 33,25" fill="#FDE047" />
  </svg>`,

  // 24. Photo (hou_31 / hou_photo.svg) - Polaroid-Style Instant Photo Print with smiling picture
  'hou_photo.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Classic Instant Photograph (Polaroid style with wide bottom margin) -->
    <g transform="translate(35, 12) rotate(6)">
      <!-- Photo White Border Card -->
      <rect x="0" y="0" width="70" height="88" rx="4" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2.5" />
      <!-- Square Photo Image Area -->
      <rect x="6" y="6" width="58" height="58" fill="#BAE6FD" stroke="#0284C7" stroke-width="1.5" />
      <!-- Picture Content: Sunny outdoor scene with puppy / smiling face -->
      <!-- Green rolling hill -->
      <path d="M 6 48 Q 35 38 64 48 L 64 64 L 6 64 Z" fill="#4ADE80" />
      <!-- Sunny golden sun -->
      <circle cx="50" cy="18" r="8" fill="#FDE047" />
      <!-- Cute happy little puppy in photo -->
      <circle cx="28" cy="44" r="9" fill="#F59E0B" />
      <circle cx="20" cy="38" r="4" fill="#D97706" />
      <circle cx="36" cy="38" r="4" fill="#D97706" />
      <circle cx="26" cy="43" r="1.5" fill="#000" />
      <circle cx="30" cy="43" r="1.5" fill="#000" />
      <circle cx="28" cy="47" r="1.5" fill="#B91C1C" />
      <!-- Red heart sticker on wide bottom polaroid border -->
      <path d="M 35 76 C 35 72 31 70 29 73 C 27 70 23 72 23 76 C 23 80 29 84 29 84 C 29 84 35 80 35 76 Z" fill="#EF4444" />
      <!-- Washi tape at top corner -->
      <rect x="22" y="-6" width="26" height="10" rx="1" transform="rotate(-4 35 -1)" fill="#FDE047" opacity="0.85" />
    </g>
  </svg>`,

  // 25. Caméra (hou_10 / hou_camera.svg) - Fun Retro Toddler Camera with Lens, Flash & Neck Strap
  'hou_camera.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Camera Neck Strap -->
    <path d="M 28 42 C 20 10 50 2 70 2 C 90 2 120 10 112 42" stroke="#F59E0B" stroke-width="3" fill="none" stroke-linecap="round" />
    <!-- Main Camera Body (Vibrant Mint Teal & Coral) -->
    <g transform="translate(24, 30)">
      <!-- Top Shutter Button & Dial -->
      <rect x="14" y="2" width="12" height="8" rx="2" fill="#EF4444" stroke="#B91C1C" stroke-width="1.5" />
      <rect x="68" y="4" width="14" height="6" rx="2" fill="#475569" stroke="#334155" stroke-width="1.5" />
      <!-- Camera Main Box Body -->
      <rect x="4" y="8" width="84" height="58" rx="12" fill="#0D9488" stroke="#115E59" stroke-width="3" />
      <!-- Soft Grip Textured Face Band -->
      <rect x="4" y="24" width="84" height="30" fill="#14B8A6" />
      <!-- Flash Bulb Window -->
      <rect x="66" y="14" width="14" height="10" rx="3" fill="#FEF08A" stroke="#CA8A04" stroke-width="1.5" />
      <circle cx="73" cy="19" r="2.5" fill="#FFFFFF" />
      <!-- Optical Viewfinder Window -->
      <rect x="14" y="14" width="10" height="8" rx="2" fill="#38BDF8" stroke="#0284C7" stroke-width="1.5" />
      <!-- Big Center Camera Lens with 3D Rings -->
      <circle cx="46" cy="38" r="22" fill="#334155" stroke="#1E293B" stroke-width="2.5" />
      <circle cx="46" cy="38" r="17" fill="#1E293B" />
      <circle cx="46" cy="38" r="13" fill="#0284C7" />
      <!-- Lens Glass Reflection Arc -->
      <path d="M 37 32 A 11 11 0 0 1 55 32" stroke="#FFFFFF" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <circle cx="42" cy="42" r="2" fill="#FFFFFF" />
    </g>
    <!-- Flash burst sparkle -->
    <polygon points="102,24 104,28 108,29 105,31 106,35 103,33 100,35 101,31 98,29 102,28" fill="#FDE047" />
  </svg>`,

  // 26. Serviette (hou_41 / hou_serviette.svg) - Fluffy Plush Bath Towel hanging on a towel bar (distinct from table napkin)
  'hou_serviette.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="52" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Wall Towel Bar / Rack (Chrome silver) -->
    <g transform="translate(18, 16)">
      <rect x="4" y="6" width="6" height="14" rx="2" fill="#94A3B8" stroke="#64748B" stroke-width="1.5" />
      <rect x="94" y="6" width="6" height="14" rx="2" fill="#94A3B8" stroke="#64748B" stroke-width="1.5" />
      <rect x="6" y="10" width="92" height="6" rx="3" fill="#CBD5E1" stroke="#64748B" stroke-width="1.5" />
    </g>
    <!-- Fluffy Plush Terrycloth Bath Towel draped over bar -->
    <g transform="translate(35, 22)">
      <!-- Back fold of towel -->
      <rect x="4" y="0" width="62" height="78" rx="4" fill="#0284C7" stroke="#0369A1" stroke-width="2" />
      <!-- Main Front Draped Towel (Soft Turquoise / Teal waffle terry) -->
      <rect x="0" y="0" width="70" height="74" rx="6" fill="#38BDF8" stroke="#0284C7" stroke-width="3" />
      <!-- Woven Decorative Dobby Border Band at bottom -->
      <rect x="0" y="52" width="70" height="10" fill="#0284C7" />
      <line x1="0" y1="54" x2="70" y2="54" stroke="#BAE6FD" stroke-width="1.5" stroke-dasharray="3,2" />
      <line x1="0" y1="60" x2="70" y2="60" stroke="#BAE6FD" stroke-width="1.5" stroke-dasharray="3,2" />
      <!-- Fluffy towel fringe at bottom hem -->
      <path d="M 2 74 Q 6 78 10 74 Q 14 78 18 74 Q 22 78 26 74 Q 30 78 34 74 Q 38 78 42 74 Q 46 78 50 74 Q 54 78 58 74 Q 62 78 66 74" stroke="#0284C7" stroke-width="2" fill="none" stroke-linecap="round" />
      <!-- Fabric folds / texture -->
      <line x1="18" y1="6" x2="18" y2="48" stroke="#0284C7" stroke-width="1.5" stroke-linecap="round" opacity="0.5" />
      <line x1="52" y1="6" x2="52" y2="48" stroke="#0284C7" stroke-width="1.5" stroke-linecap="round" opacity="0.5" />
    </g>
    <!-- Fresh water droplets & clean sparkle -->
    <circle cx="26" cy="62" r="3" fill="#BAE6FD" stroke="#0284C7" stroke-width="1" />
    <circle cx="114" cy="54" r="3.5" fill="#BAE6FD" stroke="#0284C7" stroke-width="1" />
    <polygon points="112,32 114,35 117,36 114,37 115,40 112,38 110,40 111,37 108,36 111,35" fill="#FDE047" />
  </svg>`,

  // 27. Serviette de table (hou_42 / hou_serviette_table.svg) - Folded Gingham Dining Napkin with Napkin Ring / Cutlery
  'hou_serviette_table.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="54" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Folded Fabric Dinner Napkin (Standing Fan / Triangle Fold) -->
    <g transform="translate(30, 16)">
      <!-- Base napkin fold -->
      <polygon points="40,6 76,64 4,64" fill="#EF4444" stroke="#B91C1C" stroke-width="3" />
      <!-- Red and White Gingham / Vichy pattern lines on napkin -->
      <path d="M 22 36 L 58 36 M 14 48 L 66 48 M 6 60 L 74 60" stroke="#FFFFFF" stroke-width="2.5" />
      <path d="M 30 18 L 12 56 M 40 10 L 30 64 M 50 18 L 48 64 M 60 30 L 66 56" stroke="#FFFFFF" stroke-width="2.5" />
      <!-- Front folded flap -->
      <polygon points="40,10 68,64 24,64" fill="#F87171" stroke="#B91C1C" stroke-width="2" />
      <polygon points="40,14 56,64 32,64" fill="#FCA5A5" />
      <!-- Golden Napkin Ring / Holder around the base -->
      <ellipse cx="40" cy="64" rx="24" ry="8" fill="#F59E0B" stroke="#B45309" stroke-width="2" />
      <ellipse cx="40" cy="64" rx="18" ry="5" fill="#FDE047" />
      <!-- Napkin skirt spilling out below ring -->
      <path d="M 20 66 Q 16 88 28 88 Q 40 88 40 68 Q 40 88 52 88 Q 64 88 60 66 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="2" />
    </g>
    <!-- Little silver butter knife beside napkin -->
    <g transform="translate(18, 48) rotate(-22)">
      <rect x="0" y="0" width="5" height="48" rx="2.5" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5" />
    </g>
    <!-- Little fork beside napkin -->
    <g transform="translate(116, 48) rotate(22)">
      <rect x="0" y="0" width="5" height="48" rx="2.5" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5" />
    </g>
  </svg>`,

  // 28. Vidanges (hou_47 / hou_vidanges.svg) - Heavy-Duty Tied Garbage Bags on the curb (distinct from trash can)
  'hou_vidanges.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="56" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Big Plump Tied Garbage Bag #1 (Dark Charcoal Green) -->
    <g transform="translate(18, 28)">
      <!-- Twisted Tied Neck at top -->
      <path d="M 28 8 C 24 2 36 2 32 8 Z" fill="#F59E0B" stroke="#B45309" stroke-width="1.5" />
      <!-- Yellow Drawstring / Twist Tie -->
      <ellipse cx="30" cy="10" rx="8" ry="3" fill="#FDE047" stroke="#CA8A04" stroke-width="1.5" />
      <!-- Plump, Crinkled Garbage Bag Body full of trash -->
      <path d="M 26 10 C 14 16 6 36 6 56 C 6 72 18 80 34 80 C 50 80 58 72 58 56 C 58 36 46 16 34 10 Z" fill="#1E293B" stroke="#0F172A" stroke-width="3" />
      <!-- Plastic Crinkle Highlights & Folds -->
      <path d="M 16 32 Q 26 24 38 30" stroke="#475569" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <path d="M 14 50 Q 24 58 38 48" stroke="#475569" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <path d="M 30 64 Q 44 68 50 56" stroke="#475569" stroke-width="2" fill="none" stroke-linecap="round" />
      <path d="M 20 28 L 22 66" stroke="rgba(255,255,255,0.25)" stroke-width="2.5" stroke-linecap="round" />
    </g>
    <!-- Second Garbage Bag #2 resting beside it (Opaque White/Blue Bag) -->
    <g transform="translate(64, 38)">
      <!-- Red drawstring tie -->
      <ellipse cx="32" cy="10" rx="6" ry="2.5" fill="#EF4444" stroke="#B91C1C" stroke-width="1.5" />
      <path d="M 30 10 C 18 16 10 32 10 50 C 10 64 22 70 34 70 C 48 70 56 64 56 50 C 56 32 46 16 34 10 Z" fill="#475569" stroke="#1E293B" stroke-width="2.5" />
      <path d="M 18 30 Q 30 24 40 32" stroke="#64748B" stroke-width="2" fill="none" stroke-linecap="round" />
      <path d="M 20 46 Q 32 52 44 44" stroke="#64748B" stroke-width="2" fill="none" stroke-linecap="round" />
    </g>
  </svg>`,

  // 29. Poubelle (hou_35 / hou_poubelle.svg) - Modern Kitchen Pedal Trash Can with Lid & Step Pedal
  'hou_poubelle.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120" width="100%" height="100%">
    <ellipse cx="70" cy="112" rx="50" ry="6" fill="rgba(0,0,0,0.12)" />
    <!-- Kitchen Step Trash Can (Poubelle à pédale) -->
    <g transform="translate(38, 16)">
      <!-- Can Body (Stainless Steel / Silver with clean sheen) -->
      <path d="M 10 24 L 14 86 C 14 90 50 90 50 86 L 54 24 Z" fill="#E2E8F0" stroke="#64748B" stroke-width="2.5" />
      <!-- Vertical sheen reflection stripe -->
      <rect x="20" y="24" width="8" height="62" fill="#FFFFFF" opacity="0.6" />
      <!-- Base Rim & Foot Pedal -->
      <ellipse cx="32" cy="86" rx="20" ry="5" fill="#475569" />
      <!-- Foot Pedal Mechanism at bottom -->
      <rect x="24" y="86" width="16" height="6" rx="2" fill="#1E293B" stroke="#0F172A" stroke-width="1.5" />
      <rect x="27" y="87" width="10" height="2" fill="#94A3B8" />
      <!-- Top Hinged Lid (Domed Chrome Lid) -->
      <path d="M 6 22 C 6 12 58 12 58 22 Z" fill="#CBD5E1" stroke="#64748B" stroke-width="2.5" />
      <ellipse cx="32" cy="22" rx="26" ry="6" fill="#F1F5F9" stroke="#64748B" stroke-width="1.5" />
      <!-- Lid Handle -->
      <rect x="26" y="10" width="12" height="4" rx="2" fill="#475569" stroke="#334155" stroke-width="1" />
      <!-- Universal Recycle / Trash symbol on can front -->
      <g transform="translate(32, 54)">
        <circle cx="0" cy="0" r="12" fill="#10B981" />
        <path d="M -4 -6 L 4 -6 L 0 -1 Z" fill="#FFFFFF" />
        <path d="M 6 -2 L 6 6 L 1 3 Z" fill="#FFFFFF" />
        <path d="M -6 6 L -6 -2 L -1 1 Z" fill="#FFFFFF" />
      </g>
    </g>
  </svg>`
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
  'veh_09': '🏍️', 'veh_10': '🚼', 'veh_11': '🚜', 'veh_12': '🚂',
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
