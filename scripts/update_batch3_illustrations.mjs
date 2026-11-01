import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve('public/illustrations');

const BATCH3_SVGS = {
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

const BATCH3_ITEMS = {
  'clo_collier.svg': 'clo_10',
  'bod_epaule.svg': 'bod_08',
  'bod_fesses.svg': 'bod_09',
  'bod_genou.svg': 'bod_10',
  'bod_jambe.svg': 'bod_11',
  'bod_joue.svg': 'bod_12',
  'bod_menton.svg': 'bod_16',
  'bod_nombril.svg': 'bod_19',
  'bod_orteil.svg': 'bod_21',
  'bod_penis.svg': 'bod_22',
  'bod_tete.svg': 'bod_24',
  'bod_vagin.svg': 'bod_25',
  'bod_visage.svg': 'bod_26',
  'hou_aspirateur.svg': 'hou_02',
  'hou_assiette.svg': 'hou_03',
  'hou_brosse.svg': 'hou_08',
  'hou_camera.svg': 'hou_10',
  'hou_couverte.svg': 'hou_15',
  'hou_fourchette.svg': 'hou_17',
  'hou_horloge.svg': 'hou_18',
  'hou_oreiller.svg': 'hou_27',
  'hou_papier.svg': 'hou_29',
  'hou_peigne.svg': 'hou_30',
  'hou_photo.svg': 'hou_31',
  'hou_plat.svg': 'hou_33',
  'hou_poubelle.svg': 'hou_35',
  'hou_serviette.svg': 'hou_41',
  'hou_serviette_table.svg': 'hou_42',
  'hou_vidanges.svg': 'hou_47'
};

for (const [assetName, wordId] of Object.entries(BATCH3_ITEMS)) {
  const svgContent = BATCH3_SVGS[assetName];
  if (!svgContent) {
    console.error(`Missing SVG definition for ${assetName}`);
    continue;
  }
  const assetPath = path.join(OUT_DIR, assetName);
  const idPath = path.join(OUT_DIR, `${wordId}.svg`);

  fs.writeFileSync(assetPath, svgContent.trim(), 'utf-8');
  fs.writeFileSync(idPath, svgContent.trim(), 'utf-8');
  console.log(`Saved ${assetName} and ${wordId}.svg`);
}

console.log(`Successfully generated and saved ${Object.keys(BATCH3_ITEMS).length} bespoke illustrations!`);
