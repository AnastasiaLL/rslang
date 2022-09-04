import createBLock from '../../../components/createBLock';
import { WORD } from '../../../types/ResponsesTypes';
import soundIcon from '../../textbook/soundIcon';
import keydownAudiocall from './keyboard';
import { isMatch, nextWords } from './wordsFunctions';
// import { getRandomWords } from './wordsFunctions';

export const index = 0;
export let currentWordsArray: WORD[] = [];

export default async function openAudioCallPage() {
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
  voice.innerHTML = soundIcon;

  const words = createBLock('div', {
    classList: ['words'],
    children: [],
  });

  const dontKnown = createBLock('button', {
    classList: ['dontKnown', 'button', 'secondary-button'],
    children: ['Не знаю! (Space)'],
    listener: nextWords,
    event: 'click',
  });

  const audiocallWrapper = createBLock('div', {
    classList: ['audiocall'],
    children: [answersWrapper, voice, words, dontKnown],
  });

  if (mainBlock) {
    mainBlock.innerHTML = '';
    mainBlock.append(audiocallWrapper);
  }
}

export function drawWords(arrWords: WORD[]) {
  const WordsWrapper = document.querySelector('.words') as HTMLElement;
  currentWordsArray = [];
  for (let i = 0; i < arrWords.length; i += 1) {
    const newWord = createBLock('div', {
      classList: ['word', 'button', 'secondary-button'],
      children: [`${arrWords[i].wordTranslate} (${i + 1})`],
    });
    newWord.addEventListener('click', () => {
      isMatch(arrWords[i]);
    });
    WordsWrapper.append(newWord);

    currentWordsArray.push(arrWords[i]);
    console.log(currentWordsArray);
  }
  document.addEventListener('keydown', keydownAudiocall);
}
