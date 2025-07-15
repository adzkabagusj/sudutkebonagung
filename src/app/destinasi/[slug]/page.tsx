import { fetcher, Destination } from "@/lib/api";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import { notFound } from "next/navigation";
import RecommendedDestinations from "@/components/RecommendedDestinations"; // <-- 1. IMPORT KOMPONEN BARU

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
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

export default async function DestinationDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // Fetch destinasi yang sedang dibuka
  const response = await fetcher(`/api/destinasis`, {
    filters: { slug: { $eq: slug } },
    populate: "*",
  });

  if (!response.data || response.data.length === 0) {
    notFound();
  }

  const destination: Destination = response.data[0];

  // 2. FETCH DESTINASI LAIN UNTUK REKOMENDASI
  const recommendedDestinationsResponse = await fetcher(`/api/destinasis`, {
    filters: { slug: { $ne: slug } }, // Filter: tidak sama dengan slug saat ini
    sort: "createdAt:desc",
    pagination: { limit: 3 },
    populate: "galeri",
  });
  const recommendedDestinations: Destination[] =
    recommendedDestinationsResponse.data;

  return (
    <div>
      <article className="max-w-5xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
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
                let imageUrl =
                  image.formats.medium?.url ??
                  image.formats.small?.url ??
                  image.url;

                if (!imageUrl.startsWith("http")) {
                  const strapiUrl =
                    process.env.NEXT_PUBLIC_STRAPI_URL ||
                    "http://localhost:1337";
                  imageUrl = `${strapiUrl}${imageUrl}`;
                }

                return (
                  <div
                    key={image.id}
                    className="relative aspect-square rounded-lg shadow-md overflow-hidden">
                    <Image
                      src={imageUrl}
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
                    {destination.info_praktis?.tips ||
                      "Informasi tidak tersedia"}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {destination.lokasi_map_url && (
        <section className="max-w-5xl mx-auto px-6 py-8">
          <h2 className="text-3xl font-bold text-text_primary mb-6 text-center">
            Lokasi {destination.nama}
          </h2>
          <div className="aspect-video w-full rounded-lg shadow-lg overflow-hidden border">
            <iframe
              src={destination.lokasi_map_url}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Peta Lokasi ${destination.nama}`}></iframe>
          </div>
        </section>
      )}

      {/* 3. TAMPILKAN KOMPONEN REKOMENDASI DI SINI */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <RecommendedDestinations destinations={recommendedDestinations} />
      </div>
    </div>
  );
}
