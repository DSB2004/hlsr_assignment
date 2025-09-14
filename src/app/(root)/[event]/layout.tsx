import React, { ReactNode } from "react";
import { EventStore } from "@/store/event.store";
import { GuestsStore } from "@/store/guests.store";
export default function layout({ children }: { children: ReactNode }) {
  return (
    <EventStore>
      <GuestsStore>{children}</GuestsStore>
    </EventStore>
  );
}
