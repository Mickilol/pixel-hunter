import renderAnswer from "./game-answer";

export default (image, alt, width, height, questionGroup) => {
  return `<div class="game__option">
        <img src="${image}" alt="${alt}" width="${width}" height="${height}">
        ${questionGroup ? renderAnswer(questionGroup) : ``}
        </div>`;
};
