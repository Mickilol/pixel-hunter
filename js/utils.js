import {createHeader} from "./header";

const mainNode = document.querySelector(`.central`);
const mainCentralContentNode = document.querySelector(`#main`);

export const getElementFromTemplate = (html) => {
  return new DOMParser().parseFromString(html, `text/html`).querySelector(`div`);
};

const clearMainNode = () => {
  while (mainCentralContentNode.firstChild) {
    mainCentralContentNode.removeChild(mainCentralContentNode.firstChild);
  }
};

export const showScreen = (element, headerNeeds = false) => {
  const headerNode = mainNode.querySelector(`header`);

  if (headerNode) {
    mainNode.removeChild(headerNode);
  }

  if (headerNeeds) {
    mainNode.insertBefore(createHeader(), mainCentralContentNode);
  }

  clearMainNode();
  mainCentralContentNode.appendChild(element);
};

