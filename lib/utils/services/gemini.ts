"use server";
import type { TGenContentReq } from "@/lib/utils/definitions";
import type { TGenContentRes } from "@/lib/utils/definitions";

// Promise<string | null>
// handles the request to the Gemini API to generate content based on a prompt
async function gemini(prompt: string): Promise<unknown | null> {
  if (!process.env.GEMINI_API_KEY) {
    console.error(
      "GEMINI_API_KEY is not set. Please set it in your .env.local file."
    );
    return null;
  }

  const req: TGenContentReq = {
    contents: [
      {
        parts: [
          {
            text: `give me a list of 20 recipes, all must contain a "checked" property with the value false, a "id", a "title", a "time", an "ingredients" lsit and  an "instructions" list and should contain  ${prompt}`,
          },
        ],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
    },
  };

  // fetching data from the Gemini API and returning the response or throwing an error if the request fails
  try {
    const res = await fetch(
      `${process.env.API_ENDPOINT}/${process.env.GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify(req),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`error: ${err} status: ${res.status}`);
    }

    const data: TGenContentRes = await res.json();

    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0
    ) {
      const rawText = data.candidates[0].content.parts[0].text;
      try {
        const jsonRes = JSON.parse(rawText);
        return jsonRes;
      } catch (err) {
        console.error("Error parsing JSON response:", err);
        return null;
      }
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error sending prompt to Gemini API:", err);
    return null;
  }
}

export default gemini;
