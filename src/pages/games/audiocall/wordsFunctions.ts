import createBLock from '../../../components/createBLock';
import { WORD } from '../../../types/ResponsesTypes';
import getWords from '../../textbook/workWithApi/getWords';
import playAudioWord from './audio';

export let answersCorrect = 0;
export const answersWrong = 0;
export let voiceWordObj: WORD;

export function getRandomNumber(min: number, max: number) {
  const rand = Math.round(min + Math.random() * (max - min));
  return rand;
}

export function drawCounters() {
  // openAudioCallPage();
  const wrong = document.querySelector('.answers__wrong') as HTMLElement;
  wrong.textContent = `${answersWrong}`;
  const correct = document.querySelector('.answers__correct') as HTMLElement;
  correct.textContent = `${answersCorrect}`;
}

export function isMatch(currentWord: WORD) {
  if (voiceWordObj.id === currentWord.id) {
    answersCorrect += 1;
  } else {
    answersCorrect -= 1;
  }
  drawCounters();
}

export function voiceFunction(ArrayWords: WORD[]) {
  const voiceWord = getRandomNumber(0, 5);
  const audioWrapper = document.querySelector('.voice') as HTMLElement;
  audioWrapper.textContent = '';

  voiceWordObj = ArrayWords[voiceWord];

  audioWrapper.addEventListener('click', () => {
    playAudioWord(ArrayWords[voiceWord]);
  });
}

export async function getRandomWords(chapter: number) {
  const page = getRandomNumber(0, 5);
  const allWords: WORD[] = [];

  const WordsWrapper = document.querySelector('.words') as HTMLElement;
  WordsWrapper.textContent = '';

  getWords(page, chapter).then((answer) => {
    for (let i = 0; i < 5; i += 1) {
      let num: number;

      function random() {
        num = getRandomNumber(0, 19);

        if (allWords.includes(answer[num])) {
          random();
        } else {
          allWords.push(answer[num]);
          const newWord = createBLock('div', {
            classList: ['word', 'button', 'secondary-button'],
            children: [`${answer[num].wordTranslate}`],
          });

          newWord.addEventListener('click', () => {
            isMatch(answer[num]);
          });
          WordsWrapper.append(newWord);
        }
      }

      random();
    }
  }).then(() => voiceFunction(allWords));
}

// const dontKnown = document.querySelector('.dontKnown') as HTMLElement;
// dontKnown.addEventListener( 'click', () => {
//     NotMatch ()
// });
