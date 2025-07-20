"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Data untuk setiap dusun kita letakkan di sini
const dusunData = [
  {
    nama: "Krajan",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16966.44950347423!2d111.10845360355974!3d-8.24736883268696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e796074c0a70867%3A0xba9f50ec9af7fd2f!2sKrajan%2C%20Plumbungan%2C%20Kec.%20Kebonagung%2C%20Kabupaten%20Pacitan%2C%20Jawa%20Timur!5e1!3m2!1sid!2sid!4v1753009925749!5m2!1sid!2sid",
    deskripsi:
      "Dusun Krajan, yang terletak di titik tertinggi Desa Plumbungan, adalah sebuah dusun yang menawarkan kekayaan alam dan potensi wisata yang luar biasa. Dusun ini terdiri dari dua RT, di mana mayoritas penduduknya bekerja sebagai petani dan peternak. Mereka menghasilkan berbagai komoditas pertanian, seperti ubi, labu, dan kelapa, yang tumbuh subur di tanahnya yang subur. Salah satu daya tarik utama Dusun Krajan adalah lokasinya yang berada di puncak ketinggian, memberikan pemandangan spektakuler yang meliputi Kota Pacitan hingga Pantai Telengria.",
  },
  {
    nama: "Gebang",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8483.592358168386!2d111.12322954274129!3d-8.230221898839147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7960681e78afbd%3A0xd78c535448e424e5!2sGebang%2C%20Plumbungan%2C%20Kec.%20Kebonagung%2C%20Kabupaten%20Pacitan%2C%20Jawa%20Timur!5e1!3m2!1sid!2sid!4v1753009276115!5m2!1sid!2sid",
    deskripsi:
      "Dusun Gebang adalah salah satu dusun yang terletak di Desa Plumbungan, dengan batas wilayah yang langsung berhubungan dengan Desa Karangnongko. Mayoritas penduduk di dusun ini menjalani kehidupan sebagai petani dan peternak, yang menjadi mata pencarian utama mereka. Keunikan dari Dusun Gebang adalah hampir setiap rumah di sana memiliki pohon kopi, yang tumbuh subur di sekitar pekarangan. ",
  },
  {
    nama: "Tenggar",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8483.477557778153!2d111.1165294927414!3d-8.23558054896211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79606b8a026c17%3A0xc4493d64cb55b59c!2sTenggar%2C%20Plumbungan%2C%20Kec.%20Kebonagung%2C%20Kabupaten%20Pacitan%2C%20Jawa%20Timur!5e1!3m2!1sid!2sid!4v1753009469053!5m2!1sid!2sid",
    deskripsi:
      "Dusun Tenggar, yang terletak di tengah-tengah Desa Plumbungan, memiliki keunikan tersendiri dibandingkan dusun lainnya karena letaknya yang strategis. Penduduknya sebagian besar bermata pencarian sebagai petani dan peternak, dengan aktivitas yang mirip dengan dusun-dusun lainnya di desa. Mereka memelihara berbagai jenis ternak, seperti kambing, sapi, domba, dan lebah, yang menjadi sumber penghasilan utama.",
  },
  {
    nama: "Nyemono",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16966.44179039134!2d111.09660570355976!3d-8.247548532693834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e796008b90f35f5%3A0xd5d8cdb296a4f810!2sNyemono%2C%20Plumbungan%2C%20Kec.%20Kebonagung%2C%20Kabupaten%20Pacitan%2C%20Jawa%20Timur!5e1!3m2!1sid!2sid!4v1753009525458!5m2!1sid!2sid",
    deskripsi:
      "Dusun Nyemono, yang terletak di dekat pantai di Desa Plumbungan, memiliki keunikan tersendiri karena sebagian besar penduduknya bekerja sebagai nelayan, mengandalkan hasil laut seperti ikan dan lobster sebagai mata pencarian utama. Keindahan alam yang memukau dan kehidupan sosial yang harmonis menjadi ciri khas dari dusun ini. Meskipun masih menghadapi tantangan dalam hal infrastruktur, Dusun Nyemono memiliki potensi yang sangat besar dalam sektor pariwisata dan pertanian.",
  },
];

export default function DusunSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const currentDusun = dusunData[currentIndex];

  return (
    <section className="my-28">
      <h2 className="text-3xl font-bold text-grey-800 mb-8 text-center">
        Wilayah Dusun
      </h2>
      <div className="bg-surface rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Konten Deskripsi */}
          <div className="md:col-span-1 p-8 flex flex-col justify-between">
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}>
                  <h3 className="text-2xl font-bold text-secondary mb-4">
                    Dusun {currentDusun.nama}
                  </h3>
                  <p className="text-text_secondary">
                    {currentDusun.deskripsi}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Tombol Navigasi */}
            <div className="flex justify-center space-x-2 mt-8">
              {dusunData.map((_, slideIndex) => (
                <button
                  key={slideIndex}
                  onClick={() => goToSlide(slideIndex)}
                  className={`h-3 w-8 rounded-full transition-colors ${
                    currentIndex === slideIndex
                      ? "bg-secondary"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${slideIndex + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Peta */}
          <div className="md:col-span-2 aspect-video md:aspect-auto">
            <AnimatePresence mode="wait">
              <motion.iframe
                key={currentIndex}
                src={currentDusun.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Peta Lokasi Dusun ${currentDusun.nama}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
