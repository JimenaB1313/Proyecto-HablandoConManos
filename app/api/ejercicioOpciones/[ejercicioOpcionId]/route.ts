import { eq } from "drizzle-orm"
import { NextResponse } from "next/server";

import db from "@/db/drizzle"
import { ejercicioOpciones } from "@/db/schema"
import { getEsAdmin } from "@/lib/admin";

export const GET = async (
    req: Request,
    {params}: { params: { ejercicioOpcionId: number } },
) => {
    if (!getEsAdmin()) {
        return new NextResponse("Unautorizado", { status: 403 });
    }

    const data = await db.query.ejercicioOpciones.findFirst({
        where: eq(ejercicioOpciones.id, params.ejercicioOpcionId),
    });

    return NextResponse.json(data);
};

export const PUT = async (
    req: Request,
    {params}: { params: { ejercicioOpcionId: number } },
) => {
    if (!getEsAdmin()) {
        return new NextResponse("Unautorizado", { status: 403 });
    }

    const body = await req.json();
    const data = await db.update(ejercicioOpciones).set({
        ...body,
    }).where(eq(ejercicioOpciones.id, params.ejercicioOpcionId)).returning();

    return NextResponse.json(data[0]);
};

export const DELETE = async (
    req: Request,
    {params}: { params: { ejercicioOpcionId: number } },
) => {
    if (!getEsAdmin()) {
        return new NextResponse("Unautorizado", { status: 403 });
    }

    const data = await db.delete(ejercicioOpciones)
        .where(eq(ejercicioOpciones.id, params.ejercicioOpcionId)).returning();

    return NextResponse.json(data[0]);
};