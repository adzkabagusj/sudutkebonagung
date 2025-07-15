import { fetcher, ProfilDesa } from "@/lib/api";
import Link from "next/link";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

// Helper untuk memotong teks
const truncateText = (content: any[], maxLength: number) => {
  if (!content || !content[0]?.children[0]?.text) {
    return "Deskripsi tidak tersedia.";
  }
  const text = content[0].children[0].text;
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export default async function PlumbunganSection() {
  const response = await fetcher(
    `/api/profil-desas?filters[nama_desa][$eq]=Plumbungan`
  );
  if (!response.data || response.data.length === 0) {
    return null; // Tidak menampilkan section jika data tidak ada
  }
  const profil: ProfilDesa = response.data[0];

  return (
    <section id="profil-desa" className="py-24 bg-surface">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-text_primary">
          Sekilas Tentang Desa Plumbungan
        </h2>
        <p className="text-lg text-text_secondary mt-4 max-w-3xl mx-auto">
          {truncateText(profil.deskripsi_desa, 200)}
        </p>
        <div className="mt-8">
          <Link
            href="/profil/plumbungan"
            className="border border-secondary text-secondary font-bold py-3 px-8 rounded-full hover:bg-secondary hover:text-white transition-colors duration-300">
            Profil Desa Selengkapnya
          </Link>
        </div>
      </div>
    </section>
  );
}
