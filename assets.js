/* =========================================================
 *  옷갈아입히기 게임 - 에셋 정의 (모두 인라인 SVG, 외부 파일 없음)
 *  - 캐릭터는 고정 베이스
 *  - 아이템은 viewBox 0 0 200 200 기준으로 그려서
 *    트레이 썸네일/무대 배치/PNG 저장에 동일하게 재사용
 * ========================================================= */

/* 고정 베이스 캐릭터 (viewBox 0 0 360 520) */
const CHARACTER_SVG = `
<svg viewBox="0 0 360 520" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <defs>
    <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffe1c9"/>
      <stop offset="1" stop-color="#ffd2b3"/>
    </linearGradient>
  </defs>

  <!-- 다리 -->
  <path d="M150 330 q-8 90 -6 150 q1 14 16 14 q14 0 15 -14 q3 -55 5 -150 z" fill="url(#skin)" stroke="#e9b393" stroke-width="2"/>
  <path d="M210 330 q8 90 6 150 q-1 14 -16 14 q-14 0 -15 -14 q-3 -55 -5 -150 z" fill="url(#skin)" stroke="#e9b393" stroke-width="2"/>

  <!-- 몸통 -->
  <path d="M180 200
           q-46 4 -54 60
           q-6 44 24 78
           q30 16 60 0
           q30 -34 24 -78
           q-8 -56 -54 -60 z"
        fill="url(#skin)" stroke="#e9b393" stroke-width="2"/>

  <!-- 팔 -->
  <path d="M132 232 q-34 24 -44 92 q-2 14 12 16 q12 1 16 -12 q14 -56 34 -78 z" fill="url(#skin)" stroke="#e9b393" stroke-width="2"/>
  <path d="M228 232 q34 24 44 92 q2 14 -12 16 q-12 1 -16 -12 q-14 -56 -34 -78 z" fill="url(#skin)" stroke="#e9b393" stroke-width="2"/>

  <!-- 목 -->
  <rect x="165" y="168" width="30" height="44" rx="14" fill="url(#skin)" stroke="#e9b393" stroke-width="2"/>

  <!-- 머리 -->
  <ellipse cx="180" cy="118" rx="78" ry="84" fill="url(#skin)" stroke="#e9b393" stroke-width="2"/>
  <!-- 귀 -->
  <ellipse cx="104" cy="120" rx="12" ry="16" fill="url(#skin)" stroke="#e9b393" stroke-width="2"/>
  <ellipse cx="256" cy="120" rx="12" ry="16" fill="url(#skin)" stroke="#e9b393" stroke-width="2"/>

  <!-- 볼터치 -->
  <ellipse cx="138" cy="138" rx="14" ry="9" fill="#ffb6a8" opacity="0.6"/>
  <ellipse cx="222" cy="138" rx="14" ry="9" fill="#ffb6a8" opacity="0.6"/>

  <!-- 눈 -->
  <ellipse cx="148" cy="116" rx="11" ry="14" fill="#3a2a24"/>
  <ellipse cx="212" cy="116" rx="11" ry="14" fill="#3a2a24"/>
  <circle cx="151" cy="111" r="4" fill="#fff"/>
  <circle cx="215" cy="111" r="4" fill="#fff"/>

  <!-- 코 -->
  <path d="M180 126 q4 8 -2 12" stroke="#e9a784" stroke-width="2.5" fill="none" stroke-linecap="round"/>

  <!-- 입 -->
  <path d="M166 152 q14 16 28 0" stroke="#d2706a" stroke-width="3.5" fill="none" stroke-linecap="round"/>

  <!-- 기본 속옷(캐릭터는 그대로) -->
  <path d="M150 250 q30 14 60 0 l-4 26 q-26 10 -52 0 z" fill="#ffd9e6" opacity="0.9"/>
</svg>`;

/* 아이템 헬퍼: 공통 viewBox로 감싸기 */
const wrap = (inner) =>
  `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">${inner}</svg>`;

/* 카테고리 + 아이템.
 * defaultW: 무대에 처음 놓일 때 가로 크기(px) */
