import qs from "qs";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function fetcher(
  path: string,
  urlParamsObject: Record<string, any> = {}
) {
  try {
    const queryString = qs.stringify(urlParamsObject, {
      encodeValuesOnly: true,
    });

    const requestUrl = `${STRAPI_URL}${path}${
      queryString ? `?${queryString}` : ""
    }`;

    console.log(`Fetching from: ${requestUrl}`);

    const response = await fetch(requestUrl);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Strapi response error:", errorBody);
      throw new Error(
        `An error occurred please try again. Status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetcher function:", error);
    throw new Error("Failed to fetch data from Strapi.");
  }
}

// --- Tipe Data (Interface) ---

interface StrapiMediaFormat {
  url: string;
}

export interface SimpleStrapiMedia {
  id: number;
  name: string;
  url: string;
  formats: {
    thumbnail: StrapiMediaFormat;
    small: StrapiMediaFormat;
    medium: StrapiMediaFormat;
    large: StrapiMediaFormat;
  };
}

export interface Article {
  id: number;
  judul: string;
  slug: string;
  publishedAt: string;
  gambar_utama: SimpleStrapiMedia;
  penulis: string;
  tag: "Kegiatan Desa" | "Budaya" | "Wisata";
}

export interface Destination {
  id: number;
  nama: string;
  slug: string;
  deskripsi: any;
  galeri: SimpleStrapiMedia[];
  lokasi_map_url: string;
  info_praktis: {
    jam_buka: string;
    harga_tiket: string;
    tips: string;
  };
}

export interface ProfilDesa {
  id: number;
  nama_desa: string;
  luas_wilayah: string;
  jumlah_penduduk: string;
  jumlah_dusun: string;
  deskripsi_desa: any;
  sejarah_desa: any;
  galeri: SimpleStrapiMedia[];
  foto_struktur_pemerintahan: SimpleStrapiMedia;
}
