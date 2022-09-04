import { currentWordsArray } from './openCallPage';
import { endAudioCallGame, isMatch, nextWords } from './wordsFunctions';

document.addEventListener('keydown', keydownAudiocall);

export default function keydownAudiocall(event: KeyboardEvent) {
  console.log(event.code);

  if (event.code === 'Enter') {
    event.preventDefault();
    nextWords();
  } else if (event.code === 'Numpad1' || event.code === 'Digit1') {
    event.preventDefault();
    isMatch(currentWordsArray[0]);
  } else if (event.code === 'Numpad2' || event.code === 'Digit2') {
    event.preventDefault();
    isMatch(currentWordsArray[1]);
  } else if (event.code === 'Numpad3' || event.code === 'Digit3') {
    event.preventDefault();
    isMatch(currentWordsArray[2]);
  } else if (event.code === 'Numpad4' || event.code === 'Digit4') {
    event.preventDefault();
    isMatch(currentWordsArray[3]);
  } else if (event.code === 'Numpad5' || event.code === 'Digit5') {
    event.preventDefault();
    isMatch(currentWordsArray[4]);
  } else if (event.code === 'Escape') {
    event.preventDefault();
    endAudioCallGame();
  }
}
