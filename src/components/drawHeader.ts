import createBLock from './createBLock';
import openTextbook from '../pages/textbook/openTextbook';
import openMainPage from '../pages/mainPage/openMainPage';
import openGamesPage from '../pages/games/openGamesPage';
import HeaderConstants from '../constants/HeaderConstants';
import openSignIn from '../pages/signIn/openSignIn';
import logOut from '../pages/signIn/logOut';
import { clickTeamPage } from './drawTeam';
import { openStatsPage } from '../pages/stats/openStatsPage';
import Constants from '../constants/Constants';
import getUser from '../pages/signIn/workWithApi/getUser';
import { USER } from '../types/ResponsesTypes';

export default function drawHeader(): void {
  const authStatus = HeaderConstants.nav.login;
  const loginListener = openSignIn;

  const header = createBLock('header', {
    classList: ['header'],
  });

  const logo = createBLock('div', {
    classList: ['logo-title'],
    listener: openMainPage,
    event: 'click',
    attributes: { id: 'logo-title' },
  });

  const nav = createBLock('nav', {
    attributes: { id: 'header__navigation' },
  });

  const navList = createBLock('ul', {
    classList: ['navigation'],
  });

  Object.keys(HeaderConstants.nav).forEach((pageName) => {
    const navHTML = createBLock('li', {
      classList: ['navigation__nav-item'],
    });

    switch (pageName) {
      case 'login': {
        const navInnerHTML = createBLock('div', {
          classList: ['login'],
          listener: loginListener,
          event: 'click',
          attributes: { id: pageName },
        });
        navInnerHTML.innerHTML = authStatus;
        navHTML.append(navInnerHTML);
        break;
      }

      case 'textbook': {
        const navInnerHTML = createBLock('div', {
          listener: openTextbook,
          event: 'click',
          attributes: { id: pageName },
        });
        navInnerHTML.innerHTML = HeaderConstants.nav[pageName];
        navHTML.append(navInnerHTML);
        break;
      }

      case 'games': {
        const navInnerHTML = createBLock('div', {
          listener: openGamesPage,
          event: 'click',
          attributes: { id: pageName },
        });
        navInnerHTML.innerHTML = HeaderConstants.nav[pageName];
        navHTML.append(navInnerHTML);
        break;
      }

      case 'team': {
        const navInnerHTML = createBLock('div', {
          listener: clickTeamPage,
          event: 'click',
          attributes: { id: pageName },
        });
        navInnerHTML.innerHTML = HeaderConstants.nav[pageName];
        navHTML.append(navInnerHTML);
        break;
      }

      case 'stats': {
        const navInnerHTML = createBLock('div', {
          listener: openStatsPage,
          event: 'click',
          attributes: { id: pageName },
        });
        navInnerHTML.innerHTML = HeaderConstants.nav[pageName];
        navHTML.append(navInnerHTML);
        break;
      }

      default: {
        const navInnerHTML = createBLock('div', {
          attributes: { id: pageName },
        });

        navInnerHTML.innerHTML = HeaderConstants.nav[pageName];
        navHTML.append(navInnerHTML);
      }
    }

    navList.append(navHTML);
  });

  nav.append(navList);

  const burger = createBLock('div', {
    classList: ['burger'],
  });

  burger.innerHTML = `
  <div class="burger__line"></div>
  <div class="burger__line"></div>
  <div class="burger__line"></div>
  `;

  header.append(logo, nav, burger);

  document.querySelector('.wrapper')?.prepend(header);

  const userId = window.localStorage.getItem(Constants.localStorageKeys.userId);
  const token = window.localStorage.getItem(Constants.localStorageKeys.token);
  if (userId && token) {
    if (userId) {
      getUser(userId, token).then((user: USER) => {
        const navItem = document.querySelector('.login')?.parentElement;
        if (navItem instanceof HTMLElement) {
          navItem.innerHTML = '';
          navItem.append(
            createBLock('div', { children: [user.name || 'Name'], attributes: { id: 'user-name' } }),
            createBLock('div', {
              classList: ['login'], children: ['Выйти'], event: 'click', listener: logOut,
            }),
          );
        }
      }).catch(() => {
        logOut();
      });
    }
  }
}
