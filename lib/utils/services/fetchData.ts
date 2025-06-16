import type { PromptResponse } from "../definitions";

export async function fetchData(prompt: string): Promise<PromptResponse> {
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
