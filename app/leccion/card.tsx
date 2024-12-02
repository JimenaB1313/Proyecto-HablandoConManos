import { cn } from "@/lib/utils";
import { ejercicios } from "@/db/schema";

import Image from "next/image";
import { useCallback } from "react";

type Props = {
    id: number;
    imageSrc: string | null;
    text: string;
    selected?: boolean;
    onClick: () => void;
    disabled?: boolean;
    status?: "correcto" | "incorrecto" | "ninguno",
    tipo: typeof ejercicios.$inferSelect["tipo"];
}

export const Card = ({
    id,
    imageSrc,
    text,
    selected,
    onClick,
    disabled,
    status,
    tipo,
}: Props) => {
    const handleClick = useCallback(() => {
        if (disabled) return;

        onClick();
    }, [disabled, onClick]);

    return (
        <div
            onClick={handleClick}
            className={cn(
                "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2",
                selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
                selected && status === "correcto"
                    && "border-green-300 bg-green-100 hover:bg-green-100",
                selected && status === "incorrecto"
                    && "border-rose-300 bg-rose-100 hover:bg-rose-100",
                disabled && "pointer-events-none hover:bg-white",
                tipo === "ASSIST" && "lg:p-3 w-full"
            )}
        >
            {imageSrc && (
                <div
                    className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full"
                >
                    <Image src={imageSrc} fill alt={text} />
                </div>
            )}
            <div className={cn(
                "flex items-center justify-between",
                tipo === "ASSIST" && "flex-row-reverse",
            )}>
                {tipo === "ASSIST" && <div />}
            </div>
        </div>
    );
};