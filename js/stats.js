import {statsResultList} from './data';

export default (resultsList = []) => {
  return `<div class="stats">
      <ul class="stats">
        ${resultsList.map((item) => `<li class="stats__result ${statsResultList[item]}"></li>`)}
      </ul>
    </div>`;
};
