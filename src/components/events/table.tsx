"use client";

import React from "react";
import { Table, TableBody } from "@/components/ui/table";
import Row from "./row";
import Header from "./header";
import TablePagination from "@/components/common/pagination";
import { useEventsStore } from "@/store/events.store";
import Loading from "./loading";
export default function EventTable() {
  const { events, isFetching, isLoading } = useEventsStore();
  if (!events || isFetching || isLoading)
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
  const { data, totalPages, page } = events;
  return (
    <div className="m-4 space-y-2">
      {data.length === 0 ? (
        <>
          <h2 className=" my-10 text-muted-foreground w-full text-center">
            No Events Available
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
