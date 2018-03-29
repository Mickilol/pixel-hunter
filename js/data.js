const MAX_QUESTIONS = 10;
const MAX_LIVES = 3;
const TIME_FOR_QUESTION = 30;
const START_LEVEL = `level-0`;

export const initialState = Object.freeze({
  results: new Array(MAX_QUESTIONS).fill(`unknown`),
  level: START_LEVEL,
  lives: MAX_LIVES,
  question: MAX_QUESTIONS,
  time: TIME_FOR_QUESTION
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
