/* =========================================================
 *  옷갈아입히기 - 메인 로직
 *  - 카테고리 바 → 아이템 바 → 클릭으로 즉시 배치
 *  - 카테고리당 1개 슬롯 (클릭 토글)
 *  - 무대 내 드래그로 위치 조정
 *  - 핀치 줌으로 크기 조정
 *  - 더블탭으로 삭제
 * ========================================================= */
(() => {
  'use strict';

  const BASE = 'assets/';
  const $ = (id) => document.getElementById(id);

  const srcOf = (o) => o.svg
    ? 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(o.svg)
    : BASE + o.file;

  const stage   = $('stage');
  const layers  = $('layers');
  const bodyImg = $('bodyImg');
  const catBar  = $('catBar');
  const itemBar = $('itemBar');

  // 카테고리 id → 현재 배치된 엘리먼트
  const slots = {};
  let zCounter = 10;

  const SW = () => stage.clientWidth;
  const SH = () => stage.clientHeight;

  /* ---------- 바디 ---------- */
  function initBody() {
    const b = DATA.bodies[0];
    bodyImg.src = srcOf(b);
  }

  /* ---------- 카테고리 / 아이템 바 ---------- */
  let activeCatId = null;

  function buildCatBar() {
    DATA.categories.forEach((cat, i) => {
      const btn = document.createElement('button');
      btn.className = 'cat-pill' + (i === 0 ? ' active' : '');
      btn.dataset.id = cat.id;
      btn.innerHTML = `<span class="icon">${cat.icon}</span>${cat.name}`;
      btn.addEventListener('click', () => selectCat(cat, btn));
      catBar.appendChild(btn);
    });
    selectCat(DATA.categories[0], catBar.children[0]);
  }

  function selectCat(cat, btn) {
    [...catBar.children].forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    activeCatId = cat.id;
    renderItemBar(cat);
  }

  function renderItemBar(cat) {
    itemBar.innerHTML = '';
    cat.items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'item-thumb';
      el.dataset.itemId = item.id;
      if (slots[cat.id]?._itemId === item.id) el.classList.add('active');
      el.innerHTML =
        `<img src="${srcOf(item)}" draggable="false" alt="${item.name}"/>` +
        `<span>${item.name}</span>`;
      el.addEventListener('click', () => toggleItem(cat.id, item, el));
      itemBar.appendChild(el);
    });
  }

  /* ---------- 아이템 배치 (토글) ---------- */
  function toggleItem(catId, item, thumbEl) {
    if (slots[catId]?._itemId === item.id) {
      // 같은 아이템 → 제거
      removeSlot(catId);
      thumbEl.classList.remove('active');
    } else {
      // 다른 아이템 또는 빈 슬롯 → 기존 제거 후 새로 배치
      removeSlot(catId);
      [...itemBar.querySelectorAll('.item-thumb')].forEach(t => t.classList.remove('active'));
      thumbEl.classList.add('active');
      placeItem(catId, item);
    }
  }

  function removeSlot(catId) {
    if (slots[catId]) {
      slots[catId].remove();
      delete slots[catId];
    }
  }

  function placeItem(catId, item) {
    const aspect = item.h / item.w;
    const w = item.aw * SW();
    const h = w * aspect;
    const cx = item.cx * SW();
    const cy = item.cy * SH();

    const el = document.createElement('img');
    el.className = 'placed';
    el.src = srcOf(item);
    el.draggable = false;
    el._itemId = item.id;
    el._state = { w, h, aspect, cx, cy, rot: 0, flip: 1, z: ++zCounter };

    applyBox(el);
    el.style.zIndex = el._state.z;
    layers.appendChild(el);
    slots[catId] = el;

    attachDrag(el);
    attachPinch(el);
    attachDoubleTap(el, catId);
  }

  function applyBox(el) {
    const s = el._state;
    s.h = s.w * s.aspect;
    el.style.width  = s.w + 'px';
    el.style.height = s.h + 'px';
    el.style.left   = (s.cx - s.w / 2) + 'px';
    el.style.top    = (s.cy - s.h / 2) + 'px';
    el.style.transform = `rotate(${s.rot}deg) scaleX(${s.flip})`;
  }

  /* ---------- 무대 내 드래그 ---------- */
  function attachDrag(el) {
    el.addEventListener('pointerdown', (e) => {
      // 핀치 중이면 드래그 무시
      if (el._pinching) return;
      e.preventDefault();
      e.stopPropagation();

      const s = el._state;
      const rect = stage.getBoundingClientRect();
      const grabX = e.clientX - rect.left - s.cx;
      const grabY = e.clientY - rect.top  - s.cy;

      el.setPointerCapture(e.pointerId);

      const move = (ev) => {
        if (el._pinching) return;
        s.cx = ev.clientX - rect.left - grabX;
        s.cy = ev.clientY - rect.top  - grabY;
        applyBox(el);
      };
      const up = () => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerup', up);
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerup', up);
    });
  }

  /* ---------- 핀치 줌 ---------- */
  function attachPinch(el) {
    const touches = new Map();
    let initDist = 0;
    let initW = 0;

    el.addEventListener('pointerdown', (e) => {
      touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (touches.size === 2) {
        el._pinching = true;
        const pts = [...touches.values()];
        initDist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
        initW = el._state.w;
        e.preventDefault();
      }
    });

    el.addEventListener('pointermove', (e) => {
      if (!touches.has(e.pointerId)) return;
      touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (touches.size === 2 && initDist > 0) {
        const pts = [...touches.values()];
        const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
        const newW = Math.max(24, Math.min(initW * (dist / initDist), SW() * 1.8));
        el._state.w = newW;
        applyBox(el);
        e.preventDefault();
      }
    });

    const endTouch = (e) => {
      touches.delete(e.pointerId);
      if (touches.size < 2) {
        initDist = 0;
        setTimeout(() => { el._pinching = false; }, 50);
      }
    };
    el.addEventListener('pointerup', endTouch);
    el.addEventListener('pointercancel', endTouch);
  }

  /* ---------- 더블탭으로 삭제 ---------- */
  function attachDoubleTap(el, catId) {
    let lastTap = 0;
    el.addEventListener('pointerup', () => {
      const now = Date.now();
      if (now - lastTap < 300) {
        // 더블탭
        removeSlot(catId);
        // 아이템 바 active 해제
        [...itemBar.querySelectorAll('.item-thumb')].forEach(t => t.classList.remove('active'));
      }
      lastTap = now;
    });
  }

  /* ---------- 하단 버튼 ---------- */
  $('btnReset').addEventListener('click', () => {
    Object.keys(slots).forEach(catId => removeSlot(catId));
    [...itemBar.querySelectorAll('.item-thumb')].forEach(t => t.classList.remove('active'));
  });

  function itemsOf(catId) {
    return DATA.categories.find(c => c.id === catId)?.items || [];
  }
  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  $('btnRandom').addEventListener('click', () => {
    $('btnReset').click();

    const tryPlace = (catId, prob = 1) => {
      if (Math.random() >= prob) return;
      const list = itemsOf(catId);
      if (!list.length) return;
      const item = rand(list);
      placeItem(catId, item);
    };

    tryPlace('hair');
    if (Math.random() < 0.5) {
      tryPlace('dress');
    } else {
      tryPlace('top');
      tryPlace('bottom');
    }
    tryPlace('shoe');
    tryPlace('crown', 0.7);
    tryPlace('earring', 0.6);
    tryPlace('necklace', 0.6);
    tryPlace('acc', 0.4);

    // 아이템 바 active 상태 갱신
    if (activeCatId) {
      const cat = DATA.categories.find(c => c.id === activeCatId);
      if (cat) renderItemBar(cat);
    }
  });

  /* ---------- PNG 저장 ---------- */
  $('btnSave').addEventListener('click', async () => {
    const W = SW(), H = SH(), scale = 2;
    const canvas = document.createElement('canvas');
    canvas.width = W * scale;
    canvas.height = H * scale;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#fdf3f7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    try {
      const bImg = await loadImg(srcOf(DATA.bodies[0]));
      ctx.drawImage(bImg, 0, 0, canvas.width, canvas.height);

      const sorted = Object.values(slots).sort((a, b) => (a._state.z || 0) - (b._state.z || 0));
      for (const el of sorted) {
        const s = el._state;
        const img = await loadImg(el.src);
        ctx.save();
        ctx.translate(s.cx * scale, s.cy * scale);
        ctx.rotate(s.rot * Math.PI / 180);
        ctx.scale(s.flip, 1);
        ctx.drawImage(img, -s.w * scale / 2, -s.h * scale / 2, s.w * scale, s.h * scale);
        ctx.restore();
      }

      const a = document.createElement('a');
      a.download = 'my-dressup.png';
      a.href = canvas.toDataURL('image/png');
      a.click();
    } catch (err) {
      console.error(err);
      alert('저장 실패. 로컬 서버에서 열어주세요 (python3 -m http.server)');
    }
  });

  function loadImg(src) {
    return new Promise((res, rej) => {
      const im = new Image();
      im.crossOrigin = 'anonymous';
      im.onload = () => res(im);
      im.onerror = rej;
      im.src = src;
    });
  }

  /* ---------- 리사이즈 ---------- */
  window.addEventListener('resize', () => {
    // 배치된 아이템 위치/크기 비율 유지
    Object.entries(slots).forEach(([, el]) => {
      const s = el._state;
      const item = DATA.categories.flatMap(c => c.items).find(it => it.id === el._itemId);
      if (!item) return;
      s.cx = item.cx * SW();
      s.cy = item.cy * SH();
      s.w  = item.aw * SW();
      applyBox(el);
    });
  });

  /* ---------- 시작 ---------- */
  initBody();
  buildCatBar();
})();
