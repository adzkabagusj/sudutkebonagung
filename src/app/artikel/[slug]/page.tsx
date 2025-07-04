import { fetcher, Article } from "@/lib/api";
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
  const articleResponse = await fetcher(`/api/artikels`, {
    filters: { slug: { $eq: slug } },
  });

  if (!articleResponse.data || articleResponse.data.length === 0) {
    return {
      title: "Artikel tidak ditemukan",
    };
  }
  const article: Article = articleResponse.data[0];
  return {
    title: `${article.judul} - SudutKebonagung`,
    description: `Baca artikel lengkap tentang ${article.judul}.`,
  };
}

// Halaman Detail Artikel
export default async function ArticleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  // Ambil data untuk artikel spesifik berdasarkan slug dari URL
  const articleResponse = await fetcher(`/api/artikels`, {
    filters: { slug: { $eq: slug } },
    // Populate * untuk mengambil semua field, termasuk isi_artikel
    populate: "*",
  });

  // Jika tidak ada data atau array kosong, tampilkan halaman 404
  if (!articleResponse.data || articleResponse.data.length === 0) {
    notFound();
  }

  const article = articleResponse.data[0];
  const imageUrl = `${
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
  }${article.gambar_utama.formats.small.url}`;

  return (
    <article className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-text_primary leading-tight mb-4">
        {article.judul}
      </h1>
      <div className="flex items-center space-x-4 text-text_secondary mb-8">
        <span>
          Dipublikasikan pada{" "}
          {new Date(article.publishedAt).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        {/* Tampilkan penulis jika ada */}
        {article.penulis && (
          <>
            <span>•</span>
            <span>Oleh: {article.penulis}</span>
          </>
        )}
      </div>

      <div className="relative w-full h-96 rounded-lg shadow-lg overflow-hidden mb-12">
        <Image
          src={imageUrl}
          alt={`Gambar utama untuk ${article.judul}`}
          fill
          className="object-cover"
          priority // Prioritaskan gambar utama untuk dimuat
        />
      </div>

      {/* Render konten Rich Text di sini */}
      <div className="prose prose-lg max-w-none prose-p:text-text_primary prose-headings:text-primary prose-a:text-secondary">
        {/* @ts-ignore */}
        <BlocksRenderer content={article.isi_artikel} />
      </div>
    </article>
  );
}
