/**
 * ==========================================================================
 * BARÇA ARCHIVE : CULER — Interaction Script
 * - 402 × 874 기준 좌표를 화면 크기에 맞춰 비례 배치 (--sx / --sy / --s)
 * - 무한 순환 캐러셀: 카드 · 챕터 번호 · 원호 타이틀 · 배경 줄무늬가 하나의 위치값(pos)으로 동기화
 * - 카드를 누르면 같은 요소들이 챕터 인트로로 변형 (reveal 0 → 1)
 *   배경 줄무늬 → 챕터 색 + 카드 이미지 블러, 카드 310×410 → 280×360,
 *   챕터 번호는 카드 아래로, 제목은 BIG 60 → 75 로 확대
 * - 인트로 아래로 스크롤하면 제목이 축소되며 상단바로 올라가고, 본문을 읽는다
 * - For Jihoon 을 누르면 줄무늬가 균등해지며 편지가 나타난다
 * 콘텐츠는 chapters.js 의 CHAPTERS_DATA 에서 수정
 * ==========================================================================
 */

const DESIGN = {
  width: 402,
  height: 874,
  activeStripe: 302,   // 활성 줄무늬 너비
  baseStripe: 20,      // 기본 줄무늬 너비
  cardSpacing: 124,    // 카드 중심 간격 (옆 카드는 가운데 카드 뒤에 겹쳐 보임)
  dragDistance: 280,   // 한 챕터를 넘기는 드래그 거리
  cardDrop: 32,        // 옆 카드가 내려가는 정도
  cardScaleStep: 0.12,
  cardRotateZ: 8,
  numberShift: 150,    // 챕터 번호 이동 거리
  titleGap: 30,        // 타이틀 사이 간격
  titleRadius: 760,    // 타이틀 원호 반지름
  duration: 560,
  // 카드 드래그
  followY: 0.35,       // 좌우로 끌 때 세로 방향을 따라오는 비율
  followTilt: 0.045,   // 끈 거리(px)당 기울기(deg)
  maxTilt: 14,
  commitDuration: 640, // 넘어갈 때
  returnDuration: 520, // 제자리로 돌아올 때
  liftY: 18,           // 다음 카드가 올라올 때 떠오르는 높이
  liftScale: 0.035,
  openDistance: 70,    // 위로 끌어 챕터를 여는 거리
  // 챕터 인트로 (시안 2페이지)
  revealDuration: 760,
  introCard: { cx: 201, cy: 326, w: 280, h: 360 },
  introNumberDy: 419,  // 챕터 번호: y 128 → 547
  introNumberDx: 2,
  introTitleSize: 75,  // 제목: 60 → 75
  introTitleMaxWidth: 366,
  introTitleCx: 201,
  pullToClose: 90,     // 인트로에서 아래로 당겨 닫는 거리
  // 인트로 → 본문 스크롤: 제목이 상단바 제목으로 축소
  titleTop: 655,       // 타이틀 휠 상단 (기준 px)
  barTitleCy: 75,      // 상단바 제목 중심 y (top 57 + 36/2) — 실제 값은 measure()에서 화면 기준으로 다시 잰다
  barTitleSize: 36,    // 상단바 제목 크기 (H1)
  introGap: 60,        // 인트로 제목 ~ 본문 제목 간격 (본문 Gap 60과 동일)
  // 편지
  letterDuration: 720,
  // 브라우저 탭에서 화면 밖이 되는 시안의 영역 (measure 에서 필요한 만큼만 잘라낸다)
  chromeTop: 54,       // 상태바 · 다이내믹 아일랜드
  chromeBottom: 74,    // Safari 하단바 · 홈 인디케이터 (y 800 ~ 874)
  maxBarShift: 45      // 챕터 상단바를 끌어올리는 최대값 (상태바 바로 아래 여백 유지)
};

const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutBack = (t) => {
  const c = 1.4;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;

/** localStorage 래퍼: 사생활 보호 모드 등 저장이 막힌 환경에서도 오류 없이 동작 */
const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (err) {
      return fallback;
    }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (err) { /* 저장 불가 환경 */ }
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch (err) { /* noop */ }
  }
};

const HANGUL = /[가-힣]/;
const ICON_CLOSE = '<svg viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';
const ICON_OPEN = '<svg viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/></svg>';
const ICON_ADD = '<svg viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>';

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

