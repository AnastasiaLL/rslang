import { WordPairedWithGuessTranslation } from '../../../types/sprint';
import { WORD } from '../../../types/ResponsesTypes';

export default function makeWordTranslationPairs(
  originalWords: WORD[],
): WordPairedWithGuessTranslation[] {
  originalWords.sort(() => 0.5 - Math.random());

  const wordsPairs = originalWords.map((word: WORD, index) => {
    let guessIndex: number;
    if (Math.random() < 0.3) {
      guessIndex = index;
    } else {
      guessIndex = Math.floor(Math.random() * originalWords.length);
    }
    return Object.assign(word, { guessTranslation: originalWords[guessIndex].wordTranslate });
  });
  return wordsPairs;
}
