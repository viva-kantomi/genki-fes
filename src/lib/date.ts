/**
 * 日付を日本語形式でフォーマット
 * @param date - Date object or ISO string
 * @returns フォーマットされた日付文字列 (例: 2026年2月17日)
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * 日付をISO形式の日付部分のみ返す
 * @param date - Date object
 * @returns YYYY-MM-DD形式の文字列
 */
export function toISODateString(date: Date): string {
  return date.toISOString().split('T')[0];
}
