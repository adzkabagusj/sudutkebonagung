import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="hero"
      // Kelas-kelas ini mengatur agar background menutupi seluruh area, terpusat, dan tidak berulang
      className="relative h-[75vh] md:h-[80vh] flex flex-col items-center justify-center rounded-lg text-center bg-cover bg-center bg-no-repeat mb-16"
      // Style ini menetapkan gambar dari folder public sebagai background
      style={{ backgroundImage: "url('/bg_hero.svg')" }}>
      {/* Overlay ini berfungsi untuk membuat teks lebih mudah dibaca di atas gambar background */}
      <div className="absolute inset-0 bg-white/50" />

      <div className="relative z-10 p-6">
        <Image
          src="/logo_pemdes_plumbungan.svg"
          alt="Logo Desa Plumbungan"
          width={120}
          height={120}
          className="mx-auto mb-6"
        />
        <h1 className="text-3xl md:text-6xl font-extrabold text-[#0B184A] leading-tight">
          Selamat Datang di Website Desa Plumbungan
        </h1>
        <p className="text-md md:text-lg text-[#0B184A] mt-6 max-w-3xl mx-auto">
          Pusat informasi resmi seputar pemerintahan, kegiatan, budaya, dan
          potensi wisata Desa Plumbungan, Kecamatan Kebonagung, Kabupaten
          Pacitan.
        </p>
        <div className="mt-10">
          <a
            href="#profil-desa"
            className="inline-block bg-secondary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-secondary-dark transition-all duration-300 transform hover:scale-105">
            Jelajahi Desa
          </a>
        </div>
      </div>
    </section>
  );
}
