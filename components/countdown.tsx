"use client";

import { useEffect, useState } from "react";

type Sisa = { hari: number; jam: number; menit: number; detik: number };

function hitungSisa(target: number, sekarang: number): Sisa | null {
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

const dua = (n: number) => String(n).padStart(2, "0");

export default function Countdown({
  targetIso,
  className = "",
}: {
  targetIso: string;
  className?: string;
}) {
  // null = belum jalan di browser, supaya tidak hydration mismatch.
  const [sekarang, setSekarang] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setSekarang(Date.now());
    const raf = requestAnimationFrame(tick);
    const id = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  const sisa = sekarang === null ? null : hitungSisa(new Date(targetIso).getTime(), sekarang);
  const selesai = sekarang !== null && sisa === null;

  const kotak = sisa
    ? [
        { label: "Hari", nilai: String(sisa.hari) },
        { label: "Jam", nilai: dua(sisa.jam) },
        { label: "Menit", nilai: dua(sisa.menit) },
        { label: "Detik", nilai: dua(sisa.detik) },
      ]
    : [
        { label: "Hari", nilai: "--" },
        { label: "Jam", nilai: "--" },
        { label: "Menit", nilai: "--" },
        { label: "Detik", nilai: "--" },
      ];

  if (selesai) {
    return (
      <p className={`font-display text-2xl text-gold ${className}`}>
        Acara telah berlangsung.
      </p>
    );
  }

  return (
    <div className={`grid grid-cols-4 gap-2 sm:gap-4 ${className}`}>
      {kotak.map((k) => (
        <div
          key={k.label}
          className="rounded-xl border border-gold/25 bg-white/[0.03] px-2 py-4 sm:px-4 sm:py-6"
        >
          <p className="font-display text-3xl tabular-nums sm:text-5xl">{k.nilai}</p>
          <p className="mt-2 text-[0.6rem] uppercase tracking-[0.25em] text-sand/55 sm:text-[0.7rem]">
            {k.label}
          </p>
        </div>
      ))}
    </div>
  );
}
