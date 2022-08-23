import { tagOption } from '../types/tagOption';

export default function createBLock(tag: string, options: tagOption): HTMLElement {
  const element = document.createElement(tag);

  if (options.classList) {
    options.classList.forEach((className) => {
      if (className) element.classList.add(className);
    });
  }

  if (options.event && options.listener) {
    element.addEventListener(options.event, options.listener);
  }

  if (options.children && options.children.length) {
    options.children.forEach((child) => {
      element.append(child);
    });
  }

  if (options.attributes) {
    Object.keys(options.attributes).forEach((key) => {
      if (options.attributes) {
        element.setAttribute(key, options.attributes[key]);
      }
    });
  }

  return element;
}
