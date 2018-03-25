import introScreen from './screens/intro';
import * as utils from './utils';

const backBtnHtml = `<div class="header__back">
      <span class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.png" width="101" height="44">
      </span>
    </div>`;

const header = document.createElement(`header`);
header.className = `header`;
header.innerHTML = backBtnHtml;

const backBtn = header.querySelector(`.header__back`);
backBtn.addEventListener(`click`, () => {
  utils.showScreen(introScreen);
});


export const createHeader = () => header;
