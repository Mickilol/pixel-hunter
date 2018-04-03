/* eslint-disable no-console */
import WelcomeView from './welcome-view';
import Application from '../../application';

export default class {

  constructor() {
    this._view = new WelcomeView();
  }

  init() {
    this._view.show();

    this._view.onStart = () => {
      Application.showGreeting();
    };
  }

}
