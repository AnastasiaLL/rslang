// import {attributes} from "../types/tagOption";

export default class Constants {
  static url = 'https://rslang2022q1.herokuapp.com';

  static localStorageKeys = {
    token: 'rslangT86-token',
    userId: 'rslangT86-userId',
    refreshToken: 'rslangT86-refreshToken',
    name: 'rslangT86-name',
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
    paragraph: 'Позволяет выучить английский и др описание возможностей и преимуществ приложения строк на пять и др описание возможностей и преимуществ приложения строк на пять',
    buttonStart: 'Начать',
  };

  static signIn = {};

  static gamesPage = {};

  static statisticPage = {
    subHeadingToday: 'Статистика за сегодня',
    subHeadingTotal: 'Статистика за все время',
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
      name: 'Name1',
      dev: 'frontend dev',
      info: 'здесь будет информация о том, кто что сделал и кто какой молодец. здесь будет информация о том, кто что сделал и кто какой молодец',
    },
    {
      name: 'Name2',
      dev: 'frontend dev',
      info: 'здесь будет информация о том, кто что сделал и кто какой молодец. здесь будет информация о том, кто что сделал и кто какой молодец',
    },
    {
      name: 'Name3',
      dev: 'frontend dev',
      info: 'здесь будет информация о том, кто что сделал и кто какой молодец. здесь будет информация о том, кто что сделал и кто какой молодец',
    },
  ];

  static textBookPage = {
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
  };

  static sprintGame = {
    gameTime: 30,
    trueButtonText: 'Верно',
    falseButtonText: 'Неверно',
    startAgainButtonText: 'Играть еще',
    sequenceOfSuccess: 'Правильных ответов подряд',
  };
}
