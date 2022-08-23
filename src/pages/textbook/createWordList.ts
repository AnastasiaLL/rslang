import createBLock from '../../components/createBLock';

export default function createWordList(): HTMLElement {
  const wordList = createBLock('div', {
    classList: ['textbook__words-list'],
    children: ['cards'],
  });

  return wordList;
}
