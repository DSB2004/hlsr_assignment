"use client";

import React from "react";
import { Table, TableBody } from "@/components/ui/table";
import Row from "./row";
import Header from "./header";
import TablePagination from "@/components/common/pagination";
import Loading from "./loading";
import { useGuestsStore } from "@/store/guests.store";
export default function GuestTable() {
  const { guests, isFetching, isLoading } = useGuestsStore();
  if (!guests || isFetching || isLoading)
    return (
      <>
        <div className="m-4 space-y-2">
          <div className="min-h-[300px] ">
            <Table className="">
              <Header></Header>
              <TableBody>
                <Loading></Loading>
                <Loading></Loading>
                <Loading></Loading>
                <Loading></Loading>
              </TableBody>
            </Table>
          </div>
        </div>
      </>
    );
  const { data, totalPages, page } = guests;
  return (
    // <></>
    <div className="m-4 space-y-2">
      {data.length === 0 ? (
        <>
          <h2 className=" my-10 text-muted-foreground w-full text-center">
            No Guest Available
          </h2>
        </>
      ) : (
        <>
          <div className="min-h-[300px]">
            <Table className="">
              <Header></Header>
              <TableBody>
                {data.map((ele) => {
                  return <Row data={ele} key={ele.id} />;
                })}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            totalPages={totalPages}
            page={page}
          ></TablePagination>
        </>
      )}
    </div>
  );
}
