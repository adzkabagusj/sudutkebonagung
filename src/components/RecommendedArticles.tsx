import { Article } from "@/lib/api";
import ArticleCard from "./ArticleCard";

export default function RecommendedArticles({
  articles,
}: {
  articles: Article[];
}) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t">
      <h2 className="text-3xl font-bold text-text_primary mb-8 text-center">
        Baca Juga Artikel Lainnya
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
