import getUserWord from '../textbook/workWithApi/getUserWord';
import { USERWORD } from '../../types/ResponsesTypes';
import Constants from '../../constants/Constants';
import createUserWord from '../textbook/workWithApi/createUserWord';

export default async function updateSprintUserWords(
  token: string,
  userId: string,
  allShownWordsIDs: (string | undefined)[],
  correctAnswersIDs: (string | undefined)[],
) {
  const userWords = await getUserWord(userId, token);
  console.log('getUserWord(userId, token)', userWords);

  const todaySpringNewWords = [];
  const todaySpringStudiedWords = [];

  allShownWordsIDs.forEach((id) => {
    const suchWord = userWords.find((userWord: USERWORD) => userWord.optional.wordId === id);
    if (id) {
      if (suchWord) {
      /// ////////////////// такое слово уже есть в userWords, assign, PUT
      // 1. Новое ли, посчитать показ, в/из список новых слов
        suchWord.optional.shownInSprint += 1;

        if (suchWord.optional.shownInSprint > 1) {
          suchWord.optional.sprintNew = false;
        } else {
          suchWord.optional.sprintNew = true;
          todaySpringNewWords.push(suchWord);
        }

        // 2. Правильно ли отвечено, добавить количество правильных ответов и правильных подряд

        if (correctAnswersIDs.includes(id)) {
          suchWord.optional.correctAnswers += 1;
          suchWord.optional.correctAnswersSequence += 1;
          if (suchWord.optional.correctAnswers >= Constants.answersForWordToBeStudied) {
            suchWord.optional.studied = true;
            todaySpringStudiedWords.push(suchWord);
          }
        } else {
        // есть неправильный ответ - удаляем слово из изученных,
        // обнуляем счет правильных ответов подряд
          suchWord.optional.studied = false;
          suchWord.optional.incorrectAnswers += 1;
          suchWord.optional.correctAnswersSequence = 0;
        }
        console.log('suchWord', suchWord);
        createUserWord(userId, id, suchWord, token, 'PUT');
      } else {
      /// ////////////////// такого слова нет в userWords, создаем с нуля его, POST
      // 1. Создаем с первым показом и как новое
        const newUserWord = {
          difficulty: 'false',
          optional: {
            correctAnswersSequence: 0,
            shownInSprint: 1,
            shownInAudio: 0,
            studied: false,
            sprintNew: true,
            audioChallengeNew: false,
            correctAnswers: 0,
            incorrectAnswers: 0,
            wordId: id,
          },
        };
        // 2. Правильно ли отвечено

        if (correctAnswersIDs.includes(id)) {
          newUserWord.optional.correctAnswers += 1;
          newUserWord.optional.correctAnswersSequence += 1;
          if (newUserWord.optional.correctAnswers >= Constants.answersForWordToBeStudied) {
            newUserWord.optional.studied = true;
          }
        } else {
        // есть неправильный ответ - удаляем слово из изученных, обнуляем счет правильности
          newUserWord.optional.studied = false;
          newUserWord.optional.incorrectAnswers += 1;
          newUserWord.optional.correctAnswersSequence = 0;
        }
        todaySpringNewWords.push(newUserWord);
        console.log('newUserWord', newUserWord);
        createUserWord(userId, id, newUserWord, token, 'POST');
      }
    }
  });

  console.log('return from updateGameUserWords', {
    todaySpringNewWords: todaySpringNewWords.length,
    todaySpringStudiedWords: todaySpringStudiedWords.length,
  });

  return {
    todaySpringNewWords: todaySpringNewWords.length,
    todaySpringStudiedWords: todaySpringStudiedWords.length,
  };
}
