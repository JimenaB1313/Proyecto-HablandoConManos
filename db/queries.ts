import { cache } from "react";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import db from "./drizzle";
import {
    cursos,
    ejercicios,
    ejerciciosProgeso,
    lecciones,
    progresoUsuario,
    unidades
} from "./schema";

export const getProgresoUsuario = cache(async () => {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const data = await db.query.progresoUsuario.findFirst({
        where: eq(progresoUsuario.usuarioId, userId),
        with: {
            activeCurso: true,
        },
    });

    return data;
});

export const getUnidades = cache(async () => {
    const { userId } = await auth();
    const progresoUsuario = await getProgresoUsuario();

    if (!userId || !progresoUsuario?.activeCursoId) {
        return [];
    }

    const data = await db.query.unidades.findMany({
        orderBy: (unidades, { asc }) => [asc(unidades.order)],
        where: eq(unidades.cursoId, progresoUsuario.activeCursoId),
        with: {
            lecciones: {
                orderBy: (lecciones, { asc }) => [asc(lecciones.order)],
                with: {
                    ejercicios: {
                        with: {
                            ejerciciosProgeso: {
                                where: eq(
                                    ejerciciosProgeso.usuarioId,
                                    userId,
                                ),
                            },
                        },
                    },
                },
            },
        },
    });

    const normalizedData = data.map((unidad) => {
        const leccionesConEstadoCompletado = unidad.lecciones.map((leccion) => {
            if (
                leccion.ejercicios.length === 0
            ) {
                return { ...leccion, completado: false };
            }

            const todosEjerciciosCompletados = leccion.ejercicios.every((ejercicio) => {
                return ejercicio.ejerciciosProgeso
                    && ejercicio.ejerciciosProgeso.length > 0
                    && ejercicio.ejerciciosProgeso.every((progreso) => progreso.completado);
            });

            return { ...leccion, completado: todosEjerciciosCompletados };
        });

        return { ...unidad, lecciones: leccionesConEstadoCompletado };
    });

    return normalizedData;
});

export const getCursos = cache(async () => {
    const data = await db.query.cursos.findMany();

    return data;
});

export const getCursoPorId = cache(async (cursoId: number) => {
    const data = await db.query.cursos.findFirst({
        where: eq(cursos.id, cursoId),
        with: {
            unidades: {
                orderBy: (unidades, { asc }) => [asc(unidades.order)],
                with: {
                    lecciones: {
                        orderBy: (lecciones, {asc}) => [asc(lecciones.order)],
                    },
                },
            },
        },
    });

    return data;
});

export const getCursoProgreso = cache(async () => {
    const { userId } = await auth();
    const progresoUsuario = await getProgresoUsuario();

    if (!userId || !progresoUsuario?.activeCursoId) {
        return null;
    }

    const unidadesEnCursoActivo = await db.query.unidades.findMany({
        orderBy: (unidades, { asc }) => [asc(unidades.order)],
        where: eq(unidades.cursoId, progresoUsuario.activeCursoId),
        with: {
            lecciones: {
                orderBy: (lecciones, { asc }) => [asc(lecciones.order)],
                with: {
                    unidad: true,
                    ejercicios: {
                        with: {
                            ejerciciosProgeso : {
                                where: eq(ejerciciosProgeso.usuarioId, userId),
                            },
                        },
                    },
                },
            },
        },
    });

    const primerLeccionSinCompletar = unidadesEnCursoActivo
    .flatMap((unidad) => unidad.lecciones)
    .find((leccion) => {
        return leccion.ejercicios.some((ejercicio) => {
            return !ejercicio.ejerciciosProgeso || ejercicio.ejerciciosProgeso.length === 0 || ejercicio.ejerciciosProgeso.some((progreso) => progreso.completado === false)
        });
    });

    return {
        activeLeccion: primerLeccionSinCompletar,
        activeLeccionId: primerLeccionSinCompletar?.id,
    };
});

export const getLeccion = cache(async (id?: number) => {
    const { userId } = await auth();

    if(!userId) {
        return null;
    }

    const cursoProgreso = await getCursoProgreso();

    const leccionId = id || cursoProgreso?.activeLeccionId;

    if (!leccionId) {
        return null;
    }

    const data = await db.query.lecciones.findFirst({
        where: eq(lecciones.id, leccionId),
        with: {
            ejercicios: {
                with: {
                    ejercicioOpciones: true,
                    ejerciciosProgeso: {
                        where: eq(ejerciciosProgeso.usuarioId, userId),
                    },
                },
            },
        },
    });

    if (!data || !data.ejercicios) {
        return null;
    }

    const normalizedEjercicios = data.ejercicios.map((ejercicio) => {
        const completado = ejercicio.ejerciciosProgeso
            && ejercicio.ejerciciosProgeso.length > 0
            && ejercicio.ejerciciosProgeso.every((progreso) => progreso.completado)

        return { ...ejercicio, completado };
    });

    return { ...data, ejercicios: normalizedEjercicios }
});

export const getLeccionPorcentaje = cache(async () => {
    const cursoProgreso = await getCursoProgreso();

    if (!cursoProgreso?.activeLeccionId) {
        return 0;
    }

    const leccion = await getLeccion(cursoProgreso.activeLeccionId);

    if (!leccion) {
        return 0;
    }

    const ejerciciosCompletados = leccion.ejercicios
        .filter((ejercicio) => ejercicio.completado);
    const porcentaje = Math.round(
        (ejerciciosCompletados.length / leccion.ejercicios.length) * 100,
    );

    return porcentaje;
});

export const getTopDiezUsuarios = cache(async () => {
    const { userId } = await auth();

    if (!userId) {
        return [];
    }

    const data = await db.query.progresoUsuario.findMany({
        orderBy: (progresoUsuario, { desc }) => [desc(progresoUsuario.puntos)],
        limit: 10,
        columns: {
            usuarioId: true,
            nombreUsuario: true,
            userImageSrc: true,
            puntos: true
        },
    });

    return data;
});