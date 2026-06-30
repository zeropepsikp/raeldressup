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
  let curBodyId = DATA.bodies[0].id;

  const SW = () => stage.clientWidth;
  const SH = () => stage.clientHeight;

  /* ---------- 바디 ---------- */
  function setBody(body) {
    curBodyId = body.id;
    bodyImg.src = srcOf(body);
  }

  /* ---------- 카테고리 / 아이템 바 ---------- */
  let activeCatId = null;

  function buildCatBar() {
    // 맨 앞에 캐릭터 선택 알약 버튼
    const charBtn = document.createElement('button');
    charBtn.className = 'cat-pill';
    charBtn.dataset.id = '__char__';
    charBtn.innerHTML = `<span class="icon">👧</span>캐릭터`;
    charBtn.addEventListener('click', () => selectCharCat(charBtn));
    catBar.appendChild(charBtn);

    // 구분선
    const sep = document.createElement('div');
    sep.className = 'cat-sep';
    catBar.appendChild(sep);

    // 나머지 의상 카테고리
    DATA.categories.forEach((cat, i) => {
      const btn = document.createElement('button');
      btn.className = 'cat-pill' + (i === 0 ? ' active' : '');
      btn.dataset.id = cat.id;
      btn.innerHTML = `<span class="icon">${cat.icon}</span>${cat.name}`;
      btn.addEventListener('click', () => selectCat(cat, btn));
      catBar.appendChild(btn);
    });

    // 첫 번째 의상 카테고리를 기본 선택
    selectCat(DATA.categories[0], catBar.querySelector('[data-id="' + DATA.categories[0].id + '"]'));
    // 바디 초기화
    setBody(DATA.bodies[0]);
  }

  function selectCharCat(btn) {
    [...catBar.querySelectorAll('.cat-pill')].forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    activeCatId = '__char__';
    renderCharBar();
  }

  function selectCat(cat, btn) {
    [...catBar.querySelectorAll('.cat-pill')].forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    activeCatId = cat.id;
    renderItemBar(cat);
  }

  function renderCharBar() {
    itemBar.innerHTML = '';
    DATA.bodies.forEach(body => {
      const el = document.createElement('div');
      el.className = 'item-thumb' + (body.id === curBodyId ? ' active' : '');
      el.dataset.bodyId = body.id;
      el.innerHTML =
        `<img src="${srcOf(body)}" draggable="false" alt="${body.name}"/>` +
        `<span>${body.name}</span>`;
      el.addEventListener('click', () => {
        [...itemBar.querySelectorAll('.item-thumb')].forEach(t => t.classList.remove('active'));
        el.classList.add('active');
        setBody(body);
      });
      itemBar.appendChild(el);
    });
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
      removeSlot(catId);
      thumbEl.classList.remove('active');
    } else {
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
    const w = item.aw * SW() * 0.8;   // 기본 크기 80%
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

    attachInteraction(el, catId);
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

  /* ---------- 드래그 + 핀치 줌 + 더블탭 (통합 핸들러) ---------- */
  function attachInteraction(el, catId) {
    const ptrs = new Map();   // pointerId → {x, y}
    let dragging = false;
    let grabX = 0, grabY = 0;
    let pinching = false;
    let pinchInitDist = 0, pinchInitW = 0;
    let hadPinch = false;     // 이번 터치 시퀀스에 핀치가 있었는지
    let lastTapTime = 0;

    el.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      el.setPointerCapture(e.pointerId);
      ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (ptrs.size === 1) {
        // 단일 손가락 → 드래그 시작
        const rect = stage.getBoundingClientRect();
        grabX = e.clientX - rect.left - el._state.cx;
        grabY = e.clientY - rect.top  - el._state.cy;
        dragging = true;
      } else if (ptrs.size === 2) {
        // 두 번째 손가락 → 핀치 시작, 드래그 취소
        dragging = false;
        pinching = true;
        hadPinch = true;
        const pts = [...ptrs.values()];
        pinchInitDist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
        pinchInitW = el._state.w;
      }
    });

    el.addEventListener('pointermove', (e) => {
      if (!ptrs.has(e.pointerId)) return;
      ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (dragging && ptrs.size === 1) {
        const rect = stage.getBoundingClientRect();
        el._state.cx = e.clientX - rect.left - grabX;
        el._state.cy = e.clientY - rect.top  - grabY;
        applyBox(el);
      } else if (pinching && ptrs.size === 2 && pinchInitDist > 0) {
        const pts = [...ptrs.values()];
        const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
        el._state.w = Math.max(24, Math.min(pinchInitW * (dist / pinchInitDist), SW() * 1.8));
        applyBox(el);
      }
    });

    el.addEventListener('pointerup', (e) => {
      ptrs.delete(e.pointerId);

      if (ptrs.size === 0) {
        // 모든 손가락이 떨어짐
        if (!hadPinch) {
          // 더블탭 판정 (핀치가 없었을 때만)
          const now = Date.now();
          if (now - lastTapTime < 300) {
            removeSlot(catId);
            if (activeCatId === catId) {
              [...itemBar.querySelectorAll('.item-thumb')].forEach(t => t.classList.remove('active'));
            }
            lastTapTime = 0;
          } else {
            lastTapTime = now;
          }
        }
        dragging = false;
        pinching = false;
        pinchInitDist = 0;
        hadPinch = false;
      } else if (ptrs.size === 1) {
        // 한 손가락 남음 (핀치 종료) → 드래그 재개 안 함
        pinching = false;
        pinchInitDist = 0;
        dragging = false;
      }
    });

    el.addEventListener('pointercancel', (e) => {
      ptrs.delete(e.pointerId);
      if (ptrs.size === 0) {
        dragging = false;
        pinching = false;
        pinchInitDist = 0;
        hadPinch = false;
      }
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
      placeItem(catId, rand(list));
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
    if (activeCatId && activeCatId !== '__char__') {
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
      const curBody = DATA.bodies.find(b => b.id === curBodyId) || DATA.bodies[0];
      const bImg = await loadImg(srcOf(curBody));
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
    Object.entries(slots).forEach(([, el]) => {
      const item = DATA.categories.flatMap(c => c.items).find(it => it.id === el._itemId);
      if (!item) return;
      el._state.cx = item.cx * SW();
      el._state.cy = item.cy * SH();
      el._state.w  = item.aw * SW();
      applyBox(el);
    });
  });

  /* ---------- 시작 ---------- */
  buildCatBar();
})();
