import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-surface sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        {" "}
        <Link
          href="/"
          className="text-2xl font-bold text-primary hover:text-primary-dark transition-colors">
          Desa Plumbungan
        </Link>
        <div className="hidden md:flex space-x-2 items-center">
          {" "}
          <Link
            href="/profil/plumbungan"
            className="text-text_secondary hover:text-primary transition-colors font-medium px-3 py-4">
            {" "}
            Profil Desa
          </Link>
          <Link
            href="/artikel"
            className="text-text_secondary hover:text-primary transition-colors font-medium px-3 py-4">
            {" "}
            Artikel
          </Link>
          <Link
            href="/destinasi"
            className="text-text_secondary hover:text-primary transition-colors font-medium px-3 py-4">
            {" "}
            Destinasi
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
