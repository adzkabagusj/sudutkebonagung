import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B184A] text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Kolom Logo & Deskripsi */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/logo_pemdes_plumbungan.svg"
              alt="Logo Desa Plumbungan"
              width={60}
              height={60}
            />
            <p className="mt-4 text-gray-400">
              Website Resmi Pemerintah Desa Plumbungan, <br />
              Kecamatan Kebonagung, Kabupaten Pacitan.
            </p>
          </div>

          {/* Kolom Navigasi Cepat */}
          <div>
            <h3 className="font-bold text-lg mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/profil/plumbungan"
                  className="text-gray-400 hover:text-white">
                  Profil Desa
                </Link>
              </li>
              <li>
                <Link
                  href="/artikel"
                  className="text-gray-400 hover:text-white">
                  Artikel
                </Link>
              </li>
              <li>
                <Link
                  href="/destinasi"
                  className="text-gray-400 hover:text-white">
                  Destinasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom Kontak & Media Sosial */}
          <div>
            <h3 className="font-bold text-lg mb-4">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-center md:justify-start space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <a
                  href="mailto:plumbunganpemdes13@gmail.com"
                  className="text-gray-400 hover:text-white">
                  plumbunganpemdes13@gmail.com
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.477 0 10c0 4.237 2.635 7.855 6.25 9.255V12.87H4.375v-2.87h1.875v-2.17c0-1.85 1.09-2.87 2.76-2.87.79 0 1.625.145 1.625.145v2.45h-1.25c-.91 0-1.16.54-1.16 1.12v1.375h2.75l-.438 2.87h-2.312V19.255C17.365 17.855 20 14.237 20 10c0-5.523-4.477-10-10-10z"
                    clipRule="evenodd"></path>
                </svg>
                <a
                  href="https://www.facebook.com/pemerintah.plumbungan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white">
                  Pemdes Plumbungan
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M7.425 2.25A5.175 5.175 0 002.25 7.425v5.15A5.175 5.175 0 007.425 17.75h5.15A5.175 5.175 0 0017.75 12.575V7.425A5.175 5.175 0 0012.575 2.25h-5.15zm0 1.5a3.675 3.675 0 00-3.675 3.675v5.15a3.675 3.675 0 003.675 3.675h5.15a3.675 3.675 0 003.675-3.675V7.425a3.675 3.675 0 00-3.675-3.675h-5.15zm5.115 2.16a.75.75 0 100 1.5.75.75 0 000-1.5zM10 6.875a3.125 3.125 0 100 6.25 3.125 3.125 0 000-6.25zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                    clipRule="evenodd"></path>
                </svg>
                <a
                  href="https://www.instagram.com/pemdes_plumbungan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white">
                  @pemdes_plumbungan
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500">
          &copy; {currentYear} Mengarung Kebonagung. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
