import { ejercicioOpciones, ejercicios } from "@/db/schema"
import { cn } from "@/lib/utils";
import { Card } from "./card";

type Props = {
    opciones: typeof ejercicioOpciones.$inferSelect[];
    onSelect: (id: number) => void;
    status: "correcto" | "incorrecto" | "ninguno";
    selectedOption?: number;
    disabled?: boolean;
    tipo: typeof ejercicios.$inferSelect["tipo"];
};

export const Ejercicio = ({
    opciones,
    onSelect,
    status,
    selectedOption,
    disabled,
    tipo,
}: Props) => {
    return (
        <div className={cn(
            "grid gap-2",
            tipo === "ASSIST" && "grid-cols-1",
            tipo === "SELECT" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
        )}>
            {opciones.map((opcion, i) => (
                <Card
                    key={opcion.id}
                    id={opcion.id}
                    text={opcion.text}
                    imageSrc={opcion.imageSrc}
                    shortcut={'${i + 1}'}
                    selected={selectedOption === opcion.id}
                    onClick={() => onSelect(opcion.id)}
                    status={status}
                    disabled={disabled}
                    tipo={tipo}
                />
            ))}
        </div>
    );
};