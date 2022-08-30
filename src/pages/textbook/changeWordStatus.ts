import getUserWord from './workWithApi/getUserWord';
import Constants from '../../constants/Constants';
import { USERWORD } from '../../types/ResponsesTypes';
import createUserWord from './workWithApi/createUserWord';

export default function changeWordStatus(event: Event) {
  const controller = event.currentTarget;
  if (controller instanceof HTMLInputElement) {
    const { checked } = controller;
    const userId = window.localStorage.getItem(Constants.localStorageKeys.userId);
    const token = window.localStorage.getItem(Constants.localStorageKeys.token);
    if (userId && token) {
      getUserWord(userId, token, controller.name).then((userWordData: USERWORD) => {
        if (userWordData) {
          const userWord: USERWORD = {
            difficulty: userWordData.difficulty,
            optional: userWordData.optional,
          };
          if (controller.id === 'switch-hard') {
            userWord.difficulty = `${checked}`;
          } else {
            userWord.optional.studied = checked;
          }
          console.log(userWord);
          createUserWord(userId, userWordData.optional.wordId, userWord, token, 'PUT');
          const wordBLock = document.getElementById(userWordData.optional.wordId);
          if (wordBLock instanceof HTMLElement) {
            if (userWordData.difficulty !== 'true') {
              wordBLock.classList.add('hard');
              console.log(userWord.difficulty);
            } else wordBLock.classList.remove('hard');
          }
        } else {
          const userWord: USERWORD = {
            difficulty: 'false',
            optional: {
              studied: false,
              'sprint-new': false,
              audiochallengeNew: false,
              correctAnswers: 0,
              incorrectAnswers: 0,
              wordId: controller.name,
            },
          };
          if (controller.id === 'switch-hard') {
            userWord.difficulty = `${checked}`;
          } else {
            userWord.optional.studied = checked;
          }
          createUserWord(userId, userWord.optional.wordId, userWord, token, 'POST');
          const wordBLock = document.getElementById(userWord.optional.wordId);
          if (wordBLock instanceof HTMLElement) {
            if (userWord.difficulty === 'true') wordBLock.classList.add('hard');
            else wordBLock.classList.remove('hard');
          }
        }
      });
    }
  }
}
