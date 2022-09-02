import createBLock from '../../components/createBLock';
import Constants from '../../constants/Constants';
import updateNav from '../../utils/updateNav';

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
  });

  const infoBlock = createBLock('div', {
    classList: ['start-screen__info'],
    children: [headLine, paragraph, button],
  });

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
