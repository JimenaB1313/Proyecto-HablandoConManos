import { eq } from "drizzle-orm"
import { NextResponse } from "next/server";

import db from "@/db/drizzle"
import { lecciones } from "@/db/schema"
import { getEsAdmin } from "@/lib/admin";

export const GET = async (
    req: Request,
    {params}: { params: { leccionId: number } },
) => {
    if (!getEsAdmin()) {
        return new NextResponse("Unautorizado", { status: 403 });
    }

    const data = await db.query.lecciones.findFirst({
        where: eq(lecciones.id, params.leccionId),
    });

    return NextResponse.json(data);
};

export const PUT = async (
    req: Request,
    {params}: { params: { leccionId: number } },
) => {
    if (!getEsAdmin()) {
        return new NextResponse("Unautorizado", { status: 403 });
    }

    const body = await req.json();
    const data = await db.update(lecciones).set({
        ...body,
    }).where(eq(lecciones.id, params.leccionId)).returning();

    return NextResponse.json(data[0]);
};

export const DELETE = async (
    req: Request,
    {params}: { params: { leccionId: number } },
) => {
    if (!getEsAdmin()) {
        return new NextResponse("Unautorizado", { status: 403 });
    }

    const data = await db.delete(lecciones)
        .where(eq(lecciones.id, params.leccionId)).returning();

    return NextResponse.json(data[0]);
};