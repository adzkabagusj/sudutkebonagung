"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SimpleStrapiMedia } from "@/lib/api";

interface ProfileHeroProps {
  namaDesa: string;
  galleryImages: SimpleStrapiMedia[];
}

const createImageUrl = (imageObject: SimpleStrapiMedia) => {
  const imagePath =
    imageObject.formats?.large?.url ??
    imageObject.formats?.medium?.url ??
    imageObject.url;
  const baseUrl = new URL(
    imagePath,
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
  ).toString();
  return baseUrl;
};

export default function ProfileHero({
  namaDesa,
  galleryImages,
}: ProfileHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (galleryImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  if (!galleryImages || galleryImages.length === 0) {
    return (
      <div className="h-96 bg-gray-200 flex items-center justify-center">
        Gambar tidak tersedia
      </div>
    );
  }

  return (
    <section className="relative h-[70vh] w-full text-white">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 rounded-lg overflow-clip"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1.5 } }}
          exit={{ opacity: 0, transition: { duration: 1.5 } }}>
          <Image
            src={createImageUrl(galleryImages[currentIndex])}
            alt={
              galleryImages[currentIndex].name || `Pemandangan Desa ${namaDesa}`
            } // Gunakan .name dari tipe yang benar
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>
      <div className="rounded-lg overflow-clip relative z-10 h-full flex flex-col justify-center items-center text-center p-6">
        <Image
          src="/logo_pemdes_plumbungan.svg"
          alt="Logo Desa Plumbungan"
          width={100}
          height={100}
        />
        <h1
          className="text-4xl md:text-6xl font-extrabold mt-4"
          style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}>
          Profil Desa {namaDesa}
        </h1>
      </div>
    </section>
  );
}
