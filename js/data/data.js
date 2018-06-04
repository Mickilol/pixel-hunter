export const MAX_QUESTIONS = 10;
const MAX_LIVES = 3;
export const TIME_FOR_QUESTION = 30;
export const QUICK_ANSWER_TIME = 20;
export const SLOW_ANSWER_TIME = 10;
const START_POINTS = 0;
export const CORRECT_ANSWER = 100;
export const QUICK_ANSWER = 50;
export const SLOW_ANSWER = -50;
export const LIVE_POINT = 50;

export const initialState = Object.freeze({
  results: new Array(MAX_QUESTIONS).fill(`unknown`),
  lives: MAX_LIVES,
  question: 0, // Current question
  time: TIME_FOR_QUESTION, // Remain time
  points: START_POINTS
});

export const statsResultList = {
  wrong: `stats__result--wrong`,
  slow: `stats__result--slow`,
  fast: `stats__result--fast`,
  correct: `stats__result--correct`,
  unknown: `stats__result--unknown`
};

export const resultType = {
  wrong: `wrong`,
  slow: `slow`,
  fast: `fast`,
  correct: `correct`
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

export const countPoints = (answerType) => {
  if (typeof answerType !== `string`) {
    throw new Error(`Parameters shouldn't be undefined or incorrect parameter type.`);
  }

  let points = 0;
  if (answerType !== resultType.wrong) {
    points = CORRECT_ANSWER;

    if (answerType === resultType.fast) {
      points += QUICK_ANSWER;
    } else if (answerType === resultType.slow) {
      points += SLOW_ANSWER;
    }
  }

  return points;
};
