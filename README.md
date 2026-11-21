# Surat Undangan — Temu Angkatan 26

Halaman undangan digital untuk acara kumpul angkatan Jurusan Teknik Telekomunikasi Angkatan 2026, dibangun dengan Next.js (App Router) + Tailwind CSS.

Isi undangan (nama acara, tema, tanggal, tempat, rundown, kontak) semuanya diambil dari satu file: **`data/undangan.ts`**.

## Fitur

- Hero undangan: nama acara, tema, jurusan & angkatan, kalimat pembuka
- Hitung mundur (countdown) otomatis ke tanggal acara
- Detail acara: tanggal, waktu, tempat, dresscode + tombol Google Maps
- Rundown / susunan acara (timeline)
- Konfirmasi kehadiran (RSVP) via WhatsApp dengan pesan otomatis
- Responsif (mobile & desktop), metadata + Open Graph untuk preview link
- Semua halaman di-prerender statis → cepat dan bisa gratis di Vercel

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
```

Perintah lain:

```bash
npm run build    # build produksi
npm run start    # jalankan hasil build
npm run lint     # cek ESLint
```

## Cara mengubah isi undangan

Buka `data/undangan.ts` lalu edit bagian berikut:

| Field | Keterangan |
| --- | --- |
| `namaAcara` | Judul acara |
| `tema` | Tema acara |
| `jurusan`, `angkatan` | Jurusan dan angkatan |
| `pembuka` | Kalimat pengantar undangan |
| `tanggal.iso` | Tanggal + jam acara (format ISO, dipakai countdown) |
| `tanggal.label` | Tanggal yang ditampilkan, mis. `Sabtu, 13 Februari 2027` |
| `waktu` | Rentang waktu acara |
| `tempat.nama`, `tempat.alamat` | Lokasi acara (dipakai juga untuk link Google Maps) |
| `dresscode` | Ketentuan pakaian |
| `rundown` | Daftar susunan acara (`waktu`, `acara`, `catatan?`) |
| `konfirmasi.whatsapp` | Nomor WhatsApp panitia, format `628...` tanpa `+` dan spasi |
| `konfirmasi.batas` | Batas konfirmasi kehadiran |
| `catatan` | Catatan tambahan di bagian RSVP |

> Data tanggal (13 Februari 2027), tempat, dan nomor WhatsApp di atas masih **placeholder** — wajib diganti dengan data acara yang sebenarnya.

Struktur file utama:

```
app/
  layout.tsx      # font, metadata, tema global
  page.tsx        # seluruh halaman undangan
  globals.css     # warna & gaya dasar (Tailwind v4)
components/
  countdown.tsx   # hitung mundur (client component)
data/
  undangan.ts     # SEMUA isi undangan
```

## Deploy

Paling mudah ke [Vercel](https://vercel.com/new): import repo ini, framework terdeteksi otomatis sebagai Next.js, tanpa environment variable.

## Roadmap

- [ ] RSVP tersimpan (Google Sheets / database)
- [ ] Galeri foto angkatan
- [ ] Mode gelap/terang atau beberapa pilihan tema
- [ ] Halaman QR presensi
- [ ] Export ke gambar/PDF untuk dibagikan
