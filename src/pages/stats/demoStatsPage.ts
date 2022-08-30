import { drawDoughnutChart, drawLineChart, drawBarChart } from './drawCharts';
import { dayStats, newWordsByDayStats, studiedByDayStats } from './model/fakeStats';
import { drawTodayStats, drawTotalStatsContainers, openStatsPage } from './openStatsPage';
import Constants from '../../constants/Constants';
import createBLock from '../../components/createBLock';

export default async function demonstrateStatsPage() {
  const statsPage = createBLock('div', {
    classList: ['stats'],
  });

  const mainBlock = document.querySelector('#main-block');
  if (mainBlock) {
    mainBlock.innerHTML = '';
    mainBlock.append(statsPage);
  }

  const dayStatsData = dayStats;
  const allTodayStats = drawTodayStats(dayStatsData);
  const totalStats = drawTotalStatsContainers();

  const demoButton = createBLock('button', {
    classList: ['button', 'primary-button'],
    children: [Constants.statisticPage.demoButtonBack],
    event: 'click',
    listener: openStatsPage,
  });

  statsPage.append(allTodayStats, totalStats, demoButton);

  Object.values(dayStatsData).forEach((pieceOfData) => {
    drawDoughnutChart(pieceOfData);
  });

  const newWordsByDayStatsData = newWordsByDayStats;
  const studiedByDayStatsData = studiedByDayStats;

  drawBarChart(newWordsByDayStatsData, 'words-by-day');
  drawLineChart(studiedByDayStatsData, 'studied-by-day');
}
