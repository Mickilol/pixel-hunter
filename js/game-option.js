import renderAnswer from './game-answer';

export default (question, alt, answerGroupName, index) => {
  window.console.log(question);
  const optionHtml = `<div class="game__option" data-index="${index}">
        <img src="${question.image.url}" alt="${alt}" width="${question.image.width}" height="${question.image.height}">
        ${answerGroupName ? renderAnswer(answerGroupName) : ``}
      </div>`;

  return optionHtml;
};
