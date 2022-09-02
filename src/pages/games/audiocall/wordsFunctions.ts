import createBLock from '../../../components/createBLock';
import Constants from '../../../constants/Constants';
import { WORD } from '../../../types/ResponsesTypes';
import getWords from '../../textbook/workWithApi/getWords';
import playAudioWord, { voiceFunction } from './audio';
import openAudioCallPage, { drawWords } from './openCallPage';

export let answersCorrect = 0;
export let answersWrong = 0;
export let voiceWordObj: WORD;
export let allWords: WORD[] = [];
export let currentWordNumber: number = 0;
export let answersCorrectArray: WORD[]  = [];
export let answersWrongArray: WORD[]  = [];
export let currentSeries = 0;
export let maxSeries = 0;

export function controllerAudioCall(id: number) {
    getAudioCallWords(id).then( ()=>{
        getRandomArray(allWords);
        startAudioCallGame()
    });
    
}

export function startAudioCallGame() {
    openAudioCallPage();
    drawWords(RandomWords(allWords));
    voiceFunction(allWords[currentWordNumber]);
    playAudioWord(allWords[currentWordNumber])
}


export async function getAudioCallWords(chapter: number) { 
    let page = 1;
    const answ = await getWords(page, chapter);
    allWords = answ.slice();
   
    console.log(1)
}


export function getRandomArray(arr: WORD[]) {

 arr.sort(() => 0.5 - Math.random());
 console.log(allWords);
 console.log(2)
  
}


export function RandomWords(arr: WORD[]) {
    console.log(3)
    let newArray: WORD[] = [];
    newArray.push(arr[currentWordNumber]);
    while (newArray.length < 5){
       let num = getRandomNumber(0, 19);
        if (!newArray.includes(arr[num])) {
            newArray.push(arr[num])
        }
    } 
    // currentWordNumber = currentWordNumber +1;
    newArray.sort(() => 0.5 - Math.random());
    console.log(newArray);
    
    return newArray;
}


export function getRandomNumber(min: number, max: number) {
  const rand = Math.round(min + Math.random() * (max - min));
  return rand;
}


export function isMatch(currentWord: WORD) {
  if (allWords[currentWordNumber].id === currentWord.id) {
    answersCorrect += 1;
    answersCorrectArray.push(allWords[currentWordNumber]);
    currentSeries +=1;
    if (currentSeries > maxSeries){
        maxSeries = currentSeries;
    }
  } else {
    answersWrong += 1;
    answersWrongArray.push(allWords[currentWordNumber]);
    if (currentSeries > maxSeries){
        maxSeries = currentSeries;
    }
    currentSeries = 0;
  }

  drawCounters();
  currentWordNumber += 1;
  if ( currentWordNumber < 20){
    startAudioCallGame();
  }else{
    endAudioCallGame();
  }
}


export function drawCounters() {
  const wrong = document.querySelector('.answers__wrong') as HTMLElement;
  wrong.textContent = `${answersWrong}`;
  const correct = document.querySelector('.answers__correct') as HTMLElement;
  correct.textContent = `${answersCorrect}`;
}

// export function endAudioCallGame(){

// // update user/words & stats; ////////////////
// console.log('all words in game', [...answersCorrectArray, ...answersWrongArray]);

// const token = window.localStorage.getItem(Constants.localStorageKeys.token);
// const userId = window.localStorage.getItem(Constants.localStorageKeys.userId);

// if (token && userId) {
//   // updateGameUserWords

//   const allShownWordsIDs = [...answersCorrectArray, ...answersWrongArray]
//     .map((wordData) => wordData?.id);
//   const correctAnswersIDs = answersCorrectArray.map((wordData) => wordData?.id);

//   const updatedUserWords = await updateGameUserWords(
//     'audio', // audio
//     token,
//     userId,
//     allShownWordsIDs, // id те которые польз-ль видел
//     correctAnswersIDs, // id угадал
//   );

//   // updateStatistics
//   const correct = answersCorrectArray.length;
//   const totalWordsShown = [...answersCorrectArray, ...answersWrongArray].length;

//   prepareUpsertStats(
//     'audio',
//     token,
//     userId,
//     totalWordsShown, // сами слова
//     correct, // правильные
//     maxSeries, // подряд
//     updatedUserWords.todayGameNewWords,
//     updatedUserWords.todayGameStudiedWords,
//   );
// } else {
//   gameState.sprintContainer.append('Войдите или зарегистируйтесь и войдите, чтобы сохранить результаты игры');
// }
// }




















// export function drawCounters() {
//   // openAudioCallPage();
//   const wrong = document.querySelector('.answers__wrong') as HTMLElement;
//   wrong.textContent = `${answersWrong}`;
//   const correct = document.querySelector('.answers__correct') as HTMLElement;
//   correct.textContent = `${answersCorrect}`;
// }

// export function isMatch(currentWord: WORD) {
//   if (voiceWordObj.id === currentWord.id) {
//     answersCorrect += 1;
//   } else {
//     answersCorrect -= 1;
//   }
//   drawCounters();
// }

// export function voiceFunction(ArrayWords: WORD[]) {
//   const voiceWord = getRandomNumber(0, 5);
//   const audioWrapper = document.querySelector('.voice') as HTMLElement;
//   audioWrapper.textContent = '';

//   voiceWordObj = ArrayWords[voiceWord];

//   audioWrapper.addEventListener('click', () => {
//     playAudioWord(ArrayWords[voiceWord]);
//   });
// }

// export async function getRandomWords(chapter: number) {
//   const page = getRandomNumber(0, 5);
//   const allWords: WORD[] = [];

//   const WordsWrapper = document.querySelector('.words') as HTMLElement;
//   WordsWrapper.textContent = '';

//   getWords(page, chapter).then((answer) => {
//     for (let i = 0; i < 5; i += 1) {
//       let num: number;

    //   function random() {
    //     num = getRandomNumber(0, 19);

    //     if (allWords.includes(answer[num])) {
    //       random();
    //     } else {
    //       allWords.push(answer[num]);
        //   const newWord = createBLock('div', {
        //     classList: ['word', 'button', 'secondary-button'],
        //     children: [`${answer[num].wordTranslate}`],
        //   });

        //   newWord.addEventListener('click', () => {
        //     isMatch(answer[num]);
        //   });
        //   WordsWrapper.append(newWord);
        //}
//       }

//       random();
//     }
//   }).then(() => voiceFunction(allWords));
// }

// const dontKnown = document.querySelector('.dontKnown') as HTMLElement;
// dontKnown.addEventListener( 'click', () => {
//     NotMatch ()
// });
