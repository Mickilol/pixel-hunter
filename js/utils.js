export const resizeImage = (frame, image) => {
  let multiplier = 1;

  if (image.width > frame.width) {
    multiplier = frame.width / image.width;
  }

  if (image.height * multiplier > frame.height) {
    multiplier = frame.height / image.height;
  }

  return {
    width: Math.round(image.width * multiplier),
    height: Math.round(image.height * multiplier)
  };
};

export function preloadImages(questionsList = []) {
  if (!Array.isArray(questionsList)) {
    throw new Error(`Invalid parameter.`);
  }

  const images = questionsList.reduce((result, current) => result.concat(current.answers.map((answer) => answer.image)), []);

  return Promise.all(images.map((image) => new Promise((resolve) => {
    const img = new Image();
    img.addEventListener(`load`, () => {
      image.size = resizeImage({
        width: image.width,
        height: image.height
      }, {
        width: img.width,
        height: img.height
      });

      resolve();
    }, false);
    img.src = image.url;
  })));
}
