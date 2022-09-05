import { WORD } from '../../../types/ResponsesTypes';

export default function playAllAudioWord(word: WORD): void {
  const audioElement = document.getElementsByTagName('audio');
  if (audioElement instanceof HTMLCollection) {
    if (audioElement.length > 0) {
      Object.keys(audioElement).forEach((key) => {
        audioElement[Number(key)].pause();
        audioElement[Number(key)].remove();
      });
    }
  }
  const audio = new Audio();
  audio.src = `https://rslang2022q1.herokuapp.com/${word.audio}`;
  audio.onended = ((e: Event) => {
    const { target } = e;
    if (target instanceof Audio) {
      switch (target.getAttribute('src')) {
        case `https://rslang2022q1.herokuapp.com/${word.audio}`:
          target.setAttribute('src', `https://rslang2022q1.herokuapp.com/${word.audioMeaning}`);
          break;
        case `https://rslang2022q1.herokuapp.com/${word.audioMeaning}`:
          target.setAttribute('src', `https://rslang2022q1.herokuapp.com/${word.audioExample}`);
          break;
        default:
          audio.autoplay = false;
      }
    }
  });
  audio.autoplay = true;
  document.body.append(audio);
}
