import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/api";

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

export default function FeaturedArticleCard({ article }: { article: Article }) {
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  let imageUrl = article.gambar_utama.formats.medium.url;
  if (!imageUrl.startsWith("http")) {
    imageUrl = `${strapiUrl}${imageUrl}`;
  }

  return (
    <Link
      href={`/artikel/${article.slug}`}
      className="group grid md:grid-cols-2 gap-8 items-center bg-surface shadow-lg rounded-lg p-4 md:p-10">
      <div className="relative aspect-video rounded-lg shadow-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={article.judul}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div>
        {article.tag && (
          <span
            className={`text-sm font-semibold px-3 py-1 rounded-full ${getTagColor(
              article.tag
            )}`}>
            {article.tag}
          </span>
        )}
        <h2 className="text-xl md:text-3xl font-bold text-text_primary mt-4 group-hover:text-secondary transition-colors">
          {article.judul}
        </h2>
        <p className="text-text_secondary mt-2">
          Oleh {article.penulis} •{" "}
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
