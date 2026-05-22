export function daysSince(dateString: string): number {
  const start = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function formatNumber(n: number | string): string {
  if (typeof n === "string") return n;
  return n.toLocaleString("pt-BR");
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
