"use client";
import { Search } from "lucide-react";
import type { TInputProps } from "@/lib/utils/definitions";
import { promptLLM } from "@/lib/utils/actions/prompt";
import { useActionState } from "react";

const initialState = {
  message: null as string | null,
};

function Input({ handleKeyDown }: TInputProps) {
  const [state, action, isLoading] = useActionState(promptLLM, initialState);

  return (
    <>
      <form action={action} className="w-fit relative">
        <input
          type="text"
          name="prompt"
          placeholder="What do you feel like eating?"
          onKeyDown={handleKeyDown}
        />
        <button
          type="submit"
          className="absolute right-4 top-2 size-6 text-neutral-400"
          disabled={isLoading}
        >
          <Search />
        </button>
        {state && (
          <p className="text-red-600 text-sm font-semibold absolute left-4 top-12">
            {state.message}
          </p>
        )}
      </form>
    </>
  );
}

export default Input;
