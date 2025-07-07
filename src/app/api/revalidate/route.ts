import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  // 1. Verifikasi token rahasia
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  // 2. Dapatkan path halaman yang perlu di-revalidate dari body request Strapi
  const body = await request.json();
  const model = body.model; // misal: 'artikel', 'destinasi'
  const entry = body.entry; // data entri yang baru diubah

  let path: string | null = null;

  // Tentukan path berdasarkan model dari Strapi
  if (model === "artikel") {
    path = `/artikel/${entry.slug}`;
    revalidatePath("/artikel"); // Revalidate halaman list juga
  } else if (model === "destinasi") {
    path = `/destinasi/${entry.slug}`;
    revalidatePath("/destinasi"); // Revalidate halaman list juga
  } else if (model === "profil-desa") {
    path = `/profil/${entry.nama_desa.toLowerCase()}`;
  } else if (model === "homepage") {
    // Anda bisa membuat tipe konten 'homepage' di strapi jika perlu
    path = "/";
  }

  // 3. Jika path ditemukan, lakukan revalidate
  if (path) {
    try {
      revalidatePath(path);
      revalidatePath("/"); // Selalu revalidate homepage untuk data terbaru
      return NextResponse.json({
        revalidated: true,
        path: path,
        now: Date.now(),
      });
    } catch (err) {
      return NextResponse.json(
        { message: "Error revalidating", error: err },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { message: "No path to revalidate" },
    { status: 400 }
  );
}
