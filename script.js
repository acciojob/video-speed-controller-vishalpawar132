const video = document.querySelector('.flex');
const speedBar = document.querySelector('.speed-bar');
const speed = document.querySelector('.speed input');

function togglePlay() {
  const icon = this.paused ? '►' : '❚ ❚';
  this.paused ? this.play() : this.pause();
  this.parentNode.querySelector('.player__button').textContent = icon;
}

function handleProgress() {
  const percent = (this.currentTime / this.duration) * 100;
  const progressBar = this.parentNode.querySelector('.progress__filled');
  progressBar.style.flexBasis = `${percent}%`;
}

function handleSpeedUpdate() {
  video.playbackRate = speed.value;
  speedBar.textContent = `${speed.value}×`;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleVolumeChange() {
  video.volume = this.value;
}

function handleVideoMousemove(event) {
  const scrubTime = (event.offsetX / video.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', () => video.parentNode.querySelector('.player__button').textContent = '❚ ❚');
video.addEventListener('pause', () => video.parentNode.querySelector('.player__button').textContent = '►');
video.addEventListener('timeupdate', handleProgress);

speed.addEventListener('change', handleSpeedUpdate);
speed.addEventListener('mousemove', handleSpeedUpdate);

const skipButtons = document.querySelectorAll('[data-skip]');
skipButtons.forEach(button => button.addEventListener('click', skip));

const volume = document.querySelector('[name="volume"]');
volume.addEventListener('change', handleVolumeChange);
volume.addEventListener('mousemove', handleVolumeChange);

const progress = document.querySelector('.progress');
progress.addEventListener('mousemove', handleVideoMousemove);
