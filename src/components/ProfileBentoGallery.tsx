import Image from "next/image";
import { SimpleStrapiMedia } from "@/lib/api";

interface BentoGalleryProps {
  images: SimpleStrapiMedia[]; // GUNAKAN TIPE YANG BENAR
  namaDesa: string;
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

export default function ProfileBentoGallery({
  images,
  namaDesa,
}: BentoGalleryProps) {
  if (!images || images.length < 3) return null;

  return (
    <section>
      <h2 className="text-3xl font-bold text-grey-800 mb-6 text-center">
        Galeri Desa
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
        {images.slice(0, 7).map((image, index) => {
          let className = "rounded-lg shadow-lg overflow-hidden relative group";
          if (index === 0) className += " md:col-span-2 md:row-span-2";
          if (index === 3) className += " md:col-span-2";

          return (
            <div key={image.id} className={className}>
              <Image
                src={createImageUrl(image)}
                alt={image.name || `Galeri Desa ${namaDesa}`} // Gunakan .name dari tipe yang benar
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
