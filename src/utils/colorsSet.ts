export const fadedColors = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 205, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(153, 102, 255, 0.2)',
];

export const brightColors = [
  'rgba(255, 99, 132, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(255, 205, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(153, 102, 255, 1)',
];

export function randomFadedColor() {
  const randomIndex = Math.ceil(Math.random() * (brightColors.length - 1));
  return fadedColors[randomIndex];
}

export function randomBrightColor() {
  const randomIndex = Math.ceil(Math.random() * (brightColors.length - 1));
  return brightColors[randomIndex];
}
