"use client";

import { useEffect, useState } from "react";
import { dua, hitungSisa, statusAcara } from "@/lib/hitung-sisa";

const SATUAN = ["hari", "jam", "menit", "detik"] as const;

const LABEL: Record<(typeof SATUAN)[number], string> = {
  hari: "Hari",
  jam: "Jam",
  menit: "Menit",
  detik: "Detik",
};

export default function Countdown({
  targetIso,
  selesaiIso,
  className = "",
}: {
  targetIso: string;
  selesaiIso: string;
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

  // Sebelum JavaScript hidup, sisakan ruang setinggi deretan kotak supaya
  // tata letak tidak melompat saat kotak aslinya muncul.
  if (sekarang === null) {
    return <div className={`min-h-[6.75rem] sm:min-h-[9.5rem] ${className}`} aria-hidden="true" />;
  }

  const mulai = new Date(targetIso).getTime();
  const selesai = new Date(selesaiIso).getTime();
  const status = statusAcara(mulai, selesai, sekarang);

  if (status !== "menuju") {
    return (
      <p className={`font-display text-2xl text-gold ${className}`}>
        {status === "berlangsung"
          ? "Acara sedang berlangsung."
          : "Acara telah selesai."}
      </p>
    );
  }

  const sisa = hitungSisa(mulai, sekarang);
  const kotak = SATUAN
    // Kotak "Hari" tidak berguna saat acara tinggal hitungan jam.
    .filter((satuan) => satuan !== "hari" || (sisa?.hari ?? 0) > 0)
    .map((satuan) => ({
      label: LABEL[satuan],
      nilai: satuan === "hari" ? String(sisa?.hari ?? 0) : dua(sisa?.[satuan] ?? 0),
    }));

  return (
    <div
      className={`grid gap-2 sm:gap-4 ${className}`}
      style={{ gridTemplateColumns: `repeat(${kotak.length}, minmax(0, 1fr))` }}
    >
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
