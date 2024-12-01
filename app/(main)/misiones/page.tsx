import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getProgresoUsuario } from "@/db/queries";
import { Progress } from "@/components/ui/progress";
import { misiones } from "@/constants";

const MisionesPage = async () => {
    const progresoUsuarioData = getProgresoUsuario();

    const [
        progresoUsuario,
    ] = await Promise.all([
        progresoUsuarioData,
    ]);

    if (!progresoUsuario || !progresoUsuario.activeCurso) {
        redirect("/cursos");
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={progresoUsuario.activeCurso}
                    corazones={progresoUsuario.corazones}
                    puntos={progresoUsuario.puntos}
                />
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image
                        src="/l2.png"
                        alt="Misiones"
                        height={90}
                        width={90}
                    />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Misiones
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Completa misiones al obtener puntos.
                    </p>
                    <ul className="w-full">
                        {misiones.map((mision) => {
                            const progreso = (progresoUsuario.puntos / mision.value) * 100;

                            return (
                                <div
                                    className="flex items-center w-full p-4 gap-x-4 border-t-2"
                                    key={mision.title}
                                >
                                    <Image
                                        src="/l2.png"
                                        alt="Puntos"
                                        width={60}
                                        height={60}
                                    />
                                    <div className="flex flex-col gap-y-2 w-full">
                                        <p className="text-neutral-700 text-xl font-bold">
                                            {mision.title}
                                        </p>
                                        <Progress value={progreso} className="h-3" />
                                    </div>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            </FeedWrapper>
        </div>
    );
};

export default MisionesPage;