import { fetcher, Article } from "@/lib/api";
import ArticleList from "@/components/ArticleList"; // Impor komponen interaktif baru
import FeaturedArticleCard from "@/components/FeaturedArticleCard"; // Impor kartu highlight
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel - Desa Plumbungan",
  description:
    "Kumpulan kabar, cerita, dan informasi terbaru dari Desa Plumbungan.",
};

export default async function ArticlesPage() {
  const articlesResponse = await fetcher("/api/artikels", {
    sort: "publishedAt:desc",
    populate: "gambar_utama",
  });

  const articles: Article[] = articlesResponse.data || [];

  return (
    <div>
      {/* Bagian Daftar Artikel */}
      <section className="my-12">
        <h2 className="text-4xl font-bold text-text_primary mb-8 text-center">
          Telusuri Semua Artikel
        </h2>
        {/* Render komponen interaktif, berikan semua artikel sebagai data awal */}
        <ArticleList initialArticles={articles} />
      </section>
    </div>
  );
}
