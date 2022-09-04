import createBLock from './createBLock';

export default function createErrorAlert(msg: string) {
  return createBLock('div', {
    classList: ['error-alert'],
    children: [msg],
  });
}
