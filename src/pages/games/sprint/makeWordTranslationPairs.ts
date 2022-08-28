import { Word, WordPairedWithGuessTranslation } from '../../../types/sprint';

export default function makeWordTranslationPairs(
  originalWords: Word[],
): WordPairedWithGuessTranslation[] {
  const wordsPairs = originalWords.map((word: Word) => {
    const randomIndex = Math.floor(Math.random() * originalWords.length);
    return Object.assign(word, { guessTranslation: originalWords[randomIndex].wordTranslate });
  });
  return wordsPairs;
}
