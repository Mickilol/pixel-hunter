import statsScreen from './screens/stats';
import {levels} from './data/data';
import {showScreen} from './utils';

export const changeGameScreen = (state, screenFunction) => {
  const questionCount = state.question - 1;
  if (questionCount > 0) {
    showScreen(screenFunction(Object.assign({}, state, {
      level: levels[state.level].next,
      question: questionCount
    })), true);
  } else {
    showScreen(statsScreen, true);
  }
};
