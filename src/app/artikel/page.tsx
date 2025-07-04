import { fetcher, Article } from "@/lib/api";
import ArticleCard from "@/components/ArticleCard"; // Mengimpor dari komponen terpisah, sesuai refactor Anda
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel - SudutKebonagung",
  description:
    "Kumpulan kabar, cerita, dan informasi terbaru dari Desa Plumbungan dan Karangnongko.",
};

export default async function ArticlesPage() {
  // Ambil SEMUA artikel, urutkan dari yang terbaru.
  // Kita hapus pagination limit untuk mengambil semuanya.
  const articlesResponse = await fetcher("/api/artikels", {
    sort: "publishedAt:desc",
    populate: { gambar_utama: { fields: ["url", "formats"] } },
  });
  const articles: Article[] = articlesResponse.data;

  return (
    <section>
      <h1 className="text-4xl font-bold text-text_primary mb-2">
        Kabar dari Desa
      </h1>
      <p className="text-lg text-text_secondary mb-12">
        Kumpulan cerita, berita, dan informasi terbaru dari sudut Kebonagung.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles && articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        ) : (
          <p className="col-span-3 text-text_secondary">
            Belum ada artikel untuk ditampilkan.
          </p>
        )}
      </div>
    </section>
  );
}
