import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve('public/illustrations');

const CLOTHING_SVGS = {
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
  </svg>`
};

// Map each assetName to its word ID so we can save both
const ASSET_TO_ID = {
  'foo_beurre_pinotte.svg': 'foo_04',
  'clo_bavette.svg': 'clo_02',
  'clo_couche.svg': 'clo_11',
  'clo_bouton.svg': 'clo_04',
  'clo_ceinture.svg': 'clo_05',
  'clo_collants.svg': 'clo_09',
  'clo_gant.svg': 'clo_14',
  'clo_mitaine.svg': 'clo_18',
  'clo_jeans.svg': 'clo_16',
  'clo_pantalon.svg': 'clo_19',
  'clo_habit_neige.svg': 'clo_15',
  'clo_manteau.svg': 'clo_17',
  'clo_pantoufle.svg': 'clo_20',
  'clo_zip.svg': 'clo_27'
};

for (const [assetName, svgContent] of Object.entries(CLOTHING_SVGS)) {
  const assetPath = path.join(OUT_DIR, assetName);
  const wordId = ASSET_TO_ID[assetName];
  const idPath = path.join(OUT_DIR, `${wordId}.svg`);

  fs.writeFileSync(assetPath, svgContent.trim(), 'utf-8');
  fs.writeFileSync(idPath, svgContent.trim(), 'utf-8');
  console.log(`Saved ${assetName} and ${wordId}.svg`);
}

console.log(`Successfully generated and saved ${Object.keys(CLOTHING_SVGS).length} bespoke clothing & food illustrations!`);
