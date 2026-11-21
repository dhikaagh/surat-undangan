import Amplop from "@/components/amplop";
import Countdown from "@/components/countdown";
import { alamatMapsUrl, undangan, whatsappUrl } from "@/data/undangan";
import { dua } from "@/lib/hitung-sisa";

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
    { label: "Waktu", nilai: undangan.waktu, ket: "Hadir tepat waktu" },
    { label: "Tempat", nilai: undangan.tempat.nama, ket: undangan.tempat.alamat },
  ];

  return (
    <Amplop>
      <main className="relative flex-1 overflow-hidden">
        {/* ================= HERO ================= */}
        <section className="relative flex min-h-[100svh] items-center justify-center px-5 py-20 sm:px-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_15%,rgba(201,168,106,0.18),transparent_60%)]"
          />
          <div className="w-full max-w-2xl rounded-[2rem] border border-gold/25 bg-white/[0.02] px-6 py-12 text-center shadow-[0_0_120px_-40px_rgba(201,168,106,0.5)] backdrop-blur-sm sm:px-14 sm:py-16">
            <Label>Undangan</Label>

            <p className="mt-7 font-display text-5xl tracking-[0.18em] text-gold sm:text-7xl">
              {undangan.tagline}
            </p>

            <p className="mt-3 font-display text-xl italic text-sand/85 sm:text-2xl">
              {undangan.tema}
            </p>

            <Ornamen className="mt-7" />

            <h1 className="mt-7 font-display text-3xl leading-tight text-sand sm:text-4xl">
              {undangan.namaAcara}
            </h1>

            <p className="mt-4 text-xs uppercase tracking-[0.28em] text-sand/55 sm:text-sm">
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
              <span className="block sm:inline">{undangan.tanggal.label}</span>
              <span className="hidden sm:inline"> · </span>
              <span className="block sm:inline">{undangan.waktu}</span>
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
            <Countdown
              targetIso={undangan.tanggal.iso}
              selesaiIso={undangan.tanggal.selesaiIso}
              className="mx-auto mt-8 max-w-xl"
            />
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

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
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

        {/* ================= CATATAN PENTING ================= */}
        <section className="px-5 py-20 sm:px-8">
          <div className="mx-auto w-full max-w-3xl">
            <div className="text-center">
              <Label>Sebelum Datang</Label>
              <h2 className="mt-3 font-display text-3xl text-sand sm:text-4xl">
                Yang Perlu Diketahui
              </h2>
              <Ornamen className="mt-5" />
            </div>

            <ul className="mt-12 space-y-4">
              {undangan.catatanPenting.map((item, i) => (
                <li
                  key={item.judul}
                  className="flex gap-4 rounded-2xl border border-gold/20 bg-white/[0.03] p-5"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 font-display text-lg text-gold/70 tabular-nums"
                  >
                    {dua(i + 1)}
                  </span>
                  <div>
                    <p className="text-base text-sand">{item.judul}</p>
                    <p className="mt-1 text-sm text-sand/55">{item.isi}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ================= NARAHUBUNG ================= */}
        <section className="px-5 py-20 sm:px-8">
          <div className="mx-auto w-full max-w-2xl rounded-[2rem] border border-gold/25 bg-white/[0.03] p-8 text-center sm:p-12">
            <Label>Narahubung</Label>
            <h2 className="mt-3 font-display text-3xl text-sand sm:text-4xl">Ada Pertanyaan?</h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-sand/70">
              Hubungi panitia kalau ada yang perlu ditanyakan soal acara, transportasi, atau
              hal lain di luar undangan ini.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {undangan.narahubung.map((orang) => (
                <a
                  key={orang.whatsapp}
                  href={whatsappUrl(orang.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-medium text-deep transition hover:bg-gold/90 sm:w-auto"
                >
                  {orang.nama}
                  <span className="text-deep/60">·</span>
                  <span className="font-normal text-deep/70">{orang.peran}</span>
                </a>
              ))}
            </div>

            <p className="mt-4 text-xs text-sand/45">Tombol di atas membuka WhatsApp panitia.</p>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="border-t border-gold/15 px-5 py-12 text-center sm:px-8">
          <Ornamen />
          <p className="mt-6 font-display text-xl text-sand sm:text-2xl">{undangan.namaAcara}</p>
          <p className="mt-2 text-sm text-sand/55">
            {undangan.tagline} · {undangan.tema}
          </p>
          <p className="mt-6 text-xs text-sand/40">© {undangan.penyelenggara}</p>
        </footer>
      </main>
    </Amplop>
  );
}
