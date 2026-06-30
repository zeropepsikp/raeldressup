/* =========================================================
 *  공주님 옷갈아입히기 - 에셋 (전부 직접 그린 인라인 SVG)
 *  - 좌표계 전부 viewBox 0 0 400 760 (바디) 기준으로 통일
 *  - 아이템은 각자 tight viewBox + 앵커(cx,cy,aw)로 배치/스냅
 * ========================================================= */

/* ---------- 공통 헬퍼 ---------- */
const S = (w, h, inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${inner}</svg>`;

// 8면체 보석 컷 헬퍼
const gemCut = (cx, cy, r, gId) => {
  const n = 8;
  const pts = Array.from({length: n * 2}, (_, i) => {
    const a = -Math.PI / 2 + i * Math.PI / n;
    const rad = i % 2 === 0 ? r : r * 0.58;
    return `${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`;
  }).join(' ');
  const inner = Array.from({length: n}, (_, i) => {
    const a = -Math.PI / 2 + (i + 0.5) * 2 * Math.PI / n;
    return `${(cx + r * 0.58 * Math.cos(a)).toFixed(1)},${(cy + r * 0.58 * Math.sin(a)).toFixed(1)}`;
  }).join(' ');
  const lines = Array.from({length: n}, (_, i) => {
    const a = -Math.PI / 2 + i * 2 * Math.PI / n;
    return `<line x1="${cx}" y1="${cy}" x2="${(cx + r * Math.cos(a)).toFixed(1)}" y2="${(cy + r * Math.sin(a)).toFixed(1)}" stroke="rgba(255,255,255,0.38)" stroke-width="0.7"/>`;
  }).join('');
  return `<polygon points="${pts}" fill="url(#${gId})" stroke="rgba(255,255,255,0.65)" stroke-width="1.2"/>
    <polygon points="${inner}" fill="rgba(255,255,255,0.11)"/>
    ${lines}
    <circle cx="${(cx - r*0.27).toFixed(1)}" cy="${(cy - r*0.27).toFixed(1)}" r="${(r*0.2).toFixed(1)}" fill="#fff" opacity="0.92"/>
    <ellipse cx="${(cx + r*0.08).toFixed(1)}" cy="${(cy - r*0.1).toFixed(1)}" rx="${(r*0.13).toFixed(1)}" ry="${(r*0.08).toFixed(1)}" fill="#fff" opacity="0.58"/>`;
};

// 4포인트 반짝이 별
const spark = (x, y, r, o = 0.9) => {
  const pts = Array.from({length: 8}, (_, i) => {
    const rad = i % 2 === 0 ? r : r * 0.28;
    return `${(x + rad * Math.cos(i * Math.PI / 4 - Math.PI / 2)).toFixed(1)},${(y + rad * Math.sin(i * Math.PI / 4 - Math.PI / 2)).toFixed(1)}`;
  }).join(' ');
  return `<polygon points="${pts}" fill="#fff" opacity="${o}"/>`;
};

/* =========================================================
 *  아이템 빌더
 * ========================================================= */
const ITEMS = { hair:[], dress:[], top:[], bottom:[], crown:[], earring:[], necklace:[], shoe:[], acc:[] };
let _uid = 0;
function add(cat, name, vb, svg, anchor) {
  ITEMS[cat].push({
    id: cat + '_' + (++_uid),
    name, cat,
    w: vb[0], h: vb[1],
    cx: anchor.cx, cy: anchor.cy, aw: anchor.aw, z: anchor.z,
    svg
  });
}

/* ---------- 헤어 ---------- */
function hairLong(name, c1, c2, hi) {
  const d = _uid + 1;
  const svg = S(320, 360, `
    <defs>
      <linearGradient id="${d}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hi}"/><stop offset="0.38" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <linearGradient id="${d}b" x1="0.3" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hi}" stop-opacity="0.85"/><stop offset="0.5" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <radialGradient id="${d}c" cx="0.38" cy="0.2" r="0.62"><stop offset="0" stop-color="${hi}" stop-opacity="0.72"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c2}"/><stop offset="0.6" stop-color="${c2}" stop-opacity="0.5"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}e" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c2}" stop-opacity="0.38"/><stop offset="0.5" stop-color="${c2}" stop-opacity="0"/><stop offset="1" stop-color="${c2}" stop-opacity="0.38"/></linearGradient>
      <linearGradient id="${d}f" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${hi}" stop-opacity="0.55"/><stop offset="0.4" stop-color="${hi}" stop-opacity="0"/><stop offset="1" stop-color="${hi}" stop-opacity="0.55"/></linearGradient>
      <linearGradient id="${d}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hi}" stop-opacity="0.55"/><stop offset="1" stop-color="${hi}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="0.5" stop-color="#000" stop-opacity="0.08"/><stop offset="1" stop-color="#000" stop-opacity="0.22"/></linearGradient>
      <radialGradient id="${d}i" cx="0.5" cy="0.1" r="0.52"><stop offset="0" stop-color="#000" stop-opacity="0.16"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}j" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hi}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <linearGradient id="${d}k" x1="0.2" y1="0" x2="0.8" y2="1"><stop offset="0" stop-color="${c1}" stop-opacity="0.55"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hi}" stop-opacity="0.9"/><stop offset="0.5" stop-color="${hi}" stop-opacity="0.3"/><stop offset="1" stop-color="${hi}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c2}" stop-opacity="0.5"/><stop offset="0.35" stop-color="${c2}" stop-opacity="0.2"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}n" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${hi}" stop-opacity="0"/><stop offset="0.7" stop-color="${hi}" stop-opacity="0.1"/><stop offset="1" stop-color="${hi}" stop-opacity="0.32"/></radialGradient>
      <linearGradient id="${d}o" x1="0.15" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="${hi}" stop-opacity="0.6"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></linearGradient>
      <filter id="${d}f1"><feGaussianBlur stdDeviation="0.5"/></filter>
      <filter id="${d}f2"><feGaussianBlur stdDeviation="1.8"/></filter>
      <filter id="${d}f3"><feGaussianBlur stdDeviation="4"/></filter>
    </defs>
    <!-- depth glow -->
    <path d="M160 14 C84 14 50 78 50 152 C50 214 58 272 68 322 L96 302 C84 252 84 152 98 120 C118 152 202 152 222 120 C236 152 236 252 224 302 L252 322 C262 272 270 214 270 152 C270 78 236 14 160 14 Z" fill="${c2}" filter="url(#${d}f3)" opacity="0.28"/>
    <!-- Layer 1: base hair -->
    <path d="M160 14 C84 14 50 78 50 152 C50 214 58 272 68 322 L96 302 C84 252 84 152 98 120 C118 152 202 152 222 120 C236 152 236 252 224 302 L252 322 C262 272 270 214 270 152 C270 78 236 14 160 14 Z" fill="url(#${d}a)"/>
    <path d="M68 322 C64 334 62 348 76 352 C90 354 94 338 90 322 Z" fill="url(#${d}j)"/>
    <path d="M252 322 C256 334 258 348 244 352 C230 354 226 338 230 322 Z" fill="url(#${d}j)"/>
    <!-- Layer 2: deep fold shadows -->
    <path d="M160 14 C84 14 50 78 50 152 C50 214 58 272 68 322 L96 302 C84 252 84 152 98 120 C118 152 202 152 222 120 C236 152 236 252 224 302 L252 322 C262 272 270 214 270 152 C270 78 236 14 160 14 Z" fill="url(#${d}h)" opacity="0.6"/>
    <path d="M98 122 C91 180 90 248 90 302 L106 300 C104 246 105 178 108 126 Z" fill="url(#${d}m)" filter="url(#${d}f1)"/>
    <path d="M222 122 C229 180 230 248 230 302 L214 300 C216 246 215 178 212 126 Z" fill="url(#${d}m)" filter="url(#${d}f1)"/>
    <path d="M154 130 C150 192 149 256 150 305" stroke="${c2}" stroke-opacity="0.22" stroke-width="14" fill="none" filter="url(#${d}f2)"/>
    <path d="M160 14 C84 14 50 78 50 152 C50 214 58 272 68 322 L96 302 C84 252 84 152 98 120 C118 152 202 152 222 120 C236 152 236 252 224 302 L252 322 C262 272 270 214 270 152 C270 78 236 14 160 14 Z" fill="url(#${d}i)" opacity="0.5"/>
    <!-- Layer 3: fabric highlights -->
    <path d="M160 20 C112 20 82 52 76 96 C102 70 130 64 160 64 C190 64 218 70 244 96 C238 52 208 20 160 20 Z" fill="${hi}" opacity="0.44"/>
    <path d="M160 14 C84 14 50 78 50 152 C50 214 58 272 68 322 L96 302 C84 252 84 152 98 120 C118 152 202 152 222 120 C236 152 236 252 224 302 L252 322 C262 272 270 214 270 152 C270 78 236 14 160 14 Z" fill="url(#${d}c)" opacity="0.5"/>
    <path d="M148 22 C138 82 136 188 138 302" stroke="${hi}" stroke-opacity="0.48" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M167 16 C162 85 162 192 164 308" stroke="${hi}" stroke-opacity="0.28" stroke-width="2.8" fill="none" stroke-linecap="round"/>
    <path d="M108 52 C104 122 102 222 104 300" stroke="${hi}" stroke-opacity="0.25" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M212 52 C216 122 218 222 216 300" stroke="${hi}" stroke-opacity="0.22" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M72 98 C68 162 68 242 72 290" stroke="${hi}" stroke-opacity="0.35" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M248 98 C252 162 252 242 248 290" stroke="${hi}" stroke-opacity="0.3" stroke-width="10" fill="none" stroke-linecap="round"/>
    <!-- Layer 4: rim light -->
    <path d="M100 40 C130 26 190 26 220 40" stroke="${hi}" stroke-opacity="0.7" stroke-width="4" fill="none" stroke-linecap="round" filter="url(#${d}f2)"/>
    <path d="M54 110 C52 165 52 232 56 280" stroke="${hi}" stroke-opacity="0.38" stroke-width="3" fill="none" stroke-linecap="round" filter="url(#${d}f1)"/>
    <path d="M266 110 C268 165 268 232 264 280" stroke="${hi}" stroke-opacity="0.38" stroke-width="3" fill="none" stroke-linecap="round" filter="url(#${d}f1)"/>
    ${spark(110,68,5.5,0.55)} ${spark(218,76,4.5,0.45)} ${spark(160,28,3.5,0.65)}`);
  add('hair', name, [320,360], svg, {cx:0.5,cy:0.205,aw:0.66,z:12});
}

function hairTwin(name, c1, c2, hi) {
  const d = _uid + 1;
  const svg = S(360, 380, `
    <defs>
      <linearGradient id="${d}a" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="${hi}"/><stop offset="0.4" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <radialGradient id="${d}b" cx="0.38" cy="0.32" r="0.72"><stop offset="0" stop-color="${hi}"/><stop offset="0.48" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient>
      <linearGradient id="${d}c" x1="0.3" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hi}" stop-opacity="0.8"/><stop offset="0.5" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <linearGradient id="${d}d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="0.5" stop-color="#000" stop-opacity="0.08"/><stop offset="1" stop-color="#000" stop-opacity="0.22"/></linearGradient>
      <radialGradient id="${d}e" cx="0.5" cy="0.1" r="0.52"><stop offset="0" stop-color="#000" stop-opacity="0.16"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}f" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c2}" stop-opacity="0.38"/><stop offset="0.5" stop-color="${c2}" stop-opacity="0"/><stop offset="1" stop-color="${c2}" stop-opacity="0.38"/></linearGradient>
      <radialGradient id="${d}g" cx="0.38" cy="0.2" r="0.62"><stop offset="0" stop-color="${hi}" stop-opacity="0.7"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hi}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <linearGradient id="${d}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c2}" stop-opacity="0.5"/><stop offset="0.35" stop-color="${c2}" stop-opacity="0.2"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}j" cx="0.35" cy="0.35" r="0.65"><stop offset="0" stop-color="${hi}" stop-opacity="0.6"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hi}" stop-opacity="0.55"/><stop offset="1" stop-color="${hi}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}l" x1="0.2" y1="0" x2="0.8" y2="1"><stop offset="0" stop-color="${c1}" stop-opacity="0.5"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}m" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${hi}" stop-opacity="0"/><stop offset="0.7" stop-color="${hi}" stop-opacity="0.1"/><stop offset="1" stop-color="${hi}" stop-opacity="0.32"/></radialGradient>
      <linearGradient id="${d}n" x1="0.15" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="${hi}" stop-opacity="0.6"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}o" cx="0.5" cy="0.3" r="0.7"><stop offset="0" stop-color="#ff5d9e" stop-opacity="0.8"/><stop offset="1" stop-color="#c01e6e" stop-opacity="0"/></radialGradient>
      <filter id="${d}f1"><feGaussianBlur stdDeviation="0.7"/></filter>
      <filter id="${d}f2"><feGaussianBlur stdDeviation="2"/></filter>
      <filter id="${d}f3"><feGaussianBlur stdDeviation="4.5"/></filter>
    </defs>
    <!-- depth glow -->
    <path d="M180 16 C108 16 74 78 74 146 C74 182 80 218 88 242 L112 232 C102 202 102 152 116 126 C138 154 222 154 244 126 C258 152 258 202 248 232 L272 242 C280 218 286 182 286 146 C286 78 252 16 180 16 Z" fill="${c2}" filter="url(#${d}f3)" opacity="0.3"/>
    <!-- Layer 1: base -->
    <path d="M180 16 C108 16 74 78 74 146 C74 182 80 218 88 242 L112 232 C102 202 102 152 116 126 C138 154 222 154 244 126 C258 152 258 202 248 232 L272 242 C280 218 286 182 286 146 C286 78 252 16 180 16 Z" fill="url(#${d}a)"/>
    <ellipse cx="68" cy="268" rx="38" ry="66" fill="url(#${d}a)"/>
    <ellipse cx="292" cy="268" rx="38" ry="66" fill="url(#${d}a)"/>
    <!-- Layer 2: deep fold shadows -->
    <path d="M180 16 C108 16 74 78 74 146 C74 182 80 218 88 242 L112 232 C102 202 102 152 116 126 C138 154 222 154 244 126 C258 152 258 202 248 232 L272 242 C280 218 286 182 286 146 C286 78 252 16 180 16 Z" fill="url(#${d}d)" opacity="0.6"/>
    <ellipse cx="68" cy="268" rx="38" ry="66" fill="url(#${d}d)" opacity="0.5"/>
    <ellipse cx="292" cy="268" rx="38" ry="66" fill="url(#${d}d)" opacity="0.5"/>
    <ellipse cx="54" cy="268" rx="12" ry="52" fill="${c2}" opacity="0.28" filter="url(#${d}f1)"/>
    <ellipse cx="306" cy="268" rx="12" ry="52" fill="${c2}" opacity="0.28" filter="url(#${d}f1)"/>
    <path d="M116 126 C110 178 108 218 110 232" stroke="${c2}" stroke-opacity="0.3" stroke-width="10" fill="none" filter="url(#${d}f1)"/>
    <path d="M244 126 C250 178 252 218 250 232" stroke="${c2}" stroke-opacity="0.3" stroke-width="10" fill="none" filter="url(#${d}f1)"/>
    <!-- hair ties -->
    <circle cx="68" cy="202" r="16" fill="#ff5d9e"/>
    <circle cx="292" cy="202" r="16" fill="#ff5d9e"/>
    <circle cx="68" cy="202" r="16" fill="url(#${d}o)" opacity="0.7"/>
    <circle cx="63" cy="197" r="6" fill="#fff" opacity="0.75"/>
    <circle cx="287" cy="197" r="6" fill="#fff" opacity="0.75"/>
    <!-- Layer 3: highlights -->
    <path d="M180 22 C132 22 102 54 96 98 C122 72 150 66 180 66 C210 66 238 72 264 98 C258 54 228 22 180 22 Z" fill="${hi}" opacity="0.46"/>
    <path d="M180 16 C108 16 74 78 74 146 C74 182 80 218 88 242 L112 232 C102 202 102 152 116 126 C138 154 222 154 244 126 C258 152 258 202 248 232 L272 242 C280 218 286 182 286 146 C286 78 252 16 180 16 Z" fill="url(#${d}g)" opacity="0.5"/>
    <path d="M62 210 C60 252 62 302 68 332" stroke="${hi}" stroke-opacity="0.48" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M298 210 C300 252 298 302 292 332" stroke="${hi}" stroke-opacity="0.48" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M166 18 C160 82 160 162 162 225" stroke="${hi}" stroke-opacity="0.42" stroke-width="4" fill="none" stroke-linecap="round"/>
    <!-- Layer 4: rim light -->
    <path d="M110 42 C140 28 220 28 250 42" stroke="${hi}" stroke-opacity="0.68" stroke-width="3.5" fill="none" stroke-linecap="round" filter="url(#${d}f2)"/>
    <path d="M38 120 C36 175 38 235 42 275" stroke="${hi}" stroke-opacity="0.36" stroke-width="3" fill="none" stroke-linecap="round" filter="url(#${d}f1)"/>
    <path d="M322 120 C324 175 322 235 318 275" stroke="${hi}" stroke-opacity="0.36" stroke-width="3" fill="none" stroke-linecap="round" filter="url(#${d}f1)"/>
    ${spark(110,66,5.5,0.5)} ${spark(250,74,4.5,0.45)} ${spark(180,28,3.5,0.65)}`);
  add('hair', name, [360,380], svg, {cx:0.5,cy:0.22,aw:0.78,z:12});
}

function hairBun(name, c1, c2, hi) {
  const d = _uid + 1;
  const svg = S(320, 300, `
    <defs>
      <linearGradient id="${d}a" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="${hi}"/><stop offset="0.4" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <radialGradient id="${d}b" cx="0.38" cy="0.32" r="0.72"><stop offset="0" stop-color="${hi}"/><stop offset="0.45" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient>
      <radialGradient id="${d}c" cx="0.3" cy="0.25" r="0.65"><stop offset="0" stop-color="${hi}" stop-opacity="0.75"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="0.5" stop-color="#000" stop-opacity="0.08"/><stop offset="1" stop-color="#000" stop-opacity="0.22"/></linearGradient>
      <radialGradient id="${d}e" cx="0.5" cy="0.1" r="0.52"><stop offset="0" stop-color="#000" stop-opacity="0.16"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}f" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c2}" stop-opacity="0.38"/><stop offset="0.5" stop-color="${c2}" stop-opacity="0"/><stop offset="1" stop-color="${c2}" stop-opacity="0.38"/></linearGradient>
      <radialGradient id="${d}g" cx="0.35" cy="0.35" r="0.65"><stop offset="0" stop-color="${hi}" stop-opacity="0.6"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hi}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <linearGradient id="${d}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c2}" stop-opacity="0.5"/><stop offset="0.35" stop-color="${c2}" stop-opacity="0.2"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}j" cx="0.38" cy="0.3" r="0.7"><stop offset="0" stop-color="#000" stop-opacity="0.12"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hi}" stop-opacity="0.7"/><stop offset="0.5" stop-color="${hi}" stop-opacity="0.25"/><stop offset="1" stop-color="${hi}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}l" x1="0.2" y1="0" x2="0.8" y2="1"><stop offset="0" stop-color="${c1}" stop-opacity="0.55"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}m" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${hi}" stop-opacity="0"/><stop offset="0.7" stop-color="${hi}" stop-opacity="0.1"/><stop offset="1" stop-color="${hi}" stop-opacity="0.32"/></radialGradient>
      <linearGradient id="${d}n" x1="0.15" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="${hi}" stop-opacity="0.6"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}o" cx="0.5" cy="0.4" r="0.6"><stop offset="0" stop-color="${hi}" stop-opacity="0.6"/><stop offset="0.5" stop-color="${c1}" stop-opacity="0.1"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <filter id="${d}f1"><feGaussianBlur stdDeviation="0.8"/></filter>
      <filter id="${d}f2"><feGaussianBlur stdDeviation="2.2"/></filter>
      <filter id="${d}f3"><feGaussianBlur stdDeviation="5"/></filter>
    </defs>
    <!-- depth -->
    <circle cx="160" cy="42" r="40" fill="${c2}" filter="url(#${d}f3)" opacity="0.28"/>
    <path d="M160 28 C92 28 62 86 62 152 C62 188 68 218 78 238 L102 226 C92 198 94 152 108 128 C130 154 190 154 212 128 C226 152 228 198 218 226 L242 238 C252 218 258 188 258 152 C258 86 228 28 160 28 Z" fill="${c2}" filter="url(#${d}f3)" opacity="0.22"/>
    <!-- Layer 1: base body hair -->
    <path d="M160 28 C92 28 62 86 62 152 C62 188 68 218 78 238 L102 226 C92 198 94 152 108 128 C130 154 190 154 212 128 C226 152 228 198 218 226 L242 238 C252 218 258 188 258 152 C258 86 228 28 160 28 Z" fill="url(#${d}a)"/>
    <!-- bun -->
    <circle cx="160" cy="42" r="36" fill="url(#${d}b)"/>
    <!-- Layer 2: deep fold shadows -->
    <path d="M160 28 C92 28 62 86 62 152 C62 188 68 218 78 238 L102 226 C92 198 94 152 108 128 C130 154 190 154 212 128 C226 152 228 198 218 226 L242 238 C252 218 258 188 258 152 C258 86 228 28 160 28 Z" fill="url(#${d}d)" opacity="0.6"/>
    <circle cx="160" cy="42" r="36" fill="url(#${d}j)" opacity="0.6"/>
    <path d="M108 128 C102 178 100 215 100 226" stroke="${c2}" stroke-opacity="0.3" stroke-width="10" fill="none" filter="url(#${d}f1)"/>
    <path d="M212 128 C218 178 220 215 220 226" stroke="${c2}" stroke-opacity="0.3" stroke-width="10" fill="none" filter="url(#${d}f1)"/>
    <!-- bun spiral grooves -->
    <path d="M160 14 C172 16 180 24 180 36 C180 48 170 55 160 55 C150 55 142 48 142 38" stroke="${c2}" stroke-opacity="0.32" stroke-width="2.5" fill="none" filter="url(#${d}f1)"/>
    <path d="M148 18 C138 24 132 34 134 44" stroke="${c2}" stroke-opacity="0.24" stroke-width="2" fill="none" filter="url(#${d}f1)"/>
    <!-- Layer 3: fabric highlights -->
    <path d="M160 34 C118 34 92 62 86 102 C112 78 136 72 160 72 C184 72 208 78 234 102 C228 62 202 34 160 34 Z" fill="${hi}" opacity="0.43"/>
    <path d="M160 28 C92 28 62 86 62 152 C62 188 68 218 78 238 L102 226 C92 198 94 152 108 128 C130 154 190 154 212 128 C226 152 228 198 218 226 L242 238 C252 218 258 188 258 152 C258 86 228 28 160 28 Z" fill="url(#${d}c)" opacity="0.5"/>
    <!-- bun highlight -->
    <circle cx="148" cy="30" r="15" fill="${hi}" opacity="0.44"/>
    <circle cx="160" cy="42" r="36" fill="url(#${d}o)" opacity="0.7"/>
    <!-- strand highlights -->
    <path d="M148 32 C138 92 136 182 138 226" stroke="${hi}" stroke-opacity="0.42" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M108 62 C104 124 102 196 104 226" stroke="${hi}" stroke-opacity="0.24" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Layer 4: rim light -->
    <path d="M128 18 C144 10 176 10 192 18" stroke="${hi}" stroke-opacity="0.72" stroke-width="3.5" fill="none" stroke-linecap="round" filter="url(#${d}f2)"/>
    <path d="M66 88 C62 145 62 210 66 232" stroke="${hi}" stroke-opacity="0.36" stroke-width="3" fill="none" stroke-linecap="round" filter="url(#${d}f1)"/>
    <path d="M254 88 C258 145 258 210 254 232" stroke="${hi}" stroke-opacity="0.36" stroke-width="3" fill="none" stroke-linecap="round" filter="url(#${d}f1)"/>
    ${spark(132,58,5.5,0.6)} ${spark(196,70,4.5,0.55)} ${spark(160,16,3.5,0.68)}`);
  add('hair', name, [320,300], svg, {cx:0.5,cy:0.18,aw:0.66,z:12});
}

/* ---------- 드레스 (볼가운) ---------- */
function gown(name, c1, c2, trim, gc1, gc2) {
  const d = _uid + 1;
  const svg = S(340, 380, `
    <defs>
      <linearGradient id="${d}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="0.45" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <linearGradient id="${d}b" x1="0.15" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="${trim}" stop-opacity="0.9"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}c" cx="0.3" cy="0.2" r="0.7"><stop offset="0" stop-color="#fff" stop-opacity="0.42"/><stop offset="0.5" stop-color="${c1}" stop-opacity="0.1"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}d" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c2}" stop-opacity="0.35"/><stop offset="0.5" stop-color="${c2}" stop-opacity="0"/><stop offset="1" stop-color="${c2}" stop-opacity="0.35"/></linearGradient>
      <radialGradient id="${d}e" cx="0.5" cy="0.35" r="0.7"><stop offset="0" stop-color="#fff" stop-opacity="0.35"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="0.4" stop-color="${c2}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <linearGradient id="${d}g" x1="0.18" y1="0" x2="0.82" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="0.38" stop-color="${c2}"/><stop offset="0.78" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <linearGradient id="${d}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}i" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c2}" stop-opacity="0.4"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}j" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.32"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}k" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="${c2}" stop-opacity="0.32"/><stop offset="0.5" stop-color="${c2}" stop-opacity="0.1"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${trim}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <radialGradient id="${d}m" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#fff"/><stop offset="0.45" stop-color="${gc1}"/><stop offset="1" stop-color="${gc2}"/></radialGradient>
      <radialGradient id="${d}n" cx="0.5" cy="0.82" r="0.6"><stop offset="0" stop-color="#000" stop-opacity="0.18"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}o" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${trim}" stop-opacity="0.65"/><stop offset="1" stop-color="${trim}" stop-opacity="0"/></linearGradient>
      <filter id="${d}f1"><feGaussianBlur stdDeviation="0.6"/></filter>
      <filter id="${d}f2"><feGaussianBlur stdDeviation="2.2"/></filter>
      <filter id="${d}f3"><feGaussianBlur stdDeviation="5.5"/></filter>
    </defs>
    <!-- depth glow -->
    <path d="M118 152 Q170 170 222 152 L326 354 Q170 394 14 354 Z" fill="${c2}" filter="url(#${d}f3)" opacity="0.3"/>
    <!-- Layer 1: base fabric -->
    <ellipse cx="116" cy="60" rx="32" ry="28" fill="url(#${d}a)"/>
    <ellipse cx="224" cy="60" rx="32" ry="28" fill="url(#${d}a)"/>
    <path d="M112 44 Q170 76 228 44 L222 152 Q170 174 118 152 Z" fill="url(#${d}a)" stroke="${trim}" stroke-width="1.5"/>
    <path d="M118 152 Q170 170 222 152 L326 354 Q170 394 14 354 Z" fill="url(#${d}g)" stroke="${trim}" stroke-width="1.5"/>
    <!-- Layer 2: deep fold shadows -->
    <path d="M118 152 Q170 170 222 152 L326 354 Q170 394 14 354 Z" fill="url(#${d}n)" opacity="0.7"/>
    <path d="M145 158 L80 350" stroke="${c2}" stroke-opacity="0.28" stroke-width="20" fill="none" stroke-linecap="round" filter="url(#${d}f2)"/>
    <path d="M170 168 L170 382" stroke="${c2}" stroke-opacity="0.18" stroke-width="14" fill="none" stroke-linecap="round" filter="url(#${d}f2)"/>
    <path d="M212 158 L292 340" stroke="${c2}" stroke-opacity="0.22" stroke-width="18" fill="none" stroke-linecap="round" filter="url(#${d}f2)"/>
    <path d="M112 44 Q170 76 228 44 L222 152 Q170 174 118 152 Z" fill="url(#${d}d)" opacity="0.6"/>
    <ellipse cx="100" cy="72" rx="14" ry="20" fill="${c2}" opacity="0.28" filter="url(#${d}f1)"/>
    <ellipse cx="240" cy="72" rx="14" ry="20" fill="${c2}" opacity="0.28" filter="url(#${d}f1)"/>
    <!-- Layer 3: fabric highlights -->
    <path d="M112 44 Q170 76 228 44 L226 62 Q170 90 114 62 Z" fill="#fff" opacity="0.22"/>
    <path d="M112 44 Q170 76 228 44 L222 152 Q170 174 118 152 Z" fill="url(#${d}c)" opacity="0.8"/>
    <ellipse cx="108" cy="52" rx="14" ry="10" fill="#fff" opacity="0.28"/>
    <ellipse cx="232" cy="52" rx="14" ry="10" fill="#fff" opacity="0.28"/>
    <path d="M200 162 L312 348" stroke="#fff" stroke-opacity="0.18" stroke-width="18" fill="none" stroke-linecap="round" filter="url(#${d}f2)"/>
    <path d="M210 165 L312 348" stroke="#fff" stroke-opacity="0.12" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M118 152 Q170 170 222 152 L326 354 Q170 394 14 354 Z" fill="url(#${d}h)" opacity="0.4"/>
    <!-- bodice boning detail -->
    <path d="M155 65 L152 148" stroke="${trim}" stroke-opacity="0.36" stroke-width="1.5" fill="none"/>
    <path d="M170 68 L170 150" stroke="${trim}" stroke-opacity="0.3" stroke-width="1.5" fill="none"/>
    <path d="M185 65 L188 148" stroke="${trim}" stroke-opacity="0.36" stroke-width="1.5" fill="none"/>
    <!-- Layer 4: rim light -->
    <path d="M112 46 Q170 28 228 46" stroke="#fff" stroke-opacity="0.52" stroke-width="3" fill="none" stroke-linecap="round" filter="url(#${d}f1)"/>
    <!-- waist sash -->
    <path d="M120 150 Q170 168 220 150 L218 163 Q170 181 122 163 Z" fill="url(#${d}l)"/>
    <!-- lace ruffle hem -->
    <g fill="${trim}" opacity="0.9">
      ${Array.from({length:13},(_, i)=>`<circle cx="${(18+i*23.5).toFixed(1)}" cy="${352-(i%2?5:0)}" r="11"/>`).join('')}
    </g>
    <path d="M14 354 Q170 394 326 354" stroke="${trim}" stroke-opacity="0.5" stroke-width="2" fill="none"/>
    <!-- waist gem 8-facet -->
    ${gemCut(170, 157, 12, `${d}m`)}
    ${spark(80,250,6.5,0.62)} ${spark(272,212,5.5,0.5)} ${spark(170,302,5.5,0.55)} ${spark(302,310,4,0.46)}`);
  add('dress', name, [340,380], svg, {cx:0.5,cy:0.565,aw:1.06,z:24});
}

/* ---------- 상의 ---------- */
function topPiece(name, c1, c2, trim) {
  const d = _uid + 1;
  const svg = S(240, 200, `
    <defs>
      <linearGradient id="${d}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="0.45" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <radialGradient id="${d}b" cx="0.3" cy="0.22" r="0.7"><stop offset="0" stop-color="#fff" stop-opacity="0.42"/><stop offset="0.5" stop-color="${c1}" stop-opacity="0.1"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}c" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c2}" stop-opacity="0.36"/><stop offset="0.5" stop-color="${c2}" stop-opacity="0"/><stop offset="1" stop-color="${c2}" stop-opacity="0.36"/></linearGradient>
      <linearGradient id="${d}d" x1="0.15" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="${trim}" stop-opacity="0.9"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}e" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c2}" stop-opacity="0.38"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}g" cx="0.5" cy="0.36" r="0.7"><stop offset="0" stop-color="#fff" stop-opacity="0.34"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}h" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.3"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c2}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <radialGradient id="${d}j" cx="0.5" cy="0.85" r="0.58"><stop offset="0" stop-color="#000" stop-opacity="0.16"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${trim}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <radialGradient id="${d}l" cx="0.38" cy="0.2" r="0.65"><stop offset="0" stop-color="#fff" stop-opacity="0.55"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}m" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="${c2}" stop-opacity="0.28"/><stop offset="0.5" stop-color="${c2}" stop-opacity="0.1"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}n" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#fff"/><stop offset="0.45" stop-color="${trim}"/><stop offset="1" stop-color="${c2}"/></radialGradient>
      <linearGradient id="${d}o" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${trim}" stop-opacity="0.6"/><stop offset="0.5" stop-color="${trim}" stop-opacity="0"/><stop offset="1" stop-color="${trim}" stop-opacity="0.6"/></linearGradient>
      <filter id="${d}f1"><feGaussianBlur stdDeviation="0.6"/></filter>
      <filter id="${d}f2"><feGaussianBlur stdDeviation="2"/></filter>
      <filter id="${d}f3"><feGaussianBlur stdDeviation="4.5"/></filter>
    </defs>
    <!-- depth -->
    <path d="M66 46 Q120 76 174 46 L168 176 Q120 196 72 176 Z" fill="${c2}" filter="url(#${d}f3)" opacity="0.28"/>
    <!-- Layer 1: base -->
    <ellipse cx="64" cy="60" rx="27" ry="23" fill="url(#${d}a)"/>
    <ellipse cx="176" cy="60" rx="27" ry="23" fill="url(#${d}a)"/>
    <path d="M66 46 Q120 76 174 46 L168 176 Q120 196 72 176 Z" fill="url(#${d}a)" stroke="${trim}" stroke-width="2"/>
    <!-- Layer 2: deep fold shadows -->
    <path d="M66 46 Q120 76 174 46 L168 176 Q120 196 72 176 Z" fill="url(#${d}j)" opacity="0.7"/>
    <path d="M66 46 Q120 76 174 46 L168 176 Q120 196 72 176 Z" fill="url(#${d}c)" opacity="0.55"/>
    <ellipse cx="52" cy="72" rx="12" ry="17" fill="${c2}" opacity="0.26" filter="url(#${d}f1)"/>
    <ellipse cx="188" cy="72" rx="12" ry="17" fill="${c2}" opacity="0.26" filter="url(#${d}f1)"/>
    <path d="M115 80 L112 180" stroke="${c2}" stroke-opacity="0.18" stroke-width="12" fill="none" filter="url(#${d}f2)"/>
    <!-- Layer 3: highlights -->
    <path d="M66 46 Q120 76 174 46 L172 64 Q120 90 68 64 Z" fill="#fff" opacity="0.22"/>
    <path d="M66 46 Q120 76 174 46 L168 176 Q120 196 72 176 Z" fill="url(#${d}b)" opacity="0.8"/>
    <ellipse cx="56" cy="52" rx="12" ry="9" fill="#fff" opacity="0.26"/>
    <ellipse cx="184" cy="52" rx="12" ry="9" fill="#fff" opacity="0.26"/>
    <path d="M138 54 L142 180" stroke="#fff" stroke-opacity="0.18" stroke-width="8" fill="none" stroke-linecap="round" filter="url(#${d}f2)"/>
    <path d="M66 46 Q120 76 174 46 L168 176 Q120 196 72 176 Z" fill="url(#${d}e)" opacity="0.4"/>
    <!-- boning details -->
    <path d="M109 68 L107 180" stroke="${trim}" stroke-opacity="0.34" stroke-width="1.5" fill="none"/>
    <path d="M120 70 L120 182" stroke="${trim}" stroke-opacity="0.28" stroke-width="1.5" fill="none"/>
    <path d="M131 68 L133 180" stroke="${trim}" stroke-opacity="0.34" stroke-width="1.5" fill="none"/>
    <!-- Layer 4: rim light -->
    <path d="M66 48 Q120 30 174 48" stroke="#fff" stroke-opacity="0.52" stroke-width="3" fill="none" stroke-linecap="round" filter="url(#${d}f1)"/>
    <!-- waist trim band -->
    <path d="M72 174 Q120 190 168 174 L166 184 Q120 200 74 184 Z" fill="url(#${d}k)"/>
    <!-- waist gem -->
    ${gemCut(120, 179, 8, `${d}n`)}
    ${spark(90,118,5.5,0.6)} ${spark(158,138,4.5,0.5)}`);
  add('top', name, [240,200], svg, {cx:0.5,cy:0.40,aw:0.56,z:30});
}

/* ---------- 하의 (스커트) ---------- */
function skirtPiece(name, c1, c2, trim) {
  const d = _uid + 1;
  const svg = S(300, 240, `
    <defs>
      <linearGradient id="${d}a" x1="0.18" y1="0" x2="0.82" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="0.38" stop-color="${c2}"/><stop offset="0.78" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <linearGradient id="${d}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="0.45" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <radialGradient id="${d}c" cx="0.3" cy="0.2" r="0.7"><stop offset="0" stop-color="#fff" stop-opacity="0.4"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}d" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c2}" stop-opacity="0.36"/><stop offset="0.5" stop-color="${c2}" stop-opacity="0"/><stop offset="1" stop-color="${c2}" stop-opacity="0.36"/></linearGradient>
      <linearGradient id="${d}e" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c2}" stop-opacity="0.38"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}g" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.3"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}h" cx="0.5" cy="0.88" r="0.58"><stop offset="0" stop-color="#000" stop-opacity="0.16"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${trim}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <linearGradient id="${d}j" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="${c2}" stop-opacity="0.3"/><stop offset="0.5" stop-color="${c2}" stop-opacity="0.1"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}k" cx="0.38" cy="0.22" r="0.65"><stop offset="0" stop-color="#fff" stop-opacity="0.5"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}l" x1="0.15" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="${trim}" stop-opacity="0.85"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}m" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${trim}" stop-opacity="0.6"/><stop offset="0.5" stop-color="${trim}" stop-opacity="0"/><stop offset="1" stop-color="${trim}" stop-opacity="0.6"/></linearGradient>
      <linearGradient id="${d}n" x1="0.5" y1="1" x2="0.5" y2="0"><stop offset="0" stop-color="${c1}" stop-opacity="0.4"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}o" cx="0.35" cy="0.3" r="0.78"><stop offset="0" stop-color="#fff"/><stop offset="0.45" stop-color="${trim}"/><stop offset="1" stop-color="${c2}"/></radialGradient>
      <filter id="${d}f1"><feGaussianBlur stdDeviation="0.6"/></filter>
      <filter id="${d}f2"><feGaussianBlur stdDeviation="2"/></filter>
      <filter id="${d}f3"><feGaussianBlur stdDeviation="5"/></filter>
    </defs>
    <!-- depth -->
    <path d="M108 16 Q150 30 192 16 L286 216 Q150 252 14 216 Z" fill="${c2}" filter="url(#${d}f3)" opacity="0.28"/>
    <!-- Layer 1: base skirt -->
    <path d="M108 16 Q150 30 192 16 L286 216 Q150 252 14 216 Z" fill="url(#${d}a)" stroke="${trim}" stroke-width="1.5"/>
    <!-- Layer 2: deep fold shadows -->
    <path d="M108 16 Q150 30 192 16 L286 216 Q150 252 14 216 Z" fill="url(#${d}h)" opacity="0.7"/>
    <path d="M108 16 Q150 30 192 16 L286 216 Q150 252 14 216 Z" fill="url(#${d}d)" opacity="0.55"/>
    <path d="M126 24 L72 210" stroke="${c2}" stroke-opacity="0.28" stroke-width="20" fill="none" stroke-linecap="round" filter="url(#${d}f2)"/>
    <path d="M150 28 L150 246" stroke="${c2}" stroke-opacity="0.18" stroke-width="14" fill="none" stroke-linecap="round" filter="url(#${d}f2)"/>
    <path d="M178 24 L240 208" stroke="${c2}" stroke-opacity="0.22" stroke-width="16" fill="none" stroke-linecap="round" filter="url(#${d}f2)"/>
    <!-- Layer 3: fabric highlights -->
    <path d="M108 16 Q150 30 192 16 L192 32 Q150 46 108 32 Z" fill="${trim}" opacity="0.9"/>
    <path d="M108 16 Q150 30 192 16 L286 216 Q150 252 14 216 Z" fill="url(#${d}c)" opacity="0.5"/>
    <path d="M192 22 L262 208" stroke="#fff" stroke-opacity="0.18" stroke-width="18" fill="none" stroke-linecap="round" filter="url(#${d}f2)"/>
    <path d="M108 16 Q150 30 192 16 L286 216 Q150 252 14 216 Z" fill="url(#${d}e)" opacity="0.4"/>
    <!-- tulle fold details -->
    <path d="M138 22 L90 210" stroke="${trim}" stroke-opacity="0.2" stroke-width="4" fill="none" stroke-linecap="round" filter="url(#${d}f1)"/>
    <path d="M162 26 L165 244" stroke="${trim}" stroke-opacity="0.18" stroke-width="4" fill="none" stroke-linecap="round" filter="url(#${d}f1)"/>
    <!-- Layer 4: rim light -->
    <path d="M14 218 Q150 254 286 218" stroke="${trim}" stroke-opacity="0.5" stroke-width="2" fill="none"/>
    <g fill="${trim}" opacity="0.88">
      ${Array.from({length:9},(_, i)=>`<circle cx="${(24+i*31.5).toFixed(1)}" cy="${214-(i%2?5:0)}" r="11"/>`).join('')}
    </g>
    <path d="M14 216 Q150 252 286 216" stroke="${trim}" stroke-opacity="0.4" stroke-width="1.5" fill="none"/>
    ${spark(112,148,5.5,0.55)} ${spark(200,130,4.5,0.48)}`);
  add('bottom', name, [300,240], svg, {cx:0.5,cy:0.625,aw:0.74,z:20});
}

/* ---------- 왕관 / 티아라 ---------- */
function crown(name, metal1, metal2, gc1, gc2, tall) {
  const d = _uid + 1;
  const h = tall ? 150 : 120;
  const pk = tall ? 30 : 55;
  const svg = S(240, h, `
    <defs>
      <linearGradient id="${d}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${metal1}"/><stop offset="0.5" stop-color="${metal1}"/><stop offset="1" stop-color="${metal2}"/></linearGradient>
      <linearGradient id="${d}b" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${metal1}" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.55"/><stop offset="1" stop-color="${metal1}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.5"/><stop offset="1" stop-color="${metal1}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${metal2}"/><stop offset="1" stop-color="${metal1}"/></linearGradient>
      <linearGradient id="${d}e" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${metal1}" stop-opacity="0.6"/><stop offset="1" stop-color="${metal2}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${metal2}" stop-opacity="0.4"/><stop offset="1" stop-color="${metal2}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}g" cx="0.5" cy="0.3" r="0.7"><stop offset="0" stop-color="#fff" stop-opacity="0.4"/><stop offset="1" stop-color="${metal1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}h" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${metal2}" stop-opacity="0.36"/><stop offset="0.5" stop-color="${metal2}" stop-opacity="0"/><stop offset="1" stop-color="${metal2}" stop-opacity="0.36"/></linearGradient>
      <linearGradient id="${d}i" x1="0.15" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.6"/><stop offset="1" stop-color="${metal1}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}j" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#fff"/><stop offset="0.45" stop-color="${gc1}"/><stop offset="1" stop-color="${gc2}"/></radialGradient>
      <radialGradient id="${d}k" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#fff"/><stop offset="0.45" stop-color="${gc1}"/><stop offset="1" stop-color="${gc2}"/></radialGradient>
      <radialGradient id="${d}l" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#fff"/><stop offset="0.45" stop-color="${gc1}"/><stop offset="1" stop-color="${gc2}"/></radialGradient>
      <radialGradient id="${d}m" cx="0.35" cy="0.28" r="0.75"><stop offset="0" stop-color="#fff" stop-opacity="0.7"/><stop offset="0.5" stop-color="${gc1}" stop-opacity="0.4"/><stop offset="1" stop-color="${gc2}" stop-opacity="0.1"/></radialGradient>
      <linearGradient id="${d}n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${metal1}" stop-opacity="0.9"/><stop offset="1" stop-color="${metal2}" stop-opacity="0.2"/></linearGradient>
      <radialGradient id="${d}o" cx="0.5" cy="0.5" r="0.6"><stop offset="0" stop-color="#fff" stop-opacity="0.22"/><stop offset="1" stop-color="${metal2}" stop-opacity="0"/></radialGradient>
      <filter id="${d}f1"><feGaussianBlur stdDeviation="0.5"/></filter>
      <filter id="${d}f2"><feGaussianBlur stdDeviation="1.5"/></filter>
      <filter id="${d}f3"><feGaussianBlur stdDeviation="3.5"/></filter>
    </defs>
    <!-- depth glow -->
    <path d="M30 ${h-24} L44 ${pk} L92 ${h-58} L120 ${pk-18} L148 ${h-58} L196 ${pk} L210 ${h-24} Z" fill="${metal2}" filter="url(#${d}f3)" opacity="0.38"/>
    <!-- Layer 1: crown base -->
    <path d="M30 ${h-24} L44 ${pk} L92 ${h-58} L120 ${pk-18} L148 ${h-58} L196 ${pk} L210 ${h-24} Z" fill="url(#${d}a)" stroke="${metal2}" stroke-width="1.8"/>
    <rect x="26" y="${h-30}" width="188" height="18" rx="9" fill="url(#${d}a)" stroke="${metal2}" stroke-width="1.8"/>
    <!-- Layer 2: deep shadows -->
    <path d="M30 ${h-24} L44 ${pk} L92 ${h-58} L120 ${pk-18} L148 ${h-58} L196 ${pk} L210 ${h-24} Z" fill="url(#${d}f)" opacity="0.5"/>
    <rect x="26" y="${h-30}" width="188" height="18" rx="9" fill="url(#${d}h)" opacity="0.5"/>
    <!-- inner filigree lines -->
    <path d="M44 ${pk} L72 ${h-30}" stroke="${metal2}" stroke-opacity="0.35" stroke-width="1.2" fill="none" filter="url(#${d}f1)"/>
    <path d="M196 ${pk} L168 ${h-30}" stroke="${metal2}" stroke-opacity="0.35" stroke-width="1.2" fill="none" filter="url(#${d}f1)"/>
    <path d="M120 ${pk-18} L120 ${h-30}" stroke="${metal2}" stroke-opacity="0.3" stroke-width="1.2" fill="none" filter="url(#${d}f1)"/>
    <!-- Layer 3: metallic highlights -->
    <path d="M30 ${h-24} L44 ${pk} L92 ${h-58} L120 ${pk-18} L148 ${h-58} L196 ${pk} L210 ${h-24} Z" fill="url(#${d}g)" opacity="0.6"/>
    <rect x="26" y="${h-30}" width="188" height="18" rx="9" fill="url(#${d}o)" opacity="0.7"/>
    <!-- Layer 4: rim light -->
    <path d="M44 ${pk} L120 ${pk-20} L196 ${pk}" stroke="#fff" stroke-opacity="0.55" stroke-width="2" fill="none" stroke-linecap="round" filter="url(#${d}f2)"/>
    <!-- gems (8-facet) -->
    ${gemCut(120, pk-6, 12, `${d}j`)}
    ${gemCut(44, pk+6, 8, `${d}k`)}
    ${gemCut(196, pk+6, 8, `${d}l`)}
    <!-- band gems -->
    <circle cx="70" cy="${h-21}" r="5" fill="${gc1}" stroke="${metal2}" stroke-width="1"/>
    <circle cx="120" cy="${h-21}" r="5" fill="${gc2}" stroke="${metal2}" stroke-width="1"/>
    <circle cx="170" cy="${h-21}" r="5" fill="${gc1}" stroke="${metal2}" stroke-width="1"/>
    ${spark(120,pk-22,6.5,0.7)} ${spark(44,pk-8,4,0.55)} ${spark(196,pk-8,4,0.55)}`);
  add('crown', name, [240,h], svg, {cx:0.5,cy:0.055,aw:0.42,z:46});
}

/* ---------- 귀걸이 (좌우 한 쌍) ---------- */
function earring(name, metal, gc1, gc2, shape) {
  const d = _uid + 1;
  const gemShape = (x, cy, r) => shape === 'round'
    ? gemCut(x, cy, r, `${d}j`)
    : `${gemCut(x, cy-10, r*0.7, `${d}j`)}
       <path d="M${x} ${cy-22} L${x+r} ${cy} L${x} ${cy+22} L${x-r} ${cy} Z" fill="url(#${d}j)" stroke="${metal}" stroke-width="1.2"/>
       ${Array.from({length:8},(_, i)=>{const a=i*Math.PI/4;return`<line x1="${x}" y1="${cy}" x2="${(x+r*Math.cos(a)).toFixed(1)}" y2="${(cy+r*Math.sin(a)).toFixed(1)}" stroke="rgba(255,255,255,0.38)" stroke-width="0.7"/>`;}).join('')}`;
  const svg = S(240, 150, `
    <defs>
      <linearGradient id="${d}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${metal}"/><stop offset="0.5" stop-color="${metal}"/><stop offset="1" stop-color="${metal}"/></linearGradient>
      <radialGradient id="${d}b" cx="0.35" cy="0.3" r="0.7"><stop offset="0" stop-color="#fff" stop-opacity="0.7"/><stop offset="1" stop-color="${metal}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.5"/><stop offset="1" stop-color="${metal}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}d" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${metal}" stop-opacity="0.3"/><stop offset="1" stop-color="${metal}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}e" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0.6"/><stop offset="1" stop-color="${metal}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${metal}"/><stop offset="1" stop-color="${metal}"/></linearGradient>
      <radialGradient id="${d}g" cx="0.4" cy="0.3" r="0.65"><stop offset="0" stop-color="#fff" stop-opacity="0.55"/><stop offset="1" stop-color="${metal}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}h" x1="0.15" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.6"/><stop offset="1" stop-color="${metal}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}i" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${metal}" stop-opacity="0.5"/><stop offset="1" stop-color="${metal}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}j" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#fff"/><stop offset="0.4" stop-color="${gc1}"/><stop offset="1" stop-color="${gc2}"/></radialGradient>
      <radialGradient id="${d}k" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#fff"/><stop offset="0.4" stop-color="${gc1}"/><stop offset="1" stop-color="${gc2}"/></radialGradient>
      <radialGradient id="${d}l" cx="0.5" cy="0.3" r="0.7"><stop offset="0" stop-color="#fff" stop-opacity="0.8"/><stop offset="1" stop-color="${gc1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${metal}" stop-opacity="0.8"/><stop offset="1" stop-color="${metal}" stop-opacity="0.1"/></linearGradient>
      <radialGradient id="${d}n" cx="0.4" cy="0.35" r="0.7"><stop offset="0" stop-color="#fff" stop-opacity="0.45"/><stop offset="1" stop-color="${metal}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}o" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.45"/><stop offset="1" stop-color="${metal}" stop-opacity="0"/></linearGradient>
      <filter id="${d}f1"><feGaussianBlur stdDeviation="0.5"/></filter>
      <filter id="${d}f2"><feGaussianBlur stdDeviation="1.5"/></filter>
      <filter id="${d}f3"><feGaussianBlur stdDeviation="3"/></filter>
    </defs>
    <!-- earring posts (left) -->
    <circle cx="40" cy="56" r="6" fill="url(#${d}a)" stroke="${metal}" stroke-width="1"/>
    <circle cx="37" cy="53" r="2.2" fill="#fff" opacity="0.75"/>
    <rect x="37" y="61" width="6" height="2" rx="1" fill="${metal}"/>
    <line x1="40" y1="63" x2="40" y2="74" stroke="${metal}" stroke-width="3.5" stroke-linecap="round"/>
    <!-- setting hook left -->
    <circle cx="40" cy="76" r="4" fill="${metal}" stroke="${metal}" stroke-width="1"/>
    <!-- gem left -->
    ${gemShape(40, 102, 16)}
    <!-- earring posts (right) -->
    <circle cx="200" cy="56" r="6" fill="url(#${d}a)" stroke="${metal}" stroke-width="1"/>
    <circle cx="197" cy="53" r="2.2" fill="#fff" opacity="0.75"/>
    <rect x="197" y="61" width="6" height="2" rx="1" fill="${metal}"/>
    <line x1="200" y1="63" x2="200" y2="74" stroke="${metal}" stroke-width="3.5" stroke-linecap="round"/>
    <!-- setting hook right -->
    <circle cx="200" cy="76" r="4" fill="${metal}" stroke="${metal}" stroke-width="1"/>
    <!-- gem right -->
    ${gemShape(200, 102, 16)}
    ${spark(40,98,4.5,0.72)} ${spark(200,98,4.5,0.72)}`);
  add('earring', name, [240,150], svg, {cx:0.5,cy:0.205,aw:0.62,z:44});
}

/* ---------- 목걸이 ---------- */
function necklace(name, metal, gc1, gc2, style) {
  const d = _uid + 1;
  const pendant = style === 'heart'
    ? `<path d="M120 76 C112 64 90 68 90 84 C90 100 120 120 120 120 C120 120 150 100 150 84 C150 68 128 64 120 76 Z" fill="url(#${d}j)" stroke="${metal}" stroke-width="1.5"/>
       <path d="M120 76 C116 70 110 70 108 76 C106 82 110 90 120 100" stroke="#fff" stroke-opacity="0.45" stroke-width="3" fill="none" stroke-linecap="round"/>`
    : `${gemCut(120, 96, 18, `${d}j`)}`;
  const svg = S(240, 130, `
    <defs>
      <linearGradient id="${d}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${metal}"/><stop offset="1" stop-color="${metal}"/></linearGradient>
      <linearGradient id="${d}b" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0.6"/><stop offset="1" stop-color="${metal}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}c" cx="0.4" cy="0.35" r="0.65"><stop offset="0" stop-color="#fff" stop-opacity="0.55"/><stop offset="1" stop-color="${metal}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.5"/><stop offset="1" stop-color="${metal}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}e" x1="0.15" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.6"/><stop offset="1" stop-color="${metal}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}f" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${metal}" stop-opacity="0.25"/><stop offset="1" stop-color="${metal}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${metal}" stop-opacity="0.5"/><stop offset="1" stop-color="${metal}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}h" cx="0.35" cy="0.3" r="0.75"><stop offset="0" stop-color="#fff" stop-opacity="0.7"/><stop offset="1" stop-color="${gc1}" stop-opacity="0.1"/></radialGradient>
      <linearGradient id="${d}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${metal}" stop-opacity="0.8"/><stop offset="1" stop-color="${metal}" stop-opacity="0.1"/></linearGradient>
      <radialGradient id="${d}j" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#fff"/><stop offset="0.4" stop-color="${gc1}"/><stop offset="1" stop-color="${gc2}"/></radialGradient>
      <radialGradient id="${d}k" cx="0.35" cy="0.3" r="0.78"><stop offset="0" stop-color="#fff"/><stop offset="0.4" stop-color="${gc1}"/><stop offset="1" stop-color="${gc2}"/></radialGradient>
      <linearGradient id="${d}l" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${metal}" stop-opacity="0.6"/><stop offset="0.5" stop-color="${metal}" stop-opacity="0"/><stop offset="1" stop-color="${metal}" stop-opacity="0.6"/></linearGradient>
      <radialGradient id="${d}m" cx="0.5" cy="0.3" r="0.68"><stop offset="0" stop-color="#fff" stop-opacity="0.5"/><stop offset="1" stop-color="${gc1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${gc1}" stop-opacity="0.6"/><stop offset="1" stop-color="${gc2}" stop-opacity="0.2"/></linearGradient>
      <radialGradient id="${d}o" cx="0.38" cy="0.28" r="0.7"><stop offset="0" stop-color="#fff" stop-opacity="0.65"/><stop offset="0.4" stop-color="${gc1}" stop-opacity="0.2"/><stop offset="1" stop-color="${gc2}" stop-opacity="0"/></radialGradient>
      <filter id="${d}f1"><feGaussianBlur stdDeviation="0.5"/></filter>
      <filter id="${d}f2"><feGaussianBlur stdDeviation="1.5"/></filter>
      <filter id="${d}f3"><feGaussianBlur stdDeviation="3"/></filter>
    </defs>
    <!-- chain depth glow -->
    <path d="M48 40 Q120 96 192 40" fill="none" stroke="${metal}" stroke-width="8" filter="url(#${d}f3)" opacity="0.38"/>
    <!-- main chain -->
    <path d="M48 40 Q120 96 192 40" fill="none" stroke="${metal}" stroke-width="5.5" stroke-linecap="round"/>
    <path d="M48 40 Q120 96 192 40" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.45" stroke-linecap="round"/>
    <!-- chain links (beads) -->
    ${Array.from({length:11},(_, i)=>{
      const t = i/10; const x = 48+144*t; const y = 40+56*Math.sin(Math.PI*t);
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="${metal}" stroke="#fff" stroke-opacity="0.3" stroke-width="0.8"/><circle cx="${(x-1.5).toFixed(1)}" cy="${(y-1.5).toFixed(1)}" r="1.8" fill="#fff" opacity="0.65"/>`;
    }).join('')}
    <!-- pendant setting -->
    <circle cx="120" cy="96" r="${style==='heart'?22:22}" fill="${metal}" stroke="${metal}" stroke-width="1.5" opacity="0.35"/>
    <!-- pendant gem -->
    ${pendant}
    ${spark(120,88,5.5,0.72)}`);
  add('necklace', name, [240,130], svg, {cx:0.5,cy:0.285,aw:0.34,z:42});
}

/* ---------- 구두 (한 쌍의 하이힐) ---------- */
function shoes(name, c1, c2, trim) {
  const d = _uid + 1;
  const shoe = (x) => `
    <!-- shoe body -->
    <path d="M${x} 28 C${x-26} 32 ${x-30} 58 ${x-30} 76 L${x-30} 90 C${x-30} 100 ${x-16} 102 ${x+4} 100 C${x+32} 96 ${x+42} 90 ${x+46} 84 C${x+48} 78 ${x+42} 72 ${x+26} 70 C${x+8} 68 ${x+2} 48 ${x} 28 Z" fill="url(#${d}a)" stroke="${trim}" stroke-width="1.5"/>
    <!-- sole -->
    <path d="M${x-30} 90 L${x-30} 98 L${x+4} 106 L${x+46} 90 L${x+46} 82" fill="url(#${d}b)" stroke="${trim}" stroke-width="1"/>
    <!-- heel post -->
    <path d="M${x+40} 86 L${x+42} 122 L${x+35} 122 L${x+32} 90 Z" fill="url(#${d}c)" stroke="${trim}" stroke-width="1.2"/>
    <!-- heel base -->
    <rect x="${x+32}" y="118" width="12" height="5" rx="2.5" fill="${trim}"/>
    <!-- Layer 2: shadow fold -->
    <path d="M${x} 28 C${x-26} 32 ${x-30} 58 ${x-30} 76 L${x-30} 90 C${x-30} 100 ${x-16} 102 ${x+4} 100 C${x+32} 96 ${x+42} 90 ${x+46} 84 C${x+48} 78 ${x+42} 72 ${x+26} 70 C${x+8} 68 ${x+2} 48 ${x} 28 Z" fill="url(#${d}f)" opacity="0.55"/>
    <!-- toe box shadow -->
    <ellipse cx="${x-18}" cy="80" rx="8" ry="14" fill="${c2}" opacity="0.22" filter="url(#${d}f1)"/>
    <!-- Layer 3: patent leather gloss highlights -->
    <!-- primary large gloss -->
    <ellipse cx="${x-8}" cy="42" rx="10" ry="16" fill="#fff" opacity="0.42" transform="rotate(-15,${x-8},42)"/>
    <!-- secondary gloss reflection -->
    <ellipse cx="${x-4}" cy="36" rx="4" ry="7" fill="#fff" opacity="0.62"/>
    <!-- toe cap gloss -->
    <ellipse cx="${x-22}" cy="72" rx="6" ry="10" fill="#fff" opacity="0.3" transform="rotate(-8,${x-22},72)"/>
    <!-- vamp gloss streak -->
    <path d="M${x+10} 60 C${x+18} 64 ${x+28} 70 ${x+32} 76" stroke="#fff" stroke-opacity="0.36" stroke-width="4" fill="none" stroke-linecap="round"/>
    <!-- Layer 4: rim light -->
    <path d="M${x} 30 C${x-20} 36 ${x-28} 54 ${x-28} 72" stroke="#fff" stroke-opacity="0.5" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M${x+4} 102 C${x+28} 98 ${x+42} 90 ${x+46} 84" stroke="#fff" stroke-opacity="0.38" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  const svg = S(260, 140, `
    <defs>
      <linearGradient id="${d}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="0.5" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <linearGradient id="${d}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c2}"/><stop offset="1" stop-color="${trim}"/></linearGradient>
      <linearGradient id="${d}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c2}"/><stop offset="1" stop-color="${trim}"/></linearGradient>
      <linearGradient id="${d}d" x1="0.15" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.6"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}e" cx="0.3" cy="0.25" r="0.65"><stop offset="0" stop-color="#fff" stop-opacity="0.7"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}f" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c2}" stop-opacity="0.36"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}h" cx="0.5" cy="0.85" r="0.58"><stop offset="0" stop-color="#000" stop-opacity="0.18"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}i" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c2}" stop-opacity="0.36"/><stop offset="0.5" stop-color="${c2}" stop-opacity="0"/><stop offset="1" stop-color="${c2}" stop-opacity="0.36"/></linearGradient>
      <radialGradient id="${d}j" cx="0.35" cy="0.28" r="0.65"><stop offset="0" stop-color="#fff" stop-opacity="0.65"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}k" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c2}" stop-opacity="0.42"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${trim}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <radialGradient id="${d}m" cx="0.35" cy="0.3" r="0.7"><stop offset="0" stop-color="#fff" stop-opacity="0.75"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <radialGradient id="${d}o" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${c1}" stop-opacity="0.2"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></radialGradient>
      <filter id="${d}f1"><feGaussianBlur stdDeviation="0.6"/></filter>
      <filter id="${d}f2"><feGaussianBlur stdDeviation="1.8"/></filter>
      <filter id="${d}f3"><feGaussianBlur stdDeviation="4"/></filter>
    </defs>
    <!-- depth shadows -->
    <path d="M26 76 L26 90 L60 106 L102 90 L102 82" fill="${c2}" filter="url(#${d}f3)" opacity="0.28"/>
    <path d="M138 76 L138 90 L172 106 L214 90 L214 82" fill="${c2}" filter="url(#${d}f3)" opacity="0.28"/>
    ${shoe(56)}
    ${shoe(168)}
    ${spark(46,40,4.5,0.72)} ${spark(158,40,4.5,0.72)}`);
  add('shoe', name, [260,140], svg, {cx:0.5,cy:0.93,aw:0.5,z:34});
}

/* ---------- 액세서리 ---------- */
function wings(name, c1, c2) {
  const d = _uid + 1;
  const svg = S(420, 320, `
    <defs>
      <linearGradient id="${d}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.9"/><stop offset="0.5" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <linearGradient id="${d}b" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.9"/><stop offset="0.5" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <radialGradient id="${d}c" cx="0.3" cy="0.3" r="0.7"><stop offset="0" stop-color="#fff" stop-opacity="0.5"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <radialGradient id="${d}d" cx="0.7" cy="0.3" r="0.7"><stop offset="0" stop-color="#fff" stop-opacity="0.5"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}e" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c2}" stop-opacity="0.25"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}f" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c1}" stop-opacity="0.3"/><stop offset="0.5" stop-color="${c1}" stop-opacity="0"/><stop offset="1" stop-color="${c1}" stop-opacity="0.3"/></linearGradient>
      <linearGradient id="${d}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.4"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}h" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff" stop-opacity="0.15"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}i" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="${c2}" stop-opacity="0.2"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}j" cx="0.25" cy="0.25" r="0.6"><stop offset="0" stop-color="#fff" stop-opacity="0.45"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <radialGradient id="${d}k" cx="0.75" cy="0.25" r="0.6"><stop offset="0" stop-color="#fff" stop-opacity="0.45"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}l" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="${c2}" stop-opacity="0.3"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.3"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}n" cx="0.5" cy="0.45" r="0.55"><stop offset="0" stop-color="${c1}" stop-opacity="0.15"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></radialGradient>
      <radialGradient id="${d}o" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff" stop-opacity="0.2"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></radialGradient>
      <filter id="${d}f1"><feGaussianBlur stdDeviation="0.8"/></filter>
      <filter id="${d}f2"><feGaussianBlur stdDeviation="2.5"/></filter>
      <filter id="${d}f3"><feGaussianBlur stdDeviation="5"/></filter>
    </defs>
    <!-- outer glow -->
    <path d="M210 160 C150 60 60 40 30 90 C10 130 40 180 90 190 C50 200 40 250 70 280 C110 310 180 250 210 200 Z" fill="${c2}" filter="url(#${d}f3)" opacity="0.28"/>
    <path d="M210 160 C270 60 360 40 390 90 C410 130 380 180 330 190 C370 200 380 250 350 280 C310 310 240 250 210 200 Z" fill="${c2}" filter="url(#${d}f3)" opacity="0.28"/>
    <!-- Layer 1: base wings -->
    <path d="M210 160 C150 60 60 40 30 90 C10 130 40 180 90 190 C50 200 40 250 70 280 C110 310 180 250 210 200 Z" fill="url(#${d}a)" stroke="${c2}" stroke-width="1.5" opacity="0.92"/>
    <path d="M210 160 C270 60 360 40 390 90 C410 130 380 180 330 190 C370 200 380 250 350 280 C310 310 240 250 210 200 Z" fill="url(#${d}b)" stroke="${c2}" stroke-width="1.5" opacity="0.92"/>
    <!-- Layer 2: deep wing fold shadows -->
    <path d="M210 160 C150 60 60 40 30 90 C10 130 40 180 90 190 C50 200 40 250 70 280 C110 310 180 250 210 200 Z" fill="url(#${d}e)" opacity="0.6"/>
    <path d="M210 160 C270 60 360 40 390 90 C410 130 380 180 330 190 C370 200 380 250 350 280 C310 310 240 250 210 200 Z" fill="url(#${d}i)" opacity="0.6"/>
    <!-- wing veins left -->
    <path d="M210 170 C165 110 100 90 55 95" stroke="${c2}" stroke-opacity="0.35" stroke-width="1.5" fill="none"/>
    <path d="M205 178 C155 148 105 165 65 195" stroke="${c2}" stroke-opacity="0.28" stroke-width="1.2" fill="none"/>
    <path d="M205 188 C165 210 120 235 80 262" stroke="${c2}" stroke-opacity="0.25" stroke-width="1.2" fill="none"/>
    <path d="M208 175 C175 130 145 115 110 115" stroke="${c2}" stroke-opacity="0.22" stroke-width="1" fill="none"/>
    <!-- wing veins right -->
    <path d="M210 170 C255 110 320 90 365 95" stroke="${c2}" stroke-opacity="0.35" stroke-width="1.5" fill="none"/>
    <path d="M215 178 C265 148 315 165 355 195" stroke="${c2}" stroke-opacity="0.28" stroke-width="1.2" fill="none"/>
    <path d="M215 188 C255 210 300 235 340 262" stroke="${c2}" stroke-opacity="0.25" stroke-width="1.2" fill="none"/>
    <path d="M212 175 C245 130 275 115 310 115" stroke="${c2}" stroke-opacity="0.22" stroke-width="1" fill="none"/>
    <!-- Layer 3: shimmer highlights -->
    <path d="M210 160 C150 60 60 40 30 90 C10 130 40 180 90 190 C50 200 40 250 70 280 C110 310 180 250 210 200 Z" fill="url(#${d}j)" opacity="0.7"/>
    <path d="M210 160 C270 60 360 40 390 90 C410 130 380 180 330 190 C370 200 380 250 350 280 C310 310 240 250 210 200 Z" fill="url(#${d}k)" opacity="0.7"/>
    <!-- Layer 4: rim light -->
    <path d="M30 90 C60 40 150 60 210 160" stroke="#fff" stroke-opacity="0.45" stroke-width="2.5" fill="none" stroke-linecap="round" filter="url(#${d}f2)"/>
    <path d="M390 90 C360 40 270 60 210 160" stroke="#fff" stroke-opacity="0.45" stroke-width="2.5" fill="none" stroke-linecap="round" filter="url(#${d}f2)"/>
    ${spark(88,118,6.5,0.7)} ${spark(332,118,6.5,0.7)} ${spark(118,228,5.5,0.62)} ${spark(302,228,5.5,0.62)}`);
  add('acc', name, [420,320], svg, {cx:0.5,cy:0.45,aw:1.25,z:6});
}

function wand(name, metal, gc1, gc2) {
  const d = _uid + 1;
  const svg = S(120, 320, `
    <defs>
      <linearGradient id="${d}a" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${metal}"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.5"/><stop offset="1" stop-color="${metal}"/></linearGradient>
      <radialGradient id="${d}b" cx="0.38" cy="0.32" r="0.72"><stop offset="0" stop-color="#fff"/><stop offset="0.42" stop-color="${gc1}"/><stop offset="1" stop-color="${gc2}"/></radialGradient>
      <radialGradient id="${d}c" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#fff"/><stop offset="0.45" stop-color="${gc1}"/><stop offset="1" stop-color="${gc2}"/></radialGradient>
      <linearGradient id="${d}d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${metal}"/><stop offset="0.5" stop-color="${metal}"/><stop offset="1" stop-color="#fff" stop-opacity="0.2"/></linearGradient>
      <linearGradient id="${d}e" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0.5"/><stop offset="1" stop-color="${metal}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}f" cx="0.35" cy="0.28" r="0.65"><stop offset="0" stop-color="#fff" stop-opacity="0.6"/><stop offset="1" stop-color="${gc1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${gc1}" stop-opacity="0.7"/><stop offset="1" stop-color="${gc2}" stop-opacity="0.2"/></linearGradient>
      <radialGradient id="${d}h" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${gc1}" stop-opacity="0.4"/><stop offset="1" stop-color="${gc1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}i" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${metal}" stop-opacity="0.6"/><stop offset="1" stop-color="${metal}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}j" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff" stop-opacity="0.3"/><stop offset="1" stop-color="${gc2}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.5"/><stop offset="1" stop-color="${metal}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}l" cx="0.4" cy="0.3" r="0.7"><stop offset="0" stop-color="#fff" stop-opacity="0.6"/><stop offset="1" stop-color="${gc1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}m" x1="0.15" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.5"/><stop offset="1" stop-color="${metal}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}n" cx="0.5" cy="0.5" r="0.55"><stop offset="0" stop-color="${gc1}" stop-opacity="0.3"/><stop offset="1" stop-color="${gc1}" stop-opacity="0"/></radialGradient>
      <radialGradient id="${d}o" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff" stop-opacity="0.25"/><stop offset="1" stop-color="${metal}" stop-opacity="0"/></radialGradient>
      <filter id="${d}f1"><feGaussianBlur stdDeviation="0.6"/></filter>
      <filter id="${d}f2"><feGaussianBlur stdDeviation="2"/></filter>
      <filter id="${d}f3"><feGaussianBlur stdDeviation="5"/></filter>
    </defs>
    <!-- wand glow -->
    <rect x="54" y="90" width="12" height="210" rx="6" fill="${gc1}" filter="url(#${d}f3)" opacity="0.3"/>
    <!-- Layer 1: wand stick -->
    <rect x="55" y="90" width="10" height="210" rx="5" fill="url(#${d}d)"/>
    <!-- stick highlight -->
    <rect x="56" y="92" width="3.5" height="206" rx="1.75" fill="#fff" opacity="0.35"/>
    <!-- Layer 2: stick shadow -->
    <rect x="61" y="92" width="3" height="206" rx="1.5" fill="${metal}" opacity="0.22"/>
    <!-- ornament ring at top -->
    <ellipse cx="60" cy="92" rx="8" ry="5" fill="${metal}" stroke="${metal}" stroke-width="1"/>
    <ellipse cx="60" cy="92" rx="8" ry="5" fill="url(#${d}k)" opacity="0.7"/>
    <!-- star glow -->
    <path d="M60 14 L74 50 112 56 84 82 92 120 60 100 28 120 36 82 8 56 46 50 Z" fill="${gc1}" filter="url(#${d}f3)" opacity="0.4"/>
    <!-- Layer 1 star: base -->
    <path d="M60 14 L74 50 112 56 84 82 92 120 60 100 28 120 36 82 8 56 46 50 Z" fill="url(#${d}c)" stroke="${metal}" stroke-width="1.5"/>
    <!-- Layer 2 star: deep facet shadows -->
    <path d="M60 100 L28 120 L36 82 L60 67 Z" fill="${gc2}" opacity="0.25"/>
    <path d="M60 100 L92 120 L84 82 L60 67 Z" fill="${gc2}" opacity="0.25"/>
    <path d="M8 56 L46 50 L60 14 L60 67 Z" fill="${gc2}" opacity="0.18"/>
    <path d="M112 56 L74 50 L60 14 L60 67 Z" fill="${gc2}" opacity="0.18"/>
    <!-- 8 facet lines -->
    ${Array.from({length:8},(_, i)=>{const pts=[[60,14],[74,50],[112,56],[84,82],[92,120],[28,120],[36,82],[8,56]];return`<line x1="60" y1="67" x2="${pts[i][0]}" y2="${pts[i][1]}" stroke="rgba(255,255,255,0.38)" stroke-width="0.8"/>`;}).join('')}
    <!-- Layer 3: gem highlights -->
    <path d="M60 14 L74 50 112 56 84 82 92 120 60 100 28 120 36 82 8 56 46 50 Z" fill="url(#${d}l)" opacity="0.7"/>
    <!-- top-left facet shine -->
    <path d="M60 14 L46 50 L8 56" fill="#fff" opacity="0.2"/>
    <!-- Layer 4: rim light -->
    <path d="M46 50 L60 14 L74 50" stroke="#fff" stroke-opacity="0.6" stroke-width="2" fill="none" stroke-linecap="round" filter="url(#${d}f2)"/>
    <!-- sparkle trail -->
    ${spark(60,62,7.5,0.82)} ${spark(98,108,4.5,0.62)} ${spark(22,106,4.5,0.62)} ${spark(85,34,3.5,0.5)}`);
  add('acc', name, [120,320], svg, {cx:0.74,cy:0.5,aw:0.34,z:48});
}

function choker(name, c, gc1, gc2) {
  const d = _uid + 1;
  const svg = S(200, 80, `
    <defs>
      <linearGradient id="${d}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c}"/><stop offset="0.5" stop-color="${c}"/><stop offset="1" stop-color="${c}"/></linearGradient>
      <linearGradient id="${d}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.5"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity="0.4"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}d" cx="0.35" cy="0.28" r="0.65"><stop offset="0" stop-color="#fff" stop-opacity="0.55"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>
      <radialGradient id="${d}e" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${c}" stop-opacity="0.25"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}f" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c}" stop-opacity="0.35"/><stop offset="0.5" stop-color="${c}" stop-opacity="0"/><stop offset="1" stop-color="${c}" stop-opacity="0.35"/></linearGradient>
      <radialGradient id="${d}g" cx="0.3" cy="0.25" r="0.7"><stop offset="0" stop-color="#fff" stop-opacity="0.4"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}h" x1="0.15" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.55"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c}"/><stop offset="1" stop-color="${c}"/></linearGradient>
      <radialGradient id="${d}j" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#fff"/><stop offset="0.4" stop-color="${gc1}"/><stop offset="1" stop-color="${gc2}"/></radialGradient>
      <radialGradient id="${d}k" cx="0.4" cy="0.3" r="0.7"><stop offset="0" stop-color="#fff" stop-opacity="0.75"/><stop offset="1" stop-color="${gc1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}l" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0.5"/><stop offset="0.5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="0.5"/></linearGradient>
      <radialGradient id="${d}m" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${gc1}" stop-opacity="0.25"/><stop offset="1" stop-color="${gc1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${gc1}" stop-opacity="0.55"/><stop offset="1" stop-color="${gc2}" stop-opacity="0.2"/></linearGradient>
      <radialGradient id="${d}o" cx="0.38" cy="0.28" r="0.7"><stop offset="0" stop-color="#fff" stop-opacity="0.65"/><stop offset="1" stop-color="${gc1}" stop-opacity="0"/></radialGradient>
      <filter id="${d}f1"><feGaussianBlur stdDeviation="0.5"/></filter>
      <filter id="${d}f2"><feGaussianBlur stdDeviation="1.8"/></filter>
      <filter id="${d}f3"><feGaussianBlur stdDeviation="4"/></filter>
    </defs>
    <!-- glow -->
    <path d="M28 32 Q100 66 172 32" fill="none" stroke="${c}" stroke-width="14" stroke-linecap="round" filter="url(#${d}f3)" opacity="0.3"/>
    <!-- Layer 1: choker band base -->
    <path d="M28 32 Q100 66 172 32" fill="none" stroke="${c}" stroke-width="11" stroke-linecap="round"/>
    <!-- Layer 2: band fold shadow -->
    <path d="M28 32 Q100 66 172 32" fill="none" stroke="${c}" stroke-width="6" stroke-linecap="round" stroke-opacity="0.4" filter="url(#${d}f1)"/>
    <!-- Layer 3: band highlight -->
    <path d="M30 30 Q100 62 170 30" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-opacity="0.38"/>
    <!-- Layer 4: rim light -->
    <path d="M32 28 Q100 60 168 28" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.55" filter="url(#${d}f2)"/>
    <!-- center gem setting -->
    <circle cx="100" cy="50" r="16" fill="${c}" stroke="${c}" stroke-width="2" opacity="0.8"/>
    <circle cx="100" cy="50" r="14" fill="none" stroke="${c}" stroke-width="2.5"/>
    <!-- gem 8-facet -->
    ${gemCut(100, 50, 13, `${d}j`)}
    ${spark(100,46,4.5,0.72)}`);
  add('necklace', name, [200,80], svg, {cx:0.5,cy:0.255,aw:0.3,z:43});
}

function gloves(name, c1, c2, trim) {
  const d = _uid + 1;
  const glove = (x, flip) => {
    const f = flip ? -1 : 1;
    const cx = flip ? 300 - x : x;
    return `
    <!-- glove ${flip?'right':'left'} shadow -->
    <path d="M${cx} 18 C${cx-f*20} 82 ${cx-f*28} 152 ${cx-f*18} 210 C${cx-f*16} 228 ${cx-f*2} 228 ${cx} 212 C${cx+f*4} 154 ${cx+f*16} 84 ${cx+f*28} 34 Z" fill="${c2}" filter="url(#${d}f3)" opacity="0.25"/>
    <!-- Layer 1: base -->
    <path d="M${cx} 18 C${cx-f*20} 82 ${cx-f*28} 152 ${cx-f*18} 210 C${cx-f*16} 228 ${cx-f*2} 228 ${cx} 212 C${cx+f*4} 154 ${cx+f*16} 84 ${cx+f*28} 34 Z" fill="url(#${d}a)" stroke="${trim}" stroke-width="1.8"/>
    <!-- hand/palm ellipse -->
    <ellipse cx="${cx-f*10}" cy="216" rx="14" ry="17" fill="url(#${d}a)" stroke="${trim}" stroke-width="1.5"/>
    <!-- Layer 2: deep fold shadows -->
    <path d="M${cx} 18 C${cx-f*20} 82 ${cx-f*28} 152 ${cx-f*18} 210 C${cx-f*16} 228 ${cx-f*2} 228 ${cx} 212 C${cx+f*4} 154 ${cx+f*16} 84 ${cx+f*28} 34 Z" fill="url(#${d}e)" opacity="0.55"/>
    <path d="M${cx-f*4} 22 C${cx-f*10} 88 ${cx-f*14} 158 ${cx-f*14} 210" stroke="${c2}" stroke-opacity="0.22" stroke-width="12" fill="none" filter="url(#${d}f2)"/>
    <!-- Layer 3: satin highlights -->
    <path d="M${cx} 18 C${cx-f*20} 82 ${cx-f*28} 152 ${cx-f*18} 210 C${cx-f*16} 228 ${cx-f*2} 228 ${cx} 212 C${cx+f*4} 154 ${cx+f*16} 84 ${cx+f*28} 34 Z" fill="url(#${d}c)" opacity="0.6"/>
    <!-- main satin highlight streak -->
    <path d="M${cx+f*20} 28 C${cx+f*18} 96 ${cx+f*16} 168 ${cx+f*14} 208" stroke="#fff" stroke-opacity="0.4" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M${cx+f*22} 30 C${cx+f*20} 96 ${cx+f*18} 166 ${cx+f*16} 206" stroke="#fff" stroke-opacity="0.25" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- wrist ruffle -->
    <path d="M${cx-f*18} 188 Q${cx} 200 ${cx+f*28} 185" stroke="${trim}" stroke-opacity="0.65" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M${cx-f*18} 196 Q${cx} 208 ${cx+f*28} 193" stroke="${trim}" stroke-opacity="0.5" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Layer 4: rim light -->
    <path d="M${cx+f*28} 34 C${cx+f*24} 96 ${cx+f*20} 168 ${cx+f*18} 210" stroke="#fff" stroke-opacity="0.48" stroke-width="2.5" fill="none" stroke-linecap="round" filter="url(#${d}f1)"/>`;
  };
  const svg = S(300, 260, `
    <defs>
      <linearGradient id="${d}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="0.45" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <radialGradient id="${d}b" cx="0.35" cy="0.22" r="0.68"><stop offset="0" stop-color="#fff" stop-opacity="0.6"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}c" x1="0.75" y1="0" x2="0.25" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.38"/><stop offset="0.6" stop-color="#fff" stop-opacity="0.12"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}d" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c2}" stop-opacity="0.36"/><stop offset="0.5" stop-color="${c2}" stop-opacity="0"/><stop offset="1" stop-color="${c2}" stop-opacity="0.36"/></linearGradient>
      <linearGradient id="${d}e" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c2}" stop-opacity="0.38"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}g" cx="0.5" cy="0.88" r="0.56"><stop offset="0" stop-color="#000" stop-opacity="0.15"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c2}" stop-opacity="0.4"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}i" cx="0.35" cy="0.3" r="0.7"><stop offset="0" stop-color="#fff" stop-opacity="0.5"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}j" x1="0.15" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="${trim}" stop-opacity="0.85"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${trim}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <radialGradient id="${d}l" cx="0.3" cy="0.25" r="0.7"><stop offset="0" stop-color="#fff" stop-opacity="0.55"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${d}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.45"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></linearGradient>
      <linearGradient id="${d}n" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="${c2}" stop-opacity="0.3"/><stop offset="0.5" stop-color="${c2}" stop-opacity="0.1"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${d}o" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${c1}" stop-opacity="0.2"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></radialGradient>
      <filter id="${d}f1"><feGaussianBlur stdDeviation="0.6"/></filter>
      <filter id="${d}f2"><feGaussianBlur stdDeviation="2"/></filter>
      <filter id="${d}f3"><feGaussianBlur stdDeviation="4.5"/></filter>
    </defs>
    ${glove(64, false)}
    ${glove(236, true)}`);
  add('acc', name, [300,260], svg, {cx:0.5,cy:0.5,aw:0.86,z:32});
}

/* =========================================================
 *  아이템 등록
 * ========================================================= */
// 헤어
hairLong('긴 생머리 (브라운)', '#9c6b3f', '#6e4423', '#c08e5c');
hairLong('긴 생머리 (블랙)',  '#43404c', '#26242e', '#6a6676');
hairLong('긴 생머리 (블론드)','#f4d27a', '#d6a83f', '#fbe9a8');
hairTwin('트윈테일 (핑크)',  '#ff9ec6', '#e76aa0', '#ffc4dd');
hairTwin('트윈테일 (실버)',  '#d7dcea', '#aab0c6', '#f0f2f8');
hairBun ('번 헤어 (브라운)', '#9c6b3f', '#6e4423', '#c08e5c');
hairBun ('번 헤어 (레드)',   '#e06a4a', '#b13f28', '#f29a7e');

// 드레스
gown('로즈 볼가운',     '#ffb3d1', '#e85f9c', '#fff0f6', '#ff5e9e', '#c01e6e');
gown('스카이 볼가운',   '#aad9ff', '#5aa6e8', '#eaf6ff', '#5ec8ff', '#1f73c0');
gown('라벤더 볼가운',   '#d4b8ff', '#9b6fe0', '#f3ecff', '#b98cff', '#6a3fb0');
gown('민트 볼가운',     '#aef0d2', '#5fc99a', '#ecfff6', '#65e6b0', '#1f9e6e');
gown('루비 볼가운',     '#ff96a3', '#d63b54', '#ffeef0', '#ff5e74', '#a01228');
gown('골드 볼가운',     '#ffe6a3', '#e0b54a', '#fff8e6', '#ffd35e', '#b0801f');
gown('스노우 볼가운',   '#ffffff', '#dfe6ff', '#ffffff', '#bcd0ff', '#7f93cf');
gown('미드나잇 볼가운', '#6a6a86', '#33334a', '#aab', '#9a9ad0', '#3a3a60');
gown('피치 볼가운',     '#ffd0b0', '#f59a6a', '#fff2e8', '#ffb07e', '#c0623a');

// 상의
topPiece('코르셋 (핑크)',   '#ffb3d1', '#e85f9c', '#fff0f6');
topPiece('코르셋 (블루)',   '#aad9ff', '#5aa6e8', '#eaf6ff');
topPiece('코르셋 (라벤더)', '#d4b8ff', '#9b6fe0', '#f3ecff');
topPiece('블라우스 (화이트)','#ffffff', '#e8ecff', '#cdd6ff');
topPiece('코르셋 (레드)',   '#ff96a3', '#d63b54', '#ffeef0');

// 하의
skirtPiece('튤 스커트 (핑크)',   '#ffb3d1', '#e85f9c', '#fff0f6');
skirtPiece('튤 스커트 (블루)',   '#aad9ff', '#5aa6e8', '#eaf6ff');
skirtPiece('튤 스커트 (라벤더)', '#d4b8ff', '#9b6fe0', '#f3ecff');
skirtPiece('튤 스커트 (민트)',   '#aef0d2', '#5fc99a', '#ecfff6');
skirtPiece('튤 스커트 (골드)',   '#ffe6a3', '#e0b54a', '#fff8e6');

// 왕관
crown('하트 티아라', '#ffe9a0', '#d8ab3a', '#ff6f9c', '#c01e6e', false);
crown('사파이어 티아라', '#e8edf7', '#a9b2cc', '#6cc6ff', '#1f73c0', false);
crown('로즈 티아라', '#ffe9a0', '#d8ab3a', '#ff8fb8', '#c01e6e', false);
crown('프린세스 크라운', '#ffe9a0', '#d8ab3a', '#b98cff', '#6a3fb0', true);
crown('에메랄드 크라운', '#fff0c0', '#d8ab3a', '#5fe0a8', '#1f9e6e', true);

// 귀걸이
earring('진주 드롭', '#e8c96a', '#fff7e0', '#dcd2b0', 'round');
earring('핑크 다이아', '#e8c96a', '#ff8fb8', '#c01e6e', 'diamond');
earring('블루 다이아', '#cfd6e8', '#7cc6ff', '#1f73c0', 'diamond');
earring('퍼플 드롭', '#e8c96a', '#b98cff', '#6a3fb0', 'round');
earring('루비 다이아', '#e8c96a', '#ff7080', '#a01228', 'diamond');

// 목걸이
necklace('하트 펜던트', '#e8c96a', '#ff6f9c', '#c01e6e', 'heart');
necklace('사파이어 목걸이', '#cfd6e8', '#6cc6ff', '#1f73c0', 'round');
necklace('에메랄드 목걸이', '#e8c96a', '#5fe0a8', '#1f9e6e', 'round');
choker('핑크 초커', '#ff8fb8', '#ff6f9c', '#c01e6e');
choker('블랙 초커', '#3a3a4a', '#b98cff', '#6a3fb0');

// 구두
shoes('글래스 힐 (핑크)', '#ffd0e4', '#ff7fb0', '#e85f9c');
shoes('글래스 힐 (블루)', '#cfeaff', '#7cc6ff', '#1f73c0');
shoes('글래스 힐 (골드)', '#ffe9a8', '#ffd35e', '#b0801f');
shoes('글래스 힐 (레드)', '#ffb0bb', '#ff6072', '#a01228');
shoes('글래스 힐 (화이트)', '#ffffff', '#e6ecff', '#9fb0e0');
shoes('글래스 힐 (라벤더)', '#e6d4ff', '#b98cff', '#6a3fb0');

// 액세서리
wings('요정 날개 (핑크)', '#ffd6ea', '#ff9ec6');
wings('요정 날개 (블루)', '#d6ecff', '#9ec9ff');
wand('마법봉 (하트)', '#e8c96a', '#ff6f9c', '#c01e6e');
wand('마법봉 (스타)', '#cfd6e8', '#ffe07a', '#e0b54a');
gloves('롱 글러브 (화이트)', '#ffffff', '#eef1ff', '#cdd6ff');
gloves('롱 글러브 (핑크)', '#ffd6ea', '#ff9ec6', '#e85f9c');

/* =========================================================
 *  DATA 내보내기 (game.js가 사용)
 * ========================================================= */
const CAT_META = [
  ['hair','헤어','💇'], ['dress','드레스','👗'], ['top','상의','👚'],
  ['bottom','하의','🩱'], ['crown','왕관','👑'], ['earring','귀걸이','💎'],
  ['necklace','목걸이','📿'], ['shoe','구두','👠'], ['acc','액세서리','✨'],
];
const DATA = {
  isSVG: true,
  bodies: [
    { id: 'char1', name: '캐릭터 1', file: 'char1.png' },
    { id: 'char2', name: '캐릭터 2', file: 'char2.png' },
    { id: 'char3', name: '캐릭터 3', file: 'char3.png' },
    { id: 'char4', name: '캐릭터 4', file: 'char4.png' },
  ],
  categories: CAT_META.map(([id,name,icon]) => ({ id, name, icon, items: ITEMS[id] })),
};
