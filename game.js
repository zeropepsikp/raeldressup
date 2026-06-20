/* =========================================================
 *  옷갈아입히기 게임 - 메인 로직
 *  - 트레이 → 무대 드래그앤드랍으로 아이템 배치
 *  - 배치된 아이템: 이동 / 확대·축소 / 회전 / 반전 / 순서 / 삭제
 *  - PNG 저장, 초기화, 랜덤
 * ========================================================= */
(() => {
  'use strict';

  const stage     = document.getElementById('stage');
  const layers    = document.getElementById('layers');
  const character = document.getElementById('character');
  const tabsEl    = document.getElementById('tabs');
  const trayEl    = document.getElementById('tray');
  const toolbar   = document.getElementById('itemToolbar');

  let placed   = [];     // 배치된 아이템 목록 (DOM element 배열)
  let selected = null;   // 현재 선택된 아이템
  let zCounter = 1;
  let uid      = 0;

  // 베이스 캐릭터 렌더 (고정)
  character.innerHTML = CHARACTER_SVG;

  /* ---------- 탭 + 트레이 ---------- */
  function buildTabs() {
    CATEGORIES.forEach((cat, i) => {
      const b = document.createElement('button');
      b.className = 'tab' + (i === 0 ? ' active' : '');
      b.innerHTML = `<span>${cat.icon}</span>${cat.name}`;
      b.onclick = () => {
        [...tabsEl.children].forEach(c => c.classList.remove('active'));
        b.classList.add('active');
        renderTray(cat);
      };
      tabsEl.appendChild(b);
    });
    renderTray(CATEGORIES[0]);
  }

  function renderTray(cat) {
    trayEl.innerHTML = '';
    cat.items.forEach(item => {
      const cell = document.createElement('div');
      cell.className = 'tray-item';
      cell.title = item.name;
      cell.innerHTML = `<div class="thumb">${item.svg}</div><span>${item.name}</span>`;
      // 트레이에서 드래그 시작 → 무대에 새 아이템 생성
      cell.addEventListener('pointerdown', (e) => startTrayDrag(e, item));
      trayEl.appendChild(cell);
    });
  }

  /* ---------- 아이템 생성 ---------- */
  function createPlaced(item, leftPx, topPx) {
    const el = document.createElement('div');
    el.className = 'placed';
    el.dataset.uid = ++uid;
    el.dataset.itemId = item.id;
    el.innerHTML = item.svg;

    const w = item.defaultW || 180;
    el.style.width  = w + 'px';
    el.style.height = w + 'px';
    el.style.left   = leftPx + 'px';
    el.style.top    = topPx + 'px';

    // 변형 상태
    el._state = { x: leftPx, y: topPx, w, rot: 0, flip: 1, z: ++zCounter };
    el.style.zIndex = el._state.z;
    applyTransform(el);

    layers.appendChild(el);
    placed.push(el);

    // 배치된 아이템 드래그(이동) + 선택
    el.addEventListener('pointerdown', (e) => startMove(e, el));
    el.addEventListener('dblclick', () => removeItem(el));

    return el;
  }

  function applyTransform(el) {
    const s = el._state;
    el.style.width  = s.w + 'px';
    el.style.height = s.w + 'px';
    el.style.transform = `rotate(${s.rot}deg) scaleX(${s.flip})`;
  }

  /* ---------- 트레이 → 무대 드래그 ---------- */
  function startTrayDrag(e, item) {
    e.preventDefault();
    const rect = stage.getBoundingClientRect();
    const w = item.defaultW || 180;
    let left = e.clientX - rect.left - w / 2;
    let top  = e.clientY - rect.top  - w / 2;
    const el = createPlaced(item, left, top);
    select(el);

    const move = (ev) => {
      left = ev.clientX - rect.left - w / 2;
      top  = ev.clientY - rect.top  - w / 2;
      el._state.x = left; el._state.y = top;
      el.style.left = left + 'px';
      el.style.top  = top + 'px';
      positionToolbar(el);
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  /* ---------- 배치된 아이템 이동 ---------- */
  function startMove(e, el) {
    e.preventDefault();
    e.stopPropagation();
    select(el);
    const rect = stage.getBoundingClientRect();
    const startX = e.clientX, startY = e.clientY;
    const origX = el._state.x, origY = el._state.y;
    let moved = false;

    const move = (ev) => {
      const dx = ev.clientX - startX, dy = ev.clientY - startY;
      if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
      el._state.x = origX + dx;
      el._state.y = origY + dy;
      el.style.left = el._state.x + 'px';
      el.style.top  = el._state.y + 'px';
      positionToolbar(el);
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  /* ---------- 선택 ---------- */
  function select(el) {
    if (selected) selected.classList.remove('selected');
    selected = el;
    if (el) {
      el.classList.add('selected');
      toolbar.hidden = false;
      positionToolbar(el);
    } else {
      toolbar.hidden = true;
    }
  }

  function positionToolbar(el) {
    if (!el) return;
    const sRect = stage.getBoundingClientRect();
    const wrap = stage.parentElement.getBoundingClientRect();
    let cx = el._state.x + el._state.w / 2 + (sRect.left - wrap.left);
    let top = el._state.y + (sRect.top - wrap.top) - 50;
    if (top < 4) top = el._state.y + el._state.w + (sRect.top - wrap.top) + 8;
    toolbar.style.left = cx + 'px';
    toolbar.style.top  = top + 'px';
  }

  // 무대 빈 곳 클릭 → 선택 해제
  stage.addEventListener('pointerdown', (e) => {
    if (e.target === stage || e.target === layers || e.target === character ||
        character.contains(e.target)) {
      select(null);
    }
  });

  /* ---------- 편집 동작 ---------- */
  function removeItem(el) {
    placed = placed.filter(p => p !== el);
    el.remove();
    if (selected === el) select(null);
  }

  toolbar.addEventListener('click', (e) => {
    const act = e.target.closest('button')?.dataset.act;
    if (!act || !selected) return;
    const s = selected._state;
    switch (act) {
      case 'scaleUp':   s.w = Math.min(s.w * 1.12, 600); break;
      case 'scaleDown': s.w = Math.max(s.w * 0.89, 40);  break;
      case 'rotateL':   s.rot -= 15; break;
      case 'rotateR':   s.rot += 15; break;
      case 'flip':      s.flip *= -1; break;
      case 'front':     s.z = ++zCounter; selected.style.zIndex = s.z; break;
      case 'back':      s.z = 0; selected.style.zIndex = 0; break;
      case 'delete':    removeItem(selected); return;
    }
    applyTransform(selected);
    positionToolbar(selected);
  });

  /* ---------- 하단 버튼 ---------- */
  document.getElementById('btnReset').onclick = () => {
    placed.forEach(p => p.remove());
    placed = [];
    select(null);
  };

  document.getElementById('btnRandom').onclick = () => {
    document.getElementById('btnReset').onclick();
    const pick = (cat) => cat.items[Math.floor(Math.random() * cat.items.length)];
    // 캐릭터 비율에 맞춘 대략적 위치 (stage 360x520 기준)
    const place = (catId, cx, cy) => {
      const cat = CATEGORIES.find(c => c.id === catId);
      if (!cat) return;
      const item = pick(cat);
      const w = item.defaultW || 180;
      createPlaced(item, cx - w / 2, cy - w / 2);
    };
    place('hair', 180, 110);
    if (Math.random() < 0.5) {
      place('dress', 180, 320);
    } else {
      place('top', 180, 280);
      place('bottom', 180, 380);
    }
    place('shoes', 180, 470);
    if (Math.random() < 0.6) place('hat', 180, 70);
    if (Math.random() < 0.5) place('glasses', 180, 120);
    if (Math.random() < 0.4) place('acc', 250, 300);
    select(null);
  };

  /* ---------- PNG 저장 ---------- */
  document.getElementById('btnSave').onclick = async () => {
    select(null);
    const W = stage.clientWidth, H = stage.clientHeight;
    const scale = 2;

    // 무대 전체를 하나의 SVG로 합성
    const parts = [];
    parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W*scale}" height="${H*scale}" viewBox="0 0 ${W} ${H}">`);
    parts.push(`<rect width="${W}" height="${H}" fill="#fdf3f7"/>`);

    // 캐릭터 (stage를 꽉 채우도록 그려져 있음)
    parts.push(`<g>${svgInner(character)}</g>`);

    // 배치된 아이템 (z순 정렬)
    const sorted = [...placed].sort((a, b) => (a._state.z||0) - (b._state.z||0));
    sorted.forEach(el => {
      const s = el._state;
      const cx = s.x + s.w / 2, cy = s.y + s.w / 2;
      // viewBox 0 0 200 200 → s.w 크기로 스케일
      const k = s.w / 200;
      const t = `translate(${cx} ${cy}) rotate(${s.rot}) scale(${s.flip*k} ${k}) translate(-100 -100)`;
      parts.push(`<g transform="${t}">${svgInner(el)}</g>`);
    });
    parts.push(`</svg>`);

    const svgStr = parts.join('');
    const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    try {
      const img = await loadImage(url);
      const canvas = document.createElement('canvas');
      canvas.width = W * scale; canvas.height = H * scale;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const a = document.createElement('a');
      a.download = 'my-dressup.png';
      a.href = canvas.toDataURL('image/png');
      a.click();
    } catch (err) {
      alert('저장 중 문제가 발생했어요. 다시 시도해 주세요.');
      console.error(err);
    } finally {
      URL.revokeObjectURL(url);
    }
  };

  // 요소 안의 <svg> 내부 마크업만 추출
  function svgInner(host) {
    const svg = host.querySelector('svg');
    return svg ? svg.innerHTML : '';
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  /* ---------- 시작 ---------- */
  buildTabs();
})();
