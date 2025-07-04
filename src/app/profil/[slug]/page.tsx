import { fetcher, ProfilDesa } from "@/lib/api";
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
  const desaNama = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  return {
    title: `Profil Desa ${desaNama} - SudutKebonagung`,
    description: `Informasi lengkap mengenai profil, sejarah, dan potensi Desa ${desaNama}.`,
  };
}

// Komponen untuk menampilkan data kunci
function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface p-6 rounded-lg shadow-md text-center">
      <p className="text-text_secondary text-sm">{label}</p>
      <p className="text-2xl font-bold text-primary mt-1">{value}</p>
    </div>
  );
}

// Halaman Detail Profil Desa
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
    <article className="max-w-5xl mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-text_primary leading-tight">
          Profil Desa {profil.nama_desa}
        </h1>
        <p className="text-lg text-text_secondary mt-2">
          Mengenal lebih dekat sudut Kebonagung.
        </p>
      </div>

      {/* Info Kunci */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        <InfoCard label="Luas Wilayah" value={profil.luas_wilayah} />
        <InfoCard label="Jumlah Penduduk" value={profil.jumlah_penduduk} />
        <InfoCard label="Jumlah Dusun" value={profil.jumlah_dusun} />
      </section>

      {/* Sejarah */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-primary mb-4">Sejarah Desa</h2>
        <div className="prose prose-lg max-w-none">
          {/* @ts-ignore */}
          <BlocksRenderer content={profil.sejarah} />
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="mb-16 bg-surface p-8 rounded-lg shadow">
        <h2 className="text-3xl font-bold text-primary mb-4">Visi & Misi</h2>
        <div className="prose prose-lg max-w-none">
          {/* @ts-ignore */}
          <BlocksRenderer content={profil.visi_misi} />
        </div>
      </section>

      {/* Foto Struktur Pemerintahan */}
      {profil.foto_struktur_pemerintahan && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Struktur Perangkat Desa
          </h2>
          <div className="relative w-full aspect-video rounded-lg shadow-lg overflow-hidden border">
            <Image
              src={`${
                process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
              }${profil.foto_struktur_pemerintahan.url}`}
              alt={`Foto struktur pemerintahan Desa ${profil.nama_desa}`}
              fill
              className="object-contain" // object-contain agar gambar tidak terpotong
            />
          </div>
        </section>
      )}

      {/* Potensi Desa */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-primary mb-4">Potensi Desa</h2>
        <div className="prose prose-lg max-w-none">
          {/* @ts-ignore */}
          <BlocksRenderer content={profil.potensi_desa} />
        </div>
      </section>

      {/* Galeri */}
      <section>
        <h2 className="text-3xl font-bold text-primary mb-4">Galeri Desa</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {profil.galeri && profil.galeri.length > 0 ? (
            profil.galeri.map((image) => (
              <div
                key={image.id}
                className="relative aspect-video rounded-lg shadow-md overflow-hidden">
                <Image
                  src={`${
                    process.env.NEXT_PUBLIC_STRAPI_URL ||
                    "http://localhost:1337"
                  }${image.formats.medium.url}`}
                  alt={`Gambar Desa ${profil.nama_desa}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))
          ) : (
            <p className="col-span-full text-text_secondary">
              Galeri belum tersedia.
            </p>
          )}
        </div>
      </section>
    </article>
  );
}
