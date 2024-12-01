import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import {
    getCursoProgreso,
    getLeccionPorcentaje,
    getProgresoUsuario,
    getUnidades 
} from "@/db/queries";
import { redirect } from "next/navigation";

import { Header } from "./header";
import { Unidad } from "./unidad";
import { Misiones } from "@/components/misiones";

const AprenderPage = async () => {
    const progresoUsuarioData = getProgresoUsuario();
    const cursoProgresoData = getCursoProgreso();
    const leccionPorcentajeData = getLeccionPorcentaje();
    const unidadesData = getUnidades();

    const [
        progresoUsuario,
        unidades,
        cursoProgreso,
        leccionPorcentaje,
    ] = await Promise.all([
        progresoUsuarioData,
        unidadesData,
        cursoProgresoData,
        leccionPorcentajeData,
    ]);

    if (!progresoUsuario || !progresoUsuario.activeCurso) {
        redirect("/cursos");
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={progresoUsuario.activeCurso}
                    puntos={progresoUsuario.puntos}
                    corazones={progresoUsuario.corazones}
                />
                <Misiones puntos={progresoUsuario.puntos} />
            </StickyWrapper>
            <FeedWrapper>
                <Header title="Lengua de Señas Mexicana"/>
                {unidades.map((unidad) => (
                    <div key={unidad.id} className="mb-10">
                        <Unidad
                            id={unidad.id}
                            order={unidad.order}
                            descripcion={unidad.descripcion}
                            title={unidad.title}
                            lecciones={unidad.lecciones}
                            activeLeccion={cursoProgreso?.activeLeccion}
                            activeLeccionPorcentaje={leccionPorcentaje}
                        />
                    </div>
                ))}
            </FeedWrapper>
        </div>
    );
};

export default AprenderPage;