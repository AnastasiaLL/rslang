import { WORD } from '../../../types/ResponsesTypes';



export function voiceFunction(Word: WORD) {
    const audioWrapper = document.querySelector('.voice') as HTMLElement;
    // audioWrapper.textContent = '';

    audioWrapper.addEventListener('click', () => {
    playAudioWord(Word);
    });
}



export default function playAudioWord(word: WORD) {
    console.log(word.word)
//   const audioWrapper = document.querySelector('.voice') as HTMLElement;
  const audio = new Audio();
  audio.src = `https://rslang2022q1.herokuapp.com/${word.audio}`;
  audio.play();
}
