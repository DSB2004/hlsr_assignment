"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
export default function Search() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const filters = {
      search: searchParams.get("search"),
    };
    if (filters.search) {
      setSearch(filters.search);
    }
  }, []);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="p-1.5 rounded-md border-[#8F8F8F] border flex  items-center rounded-[4px] flex-1">
      <SearchIcon stroke="#3B82F6"></SearchIcon>
      <Input
        value={search}
        onChange={handleSearch}
        className="!border-none !outline-none focus-within:!ring-0 focus:!ring-0 placeholder:text-[#3B82F6] "
        placeholder="Search"
      ></Input>
    </div>
  );
}
