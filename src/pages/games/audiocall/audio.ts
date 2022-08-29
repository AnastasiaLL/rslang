import { WORD } from "../../../types/ResponsesTypes";


export default function playAudioWord(word: WORD){

    const audioWrapper = document.querySelector('.voice') as HTMLElement;
    audioWrapper.classList.add(`${word.id}`)
    audioWrapper.textContent = word.word;
    
    audio (word)
  
}

export function audio (word: WORD) {
    console.log('fgfd')
    const audio = new Audio();
    audio.src = `https://rslang2022q1.herokuapp.com/${word.audio}`
    audio.play();

}