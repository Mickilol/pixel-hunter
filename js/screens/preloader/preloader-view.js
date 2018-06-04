import AbstractView from '../../abstract-view';

export default class extends AbstractView {
  get template() {
    return `<div id="intro" class="intro">      
      <p class="intro__motto"></p>
    </div>`;
  }
}
