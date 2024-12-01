"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { cursos, progresoUsuario } from "@/db/schema";
import { upsertProgresoUsuario } from "@/actions/progreso-usuario";

import { Card } from "./card";

type Props = {
    cursos: typeof cursos.$inferSelect[];
    activeCursoId?: typeof progresoUsuario.$inferSelect.activeCursoId;
};

export const List = ({ cursos, activeCursoId }: Props) => {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const onClick = (id: number) => {
        if (pending) return;

        if (id === activeCursoId) {
            return router.push("/aprender");
        }

        startTransition(() => {
            upsertProgresoUsuario(id)
            .catch(() => toast.error("Algo salió mal."))
        });
    };

    return (
        <div className="pt-6 gap-4">
            {cursos.map((curso) => (
                <Card
                    key={curso.id}
                    id={curso.id}
                    title={curso.title}
                    imageSrc={curso.imageSrc}
                    onClick={onClick}
                    disabled={pending}
                    active={curso.id === activeCursoId}
                />
            ))}
        </div>
    );
};