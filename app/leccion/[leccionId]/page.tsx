import { getLeccion, getProgresoUsuario } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "../quiz";

type Props = {
    params: {
        leccionId: number;
    };
};

const LeccionIdPage = async ({
    params,
}: Props) => {
    const leccionData = getLeccion(params.leccionId);
    const progresoUsuarioData = getProgresoUsuario();

    const [
        leccion,
        progresoUsuario,
    ] = await Promise.all([
        leccionData,
        progresoUsuarioData
    ]);

    if (!leccion || !progresoUsuario) {
        redirect("/aprender");
    }

    const InicialPorcentaje = leccion.ejercicios
        .filter((ejercicio) => ejercicio.completado)
        .length / leccion.ejercicios.length * 100;

    return (
        <Quiz
            inicialLeccionId={leccion.id}
            inicialLeccionEjercicios={leccion.ejercicios}
            inicialCorazones={progresoUsuario.corazones}
            inicialPorcentaje={InicialPorcentaje}
        />
    );
};

export default LeccionIdPage;