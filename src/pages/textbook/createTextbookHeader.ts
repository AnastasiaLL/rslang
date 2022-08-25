import createBLock from '../../components/createBLock';
import Constants from '../../constants/Constants';
import drawCards from './cards/drawCards';
import { tagOption } from '../../types/tagOption';
import changePage from './changePage';
import changeGroup from './changeGroup';

export default function createTextbookHeader(): HTMLElement {
  const chapterHeadingValue = window.localStorage.getItem(Constants.textBookPage.chapterKey);

  const select = createBLock('select', {
    classList: ['chapter__heading'],
    event: 'change',
    listener: changeGroup,
    children: Constants.textBookPage.select.map((option) => {
      const optionBlock = createBLock('option', {
        attributes: {
          value: option.value,
        },
      });
      const currentGroup = window.localStorage
        .getItem(Constants.textBookPage.localStorageKeyForGroup);
      if (optionBlock instanceof HTMLOptionElement) {
        if (currentGroup) {
          if (currentGroup === option.value) {
            optionBlock.selected = true;
          }
        } else if (chapterHeadingValue === option.value) {
          optionBlock.selected = true;
        }
      }

      optionBlock.innerHTML += option.text;
      return optionBlock;
    }),
  });
  const pagination = createBLock('div', {
    classList: ['pagination'],
    children: Constants.textBookPage.pagination.map((element) => {
      const option: tagOption = {
        classList: ['pagination__control', element.modifier],
        attributes: { id: element.id },
      };
      if (element.direction) {
        option.event = 'click';
        option.listener = changePage(element.direction);
      }
      const button = createBLock('button', option);
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
