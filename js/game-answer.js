export default (questionGroup) => {
  return `<label class="game__answer game__answer--photo">
          <input name="${questionGroup}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="${questionGroup}" type="radio" value="painting">
          <span>Рисунок</span>
        </label>`;
};
