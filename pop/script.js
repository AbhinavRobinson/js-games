window.onload = function () {
  // get DOM
  var canvas = document.getElementById("viewport");
  var context = canvas.getContext("2d");

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
    drawFrame();
  }

  // add mouse events
  function onClick(e) {}

  // init
  init();
};
