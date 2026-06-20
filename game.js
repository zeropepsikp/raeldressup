/* =========================================================
 *  옷갈아입히기 - 메인 로직 (업로드된 APC_assets 기반)
 *  - 트레이 → 무대 드래그앤드랍
 *  - 머리/몸/발 슬롯에 "착 붙이기"(스냅)
 *  - 이동/확대/회전/반전/순서/삭제, 바디 교체, PNG 저장
 * ========================================================= */
(() => {
  'use strict';

  const BASE = 'assets/';
  const $ = (id) => document.getElementById(id);

  const stage     = $('stage');
  const layers    = $('layers');
  const bodyImg   = $('bodyImg');
  const tabsEl    = $('tabs');
  const trayEl    = $('tray');
  const toolbar   = $('itemToolbar');
  const snapGuide = $('snapGuide');
  const snapChk   = $('snapChk');
  const bodyPicker= $('bodyPicker');

  let placed   = [];
  let selected = null;
  let zCounter = 60;
  let uid      = 0;
  let curBody  = DATA.bodies[0];

  const SW = () => stage.clientWidth;
  const SH = () => stage.clientHeight;
  const snapEnabled = () => snapChk.checked;
  const snapR = () => SW() * 0.30;

  /* ---------- 바디 ---------- */
  function setBody(b) {
    curBody = b;
    bodyImg.src = BASE + b.file;
    [...bodyPicker.children].forEach(c =>
      c.classList.toggle('active', c.dataset.id === b.id));
  }
  function buildBodyPicker() {
    DATA.bodies.forEach(b => {
      const t = document.createElement('button');
      t.className = 'body-thumb';
      t.dataset.id = b.id;
      t.innerHTML = `<img src="${BASE + b.file}" alt="${b.name}" draggable="false"/>`;
      t.title = b.name;
      t.onclick = () => setBody(b);
      bodyPicker.appendChild(t);
    });
    setBody(curBody);
  }

  /* ---------- 탭 / 트레이 ---------- */
  function buildTabs() {
    DATA.categories.forEach((cat, i) => {
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
    renderTray(DATA.categories[0]);
  }

  function renderTray(cat) {
    trayEl.innerHTML = '';
    cat.items.forEach(item => {
      const cell = document.createElement('div');
      cell.className = 'tray-item';
      cell.title = item.name;
      cell.innerHTML =
        `<div class="thumb"><img src="${BASE + item.file}" draggable="false"/></div>` +
        `<span>${item.name}</span>`;
      cell.addEventListener('pointerdown', (e) => startTrayDrag(e, item));
      trayEl.appendChild(cell);
    });
  }

  /* ---------- 배치 아이템 생성 ---------- */
  function createPlaced(item, centerX, centerY, wPx) {
    const aspect = item.h / item.w;          // 세로/가로
    const w = wPx != null ? wPx : item.aw * SW();
    const h = w * aspect;

    const el = document.createElement('img');
    el.className = 'placed';
    el.src = BASE + item.file;
    el.draggable = false;
    el.dataset.uid = ++uid;

    const st = {
      item, w, h, aspect,
      cx: centerX, cy: centerY,
      rot: 0, flip: 1, z: item.z || ++zCounter
    };
    el._state = st;
    applyBox(el);
    el.style.zIndex = st.z;

    layers.appendChild(el);
    placed.push(el);

    el.addEventListener('pointerdown', (e) => startMove(e, el));
    el.addEventListener('dblclick', () => removeItem(el));
    return el;
  }

  // 상태(중심좌표/크기/회전) → 스타일
  function applyBox(el) {
    const s = el._state;
    s.h = s.w * s.aspect;
    el.style.width  = s.w + 'px';
    el.style.height = s.h + 'px';
    el.style.left   = (s.cx - s.w / 2) + 'px';
    el.style.top    = (s.cy - s.h / 2) + 'px';
    el.style.transform = `rotate(${s.rot}deg) scaleX(${s.flip})`;
  }

  /* ---------- 스냅(착 붙이기) ---------- */
  function anchorPx(item) {
    return { x: item.cx * SW(), y: item.cy * SH(), w: item.aw * SW() };
  }
  function maybeSnap(el) {
    if (!snapEnabled()) return false;
    const s = el._state;
    const a = anchorPx(s.item);
    const d = Math.hypot(s.cx - a.x, s.cy - a.y);
    if (d <= snapR()) {
      s.cx = a.x; s.cy = a.y; s.w = a.w; s.rot = 0; s.flip = 1;
      applyBox(el);
      return true;
    }
    return false;
  }
  function fitToBody(el) {        // 무조건 슬롯에 맞춤
    const s = el._state;
    const a = anchorPx(s.item);
    s.cx = a.x; s.cy = a.y; s.w = a.w; s.rot = 0; s.flip = 1;
    applyBox(el);
  }
  function showGuide(item) {
    const a = anchorPx(item);
    const h = a.w * (item.h / item.w);
    snapGuide.style.width  = a.w + 'px';
    snapGuide.style.height = h + 'px';
    snapGuide.style.left   = (a.x - a.w / 2) + 'px';
    snapGuide.style.top    = (a.y - h / 2) + 'px';
    snapGuide.hidden = false;
  }
  function hideGuide() { snapGuide.hidden = true; }

  /* ---------- 트레이 → 무대 드래그 ---------- */
  function startTrayDrag(e, item) {
    e.preventDefault();
    const rect = stage.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const el = createPlaced(item, cx, cy);
    select(el);
    dragLoop(e, el, item);
  }

  /* ---------- 배치 아이템 이동 ---------- */
  function startMove(e, el) {
    e.preventDefault();
    e.stopPropagation();
    select(el);
    dragLoop(e, el, el._state.item);
  }

  function dragLoop(e, el, item) {
    const rect = stage.getBoundingClientRect();
    const s = el._state;
    const grabX = e.clientX - rect.left - s.cx;
    const grabY = e.clientY - rect.top  - s.cy;

    const move = (ev) => {
      s.cx = ev.clientX - rect.left - grabX;
      s.cy = ev.clientY - rect.top  - grabY;
      applyBox(el);
      positionToolbar(el);
      // 스냅 가이드 표시
      if (snapEnabled()) {
        const a = anchorPx(item);
        if (Math.hypot(s.cx - a.x, s.cy - a.y) <= snapR() * 1.25) showGuide(item);
        else hideGuide();
      }
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      hideGuide();
      maybeSnap(el);
      positionToolbar(el);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  /* ---------- 선택 / 툴바 ---------- */
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
    if (!el || toolbar.hidden) return;
    const s = el._state;
    const wrapRect  = stage.parentElement.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();
    const offX = stageRect.left - wrapRect.left;
    const offY = stageRect.top  - wrapRect.top;
    let left = offX + s.cx;
    let top  = offY + (s.cy - s.h / 2) - 46;
    if (top < offY - 4) top = offY + (s.cy + s.h / 2) + 8;
    toolbar.style.left = left + 'px';
    toolbar.style.top  = top + 'px';
  }

  // capture 단계에서 실행: placed 아이템이나 툴바 바깥을 누르면 선택 해제
  document.addEventListener('pointerdown', (e) => {
    if (!selected) return;
    if (selected.contains(e.target) || toolbar.contains(e.target)) return;
    select(null);
  }, true);

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
      case 'fit':       fitToBody(selected); break;
      case 'scaleUp':   s.w = Math.min(s.w * 1.12, SW() * 1.8); applyBox(selected); break;
      case 'scaleDown': s.w = Math.max(s.w * 0.89, 24);         applyBox(selected); break;
      case 'rotateL':   s.rot -= 15; applyBox(selected); break;
      case 'rotateR':   s.rot += 15; applyBox(selected); break;
      case 'flip':      s.flip *= -1; applyBox(selected); break;
      case 'front':     s.z = ++zCounter; selected.style.zIndex = s.z; break;
      case 'back':      s.z = 1;          selected.style.zIndex = 1; break;
      case 'delete':    removeItem(selected); return;
    }
    positionToolbar(selected);
  });

  /* ---------- 하단 버튼 ---------- */
  $('btnReset').onclick = () => {
    placed.forEach(p => p.remove());
    placed = [];
    select(null);
  };

  function itemsOf(catId) {
    return DATA.categories.find(c => c.id === catId)?.items || [];
  }
  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function placeSnapped(item) {
    const a = anchorPx(item);
    createPlaced(item, a.x, a.y, a.w);
  }

  $('btnRandom').onclick = () => {
    $('btnReset').onclick();
    placeSnapped(rand(itemsOf('hair')));
    if (Math.random() < 0.45) {
      placeSnapped(rand(itemsOf('dress')));
    } else {
      placeSnapped(rand(itemsOf('top')));
      placeSnapped(rand(itemsOf('bottom')));
    }
    placeSnapped(rand(itemsOf('shoes')));
    if (Math.random() < 0.6) placeSnapped(rand(itemsOf('acc')));
    select(null);
  };

  /* ---------- PNG 저장 ---------- */
  $('btnSave').onclick = async () => {
    select(null);
    hideGuide();
    const W = SW(), H = SH(), scale = 2;
    const canvas = document.createElement('canvas');
    canvas.width = W * scale; canvas.height = H * scale;
    const ctx = canvas.getContext('2d');

    // 배경
    ctx.fillStyle = '#fdf3f7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    try {
      // 베이스 바디
      const bImg = await loadImg(BASE + curBody.file);
      ctx.drawImage(bImg, 0, 0, canvas.width, canvas.height);

      // 아이템 (z 순서)
      const sorted = [...placed].sort((a, b) => (a._state.z || 0) - (b._state.z || 0));
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
      alert('이미지 저장에 실패했어요. 로컬 서버로 열면(예: python3 -m http.server) 정상 저장됩니다.');
    }
  };

  function loadImg(src) {
    return new Promise((res, rej) => {
      const im = new Image();
      im.crossOrigin = 'anonymous';
      im.onload = () => res(im);
      im.onerror = rej;
      im.src = src;
    });
  }

  /* ---------- 리사이즈 시 툴바 위치 갱신 ---------- */
  window.addEventListener('resize', () => positionToolbar(selected));

  /* ---------- 시작 ---------- */
  buildBodyPicker();
  buildTabs();
})();
