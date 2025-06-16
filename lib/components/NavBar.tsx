"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

function NavBar() {
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  return (
    <div className="w-full bg-neutral-300 shadow-md absolute top-0 h-10">
      <div className="mx-auto w-full md:w-1/4 flex justify-around items-center">
        <Link href="/">Home</Link>
        <Link href={`/favorites?q=${search}`}>Favorites</Link>
      </div>
    </div>
  );
}

export default NavBar;
