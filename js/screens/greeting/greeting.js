import GreetingView from './greeting-view';
import Application from '../../application';

export default class {

  init() {
    this._view = new GreetingView();
    this._view.show();

    this._view.onNext = () => {
      Application.showRules();
    };
  }

}
