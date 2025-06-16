"use client";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Input() {
  const searchParams = useSearchParams();
  const path = usePathname();
  const { replace } = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    const input = e.currentTarget.prompt.value.trim();
    if (input) {
      params.set("q", input);
      params.set("p", "1");
    }
    replace(`${path}?${params.toString()}`);
    e.currentTarget.reset();
  };

  return (
    <>
      <form className="relative max-sm:w-full max-sm:px-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="prompt"
          placeholder="What do you feel like eating?"
        />
        <button
          type="submit"
          className="absolute max-sm:right-8 right-4 top-2 size-6 text-neutral-400 cursor-pointer"
        >
          <Search />
        </button>
      </form>
    </>
  );
}

export default Input;
