import React from "react";

export default function loading() {
  return (
    <aside className="  w-full lg:w-64 h-full border rounded-md bg-gray-50 p-6 space-y-6">
      <h2>Event Details</h2>
      <div>
        <h3 className="text-sm font-semibold text-gray-500">Name</h3>
        <p className="mt-1 text-lg font-medium text-gray-900"></p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-500">Venue</h3>
        <p className="mt-1 text-lg font-medium text-gray-900"></p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-500">Date</h3>
        <p className="mt-1 text-lg font-medium text-gray-900"></p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-500">Time</h3>
        <p className="mt-1 text-lg font-medium text-gray-900"></p>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-500">Description</h3>
        <p className="mt-1 text-sm text-gray-800 leading-relaxed"></p>
      </div>
    </aside>
  );
}
