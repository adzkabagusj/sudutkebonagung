import { fetcher, Destination } from "@/lib/api";
import Link from "next/link";
import DestinationCard from "./DestinationCard";
import Image from "next/image";

// Fungsi untuk mengacak array
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default async function DestinasiSection() {
  const response = await fetcher("/api/destinasis", { populate: "galeri" });
  if (!response.data || response.data.length === 0) {
    return null;
  }

  const shuffledDestinations: Destination[] = shuffleArray(response.data);
  const featuredDestinations = shuffledDestinations.slice(0, 3);
  const otherDestinations = shuffledDestinations.slice(3, 9);

  return (
    <section className="py-24 bg-surface">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-text_primary">
            Jelajahi Potensi Wisata
          </h2>
          <p className="text-lg text-text_secondary mt-2">
            Temukan keindahan tersembunyi yang ditawarkan Desa Plumbungan.
          </p>
        </div>

        {/* Featured Destinations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {featuredDestinations.length > 0 && (
            <Link
              href={`/destinasi/${featuredDestinations[0].slug}`}
              className="group block relative rounded-lg shadow-lg overflow-hidden h-96">
              <Image
                src={
                  (featuredDestinations[0]?.galeri?.[0]?.formats?.small?.url?.startsWith(
                    "http"
                  )
                    ? ""
                    : process.env.NEXT_PUBLIC_STRAPI_URL ||
                      "http://localhost:1337") +
                  (featuredDestinations[0]?.galeri?.[0]?.formats?.small?.url ||
                    "https://placehold.co/600x400?text=Gambar")
                }
                alt={featuredDestinations[0].nama}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <h3 className="text-3xl font-bold text-white">
                  {featuredDestinations[0].nama}
                </h3>
              </div>
            </Link>
          )}
          <div className="grid grid-rows-2 gap-6">
            {featuredDestinations.slice(1).map((dest) => (
              <Link
                key={dest.id}
                href={`/destinasi/${dest.slug}`}
                className="group block relative rounded-lg shadow-lg overflow-hidden h-full">
                <Image
                  src={
                    (dest.galeri?.[0]?.formats?.small?.url?.startsWith("http")
                      ? ""
                      : process.env.NEXT_PUBLIC_STRAPI_URL ||
                        "http://localhost:1337") +
                    (dest.galeri?.[0]?.formats?.small?.url ||
                      "https://placehold.co/600x400?text=Gambar")
                  }
                  alt={dest.nama}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-xl font-bold text-white">{dest.nama}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Other Destinations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {otherDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>

        {otherDestinations.length > 0 && (
          <div className="text-center mt-16">
            <Link
              href="/destinasi"
              className="bg-secondary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-secondary-dark transition-all duration-300">
              Lihat Semua Destinasi
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
