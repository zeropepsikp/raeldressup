/* =========================================================
 *  공주님 옷갈아입히기 - 에셋 (전부 직접 그린 인라인 SVG)
 *  - 좌표계 전부 viewBox 0 0 400 760 (바디) 기준으로 통일
 *  - 아이템은 각자 tight viewBox + 앵커(cx,cy,aw)로 배치/스냅
 * ========================================================= */

/* ---------- 공통 헬퍼 ---------- */
const S = (w, h, inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${inner}</svg>`;

// 반짝이 별
const spark = (x, y, r, o = 0.9) =>
  `<g opacity="${o}"><path d="M${x} ${y - r}L${x + r * 0.28} ${y - r * 0.28} ${x + r} ${y} ${x + r * 0.28} ${y + r * 0.28} ${x} ${y + r} ${x - r * 0.28} ${y + r * 0.28} ${x - r} ${y} ${x - r * 0.28} ${y - r * 0.28}Z" fill="#fff"/></g>`;

// 보석
const gem = (id, x, y, r, c1, c2) =>
  `<defs><radialGradient id="${id}" cx="0.35" cy="0.3" r="0.8">
     <stop offset="0" stop-color="#fff"/><stop offset="0.4" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
   </radialGradient></defs>
   <circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id})" stroke="#fff" stroke-opacity="0.6"/>
   <circle cx="${x - r*0.3}" cy="${y - r*0.3}" r="${r*0.22}" fill="#fff" opacity="0.8"/>`;

/* =========================================================
 *  베이스 공주 캐릭터 (viewBox 400 x 760)
 * ========================================================= */
const PRINCESS_BODY = S(400, 760, `
  <defs>
    <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffe9da"/><stop offset="1" stop-color="#ffd3b8"/>
    </linearGradient>
    <radialGradient id="blush" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#ff9baa" stop-opacity="0.8"/><stop offset="1" stop-color="#ff9baa" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="iris" cx="0.5" cy="0.35" r="0.7">
      <stop offset="0" stop-color="#b98cff"/><stop offset="0.55" stop-color="#7b56d6"/><stop offset="1" stop-color="#4f2f9e"/>
    </radialGradient>
    <linearGradient id="slip" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff6fb"/><stop offset="1" stop-color="#ffe3ef"/>
    </linearGradient>
  </defs>

  <!-- 다리 -->
  <path d="M186 430 C182 520 184 610 188 686 C189 706 173 708 170 688 C163 612 165 520 176 432 Z" fill="url(#skin)"/>
  <path d="M214 430 C218 520 216 610 212 686 C211 706 227 708 230 688 C237 612 235 520 224 432 Z" fill="url(#skin)"/>
  <!-- 발 -->
  <path d="M170 686 C162 700 162 716 176 718 C190 719 192 705 188 690 Z" fill="url(#skin)"/>
  <path d="M230 686 C238 700 238 716 224 718 C210 719 208 705 212 690 Z" fill="url(#skin)"/>

  <!-- 팔 -->
  <path d="M150 250 C132 300 124 360 130 410 C131 424 146 424 148 410 C152 360 164 300 174 262 Z" fill="url(#skin)"/>
  <path d="M250 250 C268 300 276 360 270 410 C269 424 254 424 252 410 C248 360 236 300 226 262 Z" fill="url(#skin)"/>
  <!-- 손 -->
  <ellipse cx="139" cy="416" rx="13" ry="16" fill="url(#skin)"/>
  <ellipse cx="261" cy="416" rx="13" ry="16" fill="url(#skin)"/>

  <!-- 몸통(슬립) -->
  <path d="M158 244 C148 252 146 300 150 342 C152 374 150 396 170 424 L230 424
           C250 396 248 374 250 342 C254 300 252 252 242 244
           C220 264 180 264 158 244 Z" fill="url(#slip)" stroke="#ffd0e2" stroke-width="2"/>
  <path d="M168 248 C185 262 215 262 232 248 L228 300 C200 312 200 312 172 300 Z" fill="#ffd9e8" opacity="0.7"/>

  <!-- 목 -->
  <path d="M184 198 L216 198 L214 232 C200 240 200 240 186 232 Z" fill="url(#skin)"/>
  <path d="M184 210 C200 224 200 224 216 210 L215 224 C200 234 200 234 185 224 Z" fill="#f0b89a" opacity="0.5"/>

  <!-- 머리 -->
  <ellipse cx="200" cy="130" rx="84" ry="92" fill="url(#skin)"/>
  <ellipse cx="120" cy="142" rx="11" ry="15" fill="url(#skin)"/>
  <ellipse cx="280" cy="142" rx="11" ry="15" fill="url(#skin)"/>

  <!-- 볼터치 -->
  <ellipse cx="150" cy="158" rx="20" ry="13" fill="url(#blush)"/>
  <ellipse cx="250" cy="158" rx="20" ry="13" fill="url(#blush)"/>

  <!-- 눈썹 -->
  <path d="M152 105 Q168 99 183 104" stroke="#c89a6a" stroke-width="3.2" fill="none" stroke-linecap="round"/>
  <path d="M217 104 Q232 99 248 105" stroke="#c89a6a" stroke-width="3.2" fill="none" stroke-linecap="round"/>

  <!-- 눈 -->
  <g>
    <ellipse cx="166" cy="140" rx="20" ry="25" fill="#fff"/>
    <ellipse cx="166" cy="142" rx="16" ry="21" fill="url(#iris)"/>
    <circle cx="166" cy="144" r="8" fill="#2b1b4a"/>
    <circle cx="160" cy="135" r="5" fill="#fff"/>
    <circle cx="171" cy="150" r="3" fill="#fff" opacity="0.8"/>
    <path d="M144 130 Q166 112 188 132" stroke="#3a2a24" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M146 156 Q166 166 186 156" stroke="#cca" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.5"/>
  </g>
  <g>
    <ellipse cx="234" cy="140" rx="20" ry="25" fill="#fff"/>
    <ellipse cx="234" cy="142" rx="16" ry="21" fill="url(#iris)"/>
    <circle cx="234" cy="144" r="8" fill="#2b1b4a"/>
    <circle cx="228" cy="135" r="5" fill="#fff"/>
    <circle cx="239" cy="150" r="3" fill="#fff" opacity="0.8"/>
    <path d="M212 132 Q234 112 256 130" stroke="#3a2a24" stroke-width="5" fill="none" stroke-linecap="round"/>
  </g>

  <!-- 코 -->
  <path d="M200 152 q4 7 -2 10" stroke="#e8a884" stroke-width="2.5" fill="none" stroke-linecap="round"/>

  <!-- 입 -->
  <path d="M186 176 Q200 190 214 176 Q200 184 186 176 Z" fill="#e76a7e"/>
  <path d="M188 177 Q200 186 212 177" stroke="#c84d63" stroke-width="2" fill="none" stroke-linecap="round"/>
`);

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
  const grad = `<defs><linearGradient id="hg${_uid}" x1="0" y1="0" x2="0.3" y2="1">
    <stop offset="0" stop-color="${hi}"/><stop offset="0.4" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`;
  const svg = S(320, 360, grad + `
    <path d="M160 14 C84 14 52 78 52 150 C52 210 60 270 70 320 L96 300
             C84 250 86 150 100 120 C120 150 200 150 220 120 C234 150 236 250 224 300 L250 320
             C260 270 268 210 268 150 C268 78 236 14 160 14 Z" fill="url(#hg${_uid})"/>
    <path d="M160 20 C112 20 84 52 78 96 C104 70 130 64 160 64 C190 64 216 70 242 96 C236 52 208 20 160 20 Z" fill="${hi}" opacity="0.6"/>
    <path d="M70 320 C66 332 64 344 78 348 C92 350 96 336 92 322 Z" fill="url(#hg${_uid})"/>
    <path d="M250 320 C254 332 256 344 242 348 C228 350 224 336 228 322 Z" fill="url(#hg${_uid})"/>
    ${spark(110,70,5,0.5)} ${spark(220,80,4,0.4)}`);
  add('hair', name, [320,360], svg, { cx:0.5, cy:0.205, aw:0.66, z:12 });
}
function hairTwin(name, c1, c2, hi) {
  const grad = `<defs><linearGradient id="hg${_uid}" x1="0" y1="0" x2="0.3" y2="1">
    <stop offset="0" stop-color="${hi}"/><stop offset="0.5" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`;
  const svg = S(360, 380, grad + `
    <path d="M180 16 C108 16 76 76 76 144 C76 180 82 214 90 240 L112 230
             C102 200 104 150 118 124 C140 152 220 152 242 124 C256 150 258 200 248 230 L270 240
             C278 214 284 180 284 144 C284 76 252 16 180 16 Z" fill="url(#hg${_uid})"/>
    <ellipse cx="70" cy="250" rx="36" ry="62" fill="url(#hg${_uid})"/>
    <ellipse cx="290" cy="250" rx="36" ry="62" fill="url(#hg${_uid})"/>
    <circle cx="70" cy="196" r="15" fill="#ff5d9e"/><circle cx="290" cy="196" r="15" fill="#ff5d9e"/>
    <circle cx="65" cy="191" r="5" fill="#fff" opacity="0.8"/><circle cx="285" cy="191" r="5" fill="#fff" opacity="0.8"/>
    <path d="M180 22 C132 22 104 54 98 98 C124 72 150 66 180 66 C210 66 236 72 262 98 C256 54 228 22 180 22 Z" fill="${hi}" opacity="0.55"/>`);
  add('hair', name, [360,380], svg, { cx:0.5, cy:0.22, aw:0.78, z:12 });
}
function hairBun(name, c1, c2, hi) {
  const grad = `<defs><linearGradient id="hg${_uid}" x1="0" y1="0" x2="0.3" y2="1">
    <stop offset="0" stop-color="${hi}"/><stop offset="0.5" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`;
  const svg = S(320, 300, grad + `
    <circle cx="160" cy="40" r="34" fill="url(#hg${_uid})"/>
    <path d="M160 26 C92 26 64 84 64 150 C64 186 70 214 80 236 L104 224
             C94 196 96 150 110 126 C132 152 188 152 210 126 C224 150 226 196 216 224 L240 236
             C250 214 256 186 256 150 C256 84 228 26 160 26 Z" fill="url(#hg${_uid})"/>
    <path d="M160 32 C118 32 92 60 86 100 C112 76 136 70 160 70 C184 70 208 76 234 100 C228 60 202 32 160 32 Z" fill="${hi}" opacity="0.55"/>
    ${spark(130,60,5)} ${spark(196,70,4,0.6)}`);
  add('hair', name, [320,300], svg, { cx:0.5, cy:0.18, aw:0.66, z:12 });
}

/* ---------- 드레스 (볼가운) ---------- */
function gown(name, c1, c2, trim, gemc1, gemc2) {
  const id = _uid + 1;
  const svg = S(340, 380, `
    <defs>
      <linearGradient id="bd${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <linearGradient id="sk${id}" x1="0.2" y1="0" x2="0.8" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="0.5" stop-color="${c2}"/><stop offset="1" stop-color="${c1}"/></linearGradient>
    </defs>
    <!-- 어깨 퍼프 -->
    <ellipse cx="116" cy="60" rx="30" ry="26" fill="url(#bd${id})"/>
    <ellipse cx="224" cy="60" rx="30" ry="26" fill="url(#bd${id})"/>
    <!-- 보디스 -->
    <path d="M112 44 Q170 74 228 44 L222 150 Q170 172 118 150 Z" fill="url(#bd${id})" stroke="${trim}" stroke-width="2"/>
    <path d="M112 44 Q170 74 228 44 L226 60 Q170 88 114 60 Z" fill="#fff" opacity="0.25"/>
    <!-- 스커트 -->
    <path d="M118 150 Q170 168 222 150 L324 348 Q170 388 16 348 Z" fill="url(#sk${id})" stroke="${trim}" stroke-width="2"/>
    <!-- 세로 음영 -->
    <path d="M150 156 L120 346" stroke="#000" stroke-opacity="0.06" stroke-width="14"/>
    <path d="M210 156 L300 330" stroke="#fff" stroke-opacity="0.18" stroke-width="10"/>
    <path d="M170 168 L170 380" stroke="#fff" stroke-opacity="0.12" stroke-width="8"/>
    <!-- 레이스 단 -->
    <g fill="${trim}">
      ${Array.from({length:11},(_,i)=>{const x=26+i*27.6;return `<circle cx="${x}" cy="${346-(i%2?6:0)}" r="13"/>`;}).join('')}
    </g>
    <!-- 허리 새시 + 보석 -->
    <path d="M120 148 Q170 166 220 148 L218 162 Q170 180 122 162 Z" fill="${trim}"/>
    ${gem('gm'+id,170,156,11,gemc1,gemc2)}
    ${spark(90,250,6)} ${spark(260,210,5,0.7)} ${spark(170,300,5,0.6)} ${spark(300,300,4,0.5)}`);
  add('dress', name, [340,380], svg, { cx:0.5, cy:0.565, aw:1.06, z:24 });
}

/* ---------- 상의 ---------- */
function topPiece(name, c1, c2, trim) {
  const id=_uid+1;
  const svg = S(240, 200, `
    <defs><linearGradient id="tp${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
    <ellipse cx="64" cy="60" rx="26" ry="22" fill="url(#tp${id})"/>
    <ellipse cx="176" cy="60" rx="26" ry="22" fill="url(#tp${id})"/>
    <path d="M66 46 Q120 76 174 46 L168 176 Q120 196 72 176 Z" fill="url(#tp${id})" stroke="${trim}" stroke-width="2"/>
    <path d="M66 46 Q120 76 174 46 L172 64 Q120 90 68 64 Z" fill="#fff" opacity="0.25"/>
    <path d="M120 70 L120 188" stroke="#fff" stroke-opacity="0.18" stroke-width="6"/>
    ${spark(90,120,5,0.6)} ${spark(160,140,4,0.5)}`);
  add('top', name, [240,200], svg, { cx:0.5, cy:0.40, aw:0.56, z:30 });
}

/* ---------- 하의 (스커트) ---------- */
function skirtPiece(name, c1, c2, trim) {
  const id=_uid+1;
  const svg = S(300, 240, `
    <defs><linearGradient id="sp${id}" x1="0.2" y1="0" x2="0.8" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="0.5" stop-color="${c2}"/><stop offset="1" stop-color="${c1}"/></linearGradient></defs>
    <path d="M108 16 Q150 30 192 16 L284 214 Q150 250 16 214 Z" fill="url(#sp${id})" stroke="${trim}" stroke-width="2"/>
    <path d="M108 16 Q150 30 192 16 L190 34 Q150 48 110 34 Z" fill="${trim}"/>
    <path d="M150 26 L150 244" stroke="#fff" stroke-opacity="0.16" stroke-width="7"/>
    <path d="M120 24 L70 210" stroke="#000" stroke-opacity="0.05" stroke-width="12"/>
    <g fill="${trim}">${Array.from({length:9},(_,i)=>{const x=24+i*31.5;return `<circle cx="${x}" cy="${212-(i%2?5:0)}" r="11"/>`;}).join('')}</g>
    ${spark(110,150,5,0.5)}`);
  add('bottom', name, [300,240], svg, { cx:0.5, cy:0.625, aw:0.74, z:20 });
}

/* ---------- 왕관 / 티아라 ---------- */
function crown(name, metal1, metal2, gemc1, gemc2, tall) {
  const id=_uid+1;
  const h = tall? 150:120;
  const peak = tall? 30:55;
  const svg = S(240, h, `
    <defs><linearGradient id="cr${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${metal1}"/><stop offset="1" stop-color="${metal2}"/></linearGradient></defs>
    <path d="M30 ${h-24} L44 ${peak} L92 ${h-58} L120 ${peak-18} L148 ${h-58} L196 ${peak} L210 ${h-24} Z"
          fill="url(#cr${id})" stroke="${metal2}" stroke-width="2"/>
    <rect x="26" y="${h-30}" width="188" height="18" rx="9" fill="url(#cr${id})" stroke="${metal2}" stroke-width="2"/>
    ${gem('cg'+id,120,peak-6,12,gemc1,gemc2)}
    ${gem('cg'+id+'a',44,peak+6,8,gemc1,gemc2)}
    ${gem('cg'+id+'b',196,peak+6,8,gemc1,gemc2)}
    <circle cx="70" cy="${h-21}" r="5" fill="${gemc1}"/><circle cx="120" cy="${h-21}" r="5" fill="${gemc2}"/><circle cx="170" cy="${h-21}" r="5" fill="${gemc1}"/>
    ${spark(120,peak-20,6)} ${spark(60,peak+20,4,0.6)}`);
  add('crown', name, [240,h], svg, { cx:0.5, cy:0.055, aw:0.42, z:46 });
}

/* ---------- 귀걸이 (좌우 한 쌍) ---------- */
function earring(name, metal, gemc1, gemc2, shape) {
  const id=_uid+1;
  const drop = (x) => shape==='round'
    ? `<circle cx="${x}" cy="92" r="14" fill="url(#er${id})" stroke="${metal}" stroke-width="2"/>`
    : `<path d="M${x} 76 L${x+13} 96 L${x} 120 L${x-13} 96 Z" fill="url(#er${id})" stroke="${metal}" stroke-width="2"/>`;
  const svg = S(240, 150, `
    <defs><radialGradient id="er${id}" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#fff"/><stop offset="0.4" stop-color="${gemc1}"/><stop offset="1" stop-color="${gemc2}"/></radialGradient></defs>
    <circle cx="40" cy="60" r="5" fill="${metal}"/><line x1="40" y1="64" x2="40" y2="76" stroke="${metal}" stroke-width="3"/>
    <circle cx="200" cy="60" r="5" fill="${metal}"/><line x1="200" y1="64" x2="200" y2="76" stroke="${metal}" stroke-width="3"/>
    ${drop(40)} ${drop(200)}
    ${spark(40,88,4,0.7)} ${spark(200,88,4,0.7)}`);
  add('earring', name, [240,150], svg, { cx:0.5, cy:0.205, aw:0.62, z:44 });
}

/* ---------- 목걸이 ---------- */
function necklace(name, metal, gemc1, gemc2, style) {
  const id=_uid+1;
  const pendant = style==='heart'
    ? `<path d="M120 78 C112 66 92 70 92 86 C92 102 120 120 120 120 C120 120 148 102 148 86 C148 70 128 66 120 78 Z" fill="url(#nk${id})" stroke="${metal}" stroke-width="2"/>`
    : `<circle cx="120" cy="96" r="18" fill="url(#nk${id})" stroke="${metal}" stroke-width="2"/>`;
  const svg = S(240, 130, `
    <defs><radialGradient id="nk${id}" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#fff"/><stop offset="0.4" stop-color="${gemc1}"/><stop offset="1" stop-color="${gemc2}"/></radialGradient></defs>
    <path d="M48 40 Q120 96 192 40" fill="none" stroke="${metal}" stroke-width="5"/>
    <path d="M48 40 Q120 96 192 40" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.5"/>
    ${Array.from({length:9},(_,i)=>{const t=i/8;const x=48+144*t;const y=40+56*Math.sin(Math.PI*t);return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${gemc1}"/>`;}).join('')}
    ${pendant}
    ${spark(120,92,5,0.7)}`);
  add('necklace', name, [240,130], svg, { cx:0.5, cy:0.285, aw:0.34, z:42 });
}

/* ---------- 구두 (한 쌍의 하이힐) ---------- */
function shoes(name, c1, c2, trim) {
  const id=_uid+1;
  const heel = (x)=>`
    <path d="M${x} 30 C${x-26} 34 ${x-30} 60 ${x-30} 78 L${x-30} 92 C${x-30} 100 ${x-18} 102 ${x+2} 100 C${x+30} 96 ${x+40} 92 ${x+44} 86 C${x+46} 80 ${x+40} 74 ${x+24} 72 C${x+6} 70 ${x} 50 ${x} 30 Z" fill="url(#sh${id})" stroke="${trim}" stroke-width="2"/>
    <path d="M${x+38} 88 L${x+40} 120 L${x+34} 120 L${x+30} 92 Z" fill="${c2}" stroke="${trim}" stroke-width="1.5"/>
    <ellipse cx="${x-6}" cy="44" rx="6" ry="8" fill="#fff" opacity="0.4"/>`;
  const svg = S(260, 140, `
    <defs><linearGradient id="sh${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
    ${heel(56)} ${heel(168)}
    ${spark(70,50,4,0.7)} ${spark(182,50,4,0.7)}`);
  add('shoe', name, [260,140], svg, { cx:0.5, cy:0.93, aw:0.5, z:34 });
}

/* ---------- 액세서리 ---------- */
function wings(name, c1, c2) {
  const id=_uid+1;
  const svg = S(420, 320, `
    <defs><linearGradient id="wg${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="0.5" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
    <g opacity="0.92">
      <path d="M210 160 C150 60 60 40 30 90 C10 130 40 180 90 190 C50 200 40 250 70 280 C110 310 180 250 210 200 Z" fill="url(#wg${id})" stroke="${c2}" stroke-width="2"/>
      <path d="M210 160 C270 60 360 40 390 90 C410 130 380 180 330 190 C370 200 380 250 350 280 C310 310 240 250 210 200 Z" fill="url(#wg${id})" stroke="${c2}" stroke-width="2"/>
    </g>
    ${spark(90,120,6)} ${spark(330,120,6)} ${spark(120,230,5,0.6)} ${spark(300,230,5,0.6)}`);
  add('acc', name, [420,320], svg, { cx:0.5, cy:0.45, aw:1.25, z:6 });
}
function wand(name, metal, gemc1, gemc2) {
  const id=_uid+1;
  const svg = S(120, 320, `
    <defs><radialGradient id="wd${id}" cx="0.4" cy="0.35" r="0.8"><stop offset="0" stop-color="#fff"/><stop offset="0.5" stop-color="${gemc1}"/><stop offset="1" stop-color="${gemc2}"/></radialGradient></defs>
    <rect x="54" y="90" width="12" height="210" rx="6" fill="${metal}"/>
    <path d="M60 14 L74 50 112 56 84 82 92 120 60 100 28 120 36 82 8 56 46 50 Z" fill="url(#wd${id})" stroke="#fff" stroke-width="2"/>
    ${spark(60,60,7)} ${spark(96,110,4,0.6)} ${spark(26,108,4,0.6)}`);
  add('acc', name, [120,320], svg, { cx:0.74, cy:0.5, aw:0.34, z:48 });
}
function choker(name, c, gemc1, gemc2) {
  const id=_uid+1;
  const svg = S(200, 80, `
    <defs><radialGradient id="ck${id}" cx="0.4" cy="0.3" r="0.8"><stop offset="0" stop-color="#fff"/><stop offset="0.5" stop-color="${gemc1}"/><stop offset="1" stop-color="${gemc2}"/></radialGradient></defs>
    <path d="M30 30 Q100 64 170 30" fill="none" stroke="${c}" stroke-width="10" stroke-linecap="round"/>
    <circle cx="100" cy="50" r="12" fill="url(#ck${id})" stroke="#fff" stroke-opacity="0.6"/>`);
  add('necklace', name, [200,80], svg, { cx:0.5, cy:0.255, aw:0.3, z:43 });
}
function gloves(name, c1, c2, trim) {
  const id=_uid+1;
  const svg = S(300, 260, `
    <defs><linearGradient id="gl${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
    <path d="M64 20 C44 80 34 150 42 210 C44 226 60 226 62 210 C66 152 78 86 92 36 Z" fill="url(#gl${id})" stroke="${trim}" stroke-width="2"/>
    <path d="M236 20 C256 80 266 150 258 210 C256 226 240 226 238 210 C234 152 222 86 208 36 Z" fill="url(#gl${id})" stroke="${trim}" stroke-width="2"/>
    <ellipse cx="52" cy="216" rx="13" ry="16" fill="url(#gl${id})"/><ellipse cx="248" cy="216" rx="13" ry="16" fill="url(#gl${id})"/>`);
  add('acc', name, [300,260], svg, { cx:0.5, cy:0.5, aw:0.86, z:32 });
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
  bodies: [{ id:'princess', name:'공주님', svg: PRINCESS_BODY, w:400, h:760 }],
  categories: CAT_META.map(([id,name,icon]) => ({ id, name, icon, items: ITEMS[id] })),
  // 시작 시 기본으로 올려둘 헤어
  defaultHairId: ITEMS.hair[0].id,
};
