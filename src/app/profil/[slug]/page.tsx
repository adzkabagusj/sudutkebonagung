import { fetcher, ProfilDesa } from "@/lib/api";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProfileHero from "@/components/ProfileHero";
import ProfileMap from "@/components/ProfileMap";
import ProfileBentoGallery from "@/components/ProfileBentoGallery";
import Image from "next/image";

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface p-6 rounded-lg shadow-md text-center">
      <p className="text-text_secondary text-sm">{label}</p>
      <p className="text-2xl font-bold text-grey-800 mt-1">{value}</p>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const desaNama = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  return {
    title: `Profil Desa ${desaNama}`,
    description: `Informasi lengkap mengenai profil, sejarah, dan potensi Desa ${desaNama}.`,
  };
}

const createSafeImageUrl = (imageObject: any) => {
  // Return a placeholder if the image object or its URL is missing

  if (!imageObject || !imageObject.url) return "/placeholder.png";

  // Safely get the best available image format

  let imagePath =
    imageObject.formats?.medium?.url ??
    imageObject.formats?.small?.url ??
    imageObject.url;

  // Return the absolute URL directly if it's already one

  if (imagePath.startsWith("http")) {
    return imagePath;
  }
};

export default async function ProfilDesaPage({
  params,
}: {
  params: { slug: string };
}) {
  const desaNama = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);

  const response = await fetcher(`/api/profil-desas`, {
    filters: { nama_desa: { $eq: desaNama } },
    populate: "*",
  });

  if (!response.data || response.data.length === 0) {
    notFound();
  }

  const profil: ProfilDesa = response.data[0];

  return (
    <main>
      <ProfileHero namaDesa={profil.nama_desa} galleryImages={profil.galeri} />

      <div className="container mx-auto px-6 py-16">
        {/* Deskripsi */}
        <section className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-grey-800 mb-4">
            Tentang Desa {profil.nama_desa}
          </h2>
          <div className="prose prose-lg max-w-none mx-auto text-left">
            <BlocksRenderer content={profil.deskripsi_desa} />
          </div>
        </section>

        {/* Info Kunci */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-16 max-w-4xl mx-auto">
          <InfoCard label="Luas Wilayah" value={profil.luas_wilayah} />
          <InfoCard label="Jumlah Penduduk" value={profil.jumlah_penduduk} />
          <InfoCard label="Jumlah Dusun" value={profil.jumlah_dusun} />
        </section>

        <ProfileMap namaDesa={profil.nama_desa} />

        {/* Visi & Misi */}
        <section className="my-16 bg-surface p-8 rounded-lg shadow-inner max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-grey-800 mb-4 text-center">
            Visi & Misi
          </h2>
          <div className="prose prose-lg max-w-none mx-auto">
            <BlocksRenderer content={profil.visi_misi} />
          </div>
        </section>

        {/* Foto Struktur Pemerintahan */}
        {profil.foto_struktur_pemerintahan && (
          <section className="my-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-grey-800 mb-6 text-center">
              Struktur Perangkat Desa
            </h2>
            <div className="relative w-full aspect-video rounded-lg shadow-lg overflow-hidden border">
              <Image
                src={createSafeImageUrl(profil.foto_struktur_pemerintahan)}
                alt={`Foto struktur pemerintahan Desa ${profil.nama_desa}`}
                fill
                className="object-contain" // object-contain is great for official charts
              />
            </div>
          </section>
        )}

        {/* Potensi Desa */}
        <section className="my-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-grey-800 mb-4 text-center">
            Potensi Desa
          </h2>
          <div className="prose prose-lg max-w-none mx-auto text-left">
            <BlocksRenderer content={profil.potensi_desa} />
          </div>
        </section>

        <ProfileBentoGallery
          images={profil.galeri}
          namaDesa={profil.nama_desa}
        />
      </div>
    </main>
  );
}
