import game2Screen from './game-2';
import * as utils from '../utils';
import {levels} from "../data/data";
import renderGameOption from "../game-option";
import {changeGameScreen} from '../changeScreen';
import renderStats from '../stats';
// import {imagesList} from "../data";


export default (state) => {
  const html = `<div class="game">
    <p class="game__task">${levels[state.level].description}</p>
    <form class="game__content">
      ${renderGameOption(`http://placehold.it/468x458`, `Option 1`, 468, 458, `question1`)}
      ${renderGameOption(`http://placehold.it/468x458`, `Option 2`, 468, 458, `question2`)}
    </form>
      ${renderStats(state.results)}
  </div>`;

  const element = utils.getElementFromTemplate(html);
  const radioBtnList = element.querySelectorAll(`input[type=radio]`);

  Array.from(radioBtnList).forEach((item) => {
    item.addEventListener(`change`, () => {
      const question1Btn = element.querySelector(`input[name="question1"]:checked`);
      const question2Btn = element.querySelector(`input[name="question2"]:checked`);

      if (question1Btn && question2Btn) {
        changeGameScreen(state, game2Screen);
      }
    });
  });

  return element;
};
