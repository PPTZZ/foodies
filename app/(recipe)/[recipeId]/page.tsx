"use client";
import { PromptResponse } from "@/lib/utils/definitions";
import { useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

function Recipe() {
  const path = usePathname();
  const searchParams = useSearchParams();
  const title = String(path.substring(1).replaceAll("_", " "));
  const category = searchParams.get("c");
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["recipes", category]);

  const recipesArray = Array.isArray(data) ? (data as PromptResponse[]) : [];
  const recipe = recipesArray.filter((recipe) => recipe.title === title);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl relative">
      <div className="justify-self-center-safe">
        <div className="block md:sticky top-16">
          <Image
            src="/img-placeholder-lg.png"
            alt="image placeholder"
            width={400}
            height={400}
            className="bg-neutral-300 "
          />
          <div className="w-full flex justify-between items-center mt-10 max-w-[400px] max-md:px-10">
            <div>
              <h2>{recipe[0]?.title}</h2>
              <p>{recipe[0]?.time}</p>
            </div>
            <Heart className="stroke-primary cursor-pointer hover:fill-primary" />
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-20 max-md:px-10">
        <div className="max-w-2/3">
          <h3>Ingredients:</h3>
          <ul className="list-disc list-inside space-y-2.5">
            {recipe[0]?.ingredients.map((ingredient, i) => (
              <li key={i}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="max-w-2/3">
          <h3>Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2.5">
            {recipe[0]?.instructions.map((instruction, i) => (
              <li key={i}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
