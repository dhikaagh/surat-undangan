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

export const metadata: Metadata = {
  title: `Undangan ${undangan.namaAcara} — ${undangan.jurusan}`,
  description: `${undangan.pembuka} ${undangan.tanggal.label}, ${undangan.waktu}, ${undangan.tempat.nama}.`,
  openGraph: {
    title: `Undangan ${undangan.namaAcara}`,
    description: `${undangan.tema} — ${undangan.jurusan} ${undangan.angkatan}`,
    type: "website",
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
