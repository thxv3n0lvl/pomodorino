const uiElements = {
  timer: document.querySelector('div.counter h1'),
  player: document.querySelector('.player'),
  activity: document.querySelector('.activity'),
  activityList: document.querySelector('.activity--list > ul'),
  bar: document.querySelector('.bar'),
  progressBar: document.querySelector('.bar--progress'),
  icons: {
    pause: 'https://img.icons8.com/metro/26/000000/pause.png',
    play: 'https://img.icons8.com/android/24/000000/play.png'
  },
  activityActionSlot() { return this.activity.children[0] }
};

const POMODORO_TIME = 25;
const animationProps = (state) => `animation: progressbar ${POMODORO_TIME * 1000}ms;
                        animation-play-state: ${state};`
const activitiesCompleted = [];

const timer = {
  decrease: (el) => el.innerHTML --,
  from: (el) => el.innerHTML,
};

let intervalId = null;


const timeCounter = () => {
  if (uiElements.timer.innerHTML == 0) {
    endTimer('end');
    return;
  }
  // progressBarAnimation()()

  timer.decrease(uiElements.timer);

}

const progressBarAnimation = () => {
  let width = 1;
  const pomtime = 25;
  let count = 1;
  return function() {
    progressBar.style = `width: ${width}%`;
    width = (count * 100) / pomtime;
    count++;
  };
}

const initTimer = () => {
  uiElements.player.src = uiElements.icons.pause;
  intervalId = window.setInterval(timeCounter, 1000); // 60000 Executed every minute
  uiElements.progressBar.setAttribute('style', animationProps('running'));

}

const endTimer = (action) => {
  window.clearInterval(intervalId);
  uiElements.player.src = uiElements.icons.play;
  intervalId = null;
  if (action == 'end') {
    const val = uiElements.activityActionSlot().innerText;
    if (!val) return;
    addItemToActivityArray(val);
    addItemToActivityListUI(val);
    replaceElementWithContent(uiElements.activityActionSlot(), 'input', true);
  } else if (action == 'pause') {
    uiElements.progressBar.setAttribute('style', animationProps('paused'));
    replaceElementWithContent(uiElements.activityActionSlot(), 'input');
  }
}

const addItemToActivityArray = async (val) => await localSorage.setItem('items', activitiesCompleted.push(val));
const addItemToActivityListUI = (val) => uiElements.activityList.insertAdjacentHTML('beforeend', `<li>${val}</li>`);


const startTimer = () => {
  if(uiElements.player.src.indexOf('play') > 0
      && !Number.isInteger(intervalId)) {
    initTimer();
  } else {
    endTimer('pause');
  }
}

const replaceElementWithContent = (component, to, cleanText = false) => {
  const compProp = to == 'p' ? 'innerText' : 'value';
  const compPropValue = to == 'p' ? 'value' :'innerText';
  const el = document.createElement(to.toLowerCase());

  el[compProp] = cleanText ? '': component[compPropValue];
  component.replaceWith(el);
};

const setActivity = event => {
  if (event.target.value == '') return;
  if(event.keyCode === 13 || event.type == 'blur') {
    replaceElementWithContent(uiElements.activityActionSlot(), 'p')
    startTimer();
  }
}

const switchActivity = () => {
  if(uiElements.activityActionSlot().tagName.toLowerCase() === 'p') {
    endTimer('pause');
  }
}

const loadActivitiesStored = async () => {
  addItemToActivityArray(await localStorage.getItem('items'));

};

const setInitialTimerUI = (time) => uiElements.timer.innerHTML = time;

// loadActivitiesStored();
setInitialTimerUI(POMODORO_TIME);
uiElements.activity.addEventListener('keydown', setActivity);
uiElements.activity.addEventListener('blur', setActivity, true);

uiElements.activity.addEventListener('click', switchActivity);
uiElements.activity.addEventListener('focusin', switchActivity, true);
