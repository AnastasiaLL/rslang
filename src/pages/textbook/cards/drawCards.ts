import getWords from '../workWithApi/getWords';
import createCard from './createCard';
import { USERWORD, WORD } from '../../../types/ResponsesTypes';
import getUserWord from '../workWithApi/getUserWord';
import Constants from '../../../constants/Constants';
import createBLock from '../../../components/createBLock';
import getWord from '../workWithApi/getWord';
import drawCrown from '../drawCrown';

export default function drawCards(): void {
  const wordList = document.querySelector('.textbook__words-list');
  const groupBlock = document.querySelector('.chapter__heading');
  const pageBlock = document.querySelector('#pagination__active');
  const textBookBLock = document.querySelector('.textbook__page');

  const token = window.localStorage.getItem(Constants.localStorageKeys.token);
  const userId = window.localStorage.getItem(Constants.localStorageKeys.userId);
  if (
    wordList instanceof HTMLElement
    && groupBlock instanceof HTMLSelectElement
    && pageBlock instanceof HTMLButtonElement
    && textBookBLock instanceof HTMLElement
  ) {
    wordList.innerHTML = '';
    const group = groupBlock.value;
    const page = pageBlock.dataset.pageNumber;
    if (group && page) {
      if (group !== 'hard') {
        getWords(Number(page) - 1, Number(group)).then((answer) => {
          console.log(answer);
          answer.forEach((word: WORD) => {
            wordList.append(createCard(word));
          });
          const card = document.querySelector('.word-summary');
          if (card instanceof HTMLElement) card.click();
        }).then(() => {
          if (userId && token) {
            getUserWord(userId, token).then((userWords: USERWORD[]) => {
              userWords.forEach((userWord) => {
                const wordBLock = document.getElementById(userWord.optional.wordId);
                if (wordBLock instanceof HTMLElement) {
                  if (userWord.difficulty === 'true') wordBLock.classList.add('hard');
                  if (userWord.optional.studied) wordBLock.classList.add('studied');
                }
              });
              drawCrown();
            });
          }
        });
      } else if (token && userId) {
        getUserWord(userId, token).then((answer) => {
          const words = answer.filter((word: USERWORD) => word.difficulty === 'true');
          if (words.length) {
            words.forEach((word: USERWORD) => {
              getWord(word.optional.wordId).then((wordData) => {
                wordList.append(createCard(wordData));
              });
            });
          } else wordList.append(createBLock('h2', { children: ['Список сложных слов пуст, добавьте слова'] }));
        });
      }

      if (textBookBLock.classList.length > 1) {
        textBookBLock.classList.remove(textBookBLock.classList[1]);
      }
      textBookBLock.classList.add(`textbook-background_${group}`);
    }
  }
}
