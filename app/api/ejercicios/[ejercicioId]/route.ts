import { eq } from "drizzle-orm"
import { NextResponse } from "next/server";

import db from "@/db/drizzle"
import { ejercicios } from "@/db/schema"
import { getEsAdmin } from "@/lib/admin";

export const GET = async (
    req: Request,
    {params}: { params: { ejercicioId: number } },
) => {
    if (!getEsAdmin()) {
        return new NextResponse("Unautorizado", { status: 403 });
    }

    const data = await db.query.ejercicios.findFirst({
        where: eq(ejercicios.id, params.ejercicioId),
    });

    return NextResponse.json(data);
};

export const PUT = async (
    req: Request,
    {params}: { params: { ejercicioId: number } },
) => {
    if (!getEsAdmin()) {
        return new NextResponse("Unautorizado", { status: 403 });
    }

    const body = await req.json();
    const data = await db.update(ejercicios).set({
        ...body,
    }).where(eq(ejercicios.id, params.ejercicioId)).returning();

    return NextResponse.json(data[0]);
};

export const DELETE = async (
    req: Request,
    {params}: { params: { ejercicioId: number } },
) => {
    if (!getEsAdmin()) {
        return new NextResponse("Unautorizado", { status: 403 });
    }

    const data = await db.delete(ejercicios)
        .where(eq(ejercicios.id, params.ejercicioId)).returning();

    return NextResponse.json(data[0]);
};