import drawCards from './cards/drawCards';
import Constants from '../../constants/Constants';

export default function changeGroup() {
  drawCards();
  const groupBlock = document.querySelector('.chapter__heading');
  if (groupBlock instanceof HTMLSelectElement) {
    window.localStorage.setItem(Constants.textBookPage.localStorageKeyForGroup, groupBlock.value);
  }
}
