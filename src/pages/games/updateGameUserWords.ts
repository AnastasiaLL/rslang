import getUserWord from '../textbook/workWithApi/getUserWord';
import { USERWORD } from '../../types/ResponsesTypes';
import Constants from '../../constants/Constants';
import createUserWord from '../textbook/workWithApi/createUserWord';

export default async function updateSprintUserWords(
  game: string,
  token: string,
  userId: string,
  allShownWordsIDs: (string | undefined)[],
  correctAnswersIDs: (string | undefined)[],
) {
  const userWords = await getUserWord(userId, token);

  const todayGameNewWords = [];
  const todayGameStudiedWords = [];

  const gameShown = `${game}Shown`;

  allShownWordsIDs.forEach((id) => {
    const suchWord = userWords.find((userWord: USERWORD) => userWord.optional.wordId === id);
    if (id) {
      if (suchWord) {
        suchWord.optional[gameShown] += 1;

        if (suchWord.optional[gameShown] === 1) {
          todayGameNewWords.push(suchWord);
        }
        if (correctAnswersIDs.includes(id)) {
          suchWord.optional.correctAnswers += 1;
          suchWord.optional.correctAnswersSequence += 1;
          if (suchWord.optional.correctAnswersSequence >= Constants.answersForWordToBeStudied) {
            suchWord.optional.studied = true;
            suchWord.difficulty = 'false';
            todayGameStudiedWords.push(suchWord);
          }
        } else {
          suchWord.optional.studied = false;
          suchWord.optional.incorrectAnswers += 1;
          suchWord.optional.correctAnswersSequence = 0;
        }
        const newSuchWord = {
          difficulty: suchWord.difficulty,
          optional: suchWord.optional,
        };

        createUserWord(userId, id, newSuchWord, token, 'PUT');
      } else {
        const newUserWord: USERWORD = {
          difficulty: 'false',
          optional: {
            correctAnswersSequence: 0,
            sprintShown: 0,
            audioShown: 0,
            studied: false,
            sprintNew: false,
            audioNew: false,
            correctAnswers: 0,
            incorrectAnswers: 0,
            wordId: id,
          },
        };
        todayGameNewWords.push(newUserWord);

        const currentShown = Number(newUserWord.optional[gameShown]);
        newUserWord.optional[gameShown] = currentShown + 1;

        if (correctAnswersIDs.includes(id)) {
          newUserWord.optional.correctAnswers += 1;
          newUserWord.optional.correctAnswersSequence += 1;
        } else {
          newUserWord.optional.incorrectAnswers += 1;
        }

        createUserWord(userId, id, newUserWord, token, 'POST');
      }
    }
  });

  return {
    todayGameNewWords: todayGameNewWords.length,
    todayGameStudiedWords: todayGameStudiedWords.length,
  };
}
