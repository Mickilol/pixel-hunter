const MAX_QUESTIONS = 10;
const MAX_LIVES = 3;
const TIME_FOR_QUESTION = 30;
const START_LEVEL = `level-0`;
const START_POINTS = 0;
const CORRECT_ANSWER = 100;
const QUICK_ANSWER = 50;
const SLOW_ANSWER = -50;

export const initialState = Object.freeze({
  results: new Array(MAX_QUESTIONS).fill(`unknown`),
  level: START_LEVEL,
  lives: MAX_LIVES,
  question: MAX_QUESTIONS, // Remain question
  time: TIME_FOR_QUESTION, // Remain time
  points: START_POINTS
});

export const levels = Object.freeze({
  [START_LEVEL]: {
    description: `Угадайте для каждого изображения фото или рисунок?`,
    next: `level-1`
  },

  'level-1': {
    description: `Угадай, фото или рисунок?`,
    next: `level-2`
  },

  'level-2': {
    description: `Найдите рисунок среди изображений`,
    next: START_LEVEL
  }
});

export const statsResultList = {
  wrong: `stats__result--wrong`,
  slow: `stats__result--slow`,
  fast: `stats__result--fast`,
  correct: `stats__result--correct`,
  unknown: `stats__result--unknown`
};

export const imagesList = {
  paintings: [
    `https://k42.kn3.net/CF42609C8.jpg`,
    `https://k42.kn3.net/D2F0370D6.jpg`,
    `https://k32.kn3.net/5C7060EC5.jpg`
  ],
  photos: [
    `http://i.imgur.com/1KegWPz.jpg`,
    `https://i.imgur.com/DiHM5Zb.jpg`,
    `http://i.imgur.com/DKR1HtB.jpg`
  ]
};

const checkTimeValue = (time) => {
  if (isNaN(time) || time < 0 || time > TIME_FOR_QUESTION) {
    throw new RangeError(`Incorrect time. Time must be between 0...${TIME_FOR_QUESTION}.`);
  }
};

export const setTime = (state, time) => {
  if (typeof state !== `object` || typeof state.time !== `number` || typeof time !== `number`) {
    throw new TypeError(`Invalid parameters type`);
  }

  checkTimeValue(time);
  const newState = Object.assign({}, state, {time});

  return newState;
};

const checkLivesValue = (lives) => {
  if (isNaN(lives) || lives < 0 || lives > MAX_LIVES) {
    throw new RangeError(`Incorrect lives. Lives must be between 0...${MAX_LIVES}.`);
  }
};

export const setLives = (state, lives) => {
  if (typeof state !== `object` || typeof state.lives !== `number` || typeof lives !== `number`) {
    throw new TypeError(`Invalid parameters type`);
  }

  checkLivesValue(lives);
  const newState = Object.assign({}, state, {lives});

  return newState;
};

export const countPoints = (state, answer) => {
  if (typeof state !== `object` || typeof state.time !== `number` ||
      typeof state.points !== `number` || typeof answer !== `boolean`) {
    throw new TypeError(`Invalid parameters type`);
  }

  const newState = Object.assign({}, state);

  if (state.time <= 0) {
    return newState;
  }


  if (answer) {
    newState.points += CORRECT_ANSWER;

    if (newState.time >= 20) {
      newState.points += QUICK_ANSWER;
    } else if (newState.time <= 10) {
      newState.points += SLOW_ANSWER;
    }

  }

  if (state.question === 0) {
    newState.points += (newState.lives * 50);
  }

  return newState;
};
