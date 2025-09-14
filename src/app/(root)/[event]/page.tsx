"use client";
import React from "react";
import Event from "@/components/event/info";
import Random from "@/components/event/guest/action/random";
import GuestTable from "@/components/event/guest/table";
import Update from "@/components/event/info/action/update";
import SendInvite from "@/components/event/info/action/invite";
import Search from "@/components/common/search";
import Create from "@/components/event/guest/action/create";
import Delete from "@/components/event/info/action/delete";

export default function page() {
  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="flex gap-2 p-4 justify-between items-center w-full border md:flex-row flex-col">
          <h2 className="text-3xl font-bold">Event Description</h2>

          <div className="flex gap-2 sm:flex-row flex-col ">
            <Update></Update>
            <SendInvite></SendInvite>
            <Delete></Delete>
          </div>
        </div>
        <div className="flex h-screen gap-2 p-4 md:flex-row flex-col-reverse">
          <Event></Event>
          <div className=" w-full">
            <div className="flex gap-2 items-center w-full ">
              <div className="flex w-full gap-4 flex-col lg:flex-row">
                <div className="flex-1">
                  <Search></Search>
                </div>
                <div className="flex gap-2 justify-between">
                  <Create></Create>
                  <Random></Random>
                </div>
              </div>
            </div>
            <GuestTable></GuestTable>
          </div>
        </div>
      </div>
    </>
  );
}
