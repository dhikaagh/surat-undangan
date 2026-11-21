# Surat Undangan — Kumpul Angkatan Telekomunikasi 2026

Halaman undangan digital untuk **Kumpul Angkatan Telekomunikasi 2026** (UNIFY · One Generation, One Unity) — Minggu, 22 November 2026, 09.00–13.00 WIB di Kodjo Coffee, Bandung. Dibangun dengan Next.js 16 (App Router) + Tailwind CSS v4.

Satu link publik, tanpa backend. Semua isi undangan diambil dari satu file: **`data/undangan.ts`**.

## Fitur

- **Amplop pembuka**: diketuk → flap terbuka → surat naik → halaman undangan. CSS-only, dengan tombol "Lewati, buka langsung". Kalau JavaScript gagal dimuat, amplop tidak pernah dirender sehingga undangan tetap terbaca
- Hero dengan tagline, tema, dan kalimat pembuka
- Hitung mundur ke hari-H, plus status "sedang berlangsung" sampai acara benar-benar selesai
- Detail acara (tanggal, waktu, tempat) + tombol Google Maps
- "Yang Perlu Diketahui": ponco, tepat waktu, baju angkatan
- Narahubung: tombol WhatsApp langsung ke panitia, nomor tidak dicetak sebagai teks
- Preview link WhatsApp lewat `app/opengraph-image.png` (1200×630)
- Semua halaman di-prerender statis

Keputusan yang sengaja **tidak** diambil (tanpa RSVP tersimpan, tanpa QR presensi, tanpa nama tamu per URL) dicatat di [`docs/adr/`](./docs/adr/). Kosakata proyek ada di [`CONTEXT.md`](./CONTEXT.md).

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000

npm test         # uji logika countdown & status acara (node:test)
npm run lint
npm run build    # build produksi
npm run start    # jalankan hasil build
npm run og       # buat ulang app/opengraph-image.png dari data/undangan.ts
```

## Cara mengubah isi undangan

Buka `data/undangan.ts`:

| Field | Keterangan |
| --- | --- |
| `namaAcara` | Judul acara |
| `tagline`, `tema` | Tagline besar (UNIFY) dan temanya |
| `jurusan`, `angkatan` | Jurusan dan angkatan |
| `pembuka` | Kalimat pengantar undangan |
| `tanggal.iso` | Tanggal + jam mulai (ISO, dipakai countdown) |
| `tanggal.selesaiIso` | Jam selesai (ISO, pembeda "berlangsung" vs "selesai") |
| `tanggal.label` | Tanggal yang ditampilkan, mis. `Minggu, 22 November 2026` |
| `waktu` | Rentang waktu acara |
| `tempat.nama`, `tempat.alamat` | Lokasi acara (dipakai juga untuk link Google Maps) |
| `catatanPenting` | Daftar `{ judul, isi }` untuk section "Yang Perlu Diketahui" |
| `narahubung` | Daftar `{ nama, peran, whatsapp }`, format `628...` tanpa `+` dan spasi |

Kalau judul atau tanggal berubah, jalankan `npm run og` supaya kartu preview WhatsApp ikut berubah.

## Struktur file

```
app/
  layout.tsx              # font, metadata, OG image
  page.tsx                # seluruh halaman undangan
  globals.css             # warna & gaya dasar (Tailwind v4)
  opengraph-image.png     # kartu preview WA, dibuat oleh scripts/buat-og.mjs
components/
  amplop.tsx              # gerbang amplop (client component)
  countdown.tsx           # hitung mundur (client component)
data/
  undangan.ts             # SEMUA isi undangan
lib/
  hitung-sisa.ts          # logika countdown & status acara (+ test)
scripts/
  buat-og.mjs             # generator kartu preview
```

## Deploy

Paling mudah ke [Vercel](https://vercel.com/new): import repo, framework terdeteksi otomatis, tanpa environment variable. `app/layout.tsx` membaca `VERCEL_PROJECT_PRODUCTION_URL` (dan `VERCEL_URL` untuk preview deployment) supaya `og:image` selalu berupa URL absolut.

Atau lewat CLI:

```bash
npx vercel --prod
```

Setelah deploy, cek preview link dengan membuka halaman di [opengraph.xyz](https://www.opengraph.xyz/) atau menempelkan link ke chat WhatsApp — kartu gambar harus muncul sebelum link dibagikan ke grup.
