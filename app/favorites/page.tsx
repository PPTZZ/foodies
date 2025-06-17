"use client";
import Card from "@/lib/components/Card";
import { PromptResponse } from "@/lib/utils/definitions";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function Favorites() {
  const searchParams = useSearchParams();
  const category = searchParams.get("q");
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["recipes", category]) as
    | Array<PromptResponse>
    | undefined;

  useEffect(()=>{},[])

  const filteredData = React.useMemo(() => {
    return data?.filter((item) => item.checked === true) ?? [];
  }, [data]);

  return (
    <>
      <div className="flex flex-col gap-4 mt-16 w-full px-4 items-center">
        <h1>Favorites</h1>
        {filteredData ? (
          filteredData?.map((recipe) => {
            return (
              <Card
                key={recipe.id}
                title={recipe.title}
                userPrompt={category}
                time={recipe.time}
                checked={recipe.checked}
              />
            );
          })
        ) : (
          <h2>No favorites come back when you added some</h2>
        )}
      </div>
    </>
  );
}

export default Favorites;
