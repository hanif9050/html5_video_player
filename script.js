// Get our Elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullScreen = player.querySelector(".fullScreen");

// function
function togglePlay() {
  //   if (video.paused) {
  //     video.play();
  //   } else {
  //     video.pause();
  //   }
  const method = video.paused ? "play" : "pause";
  video[method]();
}

function updateButton() {
  const icon = video.paused ? "▶" : "⏸";

  toggle.textContent = icon;
}

function handleProgressBar() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
function rangeUpdate() {
  video[this.name] = this.value;
}

function progressStatus(e) {
  console.log(e.offsetX, progress.offsetWidth);
  const runTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = runTime;
}
function handleSkip() {
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}
// events
video.addEventListener("click", togglePlay);

video.addEventListener("play", updateButton);

video.addEventListener("pause", updateButton);

video.addEventListener("timeupdate", handleProgressBar);

toggle.addEventListener("click", togglePlay);
ranges.forEach(function (range) {
  range.addEventListener("change", rangeUpdate);
  range.addEventListener("mousemove", rangeUpdate);
});
let mouseDown = false;
progress.addEventListener("click", progressStatus);

progress.addEventListener("mousemove", (e) => mouseDown && progressStatus(e));
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));

skipButtons.forEach(function (skip) {
  skip.addEventListener("click", handleSkip);
});

fullScreen.addEventListener("click", (e) => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  }
});
