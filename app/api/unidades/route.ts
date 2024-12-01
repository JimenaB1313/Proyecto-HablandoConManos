import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { unidades } from "@/db/schema";
import { getEsAdmin } from "@/lib/admin";

export const GET = async () => {
    if (!getEsAdmin()) {
        return new NextResponse("Unautorizado", { status: 401 });
    }

    const data = await db.query.unidades.findMany();

    return NextResponse.json(data);
};

export const POST = async (req: Request) => {
    if (!getEsAdmin()) {
        return new NextResponse("Unautorizado", { status: 401 });
    }

    const body = await req.json();

    const data = await db.insert(unidades).values({
        ...body,
    }).returning();

    return NextResponse.json(data[0]);
};