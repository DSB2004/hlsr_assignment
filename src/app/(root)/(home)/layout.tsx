import React, { ReactNode } from "react";
import { EventsStore } from "@/store/events.store";
export default function layout({ children }: { children: ReactNode }) {
  return <EventsStore>{children}</EventsStore>;
}
