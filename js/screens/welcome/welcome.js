/* eslint-disable no-console */
import WelcomeView from './welcome-view';
import Application from '../../application';

export default class {

  init() {
    this._view = new WelcomeView();
    this._view.show();

    this._view.onStart = () => {
      Application.showGreeting();
    };
  }

}
