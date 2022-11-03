import Heading from "@components/common/heading";
import SectionWrapper from "@components/common/section-wrapper";
import EventCard from "@components/events/event-card";
import MainLayout from "@components/layouts/main-layout";
import { useEventsQuery } from "@hooks/query";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

const MapWithNoSSR = dynamic(() => import("@components/map"), {
  ssr: false,
});

const EventPage = () => {
  const { isSuccess, data } = useEventsQuery();
  const [hoveredEventIndex, setHoveredEventIndex] = useState<
    string | undefined
  >(undefined);

  if (!isSuccess) return <div>loading...</div>;

  const markers = data
    .filter((event) => event.latitude && event.longitude)
    .map((event) => ({
      id: event.id,
      latitude: Number(event.latitude),
      longitude: Number(event.longitude),
    }));

  return (
    <MainLayout>
      <div className="mb-5 flex items-center justify-between">
        <Heading>Events</Heading>
        <Link href="/events/create">
          <a className="text-blue-500 hover:underline">create event</a>
        </Link>
      </div>
      <div className="my-10">
        <MapWithNoSSR markers={markers} focusedMarkerId={hoveredEventIndex} />
      </div>
      <div className="space-y-3">
        {data.map((event) => {
          const formattedAddress = `ul. ${event.street} ${event.city}, ${event.postCode} ${event.country}`;
          return (
            <EventCard
              name={event.name}
              description={event.description}
              key={event.id}
              address={formattedAddress}
              onMouseEnter={() => setHoveredEventIndex(event.id)}
              onMouseLeave={() => setHoveredEventIndex(undefined)}
            />
          );
        })}
      </div>
    </MainLayout>
  );
};

export default EventPage;
