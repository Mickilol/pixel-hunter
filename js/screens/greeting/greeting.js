import GreetingView from './greeting-view';
import Application from '../../application';

export default class {

  constructor() {
    this._view = new GreetingView();
  }

  init() {
    this._view.show();

    this._view.onNext = () => {
      Application.showRules();
    };
  }

}
