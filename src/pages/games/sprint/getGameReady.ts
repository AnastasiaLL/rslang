import startGame from './startGame';
import Constants from '../../../constants/Constants';
import getWords from '../../textbook/workWithApi/getWords';
import randomPages from '../../../utils/randomisers';
import createBLock from '../../../components/createBLock';
import makeWordTranslationPairs from './makeWordTranslationPairs';
import { WordPairedWithGuessTranslation } from '../../../types/sprint';
import getUserWord from '../../textbook/workWithApi/getUserWord';
import { USERWORD } from '../../../types/ResponsesTypes';
import showLoader from '../../../utils/loader';

export function getGameReady(chapterId: number) {
  const mainBlock = document.querySelector('#main-block');
  if (mainBlock) {
    mainBlock.innerHTML = '';

    const sprintContainer = createBLock('div', {
      classList: ['game-container'],
    });

    const heading = createBLock('div', {
      classList: ['game-parameters'],
      children: [`${Constants.sprintGame.levelHeading}: ${Constants.chapters[chapterId]}`],
    });

    mainBlock.innerHTML = '';
    mainBlock.append(heading, sprintContainer);

    const howManyPages = randomPages();

    const promises = howManyPages.map((page) => getWords(page, chapterId));

    Promise.all(promises).then((allWordsList) => {
      const words = makeWordTranslationPairs(allWordsList.flat());
      startGame(Constants.sprintGame.gameTime, sprintContainer, words.flat());
    });
  }
}

export function getGameReadyFromTextBook() {
  const groupBlock = document.querySelector('.chapter__heading');
  const pageBlock = document.querySelector('#pagination__active');
  const mainBlock = document.querySelector('#main-block');

  if (
    mainBlock
    && groupBlock instanceof HTMLSelectElement
    && pageBlock instanceof HTMLButtonElement
  ) {
    const group = groupBlock.value;
    const page = pageBlock.dataset.pageNumber;
    if (group && page) {
      const heading = createBLock('div', {
        classList: ['game-parameters'],
        children: [`${Constants.sprintGame.levelHeading}: ${Constants.chapters[Number(group)]} | ${Constants.sprintGame.beginOnPage}: ${page}`],
      });
      const sprintContainer = createBLock('div', {
        classList: ['game-container'],
      });

      showLoader();

      const promises = [];

      for (let i = 0; i < Constants.sprintPagesToPlay; i += 1) {
        if ((Number(page) - 1 + i) < Constants.pages) {
          promises.push(getWords(Number(page) - 1 + i, Number(group)));
        } else {
          promises.push(getWords(Number(page) - Constants.pages, Number(group)));
        }
      }

      const words: WordPairedWithGuessTranslation[][] = [];

      Promise.allSettled(promises)
        .then((allResults) => {
          allResults.forEach((result) => {
            if (result.status === 'fulfilled') {
              const pairedWords = makeWordTranslationPairs(result.value);
              words.unshift(pairedWords);
            }
          });

          const token = window.localStorage.getItem(Constants.localStorageKeys.token);
          const userId = window.localStorage.getItem(Constants.localStorageKeys.userId);
          if (userId && token) {
            return getUserWord(userId, token);
          }
          return null;
        })
        .then((secondPromiseResult) => {
          mainBlock.innerHTML = '';
          mainBlock.append(heading, sprintContainer);
          if (secondPromiseResult) {
            const userWordStudied = secondPromiseResult
              .filter((word: USERWORD) => word.optional.studied === true);

            const userWordStudiedIDs = userWordStudied
              .map((word: USERWORD) => word.optional.wordId);

            const studiedFilteredOut = words.flat()
              .filter((word) => !userWordStudiedIDs.includes(word.id));

            startGame(Constants.sprintGame.gameTime, sprintContainer, studiedFilteredOut);
          } else {
            startGame(Constants.sprintGame.gameTime, sprintContainer, words.flat());
          }
        });
    }
  }
}
