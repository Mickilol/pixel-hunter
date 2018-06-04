/* eslint-disable no-console */
import Game1View from './game1-view';
import Game2View from './game2-view';
import Game3View from './game3-view';
import {MAX_QUESTIONS, QUICK_ANSWER_TIME, SLOW_ANSWER_TIME, resultType} from '../../data/data';
import {initialState, setLives, setTime} from '../../data/data';
import Application from '../../application';
import StatisticModel from '../statistic/statistic-model';

const QuestionType = {
  TWO_OF_TWO: `two-of-two`,
  TINDER_LIKE: `tinder-like`,
  ONE_OF_THREE: `one-of-three`
};

export default class {

  constructor(levelList) {
    this._levelList = levelList;

    this._gameViewsList = {
      [QuestionType.TWO_OF_TWO]: Game1View,
      [QuestionType.TINDER_LIKE]: Game2View,
      [QuestionType.ONE_OF_THREE]: Game3View
    };
  }

  init() {
    this._state = Object.assign({}, initialState);
    this._gameScreen = 0;

    this._view = this._createView(initialState, this._getQuestion());
    this._view.show();
    this._startTimer();
  }

  _createView(state) {
    const view = new this._gameViewsList[this._getQuestion().type](state, this._getQuestion());

    view.onAnswer = (isCorrectAnswer) => {
      this._stopTimer();

      this._checkAnswer(isCorrectAnswer);
    };

    view.onBack = () => {
      this._stopTimer();

      Application.showWelcome();
    };

    this._gameScreen++;

    return view;
  }

  _checkAnswer(isCorrectAnswer) {
    if (!isCorrectAnswer) {
      this._state = setLives(this._state, this._state.lives - 1);
    }

    this._state.results[this._state.question] = this._getResult(isCorrectAnswer);
    this._state.question++;

    this._changeScreen(this._state);
  }

  _changeScreen(state) {
    if (state.question < MAX_QUESTIONS && state.lives > 0) {
      this._state = Object.assign({}, this._state, {time: initialState.time});

      this._view = this._createView(this._state);
      this._view.show();
      this._startTimer();

    } else {
      Application.showPreloader();
      StatisticModel.send({lives: state.lives, results: state.results})
        .then(() => Application.showStatistic());
    }
  }

  _startTimer() {
    this._timer = setInterval(() => {
      this._state = setTime(this._state, this._state.time - 1);
      this._view.updateTimer(this._state.time);

      if (this._state.time <= 0) {
        this._stopTimer();

        this._checkAnswer(false);
      }

    }, 1000);
  }

  _stopTimer() {
    if (!this._timer) {
      return;
    }

    clearInterval(this._timer);
  }

  _getQuestion() {
    return this._levelList[this._state.question];
  }

  _getResult(isCorrectAnswer) {
    let result;

    if (!isCorrectAnswer) {
      result = resultType.wrong;
    } else if (this._state.time >= QUICK_ANSWER_TIME) {
      result = resultType.fast;
    } else if (this._state.time <= SLOW_ANSWER_TIME) {
      result = resultType.slow;
    } else {
      result = resultType.correct;
    }

    return result;
  }

}
