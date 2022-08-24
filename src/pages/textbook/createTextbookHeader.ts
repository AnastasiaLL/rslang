import createBLock from '../../components/createBLock';
import Constants from '../../constants/Constants';
import drawCards from './cards/drawCards';

export default function createTextbookHeader(): HTMLElement {
  const chapterHeadingValue = window.localStorage.getItem(Constants.textBookPage.chapterKey);

  const select = createBLock('select', {
    classList: ['chapter__heading'],
    event: 'change',
    listener: drawCards,
    children: Constants.textBookPage.select.map((option) => {
      const optionBlock = createBLock('option', {
        attributes: {
          value: option.value,
        },
      });
      if (chapterHeadingValue === option.value && optionBlock instanceof HTMLOptionElement) {
        optionBlock.selected = true;
      }
      optionBlock.innerHTML += option.text;
      return optionBlock;
    }),
  });
  const pagination = createBLock('div', {
    classList: ['pagination'],
    children: Constants.textBookPage.pagination.map((element) => {
      const button = createBLock('button', {
        classList: ['pagination__control', element.modifier],
        attributes: { id: element.id },
      });
      if (element.dataSet) button.setAttribute('data-page-number', '1');
      button.innerHTML = `${element.text}`;
      return button;
    }),
  });

  const textbookHeader = createBLock('div', {
    classList: ['textbook__page-header'],
    children: [select, pagination],
  });

  return textbookHeader;
}
