import createBLock from '../../../components/createBLock';
import drawElements from './drawElements';
import { GameState, WordPairedWithGuessTranslation } from '../../../types/sprint';
import launchTimer from './launchTimer';
import drawNewWord from './drawNewWord';
import { disableAllButtons } from '../../../utils/disableEnable';

export default function startGame(
  maxSec: number,
  sprintContainer: HTMLElement,
  originalWords: WordPairedWithGuessTranslation[],
) {
  const gameState: GameState = {
    currentWord: undefined,
    answerFlag: true,
    correctAnswers: [],
    incorrectAnswers: [],
    totalScore: 0,
    sequenceOfSuccess: 0,
    allSequencesOfSuccess: [],
    words: originalWords,

    wordContainer: createBLock('div', {
      classList: ['word-to-guess'],
    }),
    translationContainer: createBLock('div', {
      classList: ['translation'],
    }),

    totalScoreContainer: createBLock('div', {
      classList: ['total-score'],
    }),

    sequenceOfSuccessContainer: createBLock('div', {
      classList: ['sequence-of-success'],
    }),

    timerContainer: createBLock('div', {
      classList: ['timer'],
      attributes: { id: 'sprint-timer' },
    }),

    timer: 0,

    sprintContainer,
  };

  drawElements(gameState);
  gameState.totalScoreContainer.innerHTML = String(gameState.totalScore);
  drawNewWord(gameState);

  disableAllButtons();

  launchTimer(maxSec, gameState);
}
