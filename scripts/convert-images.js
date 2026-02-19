import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = './public/images';

// 変換対象のPNG画像
const targets = [
  { dir: 'top_images', files: ['10.png', '11.png', '12.png', '13.png', '14.png', '15.png', '16.png', '17.png', '18.png'] },
  { dir: '.', files: ['genki_festa_logo.png', 'top_logo.png'] },
  { dir: 'common', files: ['ameba.png'] },
];

async function convertToWebp(inputPath, outputPath, quality = 80) {
  const stats = fs.statSync(inputPath);
  const originalSize = stats.size;

  await sharp(inputPath)
    .webp({ quality })
    .toFile(outputPath);

  const newStats = fs.statSync(outputPath);
  const newSize = newStats.size;
  const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);

  console.log(`${path.basename(inputPath)}: ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (${reduction}% 削減)`);
}

async function main() {
  console.log('PNG → WebP 変換開始...\n');

  for (const target of targets) {
    for (const file of target.files) {
      const inputPath = path.join(publicDir, target.dir, file);
      const outputPath = inputPath.replace('.png', '.webp');

      if (fs.existsSync(inputPath)) {
        await convertToWebp(inputPath, outputPath);
      } else {
        console.log(`ファイルが見つかりません: ${inputPath}`);
      }
    }
  }

  console.log('\n変換完了！');
}

main().catch(console.error);
