import {DEFAULT_REPEATING_DAYS} from "./const";

export const getRandomArrayItem = (array) => {
  const index = Math.floor(array.length * Math.random());
  return array[index];
};

export const generateRepeatingDays = () => {
  return Object.assign({}, DEFAULT_REPEATING_DAYS, {
    'mo': Math.random() > 0.5,
  });
};

export const generateTags = (tags) => {
  return tags
    .filter(() => Math.random() > 0.5)
    .slice(0, 3);
};

export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};
