import createBLock from './createBLock';
import Constants from '../constants/Constants';
import updateNav from '../utils/updateNav';

export function openTeamPage(name: string, dev: string, info: string, id: string): void {
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
    classList: ['team-screen', `${id}`],
    children: [infoBlock],
  });
  const cardWrapper = document.querySelector('.cardWrapper');
  if (cardWrapper instanceof HTMLElement) {
    cardWrapper.append(card);
  }
}

export function clickTeamPage() {
  window.localStorage.setItem(Constants.localStorageKeys.pageName, 'team');
  const main = document.querySelector('#main-block');

  const cardWrapper = createBLock('div', {
    classList: ['cardWrapper'],
    children: [],
  });

  if (main instanceof HTMLElement) {
    main.innerHTML = '';
    main.append(cardWrapper);
  }
  Constants.teamPage.forEach((element) => {
    openTeamPage(element.name, element.dev, element.info, element.id);
  });

  updateNav('team');
}
