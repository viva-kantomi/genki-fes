/**
 * note.com API からの記事取得ユーティリティ
 */

export interface NoteArticle {
  id: number;
  key: string;
  title: string;
  body: string;
  publishedAt: string;
  noteUrl: string;
  eyecatchUrl: string | null;
}

interface NoteApiResponse {
  data: {
    contents: Array<{
      id: number;
      key: string;
      name: string;
      body: string;
      publishAt: string;
      noteUrl: string;
      eyecatch?: string;
    }>;
  };
}

const NOTE_USER_ID = 'viva_kantomi';
const NOTE_API_BASE = 'https://note.com/api/v2';

/**
 * note.com から最新の記事を取得
 * @param count - 取得する記事数
 * @returns 記事の配列
 */
export async function fetchNoteArticles(count: number = 3): Promise<NoteArticle[]> {
  try {
    const response = await fetch(
      `${NOTE_API_BASE}/creators/${NOTE_USER_ID}/contents?kind=note&page=1&per=${count}`
    );

    if (!response.ok) {
      console.error('Failed to fetch note articles:', response.status);
      return [];
    }

    const data: NoteApiResponse = await response.json();

    return data.data.contents.map((item) => ({
      id: item.id,
      key: item.key,
      title: item.name,
      body: item.body || '',
      publishedAt: item.publishAt,
      noteUrl: item.noteUrl,
      eyecatchUrl: item.eyecatch || null,
    }));
  } catch (error) {
    console.error('Error fetching note articles:', error);
    return [];
  }
}

/**
 * keyからURLを生成（内部詳細ページ用）
 * ※ Astroテンプレート側でimport.meta.env.BASE_URLを付与する必要があります
 */
export function getNoteDetailPath(key: string): string {
  return `note/${key}/`;
}
