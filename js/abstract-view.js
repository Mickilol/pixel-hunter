import {changeView} from './view-manager';

export default class AbstractView {
  get template() {
    throw new Error(`Abstract method called.`);
  }

  get element() {
    if (!this._element) {
      this._element = this._render();
      this.bind();
    }
    return this._element;
  }

  _render() {
    return this._getElementFromTemplate(this.template);
  }

  _getElementFromTemplate(html) {
    const container = document.createElement(`template`);
    container.innerHTML = html;

    return container.content;
  }

  show() {
    changeView(this);
  }

  bind() {

  }
}
