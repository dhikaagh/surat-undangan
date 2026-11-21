// ============================================================
//  SEMUA ISI UNDANGAN ADA DI FILE INI.
//  Edit teks di bawah, simpan, halaman langsung berubah.
// ============================================================

export type Narahubung = {
  nama: string;
  peran: string;
  /** Format internasional tanpa tanda "+" dan tanpa spasi. Contoh: 6281234567890 */
  whatsapp: string;
};

export type CatatanPenting = {
  judul: string;
  isi: string;
};

export const undangan = {
  namaAcara: "Kumpul Angkatan Telekomunikasi 2026",
  tagline: "UNIFY",
  tema: "One Generation, One Unity",
  jurusan: "Teknik Telekomunikasi",
  angkatan: "Angkatan 2026",
  penyelenggara: "Keluarga Mahasiswa Teknik Telekomunikasi 2026",

  pembuka:
    "Kesempatan buat kita saling mengenal lebih dekat, mempererat kebersamaan, dan membangun solidaritas antar teman satu angkatan. Jangan sampai kelewatan.",

  tanggal: {
    // Format ISO dipakai untuk hitungan mundur (countdown).
    iso: "2026-11-22T09:00:00+07:00",
    // Dipakai untuk membedakan "sedang berlangsung" dan "telah selesai".
    selesaiIso: "2026-11-22T13:00:00+07:00",
    // Teks yang ditampilkan di halaman.
    label: "Minggu, 22 November 2026",
  },

  waktu: "09.00 — 13.00 WIB",

  tempat: {
    nama: "Kodjo Coffee",
    alamat: "Jl. Sari Endah No. 17b, Sukarasa, Sukasari, Kota Bandung",
  },

  catatanPenting: [
    {
      judul: "Bawa ponco plastik",
      isi: "Jaga-jaga kalau hujan turun di tengah acara.",
    },
    {
      judul: "Hadir tepat waktu",
      isi: "Acara dimulai pukul 09.00 WIB.",
    },
    {
      judul: "Baju angkatan",
      isi: "Peserta kumpul angkatan dapat baju Telekomunikasi 2026.",
    },
  ] satisfies CatatanPenting[],

  narahubung: [
    { nama: "Khaiqal", peran: "C-TNK", whatsapp: "6281214832666" },
    { nama: "Barra", peran: "A-TTE", whatsapp: "6285703438635" },
  ] satisfies Narahubung[],
} as const;

/** Pesan yang sudah terisi saat tombol WhatsApp ditekan. */
export const pesanWhatsapp =
  "Halo, saya dari angkatan Telekomunikasi 2026. Saya mau tanya soal Kumpul Angkatan 2026.";

/** Link Google Maps dari nama + alamat tempat. */
export const alamatMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${undangan.tempat.nama}, ${undangan.tempat.alamat}`,
)}`;

/** Link WhatsApp ke salah satu narahubung. */
export function whatsappUrl(nomor: string): string {
  return `https://wa.me/${nomor}?text=${encodeURIComponent(pesanWhatsapp)}`;
}
