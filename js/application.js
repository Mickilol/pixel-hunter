import Welcome from './screens/welcome/welcome';
import Greeting from './screens/greeting/greeting';
import Rules from './screens/rules/rules';
import Game from './screens/games/game';
import Statistic from './screens/statistic/statistic';

const ControllerID = {
  WELCOME: ``,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME: `game`,
  STATISTIC: `stats`,
};

const getControllerIDFromHash = (hash) => hash.replace(`#`, ``);

class App {

  constructor() {
    this._routes = {
      [ControllerID.WELCOME]: Welcome,
      [ControllerID.GREETING]: Greeting,
      [ControllerID.RULES]: Rules,
      [ControllerID.GAME]: Game,
      [ControllerID.STATISTIC]: Statistic,
    };

    window.onhashchange = () => {
      this._changeController(getControllerIDFromHash(location.hash));
    };
  }

  _changeController(route = ``) {
    const Controller = this._routes[route];
    new Controller().init();
  }

  init() {
    this._changeController(getControllerIDFromHash(location.hash));
  }

  showWelcome() {
    location.hash = ControllerID.WELCOME;
  }

  showGreeting() {
    location.hash = ControllerID.GREETING;
  }

  showRules() {
    location.hash = ControllerID.RULES;
  }

  showGame() {
    location.hash = ControllerID.GAME;
  }

  showStatistic() {
    location.hash = ControllerID.STATISTIC;
  }

}

const Application = new App();
export default Application;
