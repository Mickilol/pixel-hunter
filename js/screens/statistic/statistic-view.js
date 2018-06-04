import AbstractView from '../../abstract-view';
import renderHeader from '../../header';
import renderStats from '../../stats';
import {CORRECT_ANSWER, QUICK_ANSWER, SLOW_ANSWER, LIVE_POINT, countPoints, resultType} from '../../data/data';


const calculateTotalPoints = (game) => {
  let gameStats = {points: game.lives * LIVE_POINT, normal: 0, fast: 0, slow: 0, lives: game.lives};

  game.results.map((answer) => {
    gameStats.points += countPoints(answer);
    switch (answer) {
      case resultType.fast:
        gameStats.fast++;
        gameStats.normal++;
        break;
      case resultType.slow:
        gameStats.slow++;
        gameStats.normal++;
        break;
      case resultType.correct:
        gameStats.normal++;
        break;
    }
  });

  return gameStats;
};

export default class extends AbstractView {

  constructor(stats) {
    super();

    this._stats = stats;
    window.console.log(this._stats);
  }


  get template() {
    return `
      ${renderHeader()}
      <div class="result">
      <h1>${this._stats[0].lives > 0 ? `Победа!` : `Проигрыш:(`}</h1>
      
      ${this._stats.map((game, index) => {
        const gameStats = calculateTotalPoints(game);
        return `
          <table class="result__table">
            <tr>
              <td class="result__number">${index + 1}.</td>
              <td colspan="2">
                ${renderStats(game.results)}
              </td>         
              ${game.lives > 0 ? `<td class="result__points">×&nbsp;${CORRECT_ANSWER}</td>
                                  <td class="result__total">${CORRECT_ANSWER * gameStats.normal}</td>` :
                                 `<td class="result__points"></td>
                                  <td class="result__total result__total--final">FAIL</td>`}          
              
            </tr>            
            
            ${game.lives > 0 ?
                                `
                                ${gameStats.fast > 0 ?
                                                      `<tr>
                                                        <td></td>
                                                        <td class="result__extra">Бонус за скорость:</td>
                                                        <td class="result__extra">${gameStats.fast}&nbsp;<span class="stats__result stats__result--fast"></span></td>
                                                        <td class="result__points">×&nbsp;${QUICK_ANSWER}</td>
                                                        <td class="result__total">${QUICK_ANSWER * gameStats.fast}</td>
                                                      </tr>` : ``}
                                ${gameStats.lives > 0 ?
                                                      `<tr>
                                                         <td></td>
                                                         <td class="result__extra">Бонус за жизни:</td>
                                                         <td class="result__extra">${gameStats.lives}&nbsp;<span class="stats__result stats__result--heart"></span></td>
                                                         <td class="result__points">×&nbsp;${LIVE_POINT}</td>
                                                         <td class="result__total">${LIVE_POINT * gameStats.lives}</td>
                                                       </tr>` : ``}
                                ${gameStats.slow > 0 ?
                                                      `<tr>
                                                         <td></td>
                                                         <td class="result__extra">Штраф за медлительность:</td>
                                                         <td class="result__extra">${gameStats.slow}&nbsp;<span class="stats__result stats__result--slow"></span></td>
                                                         <td class="result__points">×&nbsp;${SLOW_ANSWER}</td>
                                                         <td class="result__total">${SLOW_ANSWER * gameStats.slow}</td>
                                                       </tr>` : ``}
                                <tr>
                                  <td colspan="5" class="result__total  result__total--final">${gameStats.points}</td>
                                </tr>` : ``}
            
            
          </table>`;
      }).join(``)}
      </div>`.trim();
  }

  bind() {
    const backBtn = this.element.querySelector(`.back`);

    backBtn.addEventListener(`click`, () => {
      this.onBack();
    });
  }

  onBack() {

  }
}
