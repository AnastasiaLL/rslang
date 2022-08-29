import { GameState } from '../../../types/sprint';
import finishGame from './finishGame';

export default function launchTimer(maxSec: number, gameState: GameState) {
  let count = maxSec;

  const timer = setInterval(() => {
    console.log(count);
    count -= 1;
    Object.assign(gameState, { timer });
    Object.assign(gameState.timerContainer, { innerHTML: String(count) });
    if (count <= 0) {
      clearInterval(timer);
      finishGame(gameState);
    }
  }, 1000);
}
