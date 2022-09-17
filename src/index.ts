import './assets/css/style.css';

import drawHeader from './components/drawHeader';
import openMainPage from './pages/mainPage/openMainPage';
import Constants from './constants/Constants';

drawHeader();
const pageName = window.localStorage.getItem(Constants.localStorageKeys.pageName);
if (!pageName) {
  openMainPage();
} else {
  const block = document.querySelector(`#${pageName}`);
  if (block instanceof HTMLElement) {
    block.click();
  }
}
