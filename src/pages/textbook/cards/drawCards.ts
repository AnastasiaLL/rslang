import getWords from '../workWithApi/getWords';
import createCard from './createCard';
import { USERWORD, WORD } from '../../../types/ResponsesTypes';
import getUserWord from '../workWithApi/getUserWord';
import Constants from '../../../constants/Constants';

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
      const token = window.localStorage.getItem(Constants.localStorageKeys.token);
      const userId = window.localStorage.getItem(Constants.localStorageKeys.userId);
      if (token && userId) {
        getUserWord(userId, token).then((userWords: USERWORD[]) => {
          userWords.forEach((userWord) => {
            const wordBLock = document.getElementById(userWord.optional.wordId);
            if (wordBLock instanceof HTMLElement) {
              if (userWord.difficulty === 'true') wordBLock.classList.add('hard');
              if (userWord.optional.studied) wordBLock.classList.add('studied');
            }
          });
        });
      }
    }
  }
}
