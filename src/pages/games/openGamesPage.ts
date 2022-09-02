import createBLock from '../../components/createBLock';
import Constants from '../../constants/Constants';
import updateNav from '../../utils/updateNav';

import openAudioCallPage from './audiocall/openCallPage';

import { getGameReady } from './sprint/getGameReady';

export default function openGamesPage() {
  const mainBlock = document.querySelector('#main-block');

  const heading = createBLock('h2', {
    children: [Constants.gamesPage.heading],
  });

  const paragraph = createBLock('p', {
    classList: ['start-games__description'],
    children: [Constants.gamesPage.message],
  });

  const faq = createBLock('div', {
    classList: ['start-games__rules'],
    children: [Constants.gamesPage.faq],
  });

  //= ===============Аудиовызов===========================
  const audiocallH1 = createBLock('h3', {
    children: [Constants.gamesPage.audioChallengeHeading],
  });
  const audiocallP = createBLock('p', {
    classList: ['audiocall__p'],
    children: [Constants.gamesPage.audioChallengeMessage],
  });

  /// ДОБАВЛЯТЬ СЮДА) ////////////////////

  const audiocallDifficultyChoices = Constants.chapters.map((chapter) => createBLock('div', {
    classList: ['difficulty-choice'],
    children: [chapter],
  }));

  const audiocallDifficultyContainer = createBLock('div', {
    classList: ['difficulty-container'],
    children: audiocallDifficultyChoices,
  });

  const startPlayText = createBLock('p', {
    classList: ['start-play-text'],
    children: [Constants.gamesPage.choice],
  });

  const audiocallWrapper = createBLock('div', {
    classList: ['audiocall__wrapper', 'game'],
    children: [audiocallH1, audiocallP, startPlayText, audiocallDifficultyContainer],
    listener: openAudioCallPage,
    event: 'click',
  });

  //= =================Спринт============================
  const sprintH1 = createBLock('h3', {
    children: [Constants.gamesPage.sprintHeading],
  });
  const sprintP = createBLock('p', {
    classList: ['sprint__p'],
    children: [Constants.gamesPage.sprintMessage],
  });

  const sprintDifficultyChoices = Constants.chapters.map((chapter, index) => createBLock('div', {
    classList: ['difficulty-choice'],
    children: [chapter],
    event: 'click',
    listener: () => getGameReady(index),
  }));

  const sprintDifficultyContainer = createBLock('div', {
    classList: ['difficulty-container'],
    children: sprintDifficultyChoices,
  });

  const startPlaySprint = createBLock('p', {
    classList: ['start-play-text'],
    children: [Constants.gamesPage.choice],
  });

  const sprintWrapper = createBLock('div', {
    classList: ['sprint__wrapper', 'game'],
    children: [sprintH1, sprintP, startPlaySprint, sprintDifficultyContainer],
  });

  const gamesWrapper = createBLock('div', {
    classList: ['games__wrapper'],
    children: [audiocallWrapper, sprintWrapper],
  });

  const infoGames = createBLock('div', {
    classList: ['info-games'],
    children: [heading, paragraph, gamesWrapper, faq],
  });

  const startGames = createBLock('div', {
    classList: ['start-games'],
    children: [infoGames],
  });

  if (mainBlock) {
    mainBlock.innerHTML = '';
    mainBlock.append(startGames);
  }

  updateNav('games');
}
