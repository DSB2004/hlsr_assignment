import React from "react";
import { useEventStore } from "@/store/event.store";
import Loading from "./loading";
export default function Event() {
  const { event, isLoading, isFetching } = useEventStore();

  if (!event || isFetching || isLoading) {
    return <Loading />;
  }
  const timing = new Date(event.timing);

  return (
    <aside className=" w-full lg:w-64 h-full border rounded-md bg-gray-50 p-6 space-y-6">
      <h2 className="my-4 text-2xl font-semibold">Event Details</h2>
      <div>
        <h3 className="text-sm font-semibold text-gray-500">Name</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">{event.name}</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-500">Venue</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">{event.venue}</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-500">Date</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">
          {timing.toLocaleDateString()}
        </p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-500">Time</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">
          {timing.toLocaleTimeString()}
        </p>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-500">Description</h3>
        <p className="mt-1 text-sm text-gray-800 leading-relaxed">
          {event.description}
        </p>
      </div>
    </aside>
  );
}
