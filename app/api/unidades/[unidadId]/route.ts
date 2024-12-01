import { eq } from "drizzle-orm"
import { NextResponse } from "next/server";

import db from "@/db/drizzle"
import { unidades } from "@/db/schema"
import { getEsAdmin } from "@/lib/admin";

export const GET = async (
    req: Request,
    {params}: { params: { unidadId: number } },
) => {
    if (!getEsAdmin()) {
        return new NextResponse("Unautorizado", { status: 403 });
    }

    const data = await db.query.unidades.findFirst({
        where: eq(unidades.id, params.unidadId),
    });

    return NextResponse.json(data);
};

export const PUT = async (
    req: Request,
    {params}: { params: { unidadId: number } },
) => {
    if (!getEsAdmin()) {
        return new NextResponse("Unautorizado", { status: 403 });
    }

    const body = await req.json();
    const data = await db.update(unidades).set({
        ...body,
    }).where(eq(unidades.id, params.unidadId)).returning();

    return NextResponse.json(data[0]);
};

export const DELETE = async (
    req: Request,
    {params}: { params: { unidadId: number } },
) => {
    if (!getEsAdmin()) {
        return new NextResponse("Unautorizado", { status: 403 });
    }

    const data = await db.delete(unidades)
        .where(eq(unidades.id, params.unidadId)).returning();

    return NextResponse.json(data[0]);
};