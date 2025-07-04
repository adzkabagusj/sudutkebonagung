import { Article } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

function ArticleCard({ article }: { article: Article }) {
  const imageUrl = `${
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
  }${article.gambar_utama.formats.small.url}`;

  return (
    <Link
      href={`/artikel/${article.slug}`}
      className="block group bg-surface rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={`Gambar untuk ${article.judul}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-text_primary group-hover:text-primary transition-colors duration-300">
          {article.judul}
        </h3>
        <p className="text-sm text-text_secondary mt-2">
          {new Date(article.publishedAt).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}

export default ArticleCard;
