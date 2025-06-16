"use client";
import Card from "@/lib/components/Card";
import Input from "@/lib/ui/Input";
import LoadMoreButton from "@/lib/ui/LoadMoreButton";
import { PromptResponse } from "@/lib/utils/definitions";
import { fetchData } from "@/lib/utils/services/fetchData";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

function Home() {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const path = usePathname();
  const userPrompt = searchParams.get("q");
  const page = searchParams.get("p");
  const disable = searchParams.get("d");
  const currentPage = Number(page ?? 1);

  const { data, isLoading, isError, error } = useQuery<PromptResponse[]>({
    queryKey: ["recipes", userPrompt],
    queryFn: async () => {
      const result = await fetchData(userPrompt ?? "");
      return Array.isArray(result) ? result : [result];
    },
    enabled: !!userPrompt,
    staleTime:
      Infinity /* this one and the next are used to prevent unintentional refetching */,
    refetchOnWindowFocus: false,
  });

  // pagination, checking the page number p and updating it
  function updatePage() {
    const currentPage = Number(page ?? 0);
    if (currentPage < 5) {
      const params = new URLSearchParams(searchParams);
      const pageNumber = currentPage + 1;
      params.set("p", String(pageNumber));
      push(`${path}?${params.toString()}`, {
        scroll: false,
      });
    } else {
      return;
    }
  }

  const paginatedRecipes = data?.slice(0, currentPage * 5);

  return (
    <>
      <Input />
      {isLoading ? <p>Loading...</p> : null}
      <div className="flex flex-col gap-4 mt-16 w-full px-4 items-center">
        {data && <h1>Suggested recipes</h1>}
        {data &&
          paginatedRecipes?.map((recipe) => (
            <Link
              key={recipe.id}
              href={`${recipe.title.replaceAll(" ", "_")}?c=${userPrompt}`}
            >
              <Card title={recipe.title} time={recipe.time} />
            </Link>
          ))}
      </div>
      <LoadMoreButton onClick={updatePage}>I don’t like these</LoadMoreButton>
    </>
  );
}

export default Home;
