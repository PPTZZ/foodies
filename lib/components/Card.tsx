"use client";
import { Heart } from "lucide-react";
import type { PromptResponse, TCardProps } from "@/lib/utils/definitions";
import Image from "next/image";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function Card({ title, time, userPrompt, checked }: TCardProps) {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["recipes", userPrompt]) as
    | PromptResponse[]
    | undefined;

  const toggleItemMutation = useMutation({
    mutationFn: async (titleToMatch: string) => {
      if (!data) return [];
      const updatedItems = data.map((item) =>
        item.title === titleToMatch ? { ...item, checked: !item.checked } : item
      );

      localStorage.setItem(
        `recipes-${userPrompt}`,
        JSON.stringify(updatedItems)
      );
      return updatedItems;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes", userPrompt] });
    },
  });

  function toggleChecked() {
    toggleItemMutation.mutate(title);
  }

  return (
    <div className="w-full sm:w-96 h-[5.5rem] rounded-2xl bg-neutral-200 flex items-center justify-between shadow-card-shadow pr-4">
      <Link
        href={`${title.replaceAll(" ", "_")}?c=${userPrompt}`}
        className="flex-grow"
      >
        <div className=" flex items-center">
          <Image
            src="/img-placeholder-sm.png"
            alt="image placeholder"
            width={88}
            height={88}
          />
          <div className="flex-grow">
            <p className="font-semibold text-lg">{title}</p>
            <p className="text-sm">{time}</p>
          </div>
        </div>
      </Link>
      <Heart
        className={`stroke-primary cursor-pointer hover:fill-primary ${
          checked ? "fill-primary" : "fill-transparent"
        }`}
        onClick={toggleChecked}
      />
    </div>
  );
}

export default Card;
