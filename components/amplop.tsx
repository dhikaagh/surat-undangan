"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { undangan } from "@/data/undangan";

type Fase = "tertutup" | "membuka" | "terbuka";

// Satu sumber durasi. Angka-angka ini saling bergantung: flap dan surat bergerak
// lebih dulu, jeda memberi mata waktu melihatnya, baru overlay memudar.
const DURASI = { gerak: 700, jeda: 380, pudar: 400 } as const;
const JEDA_PUDAR = DURASI.gerak + DURASI.jeda;
const TOTAL_MEMBUKA = JEDA_PUDAR + DURASI.pudar;

const tidakAdaPerubahan = () => () => {};

/**
 * Gerbang masuk berbentuk amplop.
 *
 * Gerbangnya sengaja hanya dirender setelah JavaScript hidup. Kalau bundel JS
 * gagal dimuat (jaringan buruk, browser dalam WhatsApp), halaman undangan tetap
 * terbaca utuh — bukan layar mati yang menunggu ketukan yang tidak akan dijawab.
 */
export default function Amplop({ children }: { children: React.ReactNode }) {
  // false saat render di server, true setelah hidrasi.
  const siap = useSyncExternalStore(tidakAdaPerubahan, () => true, () => false);
  const [fase, setFase] = useState<Fase>("tertutup");

  const tertutup = fase !== "terbuka";

  // Kunci scroll selama amplop masih menutup halaman.
  useEffect(() => {
    if (!siap || !tertutup) return;
    const sebelumnya = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = sebelumnya;
    };
  }, [siap, tertutup]);

  useEffect(() => {
    if (fase !== "membuka") return;
    const id = setTimeout(() => setFase("terbuka"), TOTAL_MEMBUKA);
    return () => clearTimeout(id);
  }, [fase]);

  const buka = () => {
    if (fase !== "tertutup") return;
    const kurangiGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setFase(kurangiGerak ? "terbuka" : "membuka");
  };

  const sedangMembuka = fase === "membuka";

  return (
    <>
      {/* `contents` supaya pembungkus ini tidak mengubah tata letak halaman. */}
      <div className="contents" inert={siap && tertutup}>
        {children}
      </div>

      {siap && tertutup && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Amplop undangan ${undangan.namaAcara}`}
          className="amplop fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 bg-deep px-6"
          style={{
            opacity: sedangMembuka ? 0 : 1,
            transition: sedangMembuka
              ? `opacity ${DURASI.pudar}ms ease ${JEDA_PUDAR}ms`
              : undefined,
          }}
        >
          <button
            type="button"
            onClick={buka}
            disabled={sedangMembuka}
            aria-label={`Buka undangan ${undangan.namaAcara}`}
            className="w-full max-w-sm cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <span className="relative mx-auto block aspect-[3/2] w-full [perspective:1000px]">
              {/* Surat di dalam amplop */}
              <span
                className="absolute inset-x-[7%] bottom-[6%] top-[12%] block rounded-sm bg-sand shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] ease-out"
                style={{
                  transform: sedangMembuka ? "translateY(-54%)" : "translateY(0)",
                  transition: `transform ${DURASI.gerak}ms`,
                }}
              >
                <span className="flex h-full flex-col items-center justify-center gap-1.5 px-5 text-center">
                  <span className="font-display text-base leading-tight text-deep sm:text-lg">
                    {undangan.namaAcara}
                  </span>
                  <span className="h-px w-10 bg-deep/25" />
                  <span className="text-[0.55rem] uppercase tracking-[0.28em] text-deep/60">
                    {undangan.tanggal.label}
                  </span>
                </span>
              </span>

              {/* Badan amplop, dengan lekuk V di tepi atas */}
              <span
                aria-hidden="true"
                className="absolute inset-0 block rounded-lg border border-gold/40 bg-gradient-to-b from-deep-2 to-deep shadow-[0_25px_60px_-25px_rgba(201,168,106,0.45)]"
                style={{ clipPath: "polygon(0 0, 50% 38%, 100% 0, 100% 100%, 0 100%)" }}
              />

              {/* Flap yang terbuka ke atas */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 block h-[38%] origin-top rounded-t-lg border border-gold/50 bg-gradient-to-b from-gold/25 to-deep-2 ease-in-out"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  transform: sedangMembuka ? "rotateX(178deg)" : "rotateX(0deg)",
                  transformStyle: "preserve-3d",
                  transition: `transform ${DURASI.gerak}ms`,
                }}
              />

              {/* Segel lilin */}
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-[30%] flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-gold/70 bg-deep text-[0.6rem] text-gold transition-opacity duration-300"
                style={{ opacity: sedangMembuka ? 0 : 1 }}
              >
                ◆
              </span>
            </span>
          </button>

          <div className="text-center">
            <p className="text-[0.68rem] uppercase tracking-[0.35em] text-gold/80">
              {sedangMembuka ? "Membuka…" : "Ketuk untuk membuka"}
            </p>
            <p className="mt-3 font-display text-lg text-sand/70">{undangan.tagline}</p>
          </div>

          <button
            type="button"
            onClick={() => setFase("terbuka")}
            className="cursor-pointer text-xs text-sand/40 underline underline-offset-4 transition hover:text-sand/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            Lewati, buka langsung
          </button>
        </div>
      )}
    </>
  );
}
