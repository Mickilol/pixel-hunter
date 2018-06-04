/* eslint-disable no-console */
import AbstractView from "../../abstract-view";
import renderGameOption from "../../game-option";
import renderStats from '../../stats';
import renderHeader from '../../header';
// import {imagesList} from "../data";


export default class extends AbstractView {

  constructor(state, question) {
    super();
    this._question = question;
    this._state = state;
  }

  get template() {
    return `
    ${renderHeader(this._state)}
    <div class="game">
    <p class="game__task">${this._question.question}</p>
    <form class="game__content">
      ${renderGameOption(this._question.answers[0], `Option 1`, `question1`)}
      ${renderGameOption(this._question.answers[1], `Option 2`, `question2`)}
    </form>
    ${renderStats(this._state.results)}
  </div>`;
  }

  bind() {
    const backBtn = this.element.querySelector(`.back`);
    const radioListNode = this.element.querySelectorAll(`input[type='radio']`);
    const gameContent = this.element.querySelector(`.game__content`);
    this._timer = this.element.querySelector(`.game__timer`);

    const changeRadioHandler = (evt) => {
      evt.preventDefault();

      const question1Group = gameContent.querySelector(`input[name="question1"]:checked`);
      const question2Group = gameContent.querySelector(`input[name="question2"]:checked`);

      if (question1Group && question2Group) {
        this.onAnswer(question1Group.value === this._question.answers[0].type && question2Group.value === this._question.answers[1].type);
      }
    };

    Array.from(radioListNode).forEach((item) => {
      item.addEventListener(`change`, changeRadioHandler);
    });

    backBtn.addEventListener(`click`, () => {
      this.onBack();
    });
  }

  updateTimer(time) {
    this._timer.innerHTML = time;
  }

  onAnswer() {

  }

  onBack() {

  }
}
