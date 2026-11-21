export type Sisa = { hari: number; jam: number; menit: number; detik: number };

export type StatusAcara = "menuju" | "berlangsung" | "selesai";

/** Usia acara: belum mulai, sedang berjalan, atau sudah selesai. */
export function statusAcara(mulai: number, selesai: number, sekarang: number): StatusAcara {
  if (sekarang < mulai) return "menuju";
  if (sekarang < selesai) return "berlangsung";
  return "selesai";
}

/**
 * Sisa waktu antara `sekarang` dan `target` (keduanya dalam milidetik).
 * Mengembalikan `null` kalau acara sudah mulai atau sudah lewat.
 */
export function hitungSisa(target: number, sekarang: number): Sisa | null {
  const selisih = target - sekarang;
  if (selisih <= 0) return null;

  const totalDetik = Math.floor(selisih / 1000);
  return {
    hari: Math.floor(totalDetik / 86_400),
    jam: Math.floor((totalDetik % 86_400) / 3_600),
    menit: Math.floor((totalDetik % 3_600) / 60),
    detik: totalDetik % 60,
  };
}

/** Angka dua digit untuk tampilan hitungan mundur dan penomoran daftar. */
export const dua = (n: number) => String(n).padStart(2, "0");
