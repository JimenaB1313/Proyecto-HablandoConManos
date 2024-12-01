import { eq } from "drizzle-orm"
import { NextResponse } from "next/server";

import db from "@/db/drizzle"
import { cursos } from "@/db/schema"
import { getEsAdmin } from "@/lib/admin";

export const GET = async (
    req: Request,
    {params}: { params: { cursoId: number } },
) => {
    if (!getEsAdmin()) {
        return new NextResponse("Unautorizado", { status: 403 });
    }

    const data = await db.query.cursos.findFirst({
        where: eq(cursos.id, params.cursoId),
    });

    return NextResponse.json(data);
};

export const PUT = async (
    req: Request,
    {params}: { params: { cursoId: number } },
) => {
    if (!getEsAdmin()) {
        return new NextResponse("Unautorizado", { status: 403 });
    }

    const body = await req.json();
    const data = await db.update(cursos).set({
        ...body,
    }).where(eq(cursos.id, params.cursoId)).returning();

    return NextResponse.json(data[0]);
};

export const DELETE = async (
    req: Request,
    {params}: { params: { cursoId: number } },
) => {
    if (!getEsAdmin()) {
        return new NextResponse("Unautorizado", { status: 403 });
    }

    const data = await db.delete(cursos)
        .where(eq(cursos.id, params.cursoId)).returning();

    return NextResponse.json(data[0]);
};