const CATEGORIES = [
  {
    id: 'hair', name: '헤어', icon: '💇',
    items: [
      { id: 'hair_long', name: '긴머리', defaultW: 230, svg: wrap(`
        <path d="M100 22 C50 22 36 70 36 110 C36 150 44 178 52 188 L66 150 C58 120 60 70 100 60 C140 70 142 120 134 150 L148 188 C156 178 164 150 164 110 C164 70 150 22 100 22 Z" fill="#7b4a2d"/>
        <path d="M100 26 C70 26 52 50 50 78 C66 60 84 56 100 56 C116 56 134 60 150 78 C148 50 130 26 100 26 Z" fill="#8a5636"/>`) },
      { id: 'hair_bob', name: '단발', defaultW: 210, svg: wrap(`
        <path d="M100 24 C58 24 42 62 42 100 C42 124 48 140 54 150 L66 150 C58 130 60 96 100 92 C140 96 142 130 134 150 L146 150 C152 140 158 124 158 100 C158 62 142 24 100 24 Z" fill="#2c2c33"/>
        <path d="M100 28 C76 28 58 44 52 68 C70 54 86 52 100 52 C114 52 130 54 148 68 C142 44 124 28 100 28 Z" fill="#3a3a42"/>`) },
      { id: 'hair_twin', name: '양갈래', defaultW: 250, svg: wrap(`
        <path d="M100 26 C62 26 46 58 46 96 C46 110 50 122 56 130 L70 124 C62 104 66 76 100 72 C134 76 138 104 130 124 L144 130 C150 122 154 110 154 96 C154 58 138 26 100 26 Z" fill="#e98ab0"/>
        <ellipse cx="42" cy="150" rx="20" ry="34" fill="#e98ab0"/>
        <ellipse cx="158" cy="150" rx="20" ry="34" fill="#e98ab0"/>
        <circle cx="42" cy="118" r="9" fill="#ff5fa2"/>
        <circle cx="158" cy="118" r="9" fill="#ff5fa2"/>`) },
      { id: 'hair_pony', name: '포니테일', defaultW: 235, svg: wrap(`
        <path d="M100 24 C58 24 44 60 44 100 C44 122 50 138 56 148 L68 146 C60 124 62 92 100 88 C138 92 140 124 132 146 L150 148 C156 138 160 124 160 102 C160 60 142 24 100 24 Z" fill="#caa14a"/>
        <path d="M150 96 C176 110 184 150 168 182 C160 168 150 160 146 150 C156 130 150 110 138 104 Z" fill="#caa14a"/>
        <ellipse cx="150" cy="92" rx="10" ry="8" fill="#ff7eb6"/>`) },
    ]
  },
  {
    id: 'top', name: '상의', icon: '👕',
    items: [
      { id: 'top_tee', name: '티셔츠', defaultW: 200, svg: wrap(`
        <path d="M64 50 L40 70 L52 96 L70 84 L70 160 L130 160 L130 84 L148 96 L160 70 L136 50 C124 64 76 64 64 50 Z" fill="#4ec0e0" stroke="#2f9fc0" stroke-width="3"/>`) },
      { id: 'top_hoodie', name: '후드티', defaultW: 215, svg: wrap(`
        <path d="M60 52 L36 74 L50 102 L66 90 L66 168 L134 168 L134 90 L150 102 L164 74 L140 52 C128 70 72 70 60 52 Z" fill="#7a6cf0" stroke="#5a4fd0" stroke-width="3"/>
        <path d="M78 52 C84 76 116 76 122 52 C112 64 88 64 78 52 Z" fill="#5a4fd0"/>
        <rect x="86" y="120" width="28" height="34" rx="6" fill="#5a4fd0"/>`) },
      { id: 'top_stripe', name: '줄무늬', defaultW: 200, svg: wrap(`
        <defs><clipPath id="stp"><path d="M64 50 L40 70 L52 96 L70 84 L70 160 L130 160 L130 84 L148 96 L160 70 L136 50 C124 64 76 64 64 50 Z"/></clipPath></defs>
        <path d="M64 50 L40 70 L52 96 L70 84 L70 160 L130 160 L130 84 L148 96 L160 70 L136 50 C124 64 76 64 64 50 Z" fill="#fff" stroke="#d33" stroke-width="3"/>
        <g clip-path="url(#stp)" fill="#e2453f">
          <rect x="30" y="84" width="140" height="12"/>
          <rect x="30" y="108" width="140" height="12"/>
          <rect x="30" y="132" width="140" height="12"/>
          <rect x="30" y="156" width="140" height="12"/>
        </g>`) },
      { id: 'top_tank', name: '나시', defaultW: 175, svg: wrap(`
        <path d="M74 56 C76 80 70 80 70 96 L70 158 L130 158 L130 96 C130 80 124 80 126 56 C118 72 116 72 110 60 C104 74 96 74 90 60 C84 72 82 72 74 56 Z" fill="#ff9bb8" stroke="#e87a98" stroke-width="3"/>`) },
    ]
  },
  {
    id: 'bottom', name: '하의', icon: '👖',
    items: [
      { id: 'bot_jeans', name: '청바지', defaultW: 180, svg: wrap(`
        <path d="M64 40 L136 40 L132 96 L116 178 L96 178 L100 100 L92 178 L72 178 L68 96 Z" fill="#5b7fb0" stroke="#3f5f88" stroke-width="3"/>
        <line x1="100" y1="44" x2="100" y2="96" stroke="#3f5f88" stroke-width="2"/>`) },
      { id: 'bot_skirt', name: '치마', defaultW: 200, svg: wrap(`
        <path d="M62 50 L138 50 L168 150 C134 168 66 168 32 150 Z" fill="#f0668a" stroke="#d24a6e" stroke-width="3"/>
        <path d="M62 50 L138 50 L142 70 L58 70 Z" fill="#d24a6e"/>`) },
      { id: 'bot_shorts', name: '반바지', defaultW: 185, svg: wrap(`
        <path d="M60 50 L140 50 L138 96 L124 130 L100 130 L100 96 L76 130 L62 96 Z" fill="#6fc28a" stroke="#4ea06a" stroke-width="3"/>
        <rect x="60" y="50" width="80" height="14" fill="#4ea06a"/>`) },
    ]
  },
  {
    id: 'dress', name: '원피스', icon: '👗',
    items: [
      { id: 'dress_red', name: '빨강 드레스', defaultW: 220, svg: wrap(`
        <path d="M70 40 C76 60 124 60 130 40 L126 92 L172 176 C130 196 70 196 28 176 L74 92 Z" fill="#e0455a" stroke="#bf2f44" stroke-width="3"/>
        <path d="M70 40 C76 60 124 60 130 40 L126 92 L74 92 Z" fill="#c93a4e"/>
        <circle cx="100" cy="96" r="6" fill="#ffd84d"/>`) },
      { id: 'dress_sun', name: '선드레스', defaultW: 215, svg: wrap(`
        <path d="M72 44 L128 44 L120 96 L160 174 C130 192 70 192 40 174 L80 96 Z" fill="#ffd34e" stroke="#e7b62f" stroke-width="3"/>
        <g fill="#fff" opacity="0.85">
          <circle cx="80" cy="120" r="6"/><circle cx="118" cy="110" r="6"/>
          <circle cx="100" cy="148" r="6"/><circle cx="132" cy="150" r="6"/>
          <circle cx="70" cy="158" r="6"/>
        </g>`) },
    ]
  },
  {
    id: 'shoes', name: '신발', icon: '👟',
    items: [
      { id: 'shoe_sneaker', name: '운동화', defaultW: 200, svg: wrap(`
        <g stroke="#3a6ea5" stroke-width="3">
          <path d="M48 120 L80 120 L86 140 L48 144 Z" fill="#fff"/>
          <path d="M120 120 L152 120 L152 144 L114 140 Z" fill="#fff"/>
        </g>
        <rect x="46" y="142" width="42" height="10" rx="5" fill="#3a6ea5"/>
        <rect x="112" y="142" width="42" height="10" rx="5" fill="#3a6ea5"/>`) },
      { id: 'shoe_boot', name: '부츠', defaultW: 200, svg: wrap(`
        <g fill="#6b4a32" stroke="#4d3422" stroke-width="3">
          <path d="M58 96 L86 96 L88 138 L58 142 Z"/>
          <path d="M58 138 L96 134 L96 150 L56 150 Z"/>
          <path d="M114 96 L142 96 L142 138 L112 142 Z"/>
          <path d="M104 134 L142 138 L144 150 L104 150 Z"/>
        </g>`) },
    ]
  },
  {
    id: 'hat', name: '모자', icon: '🎩',
    items: [
      { id: 'hat_beanie', name: '비니', defaultW: 170, svg: wrap(`
        <path d="M58 110 C58 60 142 60 142 110 Z" fill="#e06a8a" stroke="#c4506f" stroke-width="3"/>
        <rect x="54" y="106" width="92" height="16" rx="8" fill="#c4506f"/>
        <circle cx="100" cy="58" r="10" fill="#ffd1de"/>`) },
      { id: 'hat_cap', name: '캡모자', defaultW: 190, svg: wrap(`
        <path d="M52 108 C52 64 148 64 148 108 Z" fill="#3f7fd0" stroke="#2f63a8" stroke-width="3"/>
        <path d="M40 108 L100 108 L100 122 C70 122 48 118 40 108 Z" fill="#2f63a8"/>
        <circle cx="100" cy="66" r="6" fill="#fff"/>`) },
      { id: 'hat_crown', name: '왕관', defaultW: 165, svg: wrap(`
        <path d="M54 120 L60 70 L82 100 L100 60 L118 100 L140 70 L146 120 Z" fill="#ffcf3f" stroke="#e0ac1f" stroke-width="3"/>
        <rect x="54" y="118" width="92" height="12" rx="4" fill="#e0ac1f"/>
        <circle cx="60" cy="70" r="6" fill="#ff5d7a"/><circle cx="100" cy="60" r="6" fill="#5dd0ff"/><circle cx="140" cy="70" r="6" fill="#ff5d7a"/>`) },
    ]
  },
  {
    id: 'glasses', name: '안경', icon: '🕶️',
    items: [
      { id: 'gl_round', name: '동그란 안경', defaultW: 165, svg: wrap(`
        <g fill="none" stroke="#3a2a24" stroke-width="6">
          <circle cx="72" cy="100" r="26"/><circle cx="128" cy="100" r="26"/>
          <line x1="98" y1="100" x2="102" y2="100"/>
          <line x1="46" y1="96" x2="34" y2="88"/><line x1="154" y1="96" x2="166" y2="88"/>
        </g>`) },
      { id: 'gl_sun', name: '선글라스', defaultW: 170, svg: wrap(`
        <g stroke="#111" stroke-width="5">
          <rect x="46" y="86" width="48" height="30" rx="12" fill="#222"/>
          <rect x="106" y="86" width="48" height="30" rx="12" fill="#222"/>
          <line x1="94" y1="92" x2="106" y2="92"/>
          <line x1="46" y1="90" x2="34" y2="82"/><line x1="154" y1="90" x2="166" y2="82"/>
        </g>`) },
      { id: 'gl_star', name: '별 안경', defaultW: 175, svg: wrap(`
        <g stroke="#e0457a" stroke-width="5" fill="#ffe0ec">
          <path d="M72 78 l8 16 18 2 -13 13 4 18 -17 -9 -17 9 4 -18 -13 -13 18 -2 z"/>
          <path d="M128 78 l8 16 18 2 -13 13 4 18 -17 -9 -17 9 4 -18 -13 -13 18 -2 z"/>
        </g>`) },
    ]
  },
  {
    id: 'acc', name: '액세서리', icon: '🎀',
    items: [
      { id: 'acc_bow', name: '리본', defaultW: 130, svg: wrap(`
        <path d="M100 100 L58 78 L62 122 Z" fill="#ff6f9c" stroke="#e04f7c" stroke-width="3"/>
        <path d="M100 100 L142 78 L138 122 Z" fill="#ff6f9c" stroke="#e04f7c" stroke-width="3"/>
        <circle cx="100" cy="100" r="12" fill="#e04f7c"/>`) },
      { id: 'acc_bag', name: '가방', defaultW: 130, svg: wrap(`
        <path d="M70 88 C70 70 130 70 130 88 L136 150 L64 150 Z" fill="#d98a4e" stroke="#b86e36" stroke-width="3"/>
        <path d="M78 90 C78 74 122 74 122 90" fill="none" stroke="#b86e36" stroke-width="5"/>
        <rect x="92" y="104" width="16" height="10" rx="3" fill="#b86e36"/>`) },
      { id: 'acc_heart', name: '하트목걸이', defaultW: 130, svg: wrap(`
        <path d="M60 70 Q100 92 140 70" fill="none" stroke="#ffd84d" stroke-width="4"/>
        <path d="M100 96 C92 84 74 88 74 104 C74 118 100 132 100 132 C100 132 126 118 126 104 C126 88 108 84 100 96 Z" fill="#ff5d7a" stroke="#e0405d" stroke-width="3"/>`) },
    ]
  },
];
