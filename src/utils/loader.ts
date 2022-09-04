import createBLock from '../components/createBLock';
import Constants from '../constants/Constants';

export default function showLoader() {
  const mainBlock = document.querySelector('#main-block');
  if (mainBlock) {
    mainBlock.innerHTML = '';
    const loader = createBLock('div', {
      classList: ['loader'],
      children: [Constants.loader],
    });

    mainBlock.append(loader);
  }
}
