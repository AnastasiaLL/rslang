import Constants from '../constants/Constants';

export default function randomPages() {
  const randomPagesArr = [];
  let count = Constants.sprintPagesToPlay;
  while (count) {
    const randomPage = Math.round(Math.random() * Constants.pages);
    randomPagesArr.push(randomPage);
    count -= 1;
  }
  return randomPagesArr;
}
