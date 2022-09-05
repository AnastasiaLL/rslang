import { currentWordsArray } from './openCallPage';
import { endAudioCallGame, isMatch, nextWords } from './wordsFunctions';

window.addEventListener('keydown', keydownAudiocall);

export default function keydownAudiocall(event: KeyboardEvent) {
  if (document.querySelector('.audiocall')) {
    if (event.code === 'Enter') {
      nextWords();
    } else if (event.code === 'Numpad1' || event.code === 'Digit1') {
      isMatch(currentWordsArray[0]);
    } else if (event.code === 'Numpad2' || event.code === 'Digit2') {
      isMatch(currentWordsArray[1]);
    } else if (event.code === 'Numpad3' || event.code === 'Digit3') {
      isMatch(currentWordsArray[2]);
    } else if (event.code === 'Numpad4' || event.code === 'Digit4') {
      isMatch(currentWordsArray[3]);
    } else if (event.code === 'Numpad5' || event.code === 'Digit5') {
      isMatch(currentWordsArray[4]);
    } else if (event.code === 'Escape') {
      endAudioCallGame();
    }
  }
}
