import createBLock from '../../../components/createBLock';
import { WORD } from '../../../types/ResponsesTypes';
import updateNav from '../../../utils/updateNav';
import getWords, { getAllWords } from '../../textbook/workWithApi/getWords';
import playAudioWorld from '../audiocall/audio';
import {getRandomWords, nextWords} from './wordsFunctions';

export default async function openAudioCallPage() {
  
  const mainBlock = document.querySelector('#main-block');

  const voice = createBLock('div', {
    classList: ['voice'],
    children: [  ],
  });

  const words = createBLock('div', {
    classList: ['words'],
    children: [  ],
  });

  // let arr = [
  //   {
  //     word: 'aaaaaa',
  //     audio: 'aaa2aaa'
  //   },
  //   {
  //     word: 'bbbbbbbb',
  //     audio: 'bbbb2bbbb'
  //   },
  //   {
  //     word: 'cccccccccc',
  //     audio: 'ccccc22cccc'
  //   },
  //   {
  //     word: 'ddddd',
  //     audio: 'dd33ddd'
  //   },
  //   {
  //     word: 'ee',
  //     audio: 'eeee444eeeeee'
  //   },
  // ]
//  getRandomWords().then ( (currentWordsArr) => { 
  // getWords(1, 1).then( (currentWordsArr) => {
    // console.log(currentWordsArr);

    // for (let i=0; i < currentWordsArr.length; i++) {
      
    // currentWordsArr.forEach( (item: WORD) => {
    //   console.log(item.word)
      
      // const newWord = createBLock('div', {
      //   classList: ['word', 'button', 'secondary-button'],
      //   children: [`${item.word}`],
      // });
      // words.append(newWord)
    // })
      
    // }
  // })


  const dontKnown = createBLock('button', {
    classList: ['dontKnown', 'button', 'secondary-button'],
    children: [ 'Не знаю!' ],
    listener: nextWords,
    event: 'click'
  });


  const audiocallWrapper = createBLock('div', {
    classList: ['audiocall'],
    children: [voice, words, dontKnown],
  });


  if (mainBlock) {
    mainBlock.innerHTML = '';
    mainBlock.append(  audiocallWrapper  );
  }


  updateNav('games');
  await getRandomWords();
}
 