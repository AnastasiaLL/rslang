import createBLock from '../../components/createBLock';
import soundIcon from './soundIcon';
import getWord from './workWithApi/getWord';
import Constants from '../../constants/Constants';
import { USERWORD, WORD } from '../../types/ResponsesTypes';
import getUserWord from './workWithApi/getUserWord';
import changeWordStatus from './changeWordStatus';
import playAllAudioWord from './cards/playAllAudioWord';
import unauthMessage from '../../components/unauthMessage';

export default function changeTextbookDetails(event: Event): void {
  const { currentTarget } = event;
  if (currentTarget instanceof HTMLElement) {
    getWord(currentTarget.id).then((wordData: WORD) => {
      const tbDetailsContainer = document.querySelector('.word-details');
      if (tbDetailsContainer instanceof HTMLElement) {
        tbDetailsContainer.innerHTML = '';

        const soundIconBlock = createBLock('div', {
          classList: ['word-details__sound-icon'],
          event: 'click',
          listener: () => { playAllAudioWord(wordData); },
        });

        soundIconBlock.innerHTML = soundIcon;

        const englishWord = createBLock('p', {
          classList: ['word-details__word'],
          children: [wordData.word, createBLock('span', { classList: ['transcription'], children: [wordData.transcription] })],
        });

        const translateWord = createBLock('p', {
          classList: ['word-details__word-russian'],
          children: [wordData.wordTranslate],
        });

        const firstControl = createBLock('div', {
          classList: ['word-details__status'],
          children: [
            createBLock('div', { children: ['СЛОЖНОЕ'] }),
            createBLock('label', {
              classList: ['word-details__switch'],
              children: [
                createBLock('input', {
                  event: 'change',
                  listener: changeWordStatus,
                  attributes: { id: 'switch-hard', type: 'checkbox', name: wordData.id },
                }),
                createBLock('span', { classList: ['word-details__switch-slider', 'switch-hard'] }),
              ],
            }),
          ],
        });

        const secondControl = createBLock('div', {
          classList: ['word-details__status'],
          children: [
            createBLock('div', { children: ['Изучено'] }),
            createBLock('label', {
              classList: ['word-details__switch'],
              children: [
                createBLock('input', {
                  attributes: { id: 'switch-studied', type: 'checkbox', name: wordData.id },
                  event: 'change',
                  listener: changeWordStatus,
                }),
                createBLock('span', { classList: ['word-details__switch-slider', 'switch-studied'] }),
              ],
            }),
          ],
        });

        let controls: HTMLElement | string = createBLock('div', {
          classList: ['word-details__controls'],
          children: [firstControl, secondControl],
        });

        if (!window.localStorage.getItem(Constants.localStorageKeys.token)) {
          controls = unauthMessage(Constants.textBookPage.unauth);
        }

        const img = createBLock('div', {
          classList: ['word-details__image'],
          attributes: {
            style: `background-image: url(https://rslang2022q1.herokuapp.com/${wordData.image});`,
          },
        });

        const meaning = createBLock('div', {
          classList: ['example'],
          children: [
            createBLock('p', { children: [wordData.textMeaning] }),
            createBLock('p', { classList: ['translation'], children: [wordData.textMeaningTranslate] }),
          ],
        });

        const example = createBLock('div', {
          classList: ['example'],
          children: [
            createBLock('p', { children: [wordData.textExample] }),
            createBLock('p', { classList: ['translation'], children: [wordData.textExampleTranslate] }),
          ],
        });

        tbDetailsContainer.append(
          soundIconBlock,
          englishWord,
          translateWord,
          controls,
          img,
          meaning,
          example,
        );

        const token = window.localStorage.getItem(Constants.localStorageKeys.token);
        const userId = window.localStorage.getItem(Constants.localStorageKeys.userId);
        const hardControl = document.querySelector('.switch-hard')?.previousSibling;
        const studiedControl = document.querySelector('.switch-studied')?.previousSibling;
        if (hardControl instanceof HTMLInputElement && studiedControl instanceof HTMLInputElement) {
          if (token && userId) {
            getUserWord(userId, token, currentTarget.id).then((userWordData: USERWORD | Error) => {
              if (!(userWordData instanceof Error) && userWordData) {
                console.log(userWordData);
                if (userWordData.difficulty === 'true') hardControl.checked = true;
                if (userWordData.optional.studied) studiedControl.checked = true;

                const wordStats = createBLock('div', {
                  classList: ['textbook__scores'],
                  children: [
                    createBLock('div', {
                      classList: ['textbook__score'],
                      children: [`${Constants.textBookPage.wordStatCorrect} <div class="textbook__score-num"> ${userWordData.optional.correctAnswers} </div>`],
                    }),
                    createBLock('div', {
                      classList: ['textbook__score'],
                      children: [`${Constants.textBookPage.wordStatIncorrect}  <div class="textbook__score-num"> ${userWordData.optional.incorrectAnswers} </div>`],
                    }),
                  ],
                });
                tbDetailsContainer.append(wordStats);
              }
            });
          } else {
            hardControl.disabled = true;
            studiedControl.disabled = true;
          }
        }
      }
    });
  }
}
