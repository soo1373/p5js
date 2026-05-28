let stars = [];

function setup() {
  createCanvas(600, 400);
  // 별 위치 미리 랜덤 생성
  for (let i = 0; i < 60; i++) {
    stars.push({ x: random(600), y: random(180), size: random(1.5, 4) });
  }
  saveGif('animation', 8); // 8초 GIF
}

function draw() {
  let t = frameCount * 0.01; // 전체 시간
  let cycle = constrain(frameCount / 480, 0, 1); // 480프레임(8초) 동안 0→1
  // ──────────── 배경 (색상 변화: lerpColor로 낮↔밤) ────────────
  let daySky   = color(255, 250, 220);
  let duskSky  = color(255, 140, 80);   // 노을
  let nightSky = color(10, 10, 40);     // 밤하늘
  let skyCol;
  if (cycle < 0.5) {
    skyCol = lerpColor(daySky, duskSky, cycle * 2);
  } else {
    skyCol = lerpColor(duskSky, nightSky, (cycle - 0.5) * 2);
  }
  background(skyCol);

  // ──────────── ⭐ 별 (밤에만 등장: 크기 변화) ────────────
  let starAlpha = map(cycle, 0.6, 1.0, 0, 255);
  for (let s of stars) {
    let twinkle = s.size + sin(frameCount * 0.1 + s.x) * 1.2; // 반짝임
    noStroke();
    fill(255, 255, 200, starAlpha);
    circle(s.x, s.y, twinkle);
  }

  // ──────────── 들판 (밤에 어두워짐) ────────────
  let fieldCol = lerpColor(color(34, 139, 34, 150), color(10, 40, 10, 150), cycle);
  noStroke();
  fill(fieldCol);
  rect(0, 250, 600, 150);

  let fieldCol2 = lerpColor(color(144, 238, 144, 100), color(20, 60, 20, 100), cycle);
  fill(fieldCol2);
  rect(100, 280, 400, 70);

  let fieldCol3 = lerpColor(color(107, 142, 35, 120), color(15, 50, 15, 120), cycle);
  fill(fieldCol3);
  quad(0, 320, 200, 260, 400, 300, 600, 280);

  // ──────────── 배경 산 ────────────
  let mtnCol1 = lerpColor(color(100, 149, 237, 100), color(20, 20, 80, 100), cycle);
  fill(mtnCol1);
  triangle(0, 250, 150, 100, 300, 250);

  let mtnCol2 = lerpColor(color(70, 130, 180, 120), color(15, 15, 60, 120), cycle);
  fill(mtnCol2);
  triangle(100, 250, 250, 80, 400, 250);

  let mtnCol3 = lerpColor(color(30, 144, 255, 80), color(10, 10, 50, 80), cycle);
  fill(mtnCol3);
  triangle(200, 250, 400, 60, 600, 250);

  // ──────────── ☀️ 태양 (기본 애니메이션: 호를 그리며 이동) ────────────
  // cycle 0=왼쪽 하늘, 0.5=오른쪽 하늘, 1=지평선 아래
  let sunAngle = map(cycle, 0, 1, PI, TWO_PI); // 왼쪽→오른쪽 호
  let sunX = 300 + cos(sunAngle) * 280;
  let sunY = 260 + sin(sunAngle) * 220; // 호의 중심을 지평선 근처에

  // 태양 색상: 낮=노랑, 노을=주황빨강, 밤=숨김
  let sunAlpha = map(cycle, 0.75, 1.0, 255, 0);
  let sunCol = lerpColor(color(255, 215, 0), color(255, 60, 0), min(cycle * 2, 1));
  fill(red(sunCol), green(sunCol), blue(sunCol), sunAlpha);
  noStroke();
  circle(sunX, sunY, 60);

  // 노을 글로우 (태양 주변 빛)
  if (cycle > 0.3) {
    let glowAlpha = map(cycle, 0.3, 0.8, 0, 80);
    fill(255, 100, 0, glowAlpha);
    circle(sunX, sunY, 110);
  }

  // ──────────── 구름 (색상 변화: lerpColor 낮↔노을↔밤) ────────────
  let cBase1 = lerpColor(color(255, 140, 0, 180), color(180, 60, 60, 100), cycle);
  let cBase2 = lerpColor(color(255, 165, 0, 150), color(100, 40, 80, 80), cycle);
  let cBase3 = lerpColor(color(255, 215, 0, 120), color(60, 30, 80, 60), cycle);

  fill(cBase1); ellipse(400, 200, 100, 60);
  fill(cBase2); ellipse(350, 180, 80, 50);
  fill(cBase3); ellipse(450, 220, 120, 70);

  // 낮에만 보이는 작은 도형들
  let shapeAlpha = map(cycle, 0.5, 0.8, 200, 0);
  noStroke();
  fill(255, 100, 100, shapeAlpha); circle(320, 220, 30);
  fill(255, 180, 100, shapeAlpha); square(420, 170, 25);
  fill(255, 120, 60, shapeAlpha);  circle(470, 190, 40);

  // ──────────── 회색 점 ────────────
  let dotCol = lerpColor(color(150, 150, 150, 100), color(80, 80, 80, 80), cycle);
  strokeWeight(10); stroke(dotCol);
  point(100, 350); point(120, 370); point(140, 360);
  strokeWeight(1); noStroke();

  // ──────────── 🌻 노란 꽃 (크기 변화: 밤에 오므라듦) ────────────
  let flowerOpen = map(cycle, 0.4, 0.9, 1.0, 0.3); // 낮=활짝, 밤=오므라듦
  let petalSize  = (15 + sin(t * 2) * 4) * flowerOpen;
  let centerSize = (25 + sin(t * 2) * 5) * flowerOpen;
  let flowerCol  = lerpColor(color(255, 200, 0, 200), color(100, 80, 0, 120), cycle);

  fill(flowerCol); circle(250, 320, centerSize);
  fill(255, 255, 100, map(cycle, 0.4, 0.9, 150, 40));
  ellipse(250, 320 - centerSize * 0.5, petalSize, petalSize + 10);
  ellipse(250, 320 + centerSize * 0.5, petalSize, petalSize + 10);
  ellipse(250 - centerSize * 0.5, 320, petalSize + 10, petalSize);
  ellipse(250 + centerSize * 0.5, 320, petalSize + 10, petalSize);

  // ──────────── 🌸 핑크 꽃 (크기 변화 + 색상 변화) ────────────
  let pinkSize      = (20 + sin(t * 1.5 + 1) * 4) * flowerOpen;
  let petalPinkSize = (15 + sin(t * 1.5 + 1) * 3) * flowerOpen;
  let p1  = color(255, 150, 150, 200);
  let p2  = color(255, 100, 200, 200);
  let pNight = color(80, 30, 60, 100);
  let pinkCol = lerpColor(lerpColor(p1, p2, (sin(t) + 1) / 2), pNight, cycle);

  fill(pinkCol); circle(120, 290, pinkSize);
  fill(255, 200, 200, map(cycle, 0.4, 0.9, 180, 40));
  circle(110, 280, petalPinkSize); circle(130, 280, petalPinkSize);
  circle(110, 300, petalPinkSize); circle(130, 300, petalPinkSize);

  // ──────────── 보라 꽃 무리 (크기 변화) ────────────
  let purpleSize = (6 + sin(t * 2.5 + 0.5) * 2.5) * flowerOpen;
  let purpleCol  = lerpColor(color(180, 150, 255, 150), color(60, 40, 100, 80), cycle);
  strokeWeight(purpleSize); stroke(purpleCol);
  point(480, 340); point(495, 350); point(485, 365); point(505, 335);
  strokeWeight(1);
}