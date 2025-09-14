import React, { ReactNode } from "react";
import { InviteStore } from "@/store/invite.store";
export default function layout({ children }: { children: ReactNode }) {
  return <InviteStore>{children}</InviteStore>;
}
