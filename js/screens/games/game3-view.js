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
    <form class="game__content  game__content--triple">        
      ${renderOption(this._question.answers[0], `Option 1`, null, 0)}
      ${renderOption(this._question.answers[1], `Option 1`, null, 1)}
      ${renderOption(this._question.answers[2], `Option 1`, null, 2)}
      </form>
      ${renderStats(this._state.results)}
    </div>`;
  }

  bind() {
    const backBtn = this.element.querySelector(`.back`);
    const gameOptionList = this.element.querySelectorAll(`.game__option`);
    this._timer = this.element.querySelector(`.game__timer`);

    const key = this._question.question.split(` `);
    window.console.log(key);

    Array.from(gameOptionList).forEach((item) => {
      item.addEventListener(`click`, (evt) => {
        this.onAnswer((this._question.answers[+evt.target.dataset.index].type === `painting` && key[1] === `рисунок`) || (this._question.answers[+evt.target.dataset.index].type === `photo` && key[1] === `фото`));
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
