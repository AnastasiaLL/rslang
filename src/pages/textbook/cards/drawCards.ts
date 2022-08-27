import getWords from '../workWithApi/getWords';
import createCard from './createCard';
import { WORD } from '../../../types/ResponsesTypes';

export default function drawCards(): void {
  const wordList = document.querySelector('.textbook__words-list');
  const groupBlock = document.querySelector('.chapter__heading');
  const pageBlock = document.querySelector('#pagination__active');
  if (
    wordList instanceof HTMLElement
    && groupBlock instanceof HTMLSelectElement
    && pageBlock instanceof HTMLButtonElement
  ) {
    wordList.innerHTML = '';
    const group = groupBlock.value;
    const page = pageBlock.dataset.pageNumber;
    if (group && page) {
      getWords(Number(page) - 1, Number(group)).then((answer) => {
        console.log(answer);
        answer.forEach((word: WORD) => {
          wordList.append(createCard(word));
        });
      });
    }
  }
}
