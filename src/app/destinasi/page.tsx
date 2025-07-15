import { fetcher, Destination } from "@/lib/api";
import DestinationList from "@/components/DestinationList"; // Impor komponen interaktif baru
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinasi Wisata - Desa Plumbungan",
  description:
    "Jelajahi keindahan alam dan budaya di berbagai destinasi wisata Desa Plumbungan.",
};

export default async function DestinationsPage() {
  const destinationsResponse = await fetcher("/api/destinasis", {
    populate: "galeri",
  });

  const destinations: Destination[] = destinationsResponse.data || [];

  return (
    <section className="my-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text_primary mb-2">
          Jelajahi Semua Destinasi
        </h1>
        <p className="text-lg text-text_secondary mb-12">
          Temukan tempat-tempat menarik yang wajib Anda kunjungi di Desa
          Plumbungan.
        </p>
      </div>

      {/* Render komponen interaktif, berikan semua destinasi sebagai data awal */}
      <DestinationList initialDestinations={destinations} />
    </section>
  );
}
