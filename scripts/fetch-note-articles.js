/**
 * ビルド時にnote.com APIから記事を取得してJSONに保存するスクリプト
 */

const NOTE_USER_ID = 'viva_kantomi';
const NOTE_API_BASE = 'https://note.com/api/v2';
const OUTPUT_PATH = './public/data/note-articles.json';

async function fetchNoteArticles() {
  console.log('Fetching note articles...');

  try {
    const response = await fetch(
      `${NOTE_API_BASE}/creators/${NOTE_USER_ID}/contents?kind=note&page=1&per=10`
    );

    if (!response.ok) {
      console.error('Failed to fetch note articles:', response.status);
      return [];
    }

    const data = await response.json();

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

async function main() {
  const fs = await import('fs');
  const path = await import('path');

  const articles = await fetchNoteArticles();

  // ディレクトリがなければ作成
  const dir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // JSONファイルに保存
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(articles, null, 2));

  console.log(`Saved ${articles.length} articles to ${OUTPUT_PATH}`);
}

main();
