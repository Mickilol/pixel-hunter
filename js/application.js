import Preloader from './screens/preloader/preloader';
import Welcome from './screens/welcome/welcome';
import Greeting from './screens/greeting/greeting';
import Rules from './screens/rules/rules';
import Game from './screens/games/game';
import Statistic from './screens/statistic/statistic';
import Model from "./model";
import {preloadImages} from './utils';

const ControllerID = {
  WELCOME: ``,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME: `game`,
  STATISTIC: `stats`,
};

const getControllerIDFromHash = (hash) => hash.replace(`#`, ``);

class App {

  init() {
    this.showPreloader();

    this.model = new class extends Model {
      get urlRead() {
        return `https://intensive-ecmascript-server-srmhvdwcks.now.sh/pixel-hunter/questions`;
      }

      get urlWrite() {
        return `https://intensive-ecmascript-server-srmhvdwcks.now.sh/pixel-hunter/stats/admin`;
      }
    }();

    this.model.load()
      .then((data) => {
        preloadImages(data)
          .then(() => this._setup(data))
          .then(() => this._changeController(getControllerIDFromHash(location.hash)));
      })
      .catch(window.console.error);
  }

  _setup(data) {
    this._routes = {
      [ControllerID.WELCOME]: new Welcome(),
      [ControllerID.GREETING]: new Greeting(),
      [ControllerID.RULES]: new Rules(),
      [ControllerID.GAME]: new Game(data),
      [ControllerID.STATISTIC]: new Statistic(),
    };

    window.onhashchange = () => {
      this._changeController(getControllerIDFromHash(location.hash));
    };
  }

  _changeController(route = ``) {
    const GameStateClass = this._routes[route];

    if (!GameStateClass) {
      return;
    }

    GameStateClass.init();
  }

  showPreloader() {
    new Preloader().init();
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
