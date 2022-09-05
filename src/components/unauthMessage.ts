import createBLock from './createBLock';

export default function unauthMessage(message: string) {
  const block = createBLock('div', {
    classList: ['unath-message'],
    children: [message],
  });
  return block;
}
