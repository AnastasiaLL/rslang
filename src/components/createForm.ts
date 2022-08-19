import createBLock from './createBLock';
import { attributes } from '../types/tagOption';

export default function createForm(
  inputsOption: { label: string, id: string, type?: string }[],
  buttonListener: () => void,
  formName: string,
  headLine: string,
): HTMLElement {
  const labels = inputsOption.map((option) => {
    const inputAttributes: attributes = { id: `${option.id}${formName}Input` };
    if (option.type) inputAttributes.type = option.type;
    const input = createBLock('input', {
      classList: ['form__input'],
      attributes: inputAttributes,
    });
    return createBLock('label', {
      classList: ['form__label'],
      attributes: { for: `${option.id}${formName}Input` },
      children: [input, option.label],
    });
  });

  const button = createBLock('button', {
    classList: ['button'],
    event: 'click',
    listener: buttonListener,
    attributes: { type: 'button' },
    children: [headLine],
  });

  const h2 = createBLock('h2', {
    children: [headLine],
  });

  const form = createBLock('form', {
    classList: ['popUp__form', `popUp__form_${formName}`],
    children: [h2, ...labels, button],
  });

  return form;
}
