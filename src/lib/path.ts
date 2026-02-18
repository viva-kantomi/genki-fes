/**
 * パスユーティリティ
 * 環境に応じてベースパスを適切に付与する
 */

/**
 * 内部リンク用のパスを生成
 * @param path - "/"で始まるパス（例: "/events/"）
 * @returns ベースパスが付与されたパス
 */
export function getPath(path: string): string {
  const base = import.meta.env.BASE_URL;
  // baseが"/"の場合はそのまま、それ以外は結合
  if (base === '/' || base === '') {
    return path;
  }
  // pathが"/"で始まる場合、baseの末尾と重複しないように調整
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${normalizedPath}`;
}

/**
 * 静的アセット用のパスを生成
 * @param path - "images/..."のような相対パス
 * @returns ベースパスが付与されたパス
 */
export function getAssetPath(path: string): string {
  const base = import.meta.env.BASE_URL;
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${normalizedPath}`;
}
