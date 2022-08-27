import updateNav from '../../utils/updateNav';
import createBLock from '../../components/createBLock';
import Constants from '../../constants/Constants';
import { drawDoughnutChart, drawLineChart, drawBarChart } from './drawCharts';
import { DayStat } from '../../types/stats';
import { dayStats, newWordsByDayStats, studiedByDayStats } from './model/getStats';
import demonstrateStatsPage from './demoStatsPage';

export function drawTotalStatsContainers() {
  const totalHeading = createBLock('h3', {
    children: [Constants.statisticPage.subHeadingTotal],
    classList: ['total-heading'],
  });

  const studiedChartHeading = createBLock('div', {
    children: [Constants.statisticPage.studiedByDayStats],
    classList: ['stat-card__heading'],
  });

  const newWordChartHeading = createBLock('div', {
    children: [Constants.statisticPage.newWordsByDayStats],
    classList: ['stat-card__heading'],
  });

  const chartSubHeadings = createBLock('div', {
    children: [newWordChartHeading, studiedChartHeading],
    classList: ['chart-subheadings'],
  });

  const newWordsByDay = createBLock('canvas', {
    attributes: { id: 'words-by-day' },
  });
  const newWordsByDayContainer = createBLock('div', {
    children: [newWordsByDay],
    classList: ['words-by-day', 'canvas-container'],
  });
  const studiedByDay = createBLock('canvas', {
    attributes: { id: 'studied-by-day' },
  });
  const studiedByDayContainer = createBLock('div', {
    children: [studiedByDay],
    classList: ['studied-by-day', 'canvas-container'],
  });
  const totalStats = createBLock('div', {
    classList: ['total-stats'],
  });

  totalStats.append(totalHeading, chartSubHeadings, newWordsByDayContainer, studiedByDayContainer);
  return totalStats;
}

export function drawTodayStats(
  dayStatsData: DayStat[],
): DocumentFragment {
  const todayStats = document.createDocumentFragment();

  const statCards: HTMLElement[] = [];

  Constants.statisticPage.statsBlocks.forEach((item, index) => {
    const data = dayStatsData[index];
    const statCard = createBLock('div', {
      classList: ['stat-card'],
    });

    statCard.innerHTML = `
      <div class="stat-card__heading">${item.heading}</div>

      <div class="stat-card__donut-stat">
        <div class="stat-card__stat-name"> ${Constants.statisticPage.statsBlocks[index].percentageText} </div>
        <div class="stat-card__percentage-text">${data?.answeredCorrectlyPercentage}% </div>
        <div class="canvas-container ${data?.activity}">
          <canvas id="${data?.activity}"></canvas>
        </div>
      </div>
      <div class="stat-card__number-stats">
        <div class="stat-card__number-stat">
          <div class="stat-card__stat-value">${data?.newWords}</div>
          <div class="stat-card__stat-name">${item.newWordsText} </div>
        </div>
        <div class="stat-card__number-stat">
          <div class="stat-card__stat-value">${data?.bestSeries || data?.studied || 0}</div>
          <div class="stat-card__stat-name">${item.bestSeriesText || item.studiedText}</div>
        </div>
      </div>
      `;
    statCards.push(statCard);
  });

  const todayHeading = createBLock('h3', {
    children: [Constants.statisticPage.subHeadingToday],
  });
  const todayStatsCards = createBLock('div', {
    classList: ['today-stats'],
    children: statCards,
  });

  todayStats.append(todayHeading, todayStatsCards);

  return todayStats;
}

// ///////////////////////////////////////// //////////////////////////////////////////////

export function openStatsPage() {
  const statsPage = createBLock('div', {
    classList: ['stats'],
  });

  updateNav('stats');

  const mainBlock = document.querySelector('#main-block');
  if (mainBlock) {
    mainBlock.innerHTML = '';
    mainBlock.append(statsPage);
  }

  const demoButton = createBLock('button', {
    classList: ['button', 'primary-button'],
    children: [Constants.statisticPage.demoButton],
    event: 'click',
    listener: demonstrateStatsPage,
  });

  const dayStatsData = dayStats();
  const allTodayStats = drawTodayStats(dayStatsData);
  const totalStats = drawTotalStatsContainers();

  statsPage.append(allTodayStats, totalStats, demoButton);

  dayStatsData.forEach((pieceOfData) => {
    drawDoughnutChart(pieceOfData);
  });

  const newWordsByDayStatsData = newWordsByDayStats();
  const studiedByDayStatsData = studiedByDayStats();

  drawBarChart(newWordsByDayStatsData, 'words-by-day');
  drawLineChart(studiedByDayStatsData, 'studied-by-day');
}

// ///////////////////////////////////////// //////////////////////////////////////////////
