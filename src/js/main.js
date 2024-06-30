const canvas = document.getElementById("canvas");
const plane = document.getElementById("plane");

plane.style.position = "absolute";
plane.style.left = "100px";
plane.style.top = "100px";

const canvasHeight = canvas.offsetHeight;

let timer; // current timeout id to clear
function come() {
  /* do something */
}
let time; // dynamic interval

(function repeat() {
  come();
  timer = setTimeout(repeat, time / 100);

  if (timer <= canvasHeight - 270) plane.style.top = 200 + timer + "px";
})();
