export function formatTime(totalSeconds: number): string {
  totalSeconds = Math.floor(totalSeconds);
  const seconds = totalSeconds % 60;
  const minutes = (totalSeconds - seconds) / 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}
