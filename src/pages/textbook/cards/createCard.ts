import { WORD } from '../../../types/ResponsesTypes';
import createBLock from '../../../components/createBLock';
import changeTextbookDetails from '../changeTextbookDetails';

export default function createCard(word: WORD): HTMLElement {
  const headLine = createBLock('h3', {
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
    attributes: { id: word.id },
    listener: changeTextbookDetails,
    event: 'click',
  });

  return card;
}
