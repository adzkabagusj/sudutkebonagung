import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-surface sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        {" "}
        <Link
          href="/"
          className="text-2xl font-bold text-primary hover:text-primary-dark transition-colors">
          SudutKebonagung
        </Link>
        <div className="hidden md:flex space-x-2 items-center">
          {" "}
          <div className="relative group">
            <div className="px-3 py-4">
              <button className="text-text_secondary group-hover:text-primary transition-colors font-medium flex items-center">
                Profil Desa
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
            <div className="absolute hidden group-hover:block bg-surface shadow-lg rounded-md mt-0 py-2 w-48 left-1/2 -translate-x-1/2">
              {" "}
              <Link
                href="/profil/plumbungan"
                className="block px-4 py-2 text-text_secondary hover:bg-background hover:text-primary">
                Desa Plumbungan
              </Link>
              <Link
                href="/profil/karangnongko"
                className="block px-4 py-2 text-text_secondary hover:bg-background hover:text-primary">
                Desa Karangnongko
              </Link>
            </div>
          </div>
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
