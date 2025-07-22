import { fetcher, Article } from "@/lib/api";
import Link from "next/link";
import ArticleCard from "./ArticleCard";
import FeaturedArticleCard from "./FeaturedArticleCard";

export default async function ArtikelSection() {
  const response = await fetcher("/api/artikels", {
    sort: "publishedAt:desc",
    pagination: { limit: 4 }, // Ambil 4 artikel terbaru
    populate: "gambar_utama",
  });

  if (!response.data || response.data.length === 0) {
    return null;
  }

  const articles: Article[] = response.data;
  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1); // Artikel ke-2, 3, dan 4

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-text_primary">
            Kabar Terbaru Desa
          </h2>
          <p className="text-md md:text-lg text-text_secondary mt-2">
            Ikuti perkembangan dan cerita menarik dari Desa Plumbungan.
          </p>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-16">
            <FeaturedArticleCard article={featuredArticle} />
          </div>
        )}

        {/* Other Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/artikel"
            className="bg-secondary text-sm md:text-xl text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-secondary-dark transition-all duration-300">
            Lihat Semua Artikel
          </Link>
        </div>
      </div>
    </section>
  );
}
