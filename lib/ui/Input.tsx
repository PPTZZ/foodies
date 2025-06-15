"use client";
import type { PromptResponse } from "../utils/definitions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";

async function promptLLM(prompt: string): Promise<PromptResponse> {
  const res = await fetch("/api/recipes", {
    method: "POST",
    body: JSON.stringify({ prompt }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

function Input() {




  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
  };

  return (
    <>
      <form className="w-fit relative" onSubmit={handleSubmit}>
        <input
          type="text"
          name="prompt"
          placeholder="What do you feel like eating?"
        />
        <button
          type="submit"
          className="absolute right-4 top-2 size-6 text-neutral-400 cursor-pointer"
        >
          <Search />
        </button>
      </form>
    </>
  );
}

export default Input;
