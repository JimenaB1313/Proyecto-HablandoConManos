"use server";

import db from "@/db/drizzle";
import { getCursoPorId, getProgresoUsuario } from "@/db/queries";
import { ejercicios, ejerciciosProgeso, progresoUsuario } from "@/db/schema";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";

export const upsertProgresoUsuario = async (cursoId: number) => {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        throw new Error("No autorizado");
    }

    const curso = await getCursoPorId(cursoId);

    if (!curso) {
        throw new Error("Curso no encontrado");
    }

    if (!curso.unidades.length || !curso.unidades[0].lecciones.length) {
        throw new Error("Curso está vacío");
    }

    const progresoUsuarioExistente = await getProgresoUsuario();

    if (progresoUsuarioExistente) {
        await db.update(progresoUsuario).set({
            activeCursoId: cursoId,
        });

        revalidatePath("/cursos");
        revalidatePath("/aprender");
        redirect("/aprender");
    }

    await db.insert(progresoUsuario).values({
        usuarioId: userId,
        activeCursoId: cursoId,
    });

    revalidatePath("/cursos");
    revalidatePath("/aprender");
    redirect("/aprender");
};

export const reducirCorazones = async (ejercicioId: number) => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unautorizado");
    }

    const progresoActualUsuario = await getProgresoUsuario();

    const ejercicio = await db.query.ejercicios.findFirst({
        where: eq(ejercicios.id, ejercicioId),
    });

    if (!ejercicio) {
        throw new Error("Ejercicio no encontrado");
    }

    const leccionId = ejercicio.leccionId;

    const progresoExistenteEjercicio = await db.query.ejerciciosProgeso.findFirst({
        where: and(
            eq(ejerciciosProgeso.usuarioId, userId),
            eq(ejerciciosProgeso.ejercicioId, ejercicioId),
        ),
    });

    const esPractica = !!progresoExistenteEjercicio;

    if (esPractica) {
        return { error: "practica" };
    }

    if (!progresoActualUsuario) {
        throw new Error("Progreso de usuario no encontrado");
    }

    if (progresoActualUsuario.corazones === 0) {
        return { error: "corazones" };
    }

    await db.update(progresoUsuario).set({
        corazones: Math.max(progresoActualUsuario.corazones - 1, 0),
    }).where(eq(progresoUsuario.usuarioId, userId));

    revalidatePath("/aprender");
    revalidatePath("/misiones");
    revalidatePath("/leaderboard");
    revalidatePath('/leccion/${leccionId}');
};