import StatisticView from './statistic-view';
import {onBack} from "../../header";
import StatisticModel from './statistic-model';

export default class {

  init() {
    StatisticModel.load()
      .then((data) => {
        this._view = new StatisticView(data);
        this._view.show();

        this._view.onBack = onBack;
      });
  }

}
