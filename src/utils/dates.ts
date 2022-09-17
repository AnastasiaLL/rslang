export default function threeDaysDates() {
  const millisecondsNow = Date.now();
  const oneDayMilliseconds = 24 * 60 * 60 * 1000;

  const today = new Date();
  const yesterday = new Date(millisecondsNow - oneDayMilliseconds);
  const beforeYesterday = new Date(millisecondsNow - oneDayMilliseconds * 2);

  return [beforeYesterday.toLocaleDateString(),
    yesterday.toLocaleDateString(), today.toLocaleDateString()];
}
