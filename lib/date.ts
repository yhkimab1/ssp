/** "2026-11-21" → "2026.11.21" */
export function formatDate(iso: string) {
  return iso.replaceAll("-", ".");
}

/** 오늘(YYYY-MM-DD)부터 마감일까지 남은 날 수. 지났으면 음수 */
export function daysUntil(deadline: string, today: string) {
  const ms = Date.parse(deadline) - Date.parse(today);
  return Math.round(ms / 86_400_000);
}

/** 사용자 컴퓨터 시간 기준 오늘 날짜 (YYYY-MM-DD) */
export function localToday() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}
