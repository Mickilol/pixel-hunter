import StatisticView from './statistic-view';
import {onBack} from "../../header";

export default class {

  constructor() {
    this._view = new StatisticView();
  }

  init() {
    this._view.show();

    this._view.onBack = onBack;
  }

}
