// import {attributes} from "../types/tagOption";

export default class Constants {
  static url = 'https://rslang2022q1.herokuapp.com';

  static localStorageKeys = {
    token: 'rslangT86-token',
    userId: 'rslangT86-userId',
    refreshToken: 'rslangT86-refreshToken',
    name: 'rslangT86-name',
    pageName: 'rslangT86-pageName',
  };

  static path = {
    words: '/words',
    users: '/users',
    tokens: '/tokens',
    aggregatedWords: '/aggregatedWords',
    statistics: '/statistics',
    settings: '/settings',
    signIn: '/signin',
  };

  static mainPage = {
    headLine: 'RSLang - приложение для изучения английского',
    paragraph: `Выучи английский от уровня А1 до С2 с приложением RSLang! </br>
    В приложении тебя ждет учебник с более чем 3000 словами разного уровня, игры для запоминания слов и статистика твоих успехов`,
    buttonStart: 'Начать',
  };

  static signIn = {};

  static gamesPage = {
    unauth: 'Войдите, чтобы сохранить результаты игры',
    heading: 'Игры',
    message: 'Закрепи новые слова при помощи игр',
    audioChallengeHeading: 'Аудиовызов',
    audioChallengeMessage: 'Улучшай восприятие речи на слух, угадав перевод по звучанию слова',
    sprintHeading: 'Спринт',
    sprintMessage: 'Тренируй скорость перевода, угадав как можно больше слов за 30 секунд',
    choice: 'Выбери уровень сложности, чтобы начать',

    onTextBookPage: 'Тренироваться по этой странице учeбника',
    faq: `
    <h4>Как считаются баллы игры?</h4>

    <p>Правильным ответом в игре «Спринт» считается правильно выбранная кнопка.
    То есть когда слово показано с неправильным переводом, и пользователь нажимает кнопку «Неверно»,
    ответ засчитывается как верный.<p>
    <p>Правильным ответом в игре Аудиовызов считается правильно выбранное слово.</p>

    <h4>Что показывает статистика по играм?</h4>
    <p>Статистика показывает новые и изученные слова.<p>
    <p>Слова бывают:<p>

    <ol>
    <li> новое - показано (и получен ответ, неважно, правильный или нет) в любой из игр сегодня</li>
    <li> сложное - отмечается пользователем в учебнике</li>
    <li> изученное - отмечается пользователем в учебники и определяется по результатам игр:
    <ul>
    <li>три правильных ответа в игре подряд - слово становится изученным</li>
    <li>изученное продолжает показываться в играх</li>
    <li>если пользователь ошибется с изученным словом хотя бы раз - оно становится неизученным снова</li></ul>
    </li>

    <p>Также в статистике есть процент правильных ответов от всех показанных слов по каждой игре</p>
    `,
  };

  static statisticPage = {
    subHeadingToday: 'Статистика по играм за сегодня',
    subHeadingTotal: 'Статистика по играм за все время',
    demoButton: 'Показать пример статистики за 3 дня',
    demoButtonBack: 'Вернуться к своей статистике',
    newWordsByDayStats: 'Новые слова по дням',
    studiedByDayStats: 'Изученные слова по дням',
    statsBlocks: [{
      heading: 'Спринт',
      percentageText: 'Правильных ответов',
      newWordsText: 'новых слов',
      bestSeriesText: 'правильных ответов подряд',
    },
    {
      heading: 'Аудиовызов',
      percentageText: 'Правильных ответов',
      newWordsText: 'новых слов',
      bestSeriesText: 'правильных ответов подряд',
    },
    {
      heading: 'Всего слов за сегодня',
      percentageText: 'Правильных ответов',
      newWordsText: 'новых слов',
      studiedText: 'слов изучено',
    },
    ],
  };

  static teamPage = [
    {
      name: 'Женя',
      dev: 'Junior Frontend developer',
      info: 'Разработала статистику и игру «Спринт», а также сделала большую часть верстки и дизайна',
      id: 'id-1',
    },
    {
      name: 'Настя',
      dev: 'Junior Frontend developer, Team Lead',
      info: 'Разработала игру «Аудиовызов», а также сделала верстку разделов Команда и Вход',
      id: 'id-2',
    },
    {
      name: 'Женя',
      dev: 'Junior Frontend developer ',
      info: 'Разработал функционал учебника, входа, регистрации, а также трудился над созданием главной страницы',
      id: 'id-3',
    },
  ];

  static textBookPage = {
    unauth: 'Войдите, чтобы управлять словами и видеть статистику изучения',
    localStorageKeyForPage: 'textbookPageNumber',
    localStorageKeyForGroup: 'textbookGroupNumber',
    numberFirstPage: 0,
    numberLastPage: 30,
    chapterKey: 'chapterHeading',
    select: [
      {
        value: '0',
        text: 'Уровень сложности: А1',
      },
      {
        value: '1',
        text: 'Уровень сложности: А2',
      },
      {
        value: '2',
        text: 'Уровень сложности: B1',
      },
      {
        value: '3',
        text: 'Уровень сложности: B2',
      },
      {
        value: '4',
        text: 'Уровень сложности: C1',
      },
      {
        value: '5',
        text: 'Уровень сложности: C2',
      },
    ],
    pagination: [
      {
        text: '<<',
        modifier: 'pagination__inactive',
        id: 'ltlt',
        direction: 'start',
      },
      {
        text: '<',
        modifier: 'pagination__inactive',
        id: 'lt',
        direction: 'previous',
      },
      {
        text: 1,
        modifier: 'pagination__active',
        id: 'pagination__active',
        dataSet: 'data-page-number',
      },
      {
        text: '>',
        modifier: '',
        id: 'gt',
        direction: 'next',
      },
      {
        text: '>>',
        modifier: '',
        id: 'gtgt',
        direction: 'end',
      },
    ],
    wordStatCorrect: 'Угадано в играх',
    wordStatIncorrect: 'Не угадано в играх',
  };

  static sprintGame = {
    gameTime: 30,
    trueButtonText: 'Верно (🡨)',
    falseButtonText: 'Неверно (🡪)',
    stopButtonText: 'Выйти из игры (Space)',
    startAgainButtonText: 'Играть еще',
    levelHeading: 'Сложность',
    beginOnPage: 'Начинаем со страницы',

    finishHeading: 'Результаты игры',
    score: 'Общий счет игры',
    sequenceOfSuccess: 'Правильных подряд',
    correсtsAnswers: 'Правильные ответы',
    incorreсtsAnswers: 'Неправильные ответы',
  };

  static chapters = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  static pages = 30;

  static sprintPagesToPlay = 5;

  static answersForWordToBeStudied = 3;

  static loader = 'Идет загрузка';
}
