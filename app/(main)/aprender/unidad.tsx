import { lecciones, unidades } from "@/db/schema";
import { UnidadBanner } from "./unidad-banner";
import { LeccionButton } from "./leccion-button";

type Props = {
    id: number;
    order: number;
    title: string;
    descripcion: string;
    lecciones: (typeof lecciones.$inferSelect & {
        completado: boolean;
    })[];
    activeLeccion: typeof lecciones.$inferSelect & {
        unidad: typeof unidades.$inferSelect;
    } | undefined;
    activeLeccionPorcentaje: number;
};

export const Unidad = ({
    id,
    order,
    title,
    descripcion,
    lecciones,
    activeLeccion,
    activeLeccionPorcentaje,
}: Props) => {
    return (
        <>
            <UnidadBanner title={title} descripcion={descripcion} />
            <div className="flex items-center flex-col relative">
                {lecciones.map((leccion, index) => {
                    const esActual = leccion.id === activeLeccion?.id;
                    const estaBlockeada = !leccion.completado && !esActual;

                    return (
                        <LeccionButton
                            key={leccion.id}
                            id={leccion.id}
                            index={index}
                            totalCount={lecciones.length - 1}
                            current={esActual}
                            locked={estaBlockeada}
                            porcentaje={activeLeccionPorcentaje}
                        />
                    );
                })}
            </div>
        </>
    );
};