import createBLock from '../../../components/createBLock';
import Constants from '../../../constants/Constants';
import { WORD } from '../../../types/ResponsesTypes';
import prepareUpsertStats from '../../stats/model/prepareUpsertStats';
import getWords from '../../textbook/workWithApi/getWords';
import openGamesPage from '../openGamesPage';
import updateGameUserWords from '../updateGameUserWords';
import playAudioWord, { voiceFunction } from './audio';
import openAudioCallPage, { drawWords } from './openCallPage';

export let answersCorrect = 0;
export let answersWrong = 0;
export let voiceWordObj: WORD;
export let allWords: WORD[] = [];
export let currentWordNumber = 0;
export let answersCorrectArray: WORD[] = [];
export let answersWrongArray: WORD[] = [];
export let currentSeries = 0;
export let maxSeries = 0;

export async function getAudioCallWords(chapter: number, page: number) {
  const answ = await getWords(page, chapter);
  allWords = answ.slice();
}

export function getRandomArray(arr: WORD[]) {
  arr.sort(() => 0.5 - Math.random());
}

export function RandomWords(arr: WORD[]) {
  const newArray: WORD[] = [];
  newArray.push(arr[currentWordNumber]);
  while (newArray.length < 5) {
    const num = getRandomNumber(0, 19);
    if (!newArray.includes(arr[num])) {
      newArray.push(arr[num]);
    }
  }
  newArray.sort(() => 0.5 - Math.random());

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
    currentSeries += 1;
    if (currentSeries > maxSeries) {
      maxSeries = currentSeries;
    }
  } else {
    answersWrong += 1;
    answersWrongArray.push(allWords[currentWordNumber]);
    if (currentSeries > maxSeries) {
      maxSeries = currentSeries;
    }
    currentSeries = 0;
  }

  currentWordNumber += 1;
  if (currentWordNumber < 20) {
    startAudioCallGame();
  } else {
    endAudioCallGame();
  }
  drawCounters();
}

export function nextWords() {
  answersWrong += 1;
  answersWrongArray.push(allWords[currentWordNumber]);
  if (currentSeries > maxSeries) {
    maxSeries = currentSeries;
  }
  currentSeries = 0;

  currentWordNumber += 1;
  if (currentWordNumber < 20) {
    startAudioCallGame();
  } else {
    endAudioCallGame();
  }
  drawCounters();
}

export function drawCounters() {
  const wrong = document.querySelector('.answers__wrong') as HTMLElement;
  wrong.textContent = `${answersWrong}`;
  const correct = document.querySelector('.answers__correct') as HTMLElement;
  correct.textContent = `${answersCorrect}`;
}

export async function endAudioCallGame() {
  const mainBlock = document.querySelector('#main-block') as HTMLElement;
  mainBlock.innerHTML = '';

  const finishMessage = createBLock('h2', {
    children: [Constants.sprintGame.finishHeading],
  });

  const scores = createBLock('div', {
    classList: ['audiocall-results__scores'],
  });

  scores.innerHTML = `
        <div class="score">
          ${Constants.sprintGame.score}
          <div class="total-score">20</div>
        </div>
        <div class="score">
          ${Constants.sprintGame.sequenceOfSuccess}
          <div class="sequence-of-success">${maxSeries}</div>
        </div>`;

  const correctAnswersContainer = createBLock('div', {
    classList: ['results__correct-answers'],
  });

  correctAnswersContainer.innerHTML = `<div class="results__sub-heading">${Constants.sprintGame.correсtsAnswers}
    (${answersCorrect})</div>`;

  answersCorrectArray.forEach((answer) => {
    const correctAnswer = createBLock('div', {
      classList: ['results__correct-answer'],
      children: [`${answer?.word} - ${answer?.wordTranslate}`],
    });
    correctAnswersContainer.append(correctAnswer);
  });

  const incorrectAnswersContainer = createBLock('div', {
    classList: ['results__incorrect-answers'],
  });

  incorrectAnswersContainer.innerHTML = `<div class="results__sub-heading">${Constants.sprintGame.incorreсtsAnswers}
    (${answersWrong})</div>`;

  answersWrongArray.forEach((answer) => {
    const incorrectAnswer = createBLock('div', {
      classList: ['results__incorrect-answer'],
      children: [`${answer?.word} - ${answer?.wordTranslate}`],
    });
    incorrectAnswersContainer.append(incorrectAnswer);
  });

  const answers = createBLock('div', {
    classList: ['audiocall-results__answers'],
    children: [correctAnswersContainer, incorrectAnswersContainer],
  });

  const startAgainButton = createBLock('button', {
    classList: ['button', 'secondary-button', 'audiocall-button'],
    children: [Constants.sprintGame.startAgainButtonText],
    event: 'click',
    listener: openGamesPage,
  });

  const endWrap = createBLock('div', {
    classList: ['end-audioCall'],
    children: [finishMessage, scores, answers, startAgainButton],
  });

  mainBlock.append(endWrap);

  // update user/words & stats; ////////////////
  console.log('all words in game', [...answersCorrectArray, ...answersWrongArray]);

  const token = window.localStorage.getItem(Constants.localStorageKeys.token);
  const userId = window.localStorage.getItem(Constants.localStorageKeys.userId);

  if (token && userId) {
  // updateGameUserWords

    const allShownWordsIDs = [...answersCorrectArray, ...answersWrongArray]
      .map((wordData) => wordData?.id);
    const correctAnswersIDs = answersCorrectArray.map((wordData) => wordData?.id);

    const updatedUserWords = await updateGameUserWords(
      'audio', // audio
      token,
      userId,
      allShownWordsIDs, // id те которые польз-ль видел
      correctAnswersIDs, // id угадал
    );

    // updateStatistics
    const correct = answersCorrectArray.length;
    const totalWordsShown = [...answersCorrectArray, ...answersWrongArray].length;

    prepareUpsertStats(
      'audio',
      token,
      userId,
      totalWordsShown, // сами слова
      correct, // правильные
      maxSeries, // подряд
      updatedUserWords.todayGameNewWords,
      updatedUserWords.todayGameStudiedWords,
    );
  } else {
    const paragraph = createBLock('p', {
      classList: ['audiocall-paragraph'],
      children: ['Войдите или зарегистируйтесь и войдите, чтобы сохранить результаты игры'],
    });
    mainBlock.append(paragraph);
  }
}

export function startAudioCallGame() {
  openAudioCallPage();
  drawWords(RandomWords(allWords));
  voiceFunction(allWords[currentWordNumber]);
  playAudioWord(allWords[currentWordNumber]);
}

export function controllerAudioCall(id: number) {
  let page = getRandomNumber(1, 29);
  answersCorrect = 0;
  answersWrong = 0;
  answersCorrectArray = [];
  answersWrongArray = [];
  const groupBlock = document.querySelector('.chapter__heading') as HTMLSelectElement;
  const pageBlock = document.querySelector('#pagination__active') as HTMLElement;

  if (groupBlock && pageBlock) {
    page = Number(pageBlock.dataset.pageNumber) - 1;
    id = Number(groupBlock.value);
  }

  getAudioCallWords(id, page).then(() => {
    getRandomArray(allWords);
    startAudioCallGame();
  });
}
