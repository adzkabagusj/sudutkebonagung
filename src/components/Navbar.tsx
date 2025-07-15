"use client"; // <-- Tandai sebagai Client Component

import { useState } from "react"; // <-- Impor useState untuk mengelola state
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  // State untuk melacak apakah menu mobile sedang terbuka atau tertutup
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // Tambahkan 'relative' agar menu mobile bisa diposisikan terhadap navbar
    <nav className="bg-[#0B184A] top-0 z-50 shadow-md sticky">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center space-x-3"
          onClick={() => setIsMenuOpen(false)}>
          <Image
            src="/logo_pemdes_plumbungan.svg"
            alt="Logo Desa Plumbungan"
            width={40}
            height={40}
          />
          <span className="text-xl font-bold text-white hover:text-white transition-colors">
            Desa Plumbungan
          </span>
        </Link>

        {/* Desktop Menu: Terlihat di layar medium ke atas */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link
            href="/profil/plumbungan"
            className="text-white hover:text-secondary transition-colors font-medium">
            Profil Desa
          </Link>
          <Link
            href="/artikel"
            className="text-white hover:text-secondary transition-colors font-medium">
            Artikel
          </Link>
          <Link
            href="/destinasi"
            className="text-white hover:text-secondary transition-colors font-medium">
            Destinasi
          </Link>
        </div>

        {/* Tombol Hamburger: Hanya terlihat di layar kecil */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu">
            {isMenuOpen ? (
              // Ikon 'X' (tutup)
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              // Ikon 'hamburger' (buka)
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menu Dropdown Mobile */}
      <div
        className={`absolute w-full bg-[#0B184A] shadow-md md:hidden ${
          isMenuOpen ? "block" : "hidden"
        }`}>
        <div className="flex flex-col items-start px-6 py-4 space-y-4">
          <Link
            href="/profil/plumbungan"
            className="text-white hover:text-secondary transition-colors font-medium w-full"
            onClick={() => setIsMenuOpen(false)}>
            Profil Desa
          </Link>
          <Link
            href="/artikel"
            className="text-white hover:text-secondary transition-colors font-medium w-full"
            onClick={() => setIsMenuOpen(false)}>
            Artikel
          </Link>
          <Link
            href="/destinasi"
            className="text-white hover:text-secondary transition-colors font-medium w-full"
            onClick={() => setIsMenuOpen(false)}>
            Destinasi
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
