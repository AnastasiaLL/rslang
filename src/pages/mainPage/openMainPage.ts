import createBLock from '../../components/createBLock';
import Constants from '../../constants/Constants';

export default function openMainPage(): void {
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

  const main = document.querySelector('main');
  if (main instanceof HTMLElement) {
    main.innerHTML = '';
    main.append(startScreen);
  }
}
