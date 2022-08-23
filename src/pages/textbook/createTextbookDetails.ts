import createBLock from '../../components/createBLock';
import soundIcon from './soundIcon';

export default function createTextbookDetails(): HTMLElement {
  const soundIconBlock = createBLock('div', {
    classList: ['word-details__sound-icon'],
  });

  soundIconBlock.innerHTML = soundIcon;
  const wordDetails = createBLock('div', {
    classList: ['word-details'],
    children: [soundIconBlock],
  });

  return wordDetails;
}
