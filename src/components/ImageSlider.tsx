"use client";

import { useState, useEffect } from "react"; // <-- Impor useEffect
import Image from "next/image";
import { SimpleStrapiMedia } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

interface ImageSliderProps {
  images: SimpleStrapiMedia[];
  altText: string;
}

export default function ImageSlider({ images, altText }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fungsi navigasi
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // -- PENAMBAHAN BARU --
  // useEffect untuk membuat timer auto-slide
  useEffect(() => {
    // Hanya jalankan timer jika ada lebih dari 1 gambar
    if (images.length <= 1) return;

    // Set interval untuk memanggil fungsi goToNext setiap 3000ms (3 detik)
    const slideInterval = setInterval(goToNext, 3000);

    // Cleanup function: Hapus interval saat komponen di-unmount atau re-render
    // Ini penting untuk mencegah memory leak
    return () => clearInterval(slideInterval);
  }, [currentIndex, images.length]); // <-- Jalankan efek ini kembali jika index atau jumlah gambar berubah
  // -- AKHIR PENAMBAHAN --

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video w-full flex items-center justify-center bg-gray-200 rounded-lg">
        <p className="text-text_secondary">Tidak ada gambar di galeri.</p>
      </div>
    );
  }

  const currentImage = images[currentIndex];
  let imageUrl =
    currentImage.formats.medium?.url ??
    currentImage.formats.small?.url ??
    currentImage.url;

  if (!imageUrl.startsWith("http")) {
    const strapiUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    imageUrl = `${strapiUrl}${imageUrl}`;
  }

  return (
    <div className="relative w-full h-96 md:h-[500px] rounded-lg shadow-lg overflow-hidden group">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}>
          <Image
            src={imageUrl}
            alt={altText}
            fill
            className="object-cover"
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Tombol Kiri */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-label="Gambar Sebelumnya">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      {/* Tombol Kanan */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-label="Gambar Berikutnya">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  );
}
