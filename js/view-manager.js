const mainNode = document.querySelector(`#main`);

export function clearView(element) {
  element.innerHTML = ``;
}

export function changeView(view, element = mainNode) {
  if (!view || !view.element) {
    return;
  }

  clearView(element);
  element.appendChild(view.element);
}
