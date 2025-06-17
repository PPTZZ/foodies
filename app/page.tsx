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
  const cursor = [0, 5, 10, 15];
  const userPrompt = searchParams.get("q");
  const page = searchParams.get("p");
  const currentPage = Number(page ?? 1);

  const { data, isLoading } = useQuery<PromptResponse[]>({
    queryKey: ["recipes", userPrompt],
    queryFn: async () => {
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(`recipes-${userPrompt}`);
        if (cached) return JSON.parse(cached);
      }
      const result = await fetchData(userPrompt ?? "");
      const formattedResult = Array.isArray(result) ? result : [result];

      if (typeof window !== "undefined") {
        localStorage.setItem(
          `recipes-${userPrompt}`,
          JSON.stringify(formattedResult)
        );
      }

      return formattedResult;
    },
    enabled: !!userPrompt,
    staleTime:
      Infinity /* this one and the next are used to prevent unintentional refetching */,
    refetchOnWindowFocus: false,
  });

  // pagination, checking the page number p and updating it
  function updatePage() {
    const currentPage = Number(page ?? 0);
    if (currentPage < 4) {
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

  const paginatedRecipes = data?.slice(
    cursor[currentPage - 1],
    currentPage * 5
  );

  return (
    <>
      <Input />
      {isLoading ? (
        <div className="text-xl mt-6 font-semibold">
          <p>Generating recipes this might take a few seconds...</p>
          <p>Hang in there!</p>
        </div>
      ) : null}
      {data && (
        <div className="flex flex-col gap-4 mt-16 w-full px-4 items-center">
          <h1>Suggested recipes</h1>

          {paginatedRecipes?.map((recipe) => (
            <Card
              key={recipe.id}
              title={recipe.title}
              userPrompt={userPrompt}
              time={recipe.time}
              checked={recipe.checked}
            />
          ))}
          <LoadMoreButton onClick={updatePage}>
            I don’t like these
          </LoadMoreButton>
        </div>
      )}
    </>
  );
}

export default Home;
