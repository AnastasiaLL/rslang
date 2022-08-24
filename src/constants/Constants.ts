// import {attributes} from "../types/tagOption";

export default class Constants {
  static url = 'https://rslang2022q1.herokuapp.com';

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

  static statisticPage = {};

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
    chapterKey: 'chapterHeading',
    select: [
      {
        value: '1',
        text: 'Уровень сложности: А1',
      },
      {
        value: '2',
        text: 'Уровень сложности: А2',
      },
      {
        value: '3',
        text: 'Уровень сложности: B1',
      },
    ],
    pagination: [
      {
        text: '<<',
        modifier: 'pagination__inactive',
        id: 'ltlt',
      },
      {
        text: '<',
        modifier: 'pagination__inactive',
        id: 'lt',
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
      },
      {
        text: '>>',
        modifier: '',
        id: 'gtgt',
      },
    ],
  };
}
