import { GameState } from '../../../types/sprint';
import finishGame from './finishGame';

export default function launchTimer(maxSec: number, gameState: GameState) {
  let count = maxSec;
  const timer = setInterval(() => {
    if (!document.querySelector('#sprint-timer')) {
      clearInterval(gameState.timer);
    }

    console.log(count);
    count -= 1;
    Object.assign(gameState.timerContainer, { innerHTML: String(count) });
    if (count <= 0) {
      finishGame(gameState);
    }
  }, 1000);
  Object.assign(gameState, { timer });
}
