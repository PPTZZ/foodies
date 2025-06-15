"use server";
export async function promptLLM(prevState: any, formData: FormData) {
  const prompt = formData.get("prompt") as string;
    if (!prompt || prompt.trim() === "") {
        return { message: "Search field must not be empty" };
    }
}
