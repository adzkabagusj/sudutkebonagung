import { fetcher, Article } from "@/lib/api";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import RecommendedArticles from "@/components/RecommendedArticles"; // <-- 1. IMPORT KOMPONEN BARU

interface PageProps {
  params: {
    slug: string;
  };
}

// Fungsi metadata tidak perlu diubah
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params;
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
export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = params;

  // Fetch artikel yang sedang dibuka
  const articleResponse = await fetcher(`/api/artikels`, {
    filters: { slug: { $eq: slug } },
    populate: "*",
  });

  if (!articleResponse.data || articleResponse.data.length === 0) {
    notFound();
  }

  const article: Article = articleResponse.data[0];

  // 2. FETCH ARTIKEL LAIN UNTUK REKOMENDASI
  const recommendedArticlesResponse = await fetcher(`/api/artikels`, {
    // Filter untuk tidak menyertakan artikel yang sedang dibuka
    filters: { slug: { $ne: slug } },
    sort: "publishedAt:desc",
    pagination: { limit: 3 },
    populate: "gambar_utama",
  });
  const recommendedArticles: Article[] = recommendedArticlesResponse.data;

  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  let imageUrl = article.gambar_utama.formats.small.url;
  if (!imageUrl.startsWith("http")) {
    imageUrl = `${strapiUrl}${imageUrl}`;
  }

  return (
    // Kita bungkus dengan div agar bisa menempatkan komponen rekomendasi di bawah article
    <div>
      <article className="max-w-4xl mx-auto py-8">
        {article.tag && (
          <span className="bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block">
            {article.tag}
          </span>
        )}
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
            priority
          />
        </div>

        <div className="prose prose-lg max-w-none prose-p:text-text_primary prose-headings:text-primary prose-a:text-secondary">
          {/* @ts-ignore */}
          <BlocksRenderer content={article.isi_artikel} />
        </div>
      </article>

      {/* 3. TAMPILKAN KOMPONEN REKOMENDASI DI SINI */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <RecommendedArticles articles={recommendedArticles} />
      </div>
    </div>
  );
}
