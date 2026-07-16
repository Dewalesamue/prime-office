const sharp = require('sharp');
const pngToIcoModule = require('png-to-ico');
const pngToIco = pngToIcoModule.default || pngToIcoModule;
const fs = require('fs');
const path = require('path');

async function generate() {
  const src = path.join(__dirname, '..', 'public', 'favicon.png');
  const outDir = path.join(__dirname, '..', 'public');

  if (!fs.existsSync(src)) {
    console.error('Source image not found at', src);
    process.exit(1);
  }

  const input = fs.readFileSync(src);
  const sizes = [16, 32, 48];
  const buffers = [];

  for (const size of sizes) {
    const outPath = path.join(outDir, `favicon-${size}.png`);
    const buf = await sharp(input)
      .resize(size, size, { fit: 'cover' })
      .png()
      .toBuffer();
    await fs.promises.writeFile(outPath, buf);
    buffers.push(buf);
    console.log('Wrote', outPath);
  }

  const icoBuffer = await pngToIco(buffers);
  const icoPath = path.join(outDir, 'favicon.ico');
  fs.writeFileSync(icoPath, icoBuffer);
  console.log('Wrote', icoPath);

  console.log('Favicons generated successfully.');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
