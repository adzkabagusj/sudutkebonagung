import { Destination } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

function DestinationCard({ destination }: { destination: Destination }) {
  const firstImage = destination.galeri?.[0];
  let imageUrl = "https://placehold.co/600x400?text=Gambar";
  if (firstImage) {
    const imagePath = firstImage.formats.small.url;
    if (imagePath.startsWith("http")) {
      imageUrl = imagePath;
    } else {
      const strapiUrl =
        process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
      imageUrl = `${strapiUrl}${imagePath}`;
    }
  }

  return (
    <Link
      href={`/destinasi/${destination.slug}`}
      className="block group relative rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-64">
      <Image
        src={imageUrl}
        alt={`Gambar untuk ${destination.nama}`}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-xl font-bold text-white">{destination.nama}</h3>
      </div>
    </Link>
  );
}

export default DestinationCard;
