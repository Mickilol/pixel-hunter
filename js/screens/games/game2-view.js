import AbstractView from "../../abstract-view";
import renderOption from '../../game-option';
import renderStats from '../../stats';
import renderHeader from '../../header';

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
    <form class="game__content  game__content--wide">
      ${renderOption(this._question.answers[0], `Option 1`, `question1`)}
    </form>
    ${renderStats(this._state.results)}
  </div>`;
  }

  bind() {
    const backBtn = this.element.querySelector(`.back`);
    const gameContentNode = this.element.querySelector(`.game__content`);
    const radioBtnList = gameContentNode.querySelectorAll(`input[type=radio]`);
    this._timer = this.element.querySelector(`.game__timer`);

    Array.from(radioBtnList).forEach((item) => {
      item.addEventListener(`change`, () => {
        this.onAnswer(gameContentNode.querySelector(`input[name="question1"]:checked`).value === this._question.answers[0].type);
      });
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
