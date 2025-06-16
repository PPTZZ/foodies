import type { TButton } from "@/lib/utils/definitions";
import { useSearchParams } from "next/navigation";

function LoadMoreButton({ children, ...props }: TButton) {
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("p");
  const disableButton = Number(pageNumber) >= 5;

  return (
    <button
      disabled={disableButton}
      className={`w-[11.25rem] h-12 bg-primary text-white font-semibold rounded cursor-pointer mt-9`}
      {...props}
    >
      {children}
    </button>
  );
}

export default LoadMoreButton;
