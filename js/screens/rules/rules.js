import RulesView from './rules-view';
import Application from '../../application';
import {onBack} from "../../header";

export default class {

  init() {
    this._view = new RulesView();
    this._view.show();

    this._view.onStart = () => {
      Application.showGame();
    };

    this._view.onBack = onBack;
  }

}
