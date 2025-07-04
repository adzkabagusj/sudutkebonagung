import { fetcher, Article, Destination } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import ArticleCard from "@/components/ArticleCard";
import DestinationCard from "@/components/DestinationCard";

// Halaman Utama
export default async function HomePage() {
  const articlesResponse = await fetcher("/api/artikels", {
    sort: "publishedAt:desc",
    pagination: { limit: 3 },
    populate: { gambar_utama: { fields: ["url", "formats"] } },
  });
  const articles: Article[] = articlesResponse.data;

  const destinationsResponse = await fetcher("/api/destinasis", {
    pagination: { limit: 4 },
    populate: "galeri",
  });

  const destinations: Destination[] = destinationsResponse.data;

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24 rounded-lg bg-white shadow-sm">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          Temukan Pesona Tersembunyi
        </h1>
        <p className="text-lg text-text_secondary mt-4 max-w-2xl mx-auto">
          Jelajahi keindahan alam, kekayaan budaya, dan keramahan warga di Desa
          Plumbungan & Karangnongko.
        </p>
        <div className="mt-8">
          <Link
            href="/destinasi"
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 shadow-lg">
            Lihat Semua Destinasi
          </Link>
        </div>
      </section>

      {/* Artikel Terbaru */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-text_primary mb-8">
          Kabar Terbaru dari Desa
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles && articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          ) : (
            <p className="col-span-3 text-text_secondary">
              Saat ini belum ada artikel untuk ditampilkan.
            </p>
          )}
        </div>
      </section>

      {/* Destinasi Unggulan */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-text_primary mb-8">
          Destinasi Unggulan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations && destinations.length > 0 ? (
            destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))
          ) : (
            <p className="col-span-4 text-text_secondary">
              Saat ini belum ada destinasi untuk ditampilkan.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
