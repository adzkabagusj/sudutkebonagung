import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

// Konfigurasi font Poppins dengan next/font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

// Metadata default untuk SEO
export const metadata: Metadata = {
  title: "SudutKebonagung - Pesona Plumbungan & Karangnongko",
  description:
    "Website profil dan promosi untuk Desa Plumbungan dan Desa Karangnongko di Kecamatan Kebonagung, Pacitan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${poppins.variable} font-sans bg-background text-text_primary`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-6 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
