import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
    title: string;
    id: number;
    imageSrc: string;
    onClick: (id: number) => void;
    disabled?: boolean;
    active?: boolean;
};

export const Card = ({
    title,
    id,
    imageSrc,
    onClick,
    disabled,
    active,
}: Props) => {
    return (
        <div
            onClick={() => onClick(id)}
            className={cn(
                "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-center p-3 pb-6 min-h-[217px] min-w-[200px]",
                disabled && "pointer-events-none opacity-50"
            )}
        >
            <Image
                src={imageSrc}
                alt={title}
                height={100}
                width={120}
                className="rounded-lg drop-shadow-md object-cover"
            />
            <p className="text-neutral-700 text-center font-bold mt-3 txt-xl">
                {title}
            </p>
        </div>
    );
};