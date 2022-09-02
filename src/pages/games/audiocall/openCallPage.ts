import createBLock from '../../../components/createBLock';
import { getRandomWords } from './wordsFunctions';

export const index = 0;

export default async function openAudioCallPage(chapterId: number) {
  const mainBlock = document.querySelector('#main-block') as HTMLElement;
  mainBlock.innerHTML = '';

  const correct = createBLock('div', {
    classList: ['answers__correct'],
    children: ['0'],
  });

  const wrong = createBLock('div', {
    classList: ['answers__wrong'],
    children: ['0'],
  });

  const answersWrapper = createBLock('div', {
    classList: ['answers-wrapper'],
    children: [correct, wrong],
  });

  const voice = createBLock('div', {
    classList: ['voice'],
    children: [],
  });

  const words = createBLock('div', {
    classList: ['words'],
    children: [],
  });

  const dontKnown = createBLock('button', {
    classList: ['dontKnown', 'button', 'secondary-button'],
    children: ['Не знаю!'],
    // listener: nextWords,
    // event: 'click'
  });

  const audiocallWrapper = createBLock('div', {
    classList: ['audiocall'],
    children: [answersWrapper, voice, words, dontKnown],
  });

  if (mainBlock) {
    mainBlock.innerHTML = '';
    mainBlock.append(audiocallWrapper);
  }

  // updateNav('games');
  await getRandomWords(chapterId);
}
