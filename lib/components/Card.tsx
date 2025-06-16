import { Heart } from "lucide-react";
import type { TCardProps } from "@/lib/utils/definitions";
import Image from "next/image";

function Card({ title, time}: TCardProps) {
  return (
    <div className="w-full sm:w-96 h-[5.5rem] rounded-2xl bg-neutral-200 flex items-center shadow-card-shadow pr-4">
      <Image
        src="/img-placeholder-sm.png"
        alt="image placeholder"
        width={88}
        height={88}
      />
      <div className="flex-grow">
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-sm">{time}</p>
      </div>
      <Heart className="stroke-primary cursor-pointer hover:fill-primary" />
    </div>
  );
}

export default Card;
