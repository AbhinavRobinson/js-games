window.onload = function () {
  // get DOM
  var canvas = document.getElementById("viewport");
  var ctx = canvas.getContext("2d");

  Cycles = 0;

  // bg color
  canvas.style.backgroundColor = "#5555aa";
  ctx.save();
  // declare variables
  var p1_score = 0;
  var p2_score = 0;
  var time = 10 * 100;
  const FRAMES_PER_SECOND = 50;

  const FRAME_MIN_TIME =
    (1000 / 60) * (60 / FRAMES_PER_SECOND) - (1000 / 60) * 0.5;
  var lastFrameTime = 0;

  // Initialize the game
  function init() {
    // Add mouse events
    canvas.addEventListener("click", onClick);

    t = 0;

    main(0);
    // requestAnimationFrame(main);
  }

  // Main loop
  function main(ft) {
    if (ft - lastFrameTime < FRAME_MIN_TIME) {
      requestAnimationFrame(main);
      return;
    }
    lastFrameTime = ft;
    clear();

    render(t);
    // render(t);
    document.getElementById("TIME").innerHTML =
      "Score : " + Cycles + " | Time : " + parseInt(t);

    if ((t / time) * 100 > 1) {
      t = 0;
      Cycles += 1;
    } else {
      t += 1 / 50;
    }

    requestAnimationFrame(main);
  }

  // Render the game
  function render(t) {
    // Draw the frame

    cmp = (t / time) * 100 * 175;

    Balloon(250, 50 + cmp);
    drawSpikes(0, 500 - cmp);

    ctx.beginPath();
    ctx.moveTo(0, 500);
    ctx.lineTo(0, 499 - cmp);
    ctx.lineTo(500, 499 - cmp);
    ctx.lineTo(500, 500);
    ctx.fillStyle = "#333";
    ctx.fill();
  }

  function Balloon(x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, 50, 0, Math.PI * 2, true);
    ctx.fillStyle = "#aa55ee";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y + 50);
    ctx.lineTo(x + 10, y + 65);
    ctx.lineTo(x - 10, y + 65);
    ctx.fillStyle = "#aa55ee";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y + 65);
    ctx.lineTo(x, y + 200);
    ctx.strokeStyle = "#eeeeee";
    ctx.stroke();
  }

  function drawSpikes(x, y) {
    spikes(x, y);
    spikes(x + 100, y);
    spikes(x + 200, y);
    spikes(x + 300, y);
    spikes(x + 400, y);
  }

  function spikes(x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 50, y - 50);
    ctx.lineTo(x + 100, y);
    ctx.fillStyle = "#333";
    ctx.fill();
  }

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // add mouse events
  function onClick(e) {}

  // init
  init();
};
