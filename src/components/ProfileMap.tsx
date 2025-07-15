interface ProfileMapProps {
  namaDesa: string;
}

export default function ProfileMap({ namaDesa }: ProfileMapProps) {
  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold text-black mb-6 text-center">
        Lokasi Desa
      </h2>
      <div className="aspect-video w-full rounded-lg shadow-lg overflow-hidden border">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15794.46673174747!2d111.10317920355833!3d-8.241243632452917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79600d89f7ff0b%3A0x25e9ea9b601c8a81!2sPlumbungan%2C%20Kec.%20Kebonagung%2C%20Kabupaten%20Pacitan%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1752477995122!5m2!1sid!2sid"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Peta Lokasi Desa ${namaDesa}`}></iframe>
      </div>
    </section>
  );
}
