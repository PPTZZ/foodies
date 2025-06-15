import gemini from "@/lib/utils/services/gemini";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const data = await gemini(prompt);
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error in POST request:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
