import { Article } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

const getTagColor = (tag: Article["tag"]) => {
  switch (tag) {
    case "Kegiatan Desa":
      return "bg-blue-100 text-blue-800";
    case "Budaya":
      return "bg-purple-100 text-purple-800";
    case "Wisata":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-[#0B184A]";
  }
};

function ArticleCard({ article }: { article: Article }) {
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  let imageUrl = article.gambar_utama.formats.small.url;
  if (!imageUrl.startsWith("http")) {
    imageUrl = `${strapiUrl}${imageUrl}`;
  }

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
        {article.tag && (
          <span
            className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${getTagColor(
              article.tag
            )}`}>
            {article.tag}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-text_secondary group-hover:text-secondary transition-colors duration-300">
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
