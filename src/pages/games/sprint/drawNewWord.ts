import { GameState } from '../../../types/sprint';
import finishGame from './finishGame';

export default function drawNewWord(gameState: GameState) {
  const currentWord = gameState.words.pop();
  if (currentWord) {
    Object.assign(gameState, { currentWord });
    Object.assign(gameState.wordContainer, { innerHTML: currentWord.word });
    Object.assign(gameState.translationContainer, { innerHTML: currentWord.guessTranslation });
    Object.assign(gameState.totalScoreContainer, { innerHTML: String(gameState.totalScore) });
    Object.assign(
      gameState.sequenceOfSuccessContainer,
      { innerHTML: String(gameState.sequenceOfSuccess) },
    );

    if (currentWord.guessTranslation === currentWord.wordTranslate) {
      Object.assign(gameState, { answerFlag: true });
    } else {
      Object.assign(gameState, { answerFlag: false });
    }
  } else {
    clearInterval(gameState.timer);
    finishGame(gameState);
  }
}
