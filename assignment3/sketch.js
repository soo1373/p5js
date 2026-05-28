let bgC = 235; // 배경색 변화를 위한 변수

// 윙크 기능을 위한 상태 및 타이머 변수
let isWinking = false; // 현재 윙크 중인가?
let winkTimer = 0; // 윙크가 끝나는 시점 (frameCount)

function setup() {
  // [제약사항] 과제 2 사이즈(600 * 400) 유지
  createCanvas(600, 400);
}

function draw() {
  // [애니메이션] frameCount를 활용하여 배경의 보라색 기운이 부드럽게 순환함
  bgC = frameCount % 255;
  background(255, 235, bgC); 

  // 1. 뒷머리 (수현님의 고정된 머리 스타일 유지)
  noStroke();
  fill(45, 30, 20);
  ellipse(300, 170, 230, 210);
  rect(185, 170, 230, 150, 0, 0, 20, 20); 

  // 2. 목
  fill(255, 220, 190);
  rect(280, 280, 40, 40);

  // 3. 상체 (옷)
  fill(240, 100, 130);
  rect(170, 320, 260, 100, 60, 60, 0, 0);

  // 4. 얼굴
  fill(255, 224, 189);
  ellipse(300, 200, 190, 200);

  // 5. 귀와 귀걸이
  fill(255, 224, 189);
  circle(205, 210, 25);
  circle(395, 210, 25);
  fill(255, 215, 0);
  circle(205, 220, 8);
  circle(395, 220, 8);

  // 6. 앞머리 (이마 빈틈을 완벽히 채운 로직)
  fill(45, 30, 20);
  arc(300, 170, 190, 150, PI, TWO_PI, CHORD);
  rect(202, 170, 15, 50, 0, 0, 10, 10);
  rect(383, 170, 15, 50, 0, 0, 10, 10);

  // 7. 눈 인터랙션 (마우스 위치 추적 + 윙크 추가)
  
  // 눈동자 이동 좌표 계산 (constrain으로 안구 이탈 방지) - 윙크 모드에서도 사용하기 위해 위로 올림
  let mx = constrain(265 + (mouseX - 300) * 0.05, 255, 275);
  let my = constrain(212 + (mouseY - 200) * 0.05, 205, 215);

  if (keyIsPressed && key === ' ') {
    // [키보드 인터랙션 1] 스페이스바를 누르고 있으면 눈을 감음
    stroke(45, 30, 20);
    strokeWeight(3);
    noFill();
    arc(265, 212, 35, 10, 0, PI);
    arc(335, 212, 35, 10, 0, PI);
    
  } else if (isWinking && frameCount < winkTimer) {
    // 마우스 클릭 시 0.5초 동안 윙크!
    // 캐릭터 기준 왼쪽 눈(viewer 기준 왼쪽)은 귀엽게 감기
    stroke(45, 30, 20);
    strokeWeight(3);
    noFill();
    arc(265, 212, 35, 10, 0, PI); // 감은 눈
    
    // 오른쪽 눈(viewer 기준 오른쪽)은 평소처럼 뜨고 마우스를 따라감
    strokeWeight(2);
    fill(255);
    circle(335, 210, 45); // 눈 흰자
    
    noStroke();
    fill(45, 30, 20);
    circle(mx + 70, my, 25); // 눈동자 이동
    fill(255);
    circle(mx + 77, my - 5, 10); // 하이라이트

  } else {
    // 평소에는 눈을 뜨고 눈동자가 마우스를 따라감 (원래 코드)
    stroke(45, 30, 20);
    strokeWeight(2);
    fill(255);
    circle(265, 210, 45); 
    circle(335, 210, 45); 

    noStroke();
    fill(45, 30, 20);
    circle(mx, my, 25); // 왼쪽 눈동자
    circle(mx + 70, my, 25); // 오른쪽 눈동자

    fill(255);
    circle(mx + 7, my - 5, 10); // 눈 하이라이트
    circle(mx + 77, my - 5, 10);
  }

  // 8. 볼 홍조
  noStroke();
  fill(255, 180, 180, 150);
  ellipse(245, 250, 40, 20);
  ellipse(355, 250, 40, 20);

  // 9. 코와 입
  stroke(200, 140, 120);
  strokeWeight(2);
  noFill();
  arc(300, 245, 10, 6, 0, PI); // 코

  // [마우스 인터랙션 2] 마우스를 누르고 있으면 놀란 표정으로 변함
  // (윙크 클릭 순간에도 이 표정이 잠깐 나타날 수 있습니다.)
  if (mouseIsPressed) {
    fill(220, 80, 80);
    noStroke();
    ellipse(300, 275, 15, 20); 
  } else {
    stroke(220, 80, 80);
    noFill();
    arc(300, 275, 30, 20, 0.2, PI - 0.2); // 평소 입
  }
}

// [키보드 인터랙션 2] 's' 키를 누르면 10초간의 GIF 저장 시작
function keyPressed() {
  if (key === 's' || key === 'S') {
    saveGif('assignment3', 10); 
  }
}

// [추가 인터랙션] 마우스를 짧게 한 번 클릭하는 순간 실행되는 이벤트 함수
function mousePressed() {
  // 마우스가 캔버스 안에 있을 때만 작동하도록 가이드라인
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    isWinking = true; // 윙크 상태 켜기
    // 30프레임 (약 0.5초) 동안만 윙크 지속
    winkTimer = frameCount + 30; 
  }
}