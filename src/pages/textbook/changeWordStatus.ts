import getUserWord from './workWithApi/getUserWord';
import Constants from '../../constants/Constants';
import { USERWORD } from '../../types/ResponsesTypes';
import createUserWord from './workWithApi/createUserWord';

export default function changeWordStatus(event: Event) {
  const controller = event.currentTarget;
  const controllerStudied = document.querySelector('#switch-studied');
  const controllerHard = document.querySelector('#switch-hard');

  if (controller instanceof HTMLInputElement
    && controllerStudied instanceof HTMLInputElement
    && controllerHard instanceof HTMLInputElement) {
    if (controller.id === 'switch-hard') {
      if (controllerStudied instanceof HTMLInputElement) controllerStudied.checked = false;
    } else if (controllerHard instanceof HTMLInputElement) controllerHard.checked = false;
    const studiedChecked = controllerStudied.checked;
    const hardChecked = controllerHard.checked;
    const userId = window.localStorage.getItem(Constants.localStorageKeys.userId);
    const token = window.localStorage.getItem(Constants.localStorageKeys.token);
    if (userId && token) {
      getUserWord(userId, token, controller.name).then((userWordData: USERWORD) => {
        let userWord: USERWORD;
        if (userWordData) {
          userWord = {
            difficulty: userWordData.difficulty,
            optional: userWordData.optional,
          };
          userWord.difficulty = `${hardChecked}`;
          userWord.optional.studied = studiedChecked;
          createUserWord(userId, userWordData.optional.wordId, userWord, token, 'PUT');
        } else {
          userWord = {
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
              wordId: controller.name,
            },
          };
          if (controller.id === 'switch-hard') {
            userWord.difficulty = `${hardChecked}`;
          } else {
            userWord.optional.studied = studiedChecked;
          }
          createUserWord(userId, userWord.optional.wordId, userWord, token, 'POST');
        }
        const wordBLock = document.getElementById(userWord.optional.wordId);
        if (wordBLock instanceof HTMLElement) {
          if (userWord.difficulty === 'true') {
            wordBLock.classList.remove('studied');
            wordBLock.classList.add('hard');
          } else wordBLock.classList.remove('hard');
          if (userWord.optional.studied) {
            wordBLock.classList.remove('hard');
            wordBLock.classList.add('studied');
          } else wordBLock.classList.remove('studied');
        }
      });
    }
  }
}
