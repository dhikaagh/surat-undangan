// Membuat kartu preview WhatsApp (1200x630) langsung dari data undangan.
// Jalankan: npm run og — dijalankan ulang hanya kalau judul/tanggal berubah.
//
// Komposisinya sengaja mengikuti hero di app/page.tsx (tagline → tema → ◆ →
// nama acara → tanggal/waktu → tempat). Kalau hero berubah, ubah di sini juga:
// gambar statis tidak bisa ikut menyesuaikan sendiri.
import sharp from "sharp";
import { undangan } from "../data/undangan.ts";

const { namaAcara, tagline, tema, tanggal, waktu, tempat } = undangan;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="50%" cy="8%" r="72%">
      <stop offset="0%" stop-color="#c9a86a" stop-opacity="0.30"/>
      <stop offset="60%" stop-color="#c9a86a" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#071e19" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#071e19"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="28" y="28" width="1144" height="574" rx="18" fill="none" stroke="#c9a86a" stroke-opacity="0.35"/>

  <text x="600" y="120" fill="#c9a86a" fill-opacity="0.85" font-family="DejaVu Sans, sans-serif"
        font-size="19" letter-spacing="9" text-anchor="middle">UNDANGAN</text>

  <text x="600" y="255" fill="#c9a86a" font-family="DejaVu Serif, serif"
        font-size="104" letter-spacing="16" text-anchor="middle">${tagline}</text>

  <line x1="470" y1="300" x2="560" y2="300" stroke="#c9a86a" stroke-opacity="0.6"/>
  <text x="600" y="308" fill="#c9a86a" fill-opacity="0.85" font-family="DejaVu Sans, sans-serif"
        font-size="16" text-anchor="middle">◆</text>
  <line x1="640" y1="300" x2="730" y2="300" stroke="#c9a86a" stroke-opacity="0.6"/>

  <text x="600" y="365" fill="#f6efe3" fill-opacity="0.88" font-family="DejaVu Serif, serif"
        font-size="34" font-style="italic" text-anchor="middle">${tema}</text>

  <text x="600" y="437" fill="#f6efe3" font-family="DejaVu Serif, serif"
        font-size="38" text-anchor="middle">${namaAcara}</text>

  <text x="600" y="500" fill="#f6efe3" fill-opacity="0.55" font-family="DejaVu Sans, sans-serif"
        font-size="21" text-anchor="middle">${tanggal.label} · ${waktu}</text>

  <text x="600" y="545" fill="#c9a86a" fill-opacity="0.9" font-family="DejaVu Sans, sans-serif"
        font-size="24" letter-spacing="2" text-anchor="middle">${tempat.nama}</text>
</svg>`;

const tujuan = new URL("../app/opengraph-image.png", import.meta.url);
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(tujuan.pathname);
console.log(`app/opengraph-image.png dibuat (1200x630) untuk ${namaAcara}`);
