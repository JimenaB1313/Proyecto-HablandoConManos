import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
    onCheck: () => void;
    status: "correcto" | "incorrecto" | "ninguno" | "completado";
    disabled?: boolean;
    leccionId?: number;
};

export const Footer = ({
    onCheck,
    status,
    disabled,
    leccionId,
}: Props) => {
    useKey("Enter", onCheck, {}, [onCheck]);
    const isMobile = useMedia("(max-width: 1024px)");

    return (
        <footer className={cn(
            "lg:-h[140px] h-[100px] border-t-2",
            status === "correcto" && "border-transparent bg-green-100",
            status === "incorrecto" && "border-transparent bg-rose-100",
        )}>
            <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
                {status === "correcto" && (
                    <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
                        <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
                        ¡Bien hecho!
                    </div>
                )}
                {status === "incorrecto" && (
                    <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
                        <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
                        Inténtalo de nuevo.
                    </div>
                )}
                {status === "completado" && (
                    <Button
                        variant="default"
                        size={isMobile ? "sm" : "lg"}
                        onClick={() => window.location.href = '/leccion/${leccionId}'}
                    >
                        Practica de nuevo.
                    </Button>
                )}
                <Button
                    disabled={disabled}
                    className="ml-auto"
                    onClick={onCheck}
                    size={isMobile ? "sm" : "lg"}
                    variant={status === "incorrecto" ? "danger" : "secondary"}
                >
                    {status === "ninguno" && "Revisar"}
                    {status === "correcto" && "Siguiente"}
                    {status === "incorrecto" && "Reintentar"}
                    {status === "completado" && "Continuar"}
                </Button>
            </div>
        </footer>
    );
};