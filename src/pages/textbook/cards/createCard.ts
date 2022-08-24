import { WORD } from '../../../types/ResponsesTypes';
import createBLock from '../../../components/createBLock';

export default function createCard(word: WORD): HTMLElement {
  const headLine = createBLock('div', {
    children: [word.word],
  });

  const transcription = createBLock('p', {
    classList: ['transcription'],
    children: [word.transcription],
  });

  const translate = createBLock('p', {
    children: [word.wordTranslate],
  });

  const card = createBLock('div', {
    classList: ['word-summary'],
    children: [headLine, transcription, translate],
  });

  return card;
}
