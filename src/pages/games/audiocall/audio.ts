import { WORD } from '../../../types/ResponsesTypes';

export default function playAudioWord(word: WORD) {
//   const audioWrapper = document.querySelector('.voice') as HTMLElement;
  const audio = new Audio();
  audio.src = `https://rslang2022q1.herokuapp.com/${word.audio}`;
  audio.play();
}
