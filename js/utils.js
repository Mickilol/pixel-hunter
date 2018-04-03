export const resizeImage = (frame, image) => {
  let multiplier = 1;

  if (image.width > frame.width) {
    multiplier = frame.width / image.width;
  }

  if (image.height * multiplier > frame.height) {
    multiplier = frame.height / image.height;
  }

  return {
    width: image.width * multiplier,
    height: image.height * multiplier
  };
};

