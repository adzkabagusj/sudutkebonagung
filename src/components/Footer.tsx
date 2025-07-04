const Footer = () => {
  // Dapatkan tahun saat ini secara dinamis
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white mt-16">
      <div className="container mx-auto px-6 py-8 text-center">
        <p className="font-medium">
          &copy; {currentYear} Mengarung Kebonagung. All rights reserved.
        </p>
        <p className="text-sm text-primary-light mt-2">
          Website Profil dan Promosi Desa Plumbungan & Karangnongko
        </p>
      </div>
    </footer>
  );
};

export default Footer;