class CulerArchive {
  constructor(chapters) {
    this.chapters = chapters;
    this.n = chapters.length;

    this.frame = document.getElementById("frame");
    this.home = document.getElementById("home");
    this.stage = document.getElementById("carouselStage");
    this.track = document.getElementById("carouselTrack");
    this.numberTrack = document.getElementById("chapterNumberTrack");
    this.titleWheel = document.getElementById("titleWheel");
    this.stripesRoot = document.getElementById("bgStripes");
    this.bgReading = document.getElementById("bgReading");
    this.bgReadingBlur = document.getElementById("bgReadingBlur");
    this.chevron = document.getElementById("introChevron");
    this.navPrev = document.getElementById("navPrev");
    this.navNext = document.getElementById("navNext");

    this.view = document.getElementById("chapterView");
    this.viewScroll = document.getElementById("cvScroll");
    this.viewIntro = document.getElementById("cvIntro");
    this.viewContent = document.getElementById("cvContent");
    this.topbar = document.getElementById("cvTopbar");
    this.topbarTitle = document.getElementById("cvTopbarTitle");
    this.homeButton = document.getElementById("cvHome");
    this.closeButton = document.getElementById("cvClose");
    this.app = document.getElementById("app");
    this.emblem = document.getElementById("clubEmblem");
    this.deviceToggle = document.getElementById("deviceToggle");
    this.letterEl = document.getElementById("letter");
    this.letterButton = document.getElementById("openLetter");

    this.pos = 0;              // 연속 위치 (정수 = 챕터)
    this.anim = null;
    this.drag = null;
    this.hold = null;          // 손가락에 잡힌 카드 { index, dx, dy, blend, onTop }
    this.lift = null;          // 올라오는 카드 { index, amount }
    this.scale = { sx: 1, sy: 1, s: 1, y0: 0 };
    this.titleWidths = [];
    this.barCy = DESIGN.barTitleCy;
    this.barH = 160;

    // 모바일: 챕터를 읽는 동안 문서(window)를 스크롤시켜 주소창이 줄어들게 한다 (PC 프레임 보기에서는 안쪽 스크롤)
    this.spacer = document.getElementById("scrollSpacer");
    this.docScroll = !window.matchMedia("(min-width: 600px) and (hover: hover) and (pointer: fine)").matches;
    this.docScrollOn = false;
    this.pendingMeasure = false;

    // 상태바 영역이 웹페이지 안에 있는지 (홈 화면 앱 = 있음, 브라우저 탭 = 없음)
    this.safeProbe = el("div");
    this.safeProbe.style.cssText = "position:fixed;top:0;left:0;width:0;height:env(safe-area-inset-top);visibility:hidden;pointer-events:none";
    document.body.appendChild(this.safeProbe);

    this.openIndex = -1;       // 열려 있는 챕터
    this.readingIndex = -1;    // 인트로로 변형 중인 챕터 (닫히는 동안에도 유지)
    this.reveal = 0;           // 0 = 목차, 1 = 챕터 인트로
    this.revealAnim = null;
    this.scrollY = 0;          // 본문 스크롤 → 홈 레이어를 함께 올린다
    this.letter = 0;           // 0 = 목차, 1 = 편지
    this.letterOpen = false;
    this.letterAnim = null;

    this.render();
    this.measure();
    this.bindEvents();
    this.update();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        this.measureTitles();
        this.measureBar();
        this.update();
      });
    }

    this.syncFromHash(true);
  }

  get currentIndex() {
    return this.wrap(Math.round(this.pos));
  }

  wrap(i) {
    return ((i % this.n) + this.n) % this.n;
  }

  /** i 번째 항목의 pos 기준 상대 위치 (-n/2 ~ n/2) */
  relative(i) {
    const half = this.n / 2;
    return this.wrap(i - this.pos + half) - half;
  }

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  render() {
    this.stripes = this.chapters.map((ch) => {
      const col = el("div", "stripe-col");
      col.style.backgroundColor = ch.color;
      this.stripesRoot.appendChild(col);
      return col;
    });

    this.cards = this.chapters.map((ch, i) => {
      const card = el("div", "carousel-card");
      card.dataset.index = i;
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "-1");
      card.setAttribute("aria-label", `${ch.chapterNumber} ${ch.title} 열기`);
      const img = el("img");
      img.src = ch.image;
      img.alt = ch.alt;
      img.draggable = false;
      card.appendChild(img);
      this.track.appendChild(card);
      return card;
    });

    this.numbers = this.chapters.map((ch) => {
      const item = el("div", "chapter-number-item typo-quote", ch.chapterNumber);
      this.numberTrack.appendChild(item);
      return item;
    });

    this.titles = this.chapters.map((ch, i) => {
      const lines = ch.titleLines || [ch.title];
      const item = el("div", "title-item typo-big", lines.join("\n"));
      item.dataset.index = i;
      item.dataset.lines = lines.length;
      this.titleWheel.appendChild(item);
      return item;
    });

    this.viewScroll.setAttribute("tabindex", "-1");
  }

  // ------------------------------------------------------------------
  // Measure
  // ------------------------------------------------------------------
  /**
   * 시안(402 × 874)을 실제 화면에 맞춘다.
   * 너비에 맞췄을 때 높이가 모자라면, 브라우저가 따로 그리는 영역(상태바 · 하단바)만큼 시안의 위아래를 잘라낸다.
   * - 상태바가 웹페이지 안에 있으면(홈 화면 앱) 위는 자르지 않는다
   * - 그래도 모자라면 세로로 조금 눌러 담는다 (sy < sx)
   * y0 = 위에서 잘라낸 시안 px. 홈 · 편지 레이어는 CSS --shift 만큼 끌어올려진다
   */
  measure() {
    const w = this.frame.clientWidth || DESIGN.width;
    const h = this.frame.clientHeight || DESIGN.height;
    const sx = w / DESIGN.width;
    const safeTop = this.safeProbe ? this.safeProbe.offsetHeight : 0;

    const excess = DESIGN.height - h / sx; // 너비 기준으로 모자라는 시안 높이
    let dropTop = 0;
    let dropBottom = 0;
    if (excess > 2) { // 반올림 오차 무시
      const canTop = safeTop > 0 ? 0 : DESIGN.chromeTop;
      const canBottom = DESIGN.chromeBottom;
      const take = Math.min(excess, canTop + canBottom);
      dropTop = (take * canTop) / (canTop + canBottom);
      dropBottom = take - dropTop;
    }

    const sy = h / (DESIGN.height - dropTop - dropBottom);
    const s = Math.min(sx, sy);
    this.scale = { sx, sy, s, y0: dropTop };

    const style = this.frame.style;
    style.setProperty("--sx", sx.toFixed(4));
    style.setProperty("--sy", sy.toFixed(4));
    style.setProperty("--s", s.toFixed(4));
    style.setProperty("--shift", `${(dropTop * sy).toFixed(2)}px`);
    style.setProperty("--bar-shift", `${Math.min(dropTop, DESIGN.maxBarShift).toFixed(2)}px`);

    this.measureTitles();
    this.measureBar();
  }

  /** 상단바 제목의 실제 위치 · 상단바 높이 (축소되는 제목이 도착할 자리) */
  measureBar() {
    const t = this.topbarTitle;
    if (t && t.offsetHeight) this.barCy = t.offsetTop + t.offsetHeight / 2;
    if (this.topbar.offsetHeight) this.barH = this.topbar.offsetHeight;
  }

  measureTitles() {
    this.titleWidths = this.titles.map((t) => t.offsetWidth);
    this.titleHeights = this.titles.map((t) => t.offsetHeight);
  }

  // ------------------------------------------------------------------
  // Layout (pos · reveal · scrollY → 모든 요소)
  // ------------------------------------------------------------------
  update() {
    const { sx, sy, s } = this.scale;
    const k = Math.floor(this.pos);
    const f = this.pos - k;
    const kw = this.wrap(k);
    const R = this.reveal;
    const ri = this.readingIndex;
    const hide = 1 - R;

    // 0. 본문 스크롤만큼 홈 레이어와 챕터 배경을 함께 올린다
    const lift = R > 0 ? `translate3d(0, ${-this.scrollY}px, 0)` : "";
    this.home.style.transform = lift;
    this.bgReading.style.transform = lift;
    this.bgReading.style.opacity = R;
    this.home.style.opacity = this.letter > 0 ? String(1 - this.letter) : "";

    // 1. Background stripes (%)
    const base = (DESIGN.baseStripe / DESIGN.width) * 100;
    const active = (DESIGN.activeStripe / DESIGN.width) * 100;
    const widths = [];
    this.stripes.forEach((col, i) => {
      let pct = base;
      if (i === kw) pct = active - f * (active - base);
      else if (i === this.wrap(kw + 1)) pct = base + f * (active - base);
      const w = lerp(pct, 100 / this.n, this.letter);
      col.style.width = `${w}%`;
      widths[i] = w;
    });
    this.paintEdges(widths, R);

    // 2. Cards
    this.cards.forEach((card, i) => {
      const r = this.relative(i);
      const a = Math.abs(r);
      const clamped = Math.max(-2, Math.min(2, r));
      const x = r * DESIGN.cardSpacing * s;
      const y = Math.min(a, 1.5) * DESIGN.cardDrop * s;
      const scale = 1 - Math.min(a, 2) * DESIGN.cardScaleStep;
      const rz = clamped * DESIGN.cardRotateZ;
      let tx = x, ty = y, sc = scale, rot = rz;
      let z = Math.round(100 - a * 10);
      let shade = Math.min(a, 1.5) * 0.12;
      let opacity = a <= 1 ? 1 : Math.max(0, 2 - a);

      // 잡힌 카드: 레이아웃 위치와 손가락 위치를 blend 비율로 섞는다
      const hold = this.hold;
      if (hold && hold.index === i) {
        const b = hold.blend;
        const tilt = Math.max(-DESIGN.maxTilt, Math.min(DESIGN.maxTilt, (hold.dx / s) * DESIGN.followTilt));
        tx += (hold.dx - tx) * b;
        ty += (hold.dy - ty) * b;
        sc += (1 - sc) * b;
        rot += (tilt - rot) * b;
        shade *= 1 - b;
        if (hold.onTop) z = 200;
      }

      // 다음 카드가 앞으로 올라오는 순간의 떠오름
      if (this.lift && this.lift.index === i) {
        ty -= this.lift.amount * DESIGN.liftY * s;
        sc += this.lift.amount * DESIGN.liftScale;
      }

      // 챕터 인트로: 열린 카드는 280×360 으로, 나머지는 바깥으로 빠지며 사라진다
      if (R > 0 && i === ri) {
        const c = DESIGN.introCard;
        const w = lerp(310, c.w, R) * s;
        const h = lerp(410, c.h, R) * s;
        card.style.width = `${w}px`;
        card.style.height = `${h}px`;
        card.style.left = `${lerp(199, c.cx, R) * sx - w / 2}px`;
        card.style.top = `${lerp(395, c.cy, R) * sy - h / 2}px`;
        card.dataset.morph = "1";
        tx *= hide; ty *= hide; rot *= hide;
        sc = lerp(sc, 1, R);
        shade *= hide;
        z = 300;
      } else {
        if (card.dataset.morph) {
          card.style.width = card.style.height = card.style.left = card.style.top = "";
          delete card.dataset.morph;
        }
        if (R > 0) {
          tx += Math.sign(r) * R * 90 * s;
          opacity *= hide;
        }
      }

      card.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${sc}) rotate(${rot}deg)`;
      card.style.opacity = opacity;
      card.style.zIndex = String(z);
      card.style.setProperty("--shade", shade);
      card.style.visibility = a > 2 || opacity <= 0.001 ? "hidden" : "visible";
    });

    // 3. Chapter number — 인트로에서는 카드 아래로 내려온다
    this.numbers.forEach((item, i) => {
      const r = this.relative(i);
      let x = r * DESIGN.numberShift * sx;
      let y = 0;
      let opacity = Math.max(0, 1 - Math.abs(r) * 1.6);
      if (R > 0) {
        if (i === ri) {
          x = lerp(x, DESIGN.introNumberDx * sx, R);
          y = DESIGN.introNumberDy * sy * R;
          opacity = lerp(opacity, 1, R);
        } else {
          opacity *= hide;
        }
      }
      item.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      item.style.opacity = opacity;
    });

    // 4. Title wheel — 원호 위에 배치, 실제 글자 너비로 간격 계산
    const gap = (a, b) => (this.titleWidths[this.wrap(a)] + this.titleWidths[this.wrap(b)]) / 2 + DESIGN.titleGap * s;
    const radius = DESIGN.titleRadius * s;
    const shift = f * gap(k, k + 1);
    const frameW = this.frame.clientWidth || DESIGN.width;
    const frameH = this.frame.clientHeight || DESIGN.height;
    let barProgress = 0;
    let barFade = 0;

    this.titles.forEach((item, i) => {
      const m = this.wrap(i - k + 2) - 2; // -2 ~ 3
      let arc = 0;
      if (m > 0) for (let j = 0; j < m; j++) arc += gap(k + j, k + j + 1);
      if (m < 0) for (let j = 0; j > m; j--) arc -= gap(k + j - 1, k + j);
      arc -= shift;

      const progress = Math.abs(m - f);
      const theta = arc / radius;
      let x = radius * Math.sin(theta) - this.titleWidths[i] / 2;
      let y = radius * (1 - Math.cos(theta));
      let rot = theta;
      let sc = 1;
      let opacity = progress < 1 ? 1 - progress * 0.3 : Math.max(0, 0.7 - (progress - 1) * 0.7);

      // 챕터 인트로: 제목은 가운데에서 75px 로 확대, 나머지는 사라진다
      if (R > 0) {
        if (i === ri) {
          const lines = Number(item.dataset.lines) || 1;
          const target = Math.min(DESIGN.introTitleSize / 60, (DESIGN.introTitleMaxWidth * s) / Math.max(1, this.titleWidths[i]));
          // 첫 줄 상단을 y 611 (75px) 에 맞추는 이동량 (60/48 → 75/60 행간 기준)
          const dy = (-25.7 + 6 * lines) * sy;
          const homeShift = this.scale.y0 * sy; // 홈 레이어 좌표 → 화면 좌표
          this.layoutIntro(DESIGN.titleTop * sy + dy + (this.titleHeights[i] * (1 + target)) / 2 - homeShift);
          x = lerp(x, (DESIGN.introTitleCx - 206) * sx - this.titleWidths[i] / 2, R);
          y = lerp(y, dy, R);
          rot *= hide;
          sc = lerp(1, target, R);
          opacity = lerp(opacity, 1, R);

          // 본문으로 스크롤: 제목이 스크롤을 따라 올라가며 상단바 제목(H1 36)으로 축소
          const w = this.titleWidths[i];
          const h = this.titleHeights[i];
          const top = DESIGN.titleTop * sy;
          const introCy = top + y + h / 2 - homeShift;
          this.barTravel = Math.max(1, introCy - this.barCy);
          const p = clamp01(this.scrollY / this.barTravel);
          barProgress = p;
          if (p > 0) {
            const cx = lerp(206 * sx + x + w / 2, frameW / 2, p);
            const cy = lerp(introCy, this.barCy, p);
            x = cx - 206 * sx - w / 2;
            y = cy + homeShift - top - h / 2 + this.scrollY; // 홈 레이어가 올라간 만큼 되돌린다
            sc = lerp(sc, DESIGN.barTitleSize / (60 * s), p);
            // 한 줄 제목은 상단바 제목과 같은 자리 · 크기에서 맞바꾸고, 두 줄 제목은 마지막에 교차
            barFade = lines > 1 ? clamp01((p - 0.85) / 0.15) : (p >= 1 ? 1 : 0);
            opacity *= 1 - barFade;
          }
        } else {
          opacity *= hide;
        }
      }

      item.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rot}rad) scale(${sc})`;
      item.style.opacity = opacity;
      item.style.visibility = opacity <= 0.001 || progress > 2.2 ? "hidden" : "visible";
      item.style.pointerEvents = progress < 1.5 && R === 0 ? "auto" : "none";
    });

    // 5. Chevron & top bar — 제목이 도착하면 아이콘이, 본문이 올라오면 배경이 나타난다
    this.chevron.style.opacity = clamp01((R - 0.6) / 0.4) * (1 - clamp01(this.scrollY / 50));
    // 본문은 인트로 화면 바로 아래에 붙어 있으므로, 스크롤을 시작하면 나타난다
    this.viewContent.style.setProperty("--enter", clamp01((this.scrollY - 20) / 90).toFixed(3));
    const bar = this.topbar.style;
    bar.setProperty("--bar-title", barFade.toFixed(3));
    bar.setProperty("--bar-icons", clamp01((barProgress - 0.8) / 0.2).toFixed(3));
    // 본문 위끝이 상단바 아래끝 근처(+10 → −50)로 올라오면 배경이 채워진다. 제목이 도착하기 전에는 열지 않는다
    const contentTop = (this.introHeight || frameH) - this.scrollY;
    const barBg = barProgress >= 1 ? clamp01((this.barH + 10 - contentTop) / 60) : 0;
    bar.setProperty("--bar-bg", barBg.toFixed(3));
    this.topbar.classList.toggle("is-visible", this.openIndex >= 0 && barProgress > 0.9);
  }

  /**
   * 모바일 브라우저의 상태바 · 주소창 뒤 영역 채우기.
   * iOS Safari 는 화면 가장자리 뒤쪽을 페이지 배경(html)으로 칠하므로,
   * 줄무늬와 같은 그라데이션을 html 배경에 그려 화면 끝까지 이어 보이게 한다.
   * (PC 처럼 프레임이 가운데 놓이는 넓은 화면에서는 기존 어두운 배경을 유지)
   */
  paintEdges(widths, reveal) {
    const mobile = !window.matchMedia("(min-width: 600px), (orientation: landscape) and (max-height: 500px)").matches;
    let bg = "";
    let tint = "#0b090c";
    if (mobile) {
      if (reveal >= 0.5 && this.readingIndex >= 0) {
        bg = tint = this.chapters[this.readingIndex].color;
      } else {
        let x = 0;
        const stops = widths.map((w, i) => {
          const c = this.chapters[i].color;
          const seg = `${c} ${x.toFixed(2)}% ${(x + w).toFixed(2)}%`;
          x += w;
          return seg;
        });
        bg = `linear-gradient(to right, ${stops.join(", ")})`;
        tint = this.chapters[this.currentIndex].color;
      }
    }
    if (bg + tint !== this.edgeBg) {
      this.edgeBg = bg + tint;
      document.documentElement.style.background = bg;
      // Safari 는 바 뒤를 그라데이션이 아닌 '배경색'으로 칠하므로 현재 색도 함께 지정
      if (mobile) document.documentElement.style.backgroundColor = tint;
      document.body.style.background = mobile ? "transparent" : "";
    }
    if (tint !== this.edgeTint) {
      this.edgeTint = tint;
      if (!this.themeMeta) this.themeMeta = document.querySelector('meta[name="theme-color"]');
      if (this.themeMeta) this.themeMeta.setAttribute("content", tint);
    }
  }

  // ------------------------------------------------------------------
  // Motion
  // ------------------------------------------------------------------
  /**
   * pos 를 target 으로 이동. onStep(t) 으로 잡힌 카드·떠오름 값을 함께 갱신한다
   */
  animateTo(target, { duration = DESIGN.duration, onStep = null, onDone = null } = {}) {
    cancelAnimationFrame(this.anim);
    const from = this.pos;
    const delta = target - from;
    if (Math.abs(delta) < 0.001 && !onStep) {
      this.pos = target;
      this.update();
      if (onDone) onDone();
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 1 : duration;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / total);
      this.pos = from + delta * easeOutQuart(t);
      if (onStep) onStep(t);
      this.update();
      if (t < 1) {
        this.anim = requestAnimationFrame(step);
      } else {
        if (onDone) onDone();
        this.normalize();
      }
    };
    this.anim = requestAnimationFrame(step);
  }

  /** reveal 값을 target 으로 (목차 ↔ 챕터 인트로) */
  animateReveal(target, { onStep = null, onDone = null } = {}) {
    cancelAnimationFrame(this.revealAnim);
    const from = this.reveal;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 1 : DESIGN.revealDuration * Math.max(0.3, Math.abs(target - from));
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / total);
      const e = easeInOutCubic(t);
      this.reveal = lerp(from, target, e);
      if (onStep) onStep(e);
      this.update();
      if (t < 1) this.revealAnim = requestAnimationFrame(step);
      else if (onDone) onDone();
    };
    this.revealAnim = requestAnimationFrame(step);
  }

  /** pos 를 0 ~ n 범위로 되돌린다 (화면 변화 없음) */
  normalize() {
    this.pos = this.wrap(Math.round(this.pos));
    this.update();
  }

  /** 진행 중인 애니메이션을 멈추고 잡힌 카드 상태를 정리 */
  stopMotion() {
    cancelAnimationFrame(this.anim);
    this.hold = null;
    this.lift = null;
  }

  /** 가장 가까운 방향으로 index 챕터로 이동 */
  goTo(index) {
    const r = this.relative(index);
    this.animateTo(Math.round(this.pos + r));
  }

  next() { this.stopMotion(); this.animateTo(Math.round(this.pos) + 1); }
  prev() { this.stopMotion(); this.animateTo(Math.round(this.pos) - 1); }

  get isBrowsing() {
    return this.openIndex < 0 && this.reveal === 0 && !this.letterOpen && this.letter === 0;
  }

  // ------------------------------------------------------------------
  // Events
  // ------------------------------------------------------------------
  bindEvents() {
    window.addEventListener("resize", () => {
      if (this.docScrollOn) {
        // 주소창이 줄거나 늘 때마다 크기가 바뀌므로, 읽는 동안은 배율을 고정하고 닫을 때 다시 잰다
        this.pendingMeasure = true;
        this.updateSpacer();
        this.update();
        return;
      }
      this.measure();
      this.update();
    });

    window.addEventListener("scroll", () => {
      if (this.docScrollOn) this.viewScroll.scrollTop = window.scrollY;
    }, { passive: true });

    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => this.updateSpacer());
      ro.observe(this.viewContent);
      ro.observe(this.viewScroll);
    }

    this.stage.addEventListener("pointerdown", (e) => this.onPointerDown(e));
    window.addEventListener("pointermove", (e) => this.onPointerMove(e));
    window.addEventListener("pointerup", (e) => this.onPointerUp(e));
    window.addEventListener("pointercancel", () => this.onPointerCancel());

    this.titles.forEach((title, i) => {
      title.addEventListener("click", () => {
        if (!this.isBrowsing) return;
        if (i === this.currentIndex) this.requestOpen(i);
        else this.goTo(i);
      });
    });

    this.navPrev.addEventListener("click", () => this.prev());
    this.navNext.addEventListener("click", () => this.next());

    window.addEventListener("keydown", (e) => {
      if (e.target.closest && e.target.closest("input, textarea")) return; // 입력 중에는 단축키 사용 안 함
      if (this.letterOpen) {
        if (e.key === "Escape") this.requestCloseLetter();
        return;
      }
      if (this.openIndex >= 0) {
        if (e.key === "Escape") this.requestClose();
        return;
      }
      if (!this.isBrowsing) return;
      if (e.key === "ArrowLeft") this.prev();
      else if (e.key === "ArrowRight") this.next();
      else if (e.key === "Enter" || e.key === "ArrowUp") {
        e.preventDefault(); // 포커스 이동 뒤 Enter가 클릭으로 이어지지 않도록
        this.requestOpen(this.currentIndex);
      }
    });

    let wheelLock = false;
    this.stage.addEventListener("wheel", (e) => {
      if (!this.isBrowsing || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (wheelLock || Math.abs(e.deltaX) < 12) return;
      wheelLock = true;
      e.deltaX > 0 ? this.next() : this.prev();
      setTimeout(() => { wheelLock = false; }, 420);
    }, { passive: false });

    // Chapter view
    this.homeButton.addEventListener("click", () => this.requestClose());
    this.closeButton.addEventListener("click", () => this.requestClose());
    this.viewScroll.addEventListener("scroll", () => this.onViewScroll(), { passive: true });
    this.viewScroll.addEventListener("click", (e) => this.onIntroClick(e));
    this.bindPullToClose();

    // PC 전용: 앱 UI 보기 켜기/끄기 (선택은 기억한다)
    const applyDeviceUi = (on) => {
      this.app.classList.toggle("has-device-ui", on);
      this.deviceToggle.setAttribute("aria-pressed", String(on));
      this.deviceToggle.querySelector("b").textContent = on ? "ON" : "OFF";
    };
    applyDeviceUi(store.get("culer-device-ui", true));
    this.deviceToggle.addEventListener("click", () => {
      const on = !this.app.classList.contains("has-device-ui");
      applyDeviceUi(on);
      store.set("culer-device-ui", on);
    });

    // Letter
    this.letterButton.addEventListener("click", () => this.requestOpenLetter());
    this.letterEl.addEventListener("click", () => this.requestCloseLetter());
    window.addEventListener("popstate", () => this.syncFromHash(false));
  }

  /** 카드를 눌러야만 드래그가 시작된다 */
  onPointerDown(e) {
    if (e.button !== 0 || !this.isBrowsing) return;
    const card = e.target.closest(".carousel-card");
    if (!card) return;
    const index = Number(card.dataset.index);

    this.stopMotion();
    this.drag = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      startPos: this.pos,
      index,
      axis: null,
      lastX: e.clientX,
      lastT: performance.now(),
      velocity: 0
    };
    // 가운데 카드는 손가락을 따라 움직인다
    if (index === this.currentIndex) {
      this.hold = { index, dx: 0, dy: 0, blend: 1, onTop: true };
    }
    this.stage.classList.add("is-grabbing");
  }

  onPointerMove(e) {
    const d = this.drag;
    if (!d || e.pointerId !== d.id) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;

    if (!d.axis && Math.hypot(dx, dy) > 8) {
      d.axis = Math.abs(dx) >= Math.abs(dy) ? "x" : "y";
    }
    if (!d.axis) return;

    if (d.axis === "x") {
      const now = performance.now();
      const dt = now - d.lastT;
      if (dt > 0) d.velocity = (e.clientX - d.lastX) / dt;
      d.lastX = e.clientX;
      d.lastT = now;
      this.pos = d.startPos - dx / (DESIGN.dragDistance * this.scale.s);
      if (this.hold) {
        this.hold.dx = dx;
        this.hold.dy = dy * DESIGN.followY;
      }
    } else if (this.hold) {
      // 위로는 손가락을 따라, 아래로는 저항감 있게
      this.hold.dy = dy < 0 ? dy * 0.6 : dy * 0.18;
    }
    this.update();
  }

  onPointerUp(e) {
    const d = this.drag;
    if (!d || e.pointerId !== d.id) return;
    this.drag = null;
    this.stage.classList.remove("is-grabbing");
    const dy = e.clientY - d.y;

    if (d.axis === "x") {
      const base = Math.round(d.startPos);
      let target = Math.round(this.pos);
      if (Math.abs(d.velocity) > 0.35) target = base + (d.velocity < 0 ? 1 : -1);
      target = Math.max(base - 1, Math.min(base + 1, target));
      this.release(target, base);
      return;
    }

    if (d.axis === "y") {
      const base = Math.round(this.pos);
      if (dy < -DESIGN.openDistance && d.index === this.currentIndex) {
        // 끌어올린 카드가 그대로 인트로 위치로 이어지도록
        this.hold = null;
        this.pos = base;
        this.requestOpen(this.currentIndex);
      } else {
        this.release(base, base);
      }
      return;
    }

    // Tap
    this.hold = null;
    if (d.index === this.currentIndex) this.requestOpen(d.index);
    else this.goTo(d.index);
  }

  onPointerCancel() {
    if (!this.drag) return;
    const base = Math.round(this.drag.startPos);
    this.drag = null;
    this.stage.classList.remove("is-grabbing");
    this.release(base, base);
  }

  /**
   * 손을 뗀 뒤:
   * - 넘어갈 때: 잡힌 카드는 뒤로 물러나 옆 자리로, 다음 카드가 앞으로 올라온다
   * - 돌아올 때: 잡힌 카드가 살짝 튕기며 제자리로
   */
  release(target, base) {
    const hold = this.hold;
    const commit = target !== base;

    if (!hold) {
      this.animateTo(target, { duration: commit ? DESIGN.commitDuration : DESIGN.returnDuration });
      return;
    }

    if (commit) {
      hold.onTop = false;
      const incoming = this.wrap(target);
      this.lift = { index: incoming, amount: 0 };
      this.animateTo(target, {
        duration: DESIGN.commitDuration,
        onStep: (t) => {
          hold.blend = 1 - easeOutQuart(t);
          this.lift.amount = Math.sin(Math.PI * Math.min(1, t * 1.15));
        },
        onDone: () => { this.hold = null; this.lift = null; }
      });
    } else {
      this.animateTo(target, {
        duration: DESIGN.returnDuration,
        onStep: (t) => { hold.blend = 1 - easeOutBack(t); },
        onDone: () => { this.hold = null; }
      });
    }
  }

  // ------------------------------------------------------------------
  // Chapter view
  // ------------------------------------------------------------------
  syncFromHash(initial) {
    if (location.hash === "#letter") {
      if (!this.letterOpen && this.openIndex < 0) this.showLetter({ instant: initial });
      return;
    }
    if (this.letterOpen) this.hideLetter();

    const match = location.hash.match(/^#chapter-(\d+)$/);
    const index = match ? Number(match[1]) - 1 : -1;
    if (index >= 0 && index < this.n) {
      if (index !== this.openIndex) this.open(index, { instant: initial });
    } else if (this.openIndex >= 0) {
      this.close();
    }
  }

  requestOpen(index) {
    history.pushState({ chapter: index }, "", `#chapter-${index + 1}`);
    this.open(index);
  }

  requestClose() {
    if (history.state && history.state.chapter !== undefined) history.back();
    else {
      history.replaceState(null, "", location.pathname + location.search);
      this.close();
    }
  }

  // ------------------------------------------------------------------
  // Letter
  // ------------------------------------------------------------------
  requestOpenLetter() {
    if (!this.isBrowsing) return;
    history.pushState({ letter: true }, "", "#letter");
    this.showLetter();
  }

  requestCloseLetter() {
    if (!this.letterOpen) return;
    if (history.state && history.state.letter) history.back();
    else {
      history.replaceState(null, "", location.pathname + location.search);
      this.hideLetter();
    }
  }

  showLetter({ instant = false } = {}) {
    this.stopMotion();
    this.letterOpen = true;
    this.letterEl.removeAttribute("inert");
    this.letterEl.setAttribute("aria-hidden", "false");
    this.frame.classList.add("is-letter");
    this.letterEl.focus({ preventScroll: true });
    this.animateLetter(1, instant);
  }

  hideLetter() {
    this.letterOpen = false;
    this.letterEl.setAttribute("aria-hidden", "true");
    this.letterEl.setAttribute("inert", "");
    this.frame.classList.remove("is-letter");
    this.animateLetter(0, false, () => this.letterButton.focus({ preventScroll: true }));
  }

  /** 줄무늬가 균등 폭으로 펼쳐지고 목차가 사라진다 (글자는 CSS 전환) */
  animateLetter(target, instant, onDone) {
    cancelAnimationFrame(this.letterAnim);
    const from = this.letter;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = instant || reduce ? 1 : DESIGN.letterDuration;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / total);
      this.letter = lerp(from, target, easeInOutCubic(t));
      this.update();
      if (t < 1) this.letterAnim = requestAnimationFrame(step);
      else if (onDone) onDone();
    };
    this.letterAnim = requestAnimationFrame(step);
  }

  /** 열린 챕터의 색 · 블러 이미지 · 본문을 채운다 */
  fillChapter(index) {
    const ch = this.chapters[index];
    this.frame.style.setProperty("--chapter-color", ch.color);
    this.bgReadingBlur.src = ch.image;
    this.topbarTitle.textContent = ch.title;
    this.viewContent.replaceChildren(this.buildChapter(index));
    this.viewScroll.scrollTop = 0;
    this.scrollY = 0;
    if (this.docScrollOn) window.scrollTo(0, 0);
    this.updateSpacer();
  }

  /** 문서 스크롤 켜기/끄기 (모바일에서 챕터를 읽는 동안만) */
  setDocScroll(on) {
    on = on && this.docScroll;
    if (on === this.docScrollOn) return;
    this.docScrollOn = on;
    document.documentElement.classList.toggle("doc-scroll", on);
    window.scrollTo(0, 0);
    this.updateSpacer();
  }

  /** 문서 높이 = 본문 스크롤 높이 (window 스크롤 범위가 본문 스크롤 범위와 같아지도록) */
  updateSpacer() {
    if (!this.spacer) return;
    if (!this.docScrollOn) {
      this.spacer.style.height = "0px";
      return;
    }
    const extra = document.documentElement.clientHeight - this.viewScroll.clientHeight;
    this.spacer.style.height = `${Math.max(0, this.viewScroll.scrollHeight + extra)}px`;
  }

  /** 본문 스크롤 위치 이동 (문서 스크롤 중이면 window 를 움직인다) */
  scrollContentTo(top, smooth) {
    const target = this.docScrollOn ? window : this.viewScroll;
    target.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
  }

  open(index, { instant = false } = {}) {
    this.stopMotion();
    cancelAnimationFrame(this.revealAnim);
    if (index !== this.currentIndex || this.pos !== Math.round(this.pos)) {
      this.pos = index;
    }
    this.openIndex = index;
    this.readingIndex = index;
    this.fillChapter(index);

    this.view.classList.remove("is-closing");
    this.view.removeAttribute("inert");
    this.view.setAttribute("aria-hidden", "false");
    this.frame.classList.add("is-reading");
    this.setDocScroll(true);
    this.viewScroll.focus({ preventScroll: true });

    if (instant) {
      this.reveal = 1;
      this.update();
    } else {
      this.animateReveal(1);
    }
  }

  close() {
    if (this.openIndex < 0) return;
    const index = this.openIndex;
    const startScroll = this.scrollY;
    this.openIndex = -1;
    this.view.classList.add("is-closing");
    this.view.setAttribute("aria-hidden", "true");

    this.animateReveal(0, {
      onStep: (e) => { this.scrollY = startScroll * (1 - e); },
      onDone: () => {
        this.readingIndex = -1;
        this.scrollY = 0;
        this.viewScroll.scrollTop = 0;
        this.setDocScroll(false);
        if (this.pendingMeasure) {
          this.pendingMeasure = false;
          this.measure();
        }
        this.frame.classList.remove("is-reading");
        this.view.classList.remove("is-closing");
        this.view.setAttribute("inert", "");
        this.update();
        this.cards[index].focus({ preventScroll: true });
      }
    });
  }

  onViewScroll() {
    if (this.openIndex < 0) return;
    this.scrollY = this.viewScroll.scrollTop;
    this.update();
  }

  /**
   * 인트로 높이 = 75px 제목의 아래 끝 + 간격 → 본문 제목이 Gap 60 아래에서 이어진다
   * (introBottom: 제목 글상자의 아래 끝, 프레임 기준 px)
   */
  layoutIntro(introBottom) {
    const height = Math.round(introBottom + DESIGN.introGap - 11);
    if (height !== this.introHeight) {
      this.introHeight = height;
      this.viewIntro.style.height = `${height}px`;
    }
  }

  hitsEmblem(e) {
    const r = this.emblem.getBoundingClientRect();
    const pad = 8;
    return e.clientX >= r.left - pad && e.clientX <= r.right + pad && e.clientY >= r.top - pad && e.clientY <= r.bottom + pad;
  }

  /** 인트로: 카드를 누르면 목차로, 하단(화살표)을 누르면 본문으로 */
  onIntroClick(e) {
    if (this.openIndex < 0 || this.reveal < 1 || this.viewScroll.scrollTop > 4) return;
    if (e.target.closest("button, input, textarea, label, a, form")) return;
    if (this.hitsEmblem(e)) {
      this.emblem.click(); // 인트로 레이어가 로고를 덮고 있으므로 직접 전달
      return;
    }
    const rect = this.cards[this.openIndex].getBoundingClientRect();
    if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
      this.requestClose();
      return;
    }
    const frameRect = this.frame.getBoundingClientRect();
    if (e.clientY - frameRect.top > (720 - this.scale.y0) * this.scale.sy) {
      this.scrollContentTo(this.barTravel || this.viewIntro.offsetHeight, true);
    }
  }

  /** 인트로 맨 위에서 아래로 당기면 목차로 돌아간다 */
  bindPullToClose() {
    let startY = null;
    let pulled = 0;
    this.viewScroll.addEventListener("touchstart", (e) => {
      startY = this.viewScroll.scrollTop <= 0 ? e.touches[0].clientY : null;
      pulled = 0;
    }, { passive: true });
    this.viewScroll.addEventListener("touchmove", (e) => {
      if (startY === null) return;
      pulled = e.touches[0].clientY - startY;
    }, { passive: true });
    this.viewScroll.addEventListener("touchend", () => {
      if (startY !== null && pulled > DESIGN.pullToClose && this.viewScroll.scrollTop <= 0) this.requestClose();
      startY = null;
    });
  }

  buildChapter(index) {
    const ch = this.chapters[index];
    const frag = document.createDocumentFragment();

    frag.appendChild(el("h2", "cv-title typo-title", ch.title));
    if (ch.subtitle) frag.appendChild(el("p", "cv-subtitle typo-subtitle", ch.subtitle));
    if (ch.lead) frag.appendChild(el("p", "cv-body typo-body", ch.lead));
    (ch.blocks || []).forEach((block) => frag.appendChild(this.buildBlock(block)));

    // Next chapter
    const nextIndex = this.wrap(index + 1);
    const nextCh = this.chapters[nextIndex];
    const next = el("button", "cv-next");
    next.type = "button";
    next.appendChild(el("span", "typo-quote", nextCh.chapterNumber));
    next.appendChild(el("span", "typo-title", nextCh.title));
    next.addEventListener("click", () => {
      history.replaceState({ chapter: nextIndex }, "", `#chapter-${nextIndex + 1}`);
      this.pos = nextIndex;
      this.openIndex = nextIndex;
      this.readingIndex = nextIndex;
      this.fillChapter(nextIndex);
      this.update();
    });
    frag.appendChild(next);

    return frag;
  }

  /**
   * 추가 · 삭제 · 체크가 가능한 체크리스트.
   * 저장: localStorage "culer-list-{id}" → { done: [항목], removed: [기본 항목], added: [직접 추가한 항목] }
   * 기본 항목(chapters.js)은 글자 자체를 키로 쓰므로 순서가 바뀌거나 항목이 늘어나도 체크 상태가 유지된다
   */
  buildChecklist(block) {
    const key = `culer-list-${block.id}`;
    const defaults = block.items;
    let state = store.get(key, null);

    if (!state) {
      // 이전 버전(체크 위치만 저장)에서 이어받기
      const legacy = store.get(`culer-check-${block.id}`, []);
      state = {
        done: legacy.map((i) => defaults[i]).filter(Boolean),
        removed: [],
        added: []
      };
    }
    state.done = state.done || [];
    state.removed = state.removed || [];
    state.added = state.added || [];

    const wrap = el("div", "cv-checkgroup");
    const ul = el("ul", "cv-checklist");
    const form = el("form", "cv-check-add");
    const field = el("input", "cv-check-input");
    const addButton = el("button", "cv-check-addbtn");
    const reset = el("button", "cv-check-reset typo-caption", "기본 목록으로 되돌리기");

    field.type = "text";
    field.placeholder = "항목 추가";
    field.maxLength = 60;
    field.autocomplete = "off";
    field.enterKeyHint = "done";
    field.setAttribute("aria-label", "새 항목 입력");
    addButton.type = "submit";
    addButton.setAttribute("aria-label", "항목 추가");
    addButton.innerHTML = ICON_ADD;
    reset.type = "button";
    form.append(field, addButton);

    const save = () => store.set(key, state);
    const items = () => [...defaults.filter((t) => !state.removed.includes(t)), ...state.added];

    const render = () => {
      ul.replaceChildren();
      items().forEach((text) => {
        const li = el("li", "cv-check-item");
        const label = el("label");
        const input = el("input");
        input.type = "checkbox";
        input.checked = state.done.includes(text);
        input.addEventListener("change", () => {
          state.done = input.checked ? [...state.done, text] : state.done.filter((t) => t !== text);
          save();
        });
        label.append(input, el("span", "typo-body", text));

        const del = el("button", "cv-check-del");
        del.type = "button";
        del.setAttribute("aria-label", `${text} 삭제`);
        del.innerHTML = ICON_CLOSE;
        del.addEventListener("click", () => {
          if (defaults.includes(text)) state.removed = [...state.removed, text];
          state.added = state.added.filter((t) => t !== text);
          state.done = state.done.filter((t) => t !== text);
          save();
          render();
        });

        li.append(label, del);
        ul.appendChild(li);
      });
      reset.hidden = !(state.removed.length || state.added.length);
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = field.value.trim();
      if (!text) return;
      if (state.removed.includes(text)) state.removed = state.removed.filter((t) => t !== text);
      else if (!items().includes(text)) state.added = [...state.added, text];
      field.value = "";
      save();
      render();
      field.focus({ preventScroll: true }); // 키보드를 닫지 않고 이어서 추가
    });

    reset.addEventListener("click", () => {
      state = { done: state.done.filter((t) => defaults.includes(t)), removed: [], added: [] };
      save();
      render();
    });

    render();
    wrap.append(ul, form, reset);
    return wrap;
  }

  /** 직접 적는 메모. 입력하는 대로 저장된다 */
  buildNote(block) {
    const key = `culer-note-${block.id}`;
    const area = el("textarea", "cv-note typo-body");
    area.value = store.get(key, "");
    area.placeholder = block.placeholder || "여기에 적어 두세요";
    area.rows = 5;
    area.setAttribute("aria-label", block.placeholder || "메모");
    let timer = null;
    area.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(() => store.set(key, area.value), 300);
    });
    area.addEventListener("blur", () => store.set(key, area.value));
    return area;
  }

  buildBlock(block) {
    switch (block.type) {
      case "h1":
        return el("h3", "cv-h1 typo-h1", block.text);
      case "h2":
        return el("h3", "cv-h2 typo-h2", block.text);
      case "image": {
        const figure = el("figure", "cv-figure");
        const img = el("img");
        img.src = block.src;
        img.alt = block.alt || "";
        img.loading = "lazy";
        if (block.ratio) img.style.aspectRatio = block.ratio;   // 예: "4 / 3" (미리 자리를 잡아 로딩 시 밀리지 않게)
        if (block.focus) img.style.objectPosition = block.focus; // 잘릴 때 보여줄 중심, 예: "22% 50%"
        figure.appendChild(img);
        if (block.caption || block.credit) {
          const cap = el("figcaption", "typo-caption", block.caption || "");
          if (block.credit) cap.appendChild(el("span", "cv-credit", block.credit));
          figure.appendChild(cap);
        }
        return figure;
      }
      case "lyrics": {
        const wrap = el("div", "cv-lyrics");
        block.lines.forEach((l) => {
          const row = el("div", "cv-lyric");
          row.appendChild(el("p", "cv-lyric-say typo-subtitle", l.say));
          row.appendChild(el("p", "cv-lyric-text typo-body-serif", l.text));
          if (l.mean) row.appendChild(el("p", "cv-lyric-mean typo-h2-sub", l.mean));
          wrap.appendChild(row);
        });
        if (block.credit) wrap.appendChild(el("p", "cv-lyrics-credit typo-caption", block.credit));
        return wrap;
      }
      case "credits": {
        const ul = el("ul", "cv-credits");
        block.items.forEach((it) => {
          const li = el("li", "typo-caption");
          const a = el("a", null, it.label);
          a.href = it.href;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          li.append(a, document.createTextNode(` — ${it.by} · ${it.license}`));
          ul.appendChild(li);
        });
        return ul;
      }
      case "facts": {
        const dl = el("dl", "cv-facts");
        block.items.forEach((f) => {
          // 한글이 있으면 본문과 같은 규칙, 영문만 있으면 Instrument Serif 를 본문과 비슷한 크기로
          const labelClass = HANGUL.test(f.label) ? "typo-body" : "typo-body-serif";
          dl.appendChild(el("dt", labelClass, f.label));
          dl.appendChild(el("dd", "typo-body", f.value));
        });
        return dl;
      }
      case "phrase": {
        const box = el("div", "cv-phrase");
        box.appendChild(el("p", "cv-phrase-text typo-h1", block.text));
        if (block.say) box.appendChild(el("p", "cv-phrase-say typo-body", block.say));
        if (block.mean) box.appendChild(el("p", "cv-phrase-mean typo-h2-sub", block.mean));
        return box;
      }
      case "story": {
        // 짧은 썰: 라벨(연도·번호) → 제목 → 본문
        const box = el("div", "cv-story");
        if (block.label) {
          const labelClass = HANGUL.test(block.label) ? "cv-story-label typo-caption" : "cv-story-label typo-body-serif";
          box.appendChild(el("p", labelClass, block.label));
        }
        if (block.title) box.appendChild(el("h4", "cv-story-title", block.title));
        if (block.text) box.appendChild(el("p", "cv-story-text typo-body", block.text));
        return box;
      }
      case "quote": {
        // 한글 인용은 Asta Sans, 영문 인용은 Instrument Serif Italic
        const fig = el("figure", "cv-quote");
        const quoteClass = HANGUL.test(block.text) ? "cv-quote-text is-ko" : "cv-quote-text typo-quote";
        fig.appendChild(el("blockquote", quoteClass, block.text));
        if (block.by) fig.appendChild(el("figcaption", "cv-quote-by typo-caption", block.by));
        return fig;
      }
      case "links": {
        const wrap = el("div", "cv-links");
        block.items.forEach((it) => {
          const a = el("a", "cv-link typo-body", it.label);
          a.href = it.href;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          a.insertAdjacentHTML("beforeend", ICON_OPEN);
          wrap.appendChild(a);
        });
        return wrap;
      }
      case "note":
        return this.buildNote(block);
      case "checklist":
        return this.buildChecklist(block);
      default:
        return el("p", "cv-body typo-body", block.text);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.culerArchive = new CulerArchive(CHAPTERS_DATA);
});
