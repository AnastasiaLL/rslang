import createBLock from './createBLock';
import drawTextbook from '../pages/textbook/textbook';

export default function drawHeader(): void {
  let authStatus = '<a id="login">Войти</a>';

  const userName = window.localStorage.getItem('rslangT86-name');
  if (userName) {
    authStatus = `<a id="login">${JSON.parse(userName)}</a>`;
  }

  const header = createBLock('header', {
    classList: ['header'],
  });

  header.innerHTML = `
  <div class="">
  <a href="#" class="">
    <div class="logo-title" id="logo-title"></div>
  </a>
</div>
<nav class="header__navigation">
  <ul class="navigation">
    <li class="navigation__nav-item">
      <div id="textbook">Учебник</div>
    </li>
    <li class="navigation__nav-item">
      <div id="games">Игры</div>
    </li>
    <li class="navigation__nav-item">
      <div id="stats">Статистика</div>
    </li>
    <li class="navigation__nav-item">
      <div id="team">Команда</div>
    </li>
    <li class="navigation__nav-item login">
      ${authStatus}
    </li>
  </ul>
</nav>
<div class="burger">
  <div class="burger__line"></div>
  <div class="burger__line"></div>
  <div class="burger__line"></div>
</div>`;

  header.querySelector('#textbook')?.addEventListener('click', () => drawTextbook());
  // header.querySelector('#logo-title')?.addEventListener('click', () => drawMain());

  document.querySelector('.wrapper')?.prepend(header);
}
