// Simple OG image generator using jimp
// Usage: node scripts/generate-og.js
const input = 'public/images/dewalesamue.png';
const output = 'public/images/dewalesamue-og.jpg';

async function generate() {
  try {
    // Import dynamically to support different module formats
    const mod = await import('jimp');
    const Jimp = mod.Jimp || mod.default || mod;
    const image = await (Jimp.read ? Jimp.read(input) : Jimp.readAsync(input));
    // Resize to width 1200, keep aspect ratio, then crop center to 1200x630
    await image.resize({ w: 1200 });
    const cropX = Math.max(0, Math.floor((image.bitmap.width - 1200) / 2));
    const cropY = Math.max(0, Math.floor((image.bitmap.height - 630) / 2));
    await image.crop({ x: cropX, y: cropY, w: 1200, h: 630 });
    // getBuffer uses callback style; wrap in a Promise
    const mime = (mod.JimpMime && mod.JimpMime.jpeg) || (Jimp.MIME_JPEG) || 'image/jpeg';
    const buffer = await new Promise((resolve, reject) => {
      image.getBuffer(mime, (err, buf) => {
        if (err) return reject(err);
        resolve(buf);
      });
    });
    const fs = require('fs');
    fs.writeFileSync(output, buffer);
    console.log('Generated', output);
  } catch (err) {
    console.error('Failed to generate OG image:', err);
    process.exit(1);
  }
}

generate();
