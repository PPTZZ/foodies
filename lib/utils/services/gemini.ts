"use server";
import type { TGenContentReq } from "@/lib/utils/definitions";
import type { TGenContentRes } from "@/lib/utils/definitions";

// Promise<string | null>
// handles the request to the Gemini API to generate content based on a prompt
async function gemini(prompt: string): Promise<unknown | null> {
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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCi4jqX2JTDNP-yCczEzS0OVZu0JlROweg`,
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
