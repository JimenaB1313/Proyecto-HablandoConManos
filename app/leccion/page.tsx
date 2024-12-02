import { getLeccion, getProgresoUsuario } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "./quiz";

const LeccionPage = async () => {
    const leccionData = getLeccion();
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

export default LeccionPage;