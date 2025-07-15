import { Destination } from "@/lib/api";
import DestinationCard from "./DestinationCard";

export default function RecommendedDestinations({
  destinations,
}: {
  destinations: Destination[];
}) {
  if (!destinations || destinations.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t">
      <h2 className="text-3xl font-bold text-text_primary mb-8 text-center">
        Jelajahi Destinasi Lainnya
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </section>
  );
}
