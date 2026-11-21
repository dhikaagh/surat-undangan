import Countdown from "@/components/countdown";
import { alamatMapsUrl, undangan, whatsappUrl } from "@/data/undangan";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.68rem] font-medium uppercase tracking-[0.35em] text-gold/80">
      {children}
    </p>
  );
}

function Ornamen({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold/60 sm:w-20" />
      <span className="text-[0.6rem] tracking-[0.4em] text-gold/80">◆</span>
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold/60 sm:w-20" />
    </div>
  );
}

export default function Home() {
  const detail = [
    { label: "Tanggal", nilai: undangan.tanggal.label, ket: "Tandai di kalendermu" },
    { label: "Waktu", nilai: undangan.waktu, ket: "Datang 15 menit lebih awal" },
    { label: "Tempat", nilai: undangan.tempat.nama, ket: undangan.tempat.alamat },
    { label: "Dresscode", nilai: undangan.dresscode, ket: "Sesuai ketentuan panitia" },
  ];

  return (
    <main className="relative flex-1 overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[100svh] items-center justify-center px-5 py-20 sm:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_15%,rgba(201,168,106,0.18),transparent_60%)]"
        />
        <div className="w-full max-w-2xl rounded-[2rem] border border-gold/25 bg-white/[0.02] px-6 py-12 text-center shadow-[0_0_120px_-40px_rgba(201,168,106,0.5)] backdrop-blur-sm sm:px-14 sm:py-16">
          <Label>Undangan</Label>

          <h1 className="mt-6 font-display text-4xl leading-[1.1] text-sand sm:text-6xl">
            {undangan.namaAcara}
          </h1>

          <Ornamen className="mt-6" />

          <p className="mt-6 font-display text-xl italic text-sand/85 sm:text-2xl">
            “{undangan.tema}”
          </p>

          <p className="mt-5 text-xs uppercase tracking-[0.28em] text-sand/55 sm:text-sm">
            {undangan.jurusan} · {undangan.angkatan}
          </p>

          <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-sand/70">
            {undangan.pembuka}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={alamatMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full bg-gold px-6 py-3 text-sm font-medium text-deep transition hover:bg-gold/90 sm:w-auto"
            >
              Lihat Lokasi
            </a>
            <a
              href="#detail"
              className="w-full rounded-full border border-gold/40 px-6 py-3 text-sm font-medium text-sand/90 transition hover:border-gold hover:text-gold sm:w-auto"
            >
              Detail Acara
            </a>
          </div>

          <p className="mt-8 text-sm text-sand/50">
            {undangan.tanggal.label} · {undangan.waktu}
          </p>
        </div>
      </section>

      {/* ================= COUNTDOWN ================= */}
      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto w-full max-w-3xl text-center">
          <Label>Menuju Hari-H</Label>
          <p className="mt-3 font-display text-2xl text-sand sm:text-3xl">
            {undangan.tanggal.label}
          </p>
          <Countdown targetIso={undangan.tanggal.iso} className="mx-auto mt-8 max-w-xl" />
        </div>
      </section>

      {/* ================= DETAIL ================= */}
      <section id="detail" className="scroll-mt-10 px-5 py-20 sm:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <div className="text-center">
            <Label>Detail Acara</Label>
            <h2 className="mt-3 font-display text-3xl text-sand sm:text-4xl">
              Catat Waktu &amp; Tempatnya
            </h2>
            <Ornamen className="mt-5" />
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {detail.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-gold/20 bg-white/[0.03] p-6"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold/70">
                  {item.label}
                </p>
                <p className="mt-3 font-display text-2xl text-sand">{item.nilai}</p>
                <p className="mt-1 text-sm text-sand/55">{item.ket}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <a
              href={alamatMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-sm text-sand/90 transition hover:border-gold hover:text-gold"
            >
              Buka di Google Maps
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= RUNDOWN ================= */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto w-full max-w-3xl">
          <div className="text-center">
            <Label>Susunan Acara</Label>
            <h2 className="mt-3 font-display text-3xl text-sand sm:text-4xl">Rundown</h2>
            <Ornamen className="mt-5" />
          </div>

          <ol className="relative mt-12 space-y-8 border-l border-gold/25 pl-8 sm:pl-10">
            {undangan.rundown.map((item) => (
              <li key={`${item.waktu}-${item.acara}`} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-2 -left-[2.15rem] h-2.5 w-2.5 rounded-full bg-gold ring-4 ring-deep sm:-left-[2.65rem]"
                />
                <p className="font-display text-xl text-gold">{item.waktu}</p>
                <p className="mt-1 text-base text-sand">{item.acara}</p>
                {item.catatan ? (
                  <p className="mt-1 text-sm text-sand/55">{item.catatan}</p>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= KONFIRMASI ================= */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto w-full max-w-2xl rounded-[2rem] border border-gold/25 bg-white/[0.03] p-8 text-center sm:p-12">
          <Label>Konfirmasi Kehadiran</Label>
          <h2 className="mt-3 font-display text-3xl text-sand sm:text-4xl">RSVP</h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-sand/70">
            {undangan.catatan}
          </p>
          <p className="mt-3 text-sm text-sand/55">
            Konfirmasi paling lambat <span className="text-gold">{undangan.konfirmasi.batas}</span>
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-medium text-deep transition hover:bg-gold/90 sm:w-auto"
          >
            Konfirmasi via WhatsApp
          </a>

          <p className="mt-4 text-xs text-sand/45">
            CP: {undangan.konfirmasi.nama} · +{undangan.konfirmasi.whatsapp}
          </p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-gold/15 px-5 py-12 text-center sm:px-8">
        <Ornamen />
        <p className="mt-6 font-display text-xl text-sand sm:text-2xl">{undangan.namaAcara}</p>
        <p className="mt-2 text-sm text-sand/55">
          {undangan.jurusan} · {undangan.angkatan}
        </p>
        <p className="mt-6 text-xs text-sand/40">© {undangan.penyelenggara}</p>
      </footer>
    </main>
  );
}
