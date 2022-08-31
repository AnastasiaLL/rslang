import createBLock from "../../../components/createBLock";
import { WORD } from "../../../types/ResponsesTypes";
import getWords from "../../textbook/workWithApi/getWords";
import  playAudioWord  from "./audio";
import openAudioCallPage from "./openCallPage";

export let answersCorrect = 0;
export let answersWrong = 0;


export function getRandomNumber(min: number, max: number){
    let rand = Math.round(min + Math.random() * (max - min)); 
    return rand
}

export async function getRandomWords(){

    let page =  getRandomNumber(0, 5)
    let allWords: WORD[] = [];

    const WordsWrapper = document.querySelector('.words') as HTMLElement;
    WordsWrapper.textContent = '';
    
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
                      children: [`${answer[num].wordTranslate}`],
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
    audioWrapper.addEventListener('click', () => {
        playAudioWord(allWords[voiceWord])
    })   
    
}



export function isMatch(currentWord: WORD){
    const audioWrapper = document.querySelector('.voice') as HTMLElement;
    if (audioWrapper.classList.contains(currentWord.id)){
        console.log(true);
        match (currentWord);
    }else {
        console.log(false);
        NotMatch(currentWord);
    }
}

export function match (currentWord: WORD) {
    answersCorrect +=1;
    let answer = document.querySelector('.answers__correct') as HTMLElement;
    answer.textContent = `${answersCorrect}`;
    // getRandomWords()
    openAudioCallPage()
}

export function NotMatch (currentWord?: WORD) {
    
    answersWrong -=1;
    let answer = document.querySelector('.answers__wrong') as HTMLElement;
    answer.textContent = `${answersWrong}`;    
    console.log(answersWrong, currentWord)
    // getRandomWords()
    openAudioCallPage()
    
}

// const dontKnown = document.querySelector('.dontKnown') as HTMLElement;
// dontKnown.addEventListener( 'click', () => {
//     NotMatch ()
// });