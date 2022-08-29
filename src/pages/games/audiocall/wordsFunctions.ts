import createBLock from "../../../components/createBLock";
import { WORD } from "../../../types/ResponsesTypes";
import getWords, { getAllWords } from "../../textbook/workWithApi/getWords";
import  playAudioWord  from "./audio";



export function nextWords () {
    const WordsWrapper = document.querySelector('.words') as HTMLElement;
    WordsWrapper.innerHTML = ''
    getRandomWords();

}

export function getRandomNumber(min: number, max: number){
    let rand = Math.round(min + Math.random() * (max - min)); 
    return rand
}

export async function getRandomWords(){

    let page =  getRandomNumber(0, 5)
    let allWords: WORD[] = [];
    const WordsWrapper = document.querySelector('.words') as HTMLElement;
    

    getWords(page, 1).then((answer)=>{
        for (let i=0; i < 5; i++){
            let num: number;
            
            random ();

            function random () {
                
                num = getRandomNumber(0, 19);

                if (allWords.includes(answer[num])) {
                    console.log('random')
                    random ();
                }
                else {
                  allWords.push(answer[num]);   
                  const newWord = createBLock('div', {
                      classList: ['word', 'button', 'secondary-button'],
                      children: [`${answer[num].word}`],
                    });
                    
                    newWord.addEventListener( 'click', ()=>{
                        isMatch(answer[num]);
                    })
                    WordsWrapper.append(newWord);
                }
            }            
        }
    });

    let voiceWord = getRandomNumber(0,5)
    const audioWrapper = document.querySelector('.voice') as HTMLElement;
    audioWrapper.textContent = '';
    console.log(allWords)
    // audioWrapper.classList.add(`${allWords[voiceWord].id}`);
    audioWrapper.addEventListener('click', () => {
        
        playAudioWord(allWords[voiceWord])
    })   

    // playAudioWord(allWords[voiceWord])

    // return allWords  
}


export function isMatch(currentWord: WORD){

    const audioWrapper = document.querySelector('.voice') as HTMLElement;
    // const audioWord = audioWrapper.classList.contains(currentWord.id);
    if (audioWrapper.classList.contains(currentWord.id)){
        console.log(true);

    }else {
        console.log(false)
    }


}
