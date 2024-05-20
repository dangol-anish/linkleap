export const textLimiter = (text, limit) => {
  if (text.length <= 15) {
    return text;
  } else {
    return text.substring(0, 15) + "...";
  }
};
