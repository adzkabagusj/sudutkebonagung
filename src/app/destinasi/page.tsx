import { fetcher, Destination } from "@/lib/api";
import DestinationCard from "@/components/DestinationCard"; // Mengimpor dari komponen terpisah
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinasi Wisata - SudutKebonagung",
  description:
    "Jelajahi keindahan alam dan budaya di berbagai destinasi wisata Desa Plumbungan.",
};

export default async function DestinationsPage() {
  // Ambil SEMUA destinasi, populate galerinya untuk thumbnail
  const destinationsResponse = await fetcher("/api/destinasis", {
    populate: "galeri",
  });
  const destinations: Destination[] = destinationsResponse.data;

  return (
    <section>
      <h1 className="text-4xl font-bold text-text_primary mb-2">
        Jelajahi Semua Destinasi
      </h1>
      <p className="text-lg text-text_secondary mb-12">
        Temukan tempat-tempat menarik yang wajib Anda kunjungi di sudut
        Kebonagung.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {destinations && destinations.length > 0 ? (
          destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))
        ) : (
          <p className="col-span-full text-text_secondary">
            Belum ada destinasi untuk ditampilkan.
          </p>
        )}
      </div>
    </section>
  );
}
