
let timerUI = document.querySelector('div.counter h1');
let playerUI = document.querySelector('.player');
let activityUI = document.querySelector('.activity');
let barUI = document.querySelector('.bar');
let intervalId = null;
const playerPauseIcon = 'https://img.icons8.com/metro/26/000000/pause.png';
const playerPlayIcon = 'https://img.icons8.com/android/24/000000/play.png';

// timer stuff
var initTimer = () => {
  playerUI.src = playerPauseIcon;
  intervalId = window.setInterval(() => {
    if(timerUI.innerHTML == 0) {
      endTimer();
    } else {
      timerUI.innerHTML --;

    }

  }, 1000); // 60000 Executed every minute
  barUI.setAttribute('style', `animation: foobar ${timerUI.innerHTML * 1000}ms;`);
}

const endTimer = () => {
  window.clearInterval(intervalId);
  playerUI.src = playerPlayIcon;
  intervalId = null;
}

const startTimer = () => {

  if(playerUI.src.indexOf('play') > 0
      && !Number.isInteger(intervalId)) {
    initTimer();
  } else {
    endTimer();
  }

}

const setActivity = event => {
  if(event.keyCode === 13) {
    // configures the paragraph
    let p = document.createElement('p')
    p.innerText = activityUI.children[0].value;
    activityUI.children[0].replaceWith(p);

    startTimer();
  }
}

const switchActivity = () => {
  if(activityUI.children[0].tagName === 'P') {
    let input = document.createElement('input')
    input.value = activityUI.children[0].innerText;
    activityUI.children[0].replaceWith(input);

    endTimer();
  }
}


playerUI.addEventListener('click', startTimer);
activityUI.addEventListener('keydown', setActivity);
activityUI.addEventListener('click', switchActivity);
