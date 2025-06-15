import type { TButton } from "@/lib/utils/definitions";

function LoadMoreButton({ children, ...props }: TButton) {
  return (
    <button
      className={`w-[11.25rem] h-12 bg-primary text-white font-semibold rounded cursor-pointer`}
      {...props}
    >
      {children}
    </button>
  );
}

export default LoadMoreButton;
