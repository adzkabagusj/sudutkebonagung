import { fetcher, Destination } from "@/lib/api";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Fungsi untuk generate Metadata dinamis
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const response = await fetcher(`/api/destinasis?filters[slug][$eq]=${slug}`);
  if (!response.data || response.data.length === 0) {
    return { title: "Destinasi Tidak Ditemukan" };
  }
  const destination: Destination = response.data[0];
  return {
    title: `${destination.nama} - Destinasi SudutKebonagung`,
    description: `Informasi lengkap mengenai destinasi wisata ${destination.nama}.`,
  };
}

// Halaman Detail Destinasi
export default async function DestinationDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const response = await fetcher(`/api/destinasis`, {
    filters: { slug: { $eq: slug } },
    populate: {
      galeri: {
        fields: ["name", "alternativeText", "url", "formats"],
      },
      info_praktis: true, // Pastikan info_praktis juga di-populate
    },
  });

  if (!response.data || response.data.length === 0) {
    notFound();
  }

  const destination: Destination = response.data[0];

  return (
    <article className="max-w-5xl mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <span className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
          {destination.desa}
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-text_primary leading-tight mt-2">
          {destination.nama}
        </h1>
      </div>

      {/* Galeri Gambar */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-text_primary mb-4">
          Galeri Foto
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {destination.galeri && destination.galeri.length > 0 ? (
            destination.galeri.map((image) => {
              // LOGIKA BARU YANG LEBIH AMAN
              const imageUrl =
                image.formats.medium?.url ??
                image.formats.small?.url ??
                image.url;

              return (
                <div
                  key={image.id}
                  className="relative aspect-square rounded-lg shadow-md overflow-hidden">
                  <Image
                    src={`${
                      process.env.NEXT_PUBLIC_STRAPI_URL ||
                      "http://localhost:1337"
                    }${imageUrl}`}
                    alt={destination.nama}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })
          ) : (
            <p>Tidak ada gambar di galeri.</p>
          )}
        </div>
      </section>

      {/* Deskripsi & Info Praktis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-text_primary mb-4">
            Deskripsi
          </h2>
          <div className="prose prose-lg max-w-none prose-p:text-text_primary">
            {/* @ts-ignore */}
            <BlocksRenderer content={destination.deskripsi} />
          </div>
        </div>
        <aside>
          <div className="bg-surface p-6 rounded-lg shadow-md sticky top-24">
            <h3 className="text-xl font-bold text-text_primary border-b pb-2 mb-4">
              Info Praktis
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Jam Buka</h4>
                <p className="text-text_secondary">
                  {destination.info_praktis?.jam_buka ||
                    "Informasi tidak tersedia"}
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Harga Tiket</h4>
                <p className="text-text_secondary">
                  {destination.info_praktis?.harga_tiket ||
                    "Informasi tidak tersedia"}
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Tips Pengunjung</h4>
                <p className="text-text_secondary">
                  {destination.info_praktis?.tips || "Informasi tidak tersedia"}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
