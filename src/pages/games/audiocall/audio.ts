import { WORD } from '../../../types/ResponsesTypes';
import soundIcon from '../../textbook/soundIcon';

export default function playAudioWord(word: WORD) {
  const audio = new Audio();
  audio.src = `https://rslang2022q1.herokuapp.com/${word.audio}`;
  audio.play();
}
export function voiceFunction(Word: WORD) {
  const audioWrapper = document.querySelector('.voice') as HTMLElement;
  audioWrapper.textContent = '';
  audioWrapper.innerHTML = soundIcon;

  audioWrapper.addEventListener('click', () => {
    playAudioWord(Word);
  });
}
