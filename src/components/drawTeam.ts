import createBLock from './createBLock';
import Constants from '../constants/Constants';

export function openTeamPage(name: string, dev: string, info: string): void {
  const devInfo = createBLock('p', {
    classList: ['team-screen__description'],
    children: [dev],
  });

  const memberName = createBLock('h3', {
    classList: ['team-screen__description'],
    children: [name],
  });

  const information = createBLock('p', {
    classList: ['team-screen__description'],
    children: [info],
  });

  const infoBlock = createBLock('div', {
    classList: ['team-screen__info'],
    children: [memberName, devInfo, information],
  });

  const card = createBLock('div', {
    classList: ['team-screen'],
    children: [infoBlock],
  });

  const main = document.querySelector('#main-block');
  if (main instanceof HTMLElement) {
    main.append(card);
  }
}

export function clickTeamPage() {
  const main = document.querySelector('#main-block');
  if (main instanceof HTMLElement) {
    main.innerHTML = '';
  }
  Constants.teamPage.forEach((element) => {
    openTeamPage(element.name, element.dev, element.info);
  });
}
