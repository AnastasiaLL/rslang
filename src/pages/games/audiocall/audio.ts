import { WORD } from "../../../types/ResponsesTypes";


export default function playAudioWorld(word: WORD){

    const audioWrapper = document.querySelector('.voice') as HTMLElement;
    audioWrapper.classList.add(`${word.id}`)
    audioWrapper.textContent = word.word;
    
  
  }