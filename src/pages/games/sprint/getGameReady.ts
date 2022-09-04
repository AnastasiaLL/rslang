import startGame from './startGame';
import Constants from '../../../constants/Constants';
import getWords from '../../textbook/workWithApi/getWords';
import randomPages from '../../../utils/randomisers';
import createBLock from '../../../components/createBLock';
import makeWordTranslationPairs from './makeWordTranslationPairs';
import { WordPairedWithGuessTranslation } from '../../../types/sprint';
import getUserWord from '../../textbook/workWithApi/getUserWord';
import { USERWORD } from '../../../types/ResponsesTypes';

export function getGameReady(chapterId: number) {
  const mainBlock = document.querySelector('#main-block');
  if (mainBlock) {
    mainBlock.innerHTML = '';

    const sprintContainer = createBLock('div', {
      classList: ['game-container'],
    });

    const heading = createBLock('div', {
      classList: ['game-parameters'],
      // children: [`${Constants.sprintGame.levelHeading}: ${String(chapterId + 1)}`]
      children: [`${Constants.sprintGame.levelHeading}: ${Constants.chapters[chapterId]}`],
    });

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
      mainBlock.innerHTML = '';
      const heading = createBLock('div', {
        classList: ['game-parameters'],
        children: [`${Constants.sprintGame.levelHeading}: ${Constants.chapters[Number(group)]} | ${Constants.sprintGame.beginOnPage}: ${page}`],
      });
      const sprintContainer = createBLock('div', {
        classList: ['game-container'],
      });

      mainBlock.append(heading, sprintContainer);

      let howManyPages = Constants.pages - Number(page);
      if (howManyPages > Constants.sprintPagesToPlay) {
        howManyPages = Constants.sprintPagesToPlay;
      }

      const promises = [];

      for (let i = 0; i < howManyPages; i += 1) {
        promises.push(getWords(Number(page) - 1 + i, Number(group)));
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
          console.log('1st Promise result', words);

          const token = window.localStorage.getItem(Constants.localStorageKeys.token);
          const userId = window.localStorage.getItem(Constants.localStorageKeys.userId);
          if (userId && token) {
            return getUserWord(userId, token);
          }
          return null;
        })
        .then((secondPromiseResult) => {
          if (secondPromiseResult) {
            const userWordStudied = secondPromiseResult
              .filter((word: USERWORD) => word.optional.studied === true);

            console.log('userWordNotStudied', userWordStudied);

            const userWordStudiedIDs = userWordStudied
              .map((word: USERWORD) => word.optional.wordId);

            const studiedFilteredOut = words.flat()
              .filter((word) => !userWordStudiedIDs.includes(word.id));

            console.log('studiedFilteredOut', studiedFilteredOut);
            startGame(Constants.sprintGame.gameTime, sprintContainer, studiedFilteredOut);
          } else {
            startGame(Constants.sprintGame.gameTime, sprintContainer, words.flat());
          }
        });
    }
  }
}
