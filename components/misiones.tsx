import Link from "next/link";
import Image from "next/image";

import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { misiones } from "@/constants";

type Props = {
    puntos: number;
};

export const Misiones = ({ puntos }: Props) => {
    return (
        <div className="border-2 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between w-full space-y-2">
                <h3 className="font-bold text-lg">
                    Misiones
                </h3>
                <Link href="/misiones">
                    <Button
                        size="sm"
                        variant="primaryOutline"
                    >
                        Ver todas
                    </Button>
                </Link>
            </div>
            <ul className="w-full space-y-4">
                {misiones.map((mision) => {
                    const progreso = (puntos / mision.value) * 100;

                    return (
                        <div
                            className="flex items-center w-full pb-4 gap-x-3"
                            key={mision.title}
                        >
                            <Image
                                src="/l2.png"
                                alt="Puntos"
                                width={40}
                                height={40}
                            />
                            <div className="flex flex-col gap-y-2 w-full">
                                <p className="text-neutral-700 text-sm font-bold">
                                    {mision.title}
                                </p>
                                <Progress value={progreso} className="h-2" />
                            </div>
                        </div>
                    )
                })}
            </ul>
        </div>
    );
};