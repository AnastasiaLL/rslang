import createBLock from '../../components/createBLock';
import Constants from '../../constants/Constants';
import updateNav from '../../utils/updateNav';
import openSignIn from '../signIn/openSignIn';

export default function openMainPage(): void {
  window.localStorage.setItem(Constants.localStorageKeys.pageName, 'logo-title');
  const headLine = createBLock('h2', {
    children: [
      Constants.mainPage.headLine,
    ],
  });

  const paragraph = createBLock('p', {
    classList: ['start-screen__description'],
    children: [Constants.mainPage.paragraph],
  });

  const button = createBLock('button', {
    classList: ['button', 'primary-button'],
    children: [Constants.mainPage.buttonStart],
    event: 'click',
    listener: openSignIn,
  });

  let infoBlock;

  if (window.localStorage.getItem(Constants.localStorageKeys.userId)) {
    infoBlock = createBLock('div', {
      classList: ['start-screen__info'],
      children: [headLine, paragraph],
    });
  } else {
    infoBlock = createBLock('div', {
      classList: ['start-screen__info'],
      children: [headLine, paragraph, button],
    });
  }

  const startScreen = createBLock('div', {
    classList: ['start-screen'],
    children: [infoBlock],
  });

  const main = document.querySelector('#main-block');
  if (main instanceof HTMLElement) {
    main.innerHTML = '';
    main.append(startScreen);
  }

  updateNav('');
}
