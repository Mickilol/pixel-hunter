import game3Screen from './game-3';
import * as utils from '../utils';
import {levels} from '../data/data';
import renderOption from '../game-option';
import {changeGameScreen} from "../changeScreen";
import renderStats from '../stats';

export default (state) => {
  const html = `<div class="game">
    <p class="game__task">${levels[state.level].description}</p>
    <form class="game__content  game__content--wide">
      ${renderOption(`http://placehold.it/705x455`, `Option 1`, 705, 455, `question1`)}
    </form>
    ${renderStats(state.results)}
  </div>`;

  const element = utils.getElementFromTemplate(html);
  const radioBtnList = element.querySelectorAll(`input[type=radio]`);

  Array.from(radioBtnList).forEach((item) => {
    item.addEventListener(`change`, () => {
      changeGameScreen(state, game3Screen);
    });
  });

  return element;
};
