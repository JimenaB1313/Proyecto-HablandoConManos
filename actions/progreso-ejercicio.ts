"use server";

import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { getProgresoUsuario } from "@/db/queries";
import { ejercicios, ejerciciosProgeso, progresoUsuario } from "@/db/schema";
import { error } from "console";
import { revalidatePath } from "next/cache";


export const upsertProgresoEjercicio = async (ejercicioId: number) => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unautorizado");
    }

    const progresoActualUsuario = await getProgresoUsuario();

    if (!progresoActualUsuario) {
        throw new Error("Progreso de usuario no encontrado");
    }

    const ejercicio = await db.query.ejercicios.findFirst({
        where: eq(ejercicios.id, ejercicioId)
    });

    if (!ejercicio) {
        throw new Error("Ejercicio no eonctrado");
    }

    const leccionId = ejercicio.leccionId;

    const progresoExistenteEjercicio = await db.query.ejerciciosProgeso.findFirst({
        where: and(
            eq(ejerciciosProgeso.usuarioId, userId),
            eq(ejerciciosProgeso.ejercicioId, ejercicioId),
        ),
    });

    const esPractica = !!progresoExistenteEjercicio;

    if (progresoActualUsuario.corazones === 0 && !esPractica) {
        return { error: "corazones" };
    }

    if (esPractica) {
        await db.update(ejerciciosProgeso).set({
            completado: true,
        })
        .where(
            eq(ejerciciosProgeso.id, progresoExistenteEjercicio.id)
        );

        await db.update(progresoUsuario).set({
            corazones: Math.min(progresoActualUsuario.corazones + 1, 5),
            puntos: progresoActualUsuario.puntos + 10,
        }).where(eq(progresoUsuario.usuarioId, userId));

        revalidatePath("/aprender");
        revalidatePath("/leccion");
        revalidatePath("/misiones");
        revalidatePath("/leaderboard");
        revalidatePath('/leccion/${leccionId}');
        return;
    }

    await db.insert(ejerciciosProgeso).values({
        ejercicioId,
        usuarioId:  userId,
        completado: true,
    });

    await db.update(progresoUsuario).set({
        puntos: progresoActualUsuario.puntos + 10,
    }).where(eq(progresoUsuario.usuarioId, userId));

    revalidatePath("/aprender");
    revalidatePath("/leccion");
    revalidatePath("/misiones");
    revalidatePath("/leaderboard");
    revalidatePath('/leccion/${leccionId}');
}