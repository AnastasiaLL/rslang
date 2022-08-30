import createBLock from '../../components/createBLock';
import soundIcon from './soundIcon';
import getWord from './workWithApi/getWord';
import Constants from '../../constants/Constants';
import { WORD } from '../../types/ResponsesTypes';

export default function changeTextbookDetails(event: Event): void {
  const { currentTarget } = event;
  if (currentTarget instanceof HTMLElement) {
    getWord(currentTarget.id).then((wordData: WORD) => {
      const tbDetailsContainer = document.querySelector('.word-details');
      if (tbDetailsContainer instanceof HTMLElement) {
        tbDetailsContainer.innerHTML = '';

        const soundIconBlock = createBLock('div', {
          classList: ['word-details__sound-icon'],
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
                createBLock('input', { attributes: { type: 'checkbox' } }),
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
                createBLock('input', { attributes: { type: 'checkbox' } }),
                createBLock('span', { classList: ['word-details__switch-slider', 'switch-studied'] }),
              ],
            }),
          ],
        });

        const controls = createBLock('div', {
          classList: ['word-details__controls'],
          children: [firstControl, secondControl],
        });

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
      }
    });
  }
}
