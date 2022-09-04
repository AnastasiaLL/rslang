import Chart from 'chart.js/auto';
import { DayStat, SeveralDaysStat } from '../../types/stats';
import { fadedColors, randomBrightColor, randomFadedColor } from '../../utils/colorsSet';

export function drawDoughnutChart(todayData: DayStat) {
  const canvas = document.getElementById(String(todayData.activity));

  const correctColor = randomBrightColor();
  const incorrectColor = randomFadedColor();

  if (canvas) {
    const data = {
      datasets: [{
        data: [todayData.answeredCorrectlyPercentage,
          (100 - todayData.answeredCorrectlyPercentage)],
        backgroundColor: [
          correctColor,
          incorrectColor,
        ],
      }],
    };

    const chart = new Chart(canvas as HTMLCanvasElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [todayData.answeredCorrectlyPercentage,
            (100 - todayData.answeredCorrectlyPercentage)],
          backgroundColor: [
            correctColor,
            incorrectColor,
          ],
        }],
      },
      options: {
        plugins: {
          tooltip: {
            enabled: false,
          },
        },
      },
    });

    chart.data = data;
  }
}

export function drawLineChart(studiedByDayStatsData: SeveralDaysStat, id: string) {
  const canvas = document.getElementById(id);
  const maxScale = Math.max(...studiedByDayStatsData.data) + 10;

  if (canvas) {
    const data = {
      labels: studiedByDayStatsData.labels,
      datasets: [{
        data: studiedByDayStatsData.data,
        fill: false,
        borderColor: randomBrightColor(),
        tension: 0.1,
      }],
    };

    const chart = new Chart(canvas as HTMLCanvasElement, {
      type: 'line',
      data: {
        labels: studiedByDayStatsData.labels,
        datasets: [{
          data: studiedByDayStatsData.data,
          fill: false,
          borderColor: randomBrightColor(),
          tension: 0.1,
        }],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: maxScale,
            min: 0,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    chart.data = data;
  }
}

export function drawBarChart(newWordsByDayStatsData: SeveralDaysStat, id: string) {
  const canvas = document.getElementById(id);
  const maxScale = Math.max(...newWordsByDayStatsData.data) + 10;
  if (canvas) {
    const data = {
      labels: newWordsByDayStatsData.labels,
      datasets: [{
        data: newWordsByDayStatsData.data,
        backgroundColor: fadedColors,
      }],
    };

    const chart = new Chart(canvas as HTMLCanvasElement, {
      type: 'bar',
      data: {
        labels: newWordsByDayStatsData.labels,
        datasets: [{
          data: newWordsByDayStatsData.data,
          backgroundColor: fadedColors,
        }],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: maxScale,
            min: 0,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    chart.data = data;
  }
}
