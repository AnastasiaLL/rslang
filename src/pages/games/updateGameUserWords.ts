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
  console.log('getUserWord(userId, token)', userWords);

  const todayGameNewWords = [];
  const todayGameStudiedWords = [];

  const gameShown = `${game}Shown`;
  const gameNew = `${game}New`;

  console.log('gameShown', gameShown, 'gameNew', gameNew);

  allShownWordsIDs.forEach((id) => {
    const suchWord = userWords.find((userWord: USERWORD) => userWord.optional.wordId === id);
    if (id) {
      if (suchWord) {
      /// ////////////////// такое слово уже есть в userWords, assign, PUT
      // 1. Новое ли, посчитать показ, в/из список новых слов
        suchWord.optional[gameShown] += 1;

        if (suchWord.optional[gameShown] > 1) {
          suchWord.optional[gameNew] = false;
        } else {
          suchWord.optional[gameNew] = true;
          todayGameNewWords.push(suchWord);
        }

        // 2. Правильно ли отвечено, добавить количество правильных ответов и правильных подряд

        if (correctAnswersIDs.includes(id)) {
          suchWord.optional.correctAnswers += 1;
          suchWord.optional.correctAnswersSequence += 1;
          if (suchWord.optional.correctAnswers >= Constants.answersForWordToBeStudied) {
            suchWord.optional.studied = true;
            todayGameStudiedWords.push(suchWord);
          }
        } else {
        // есть неправильный ответ - удаляем слово из изученных,
        // обнуляем счет правильных ответов подряд
          suchWord.optional.studied = false;
          suchWord.optional.incorrectAnswers += 1;
          suchWord.optional.correctAnswersSequence = 0;
        }
        console.log('suchWord', suchWord);

        // Делаем новый объект, куда переписываем все поля пришедшего в том числе обновленнные
        //  иначе бэкенд не берет

        const newSuchWord = {
          difficulty: suchWord.difficulty,
          optional: suchWord.optional,
        };

        createUserWord(userId, id, newSuchWord, token, 'PUT');
      } else {
      /// ////////////////// такого слова нет в userWords, создаем с нуля его, POST
      // 1. Создаем с первым показом и как новое
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

        newUserWord.optional[gameShown] += 1;
        newUserWord.optional[gameNew] = true;

        // 2. Правильно ли отвечено

        if (correctAnswersIDs.includes(id)) {
          newUserWord.optional.correctAnswers += 1;
          newUserWord.optional.correctAnswersSequence += 1;
          // if (newUserWord.optional.correctAnswers >= Constants.answersForWordToBeStudied) {
          //  newUserWord.optional.studied = true;
          // }
        } else {
        // есть неправильный ответ - удаляем слово из изученных, обнуляем счет правильности
          // newUserWord.optional.studied = false;
          newUserWord.optional.incorrectAnswers += 1;
          // newUserWord.optional.correctAnswersSequence = 0;
        }
        todayGameNewWords.push(newUserWord);
        console.log('newUserWord', newUserWord);
        createUserWord(userId, id, newUserWord, token, 'POST');
      }
    }
  });

  console.log('return from updateGameUserWords', {
    todayGameNewWords: todayGameNewWords.length,
    todayGameStudiedWords: todayGameStudiedWords.length,
  });

  return {
    todayGameNewWords: todayGameNewWords.length,
    todayGameStudiedWords: todayGameStudiedWords.length,
  };
}
