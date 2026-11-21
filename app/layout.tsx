import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { undangan } from "@/data/undangan";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const judul = `Undangan ${undangan.namaAcara} — ${undangan.tagline}`;
const deskripsi = `${undangan.tema}. ${undangan.tanggal.label}, ${undangan.waktu}, ${undangan.tempat.nama}.`;

// Vercel menyediakan URL deployment lewat environment variable, jadi og:image
// tetap absolut tanpa konfigurasi manual — termasuk saat diakses sebagai
// preview deployment, yang punya domain berbeda dari domain produksi.
const urlDeploy = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const urlDasar = urlDeploy ? `https://${urlDeploy}` : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(urlDasar),
  title: judul,
  description: deskripsi,
  openGraph: {
    title: judul,
    description: deskripsi,
    type: "website",
    locale: "id_ID",
    siteName: undangan.namaAcara,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-deep text-sand">{children}</body>
    </html>
  );
}
