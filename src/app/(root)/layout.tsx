import React, { ReactNode } from "react";
import Header from "@/components/common/header";
import { UserStore } from "@/store/user.store";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="flex flex-col">
        <Header></Header>
        <UserStore>{children}</UserStore>;
      </main>
    </>
  );
}
