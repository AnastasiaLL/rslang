import { GameState } from '../../../types/sprint';
import createBLock from '../../../components/createBLock';
import Constants from '../../../constants/Constants';
import openGamesPage from '../openGamesPage';
import updateStatistics from '../../stats/model/updateStats';

export default function finishGame(gameState: GameState) {
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

  // TODO updateStatistics();

  updateStatistics(gameState);
}
