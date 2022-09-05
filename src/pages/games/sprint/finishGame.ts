import { GameState } from '../../../types/sprint';
import createBLock from '../../../components/createBLock';
import Constants from '../../../constants/Constants';
import openGamesPage from '../openGamesPage';
import prepareUpsertStats from '../../stats/model/prepareUpsertStats';
import updateGameUserWords from '../updateGameUserWords';
import unauthMessage from '../../../components/unauthMessage';

export default async function finishGame(gameState: GameState) {
  clearInterval(gameState.timer);

  gameState.allSequencesOfSuccess.push(gameState.sequenceOfSuccess);

  const maxSequence = Math.max(...gameState.allSequencesOfSuccess);

  const finishMessage = createBLock('h2', {
    children: [Constants.sprintGame.finishHeading],
  });

  const scores = createBLock('div', {
    classList: ['results__scores'],
  });

  scores.innerHTML = `
    <div class="score">
      ${Constants.sprintGame.score}
      <div class="total-score">${String(gameState.totalScore)}</div>
    </div>
    <div class="score">
    ${Constants.sprintGame.sequenceOfSuccess}
      <div class="sequence-of-success">${String(maxSequence)}</div>
    </div>`;

  const correctAnswersContainer = createBLock('div', {
    classList: ['results__correct-answers'],
  });

  correctAnswersContainer.innerHTML = `<div class="results__sub-heading">${Constants.sprintGame.correсtsAnswers}
   (${gameState.correctAnswers.length})</div>`;

  gameState.correctAnswers.forEach((answer) => {
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
  (${gameState.incorrectAnswers.length})</div>`;

  gameState.incorrectAnswers.forEach((answer) => {
    const incorrectAnswer = createBLock('div', {
      classList: ['results__incorrect-answer'],
      children: [`${answer?.word} - ${answer?.wordTranslate}`],
    });
    incorrectAnswersContainer.append(incorrectAnswer);
  });

  const answers = createBLock('div', {
    classList: ['results__answers'],
    children: [correctAnswersContainer, incorrectAnswersContainer],
  });

  const startAgainButton = createBLock('button', {
    classList: ['button', 'secondary-button'],
    children: [Constants.sprintGame.startAgainButtonText],
    event: 'click',
    listener: openGamesPage,
  });

  Object.assign(gameState.sprintContainer, { innerHTML: '' });

  gameState.sprintContainer.append(
    finishMessage,
    scores,
    answers,
    startAgainButton,
  );

  // update user/words & stats; ////////////////
  console.log('all words in game', [...gameState.correctAnswers, ...gameState.incorrectAnswers]);

  const token = window.localStorage.getItem(Constants.localStorageKeys.token);
  const userId = window.localStorage.getItem(Constants.localStorageKeys.userId);

  if (token && userId) {
    // updateGameUserWords

    const allShownWordsIDs = [...gameState.correctAnswers, ...gameState.incorrectAnswers]
      .map((wordData) => wordData?.id);
    const correctAnswersIDs = gameState.correctAnswers.map((wordData) => wordData?.id);

    const updatedUserWords = await updateGameUserWords(
      'sprint', // audio
      token,
      userId,
      allShownWordsIDs, // id те которые польз-ль видел
      correctAnswersIDs, // id угадал
    );

    // updateStatistics
    const correct = gameState.correctAnswers.length;
    const totalWordsShown = [...gameState.correctAnswers, ...gameState.incorrectAnswers].length;

    prepareUpsertStats(
      'sprint',
      token,
      userId,
      totalWordsShown,
      correct,
      maxSequence,
      updatedUserWords.todayGameNewWords,
      updatedUserWords.todayGameStudiedWords,
    );
  } else {
    const message = unauthMessage(Constants.gamesPage.unauth);
    gameState.sprintContainer.append(message);
  }
}
