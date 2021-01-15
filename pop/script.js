window.onload = function () {
  // get DOM
  var canvas = document.getElementById("viewport");
  var ctx = canvas.getContext("2d");

  // bg color
  canvas.style.backgroundColor = "#5555aa";

  // declare variables
  var p1_score = 0;
  var p2_score = 0;
  var time = 0;

  // Initialize the game
  function init() {
    // Add mouse events
    canvas.addEventListener("click", onClick);

    // get main loop
    main(0);
  }

  // Main loop
  function main(tframe) {
    render();
  }

  // Render the game
  function render() {
    // Draw the frame
    drawSpikes(0, 500);
    Balloon(250, 200);
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
    ctx.fillStyle = "#777";
    ctx.fill();
  }

  // add mouse events
  function onClick(e) {}

  // init
  init();
};
