
let timerUI = document.querySelector('div.counter h1');
let playerUI = document.querySelector('.player');
let activityUI = document.querySelector('.activity');
let intervalId = null;
const playerPauseIcon = 'https://img.icons8.com/metro/26/000000/pause.png';
const playerPlayIcon = 'https://img.icons8.com/android/24/000000/play.png';
const hasValue = el => el.textContent.trim() === ''

// timer stuff
var initTimer = () => {
  playerUI.src = playerPauseIcon;
  intervalId = window.setInterval(() => {
    timerUI.innerHTML == 0 ? endTimer() : timerUI.innerHTML --;
  }, 1000); // 60000 Executed every minute
}

const endTimer = () => {
  window.clearInterval(intervalId);
  playerUI.src = playerPlayIcon;
  intervalId = null;
}

const startTimer = () => {
  if(playerUI.src.indexOf('play') > 0
      && !Number.isInteger(intervalId)) {
    initTimer()
  } else {
    endTimer()
  }
}

const setActivity = event => {
  if(event.keyCode === 13) {
    // console.log(hasValue(activityUI))
    // if(hasValue(activityUI)) return;
    // configures the paragraph
    var p = document.createElement('p')
    p.innerText = activityUI.children[0].value;
    activityUI.children[0].replaceWith(p);

    startTimer();
  }
}

const switchActivity = () => {
  if(activityUI.children[0].tagName === 'P') {
    console.log('here');
  }
}

playerUI.addEventListener('click', startTimer);
activityUI.addEventListener('keydown', setActivity);
activityUI.addEventListener('click', switchActivity);
