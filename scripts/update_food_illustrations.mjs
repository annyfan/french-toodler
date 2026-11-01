import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve('public/illustrations');

const FOOD_SVGS = {
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
  </svg>`
};

// Map each assetName to its word ID so we can save both
const ASSET_TO_ID = {
  'foo_banane.svg': 'foo_01',
  'foo_cereale.svg': 'foo_11',
  'foo_cheerios.svg': 'foo_12',
  'foo_chips.svg': 'foo_13',
  'foo_citrouille.svg': 'foo_15',
  'foo_coke.svg': 'foo_16',
  'foo_compote.svg': 'foo_17',
  'foo_confiture.svg': 'foo_18',
  'foo_cornichon.svg': 'foo_19',
  'foo_gomme.svg': 'foo_27',
  'foo_jello.svg': 'foo_30',
  'foo_noix.svg': 'foo_35',
  'foo_nouilles.svg': 'foo_36',
  'foo_nourriture.svg': 'foo_37',
  'foo_pois.svg': 'foo_44',
  'foo_popsicle.svg': 'foo_48',
  'foo_pouding.svg': 'foo_49',
  'foo_raisin_sec.svg': 'foo_52',
  'foo_sauce.svg': 'foo_54',
  'foo_thon.svg': 'foo_59',
  'foo_yogourt.svg': 'foo_64'
};

for (const [assetName, svgContent] of Object.entries(FOOD_SVGS)) {
  const assetPath = path.join(OUT_DIR, assetName);
  const wordId = ASSET_TO_ID[assetName];
  const idPath = path.join(OUT_DIR, `${wordId}.svg`);

  fs.writeFileSync(assetPath, svgContent.trim(), 'utf-8');
  fs.writeFileSync(idPath, svgContent.trim(), 'utf-8');
  console.log(`Saved ${assetName} and ${wordId}.svg`);
}

console.log(`Successfully generated and saved ${Object.keys(FOOD_SVGS).length} bespoke food illustrations!`);
