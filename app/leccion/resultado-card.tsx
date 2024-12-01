import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
    value: number;
    variant: "puntos" | "corazones";
};

export const ResultadoCard = ({ value, variant }: Props) => {
    const imageSrc = variant === "corazones" ? "/heart.svg" : "/points.svg";

    return (
        <div className={cn(
            "rounded-2xl border-2 w-full",
            variant === "puntos" && "bg-orange-400 border-orange-400",
            variant === "corazones" && "bg-rose-500 border-rose-500",
        )}>
            <div className={cn(
                "p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs",
                variant === "corazones" && "bg-rose-500",
                variant === "puntos" && "bg-orange-400"
            )}>
                {variant === "corazones" ? "Corazones Restantes" : "EXP Total"}
            </div>
            <div className={cn(
                "rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg",
                variant === "corazones" && "text-rose-500",
                variant === "puntos" && "text-orange-400"
            )}>
                <Image
                    alt="icono"
                    src={imageSrc}
                    height={30}
                    width={30}
                    className="mr-1.5"
                />
                {value}
            </div>
        </div>
    );
};