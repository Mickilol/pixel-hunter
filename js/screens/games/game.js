/* eslint-disable no-console */
import Game1View from './game1-view';
import Game2View from './game2-view';
import Game3View from './game3-view';
import {levels} from '../../data/data';
import {initialState, setLives, setTime} from '../../data/data';
import Application from '../../application';

export default class {

  constructor(state = Object.assign({}, initialState)) {
    this._state = state;
    this._gameScreensList = [Game1View, Game2View, Game3View];
    this._gameScreen = 0;
  }

  init() {
    this._view = this._createView(initialState);
    this._view.show();
    this._startTimer();
  }

  _createView(state) {
    const view = new this._gameScreensList[this._gameScreen % this._gameScreensList.length](state);

    view.onAnswer = () => {
      this._stopTimer();

      this._checkAnswer(true);
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

    this._state.results.push({
      guess: isCorrectAnswer,
      time: this._state.time
    });
    this._state.level = levels[this._state.level].next;
    this._state.question--;

    this._changeScreen(this._state);
  }

  _changeScreen(state) {
    if (state.question > 0 && state.lives > 0) {
      this._state = Object.assign({}, this._state, {time: initialState.time});

      this._view = this._createView(this._state);
      this._view.show();
      this._startTimer();

    } else {
      Application.showStatistic(this._state);
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

}
