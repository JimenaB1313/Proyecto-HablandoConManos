import { getCursos, getProgresoUsuario } from "@/db/queries";

import { List } from "./list";

const CursosPage = async () => {
    const cursosData = getCursos();
    const progresoUsuarioData = getProgresoUsuario();

    const [
        cursos,
        progresoUsuario,
    ] = await Promise.all([
        cursosData,
        progresoUsuarioData,
    ]);

    return (
        <div className="h-full max-w-[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700 text-center">
                Lengua De Señas Mexicana
            </h1>
            <List
                cursos={cursos}
                activeCursoId={progresoUsuario?.activeCursoId}
            />
        </div>
    );
};

export default CursosPage;