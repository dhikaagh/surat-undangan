// ============================================================
//  SEMUA ISI UNDANGAN ADA DI FILE INI.
//  Edit teks di bawah, simpan, halaman langsung berubah.
// ============================================================

export type RundownItem = {
  waktu: string;
  acara: string;
  catatan?: string;
};

export const undangan = {
  namaAcara: "Temu Angkatan 26",
  tema: "Merajut Silaturahmi, Menguatkan Solidaritas",
  jurusan: "Teknik Telekomunikasi",
  angkatan: "Angkatan 2026",
  penyelenggara: "Keluarga Mahasiswa Teknik Telekomunikasi",

  pembuka:
    "Dengan penuh rasa syukur, kami mengundang seluruh mahasiswa Teknik Telekomunikasi Angkatan 2026 untuk hadir dalam acara kumpul angkatan.",

  tanggal: {
    // Format ISO dipakai untuk hitungan mundur (countdown).
    iso: "2027-02-13T09:00:00+07:00",
    // Teks yang ditampilkan di halaman.
    label: "Sabtu, 13 Februari 2027",
  },

  waktu: "09.00 WIB — selesai",

  tempat: {
    nama: "Gedung Serbaguna Kampus",
    alamat: "Jl. Contoh No. 1, Bandung",
  },

  dresscode: "Batik / Smart Casual",

  rundown: [
    { waktu: "09.00", acara: "Registrasi & Sarapan Pagi" },
    { waktu: "09.30", acara: "Pembukaan", catatan: "Sambutan panitia & doa bersama" },
    { waktu: "10.00", acara: "Sesi Perkenalan Angkatan" },
    { waktu: "11.30", acara: "Diskusi & Sharing Alumni" },
    { waktu: "12.30", acara: "Makan Siang Bersama" },
    { waktu: "13.30", acara: "Games & Ice Breaking" },
    { waktu: "15.30", acara: "Penutupan & Foto Bersama" },
  ] satisfies RundownItem[],

  konfirmasi: {
    nama: "Ketua Panitia",
    // Format internasional tanpa tanda "+" dan tanpa spasi. Contoh: 6281234567890
    whatsapp: "6281234567890",
    pesan:
      "Halo, saya mahasiswa Teknik Telekomunikasi Angkatan 2026. Saya ingin konfirmasi kehadiran untuk Temu Angkatan 26.",
    batas: "5 Februari 2027",
  },

  catatan:
    "Mohon konfirmasi kehadiran sebelum tanggal batas agar panitia dapat menyiapkan konsumsi dan tempat duduk.",
} as const;

/** Link Google Maps dari nama + alamat tempat. */
export const alamatMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${undangan.tempat.nama}, ${undangan.tempat.alamat}`,
)}`;

/** Link WhatsApp untuk konfirmasi kehadiran. */
export const whatsappUrl = `https://wa.me/${undangan.konfirmasi.whatsapp}?text=${encodeURIComponent(
  undangan.konfirmasi.pesan,
)}`;
