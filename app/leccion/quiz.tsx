"use client";

import { toast } from "sonner";
import Image from "next/image";
import { useState, useTransition } from "react";
import Confetti from "react-confetti";

import { Header } from "./header";
import { Footer } from "./footer";
import { Ejercicio } from "./ejercicio";
import { useRouter } from "next/navigation";
import { QuestionBubble } from "./question-bubble";
import { useWindowSize, useMount } from "react-use";

import { ResultadoCard } from "./resultado-card";
import { ejercicios, ejercicioOpciones } from "@/db/schema";
import { reducirCorazones } from "@/actions/progreso-usuario";
import { usePracticaModal } from "@/store/use-practica-modal";
import { useCorazonesModal } from "@/store/use-corazones-modal";
import { upsertProgresoEjercicio } from "@/actions/progreso-ejercicio";

type Props = {
    inicialLeccionId: number;
    inicialCorazones: number;
    inicialPorcentaje: number;
    inicialLeccionEjercicios: (typeof ejercicios.$inferSelect & {
        completado: boolean;
        ejercicioOpciones: typeof ejercicioOpciones.$inferSelect[];
    })[];
};

export const Quiz = ({
    inicialLeccionId,
    inicialCorazones,
    inicialPorcentaje,
    inicialLeccionEjercicios,
}: Props) => {
    const { open: openCorazonesModal } = useCorazonesModal();
    const { open: openPracticaModal } = usePracticaModal();

    useMount(() => {
        if (inicialPorcentaje === 100) {
            openPracticaModal();
        }
    });

    const { width, height } = useWindowSize();

    const router = useRouter();

    const [pendiente, startTransition] = useTransition();

    const [leccionId] = useState(inicialLeccionId);
    const [corazones, setCorazones] = useState(inicialCorazones);
    const [porcentaje, setPorcentaje] = useState(() => {
        return inicialPorcentaje === 100 ? 0 : inicialPorcentaje;
    });
    const [ejercicios] = useState(inicialLeccionEjercicios);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = ejercicios.findIndex((ejercicio) => !ejercicio.completado);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<"correcto" | "incorrecto" | "ninguno">("ninguno");

    const ejercicio = ejercicios[activeIndex];
    const opciones = ejercicio?.ejercicioOpciones ?? [];

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    };

    const onSelect = (id: number) => {
        if (status !== "ninguno") return;

        setSelectedOption(id);
    };

    const onContinue = () => {
        if (!selectedOption) return;

        if (status === "incorrecto") {
            setStatus("ninguno");
            setSelectedOption(undefined);
            return;
        }

        if (status === "correcto") {
            onNext();
            setStatus("ninguno");
            setSelectedOption(undefined);
            return;
        }

        const opcionCorrecta = opciones.find((opcion) => opcion.correcto);

        if (!opcionCorrecta) {
            return;
        }

        if (opcionCorrecta.id === selectedOption) {
            startTransition(() => {
                upsertProgresoEjercicio(ejercicio.id)
                    .then((response) => {
                        if (response?.error === "corazones") {
                            openCorazonesModal();
                            return;
                        }

                        setStatus("correcto");
                        setPorcentaje((prev) => prev + 100 / ejercicios.length);

                        //Esta es una practica
                        if (inicialPorcentaje === 100) {
                            setCorazones((prev) => Math.min(prev + 1, 5));
                        }
                    })
                    .catch(() => toast.error("Algo salió mal, por favor inténtalo de nuevo."))
            });
        } else {
            startTransition(() => {
                reducirCorazones(ejercicio.id)
                    .then((response) => {
                        if (response?.error === "corazones") {
                            openCorazonesModal();
                            return;
                        }

                        setStatus("incorrecto");

                        if (!response?.error) {
                            setCorazones((prev) => Math.max(prev - 1, 0));
                        }
                    })
                    .catch(() => toast.error("Algo salió mal, por favor inténtalo de nuevo"))
            });
        }
    };

    if (!ejercicio) {
        return (
            <>
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={500}
                    tweenDuration={10000}
                />
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
                    <Image
                        src="/logoFBverdeoscuro.png"
                        alt="Logo"
                        className="hidden lg:block"
                        height={100}
                        width={100}
                    />
                    <Image
                        src="/logoFBverdeoscuro.png"
                        alt="Logo"
                        className="block lg:hidden"
                        height={50}
                        width={50}
                    />
                    <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                        ¡Buen trabajo! <br /> Haz completado la lección.
                    </h1>
                    <div className="flex items-center gap-x-4 w-full">
                        <ResultadoCard
                            variant="puntos"
                            value={ejercicios.length * 10}
                        />
                        <ResultadoCard
                            variant="corazones"
                            value={corazones}
                        />
                    </div>
                </div>
                <Footer
                    leccionId={leccionId}
                    status="completado"
                    onCheck={() => router.push("/aprender")}
                />
            </>
        );
    }

    const title = ejercicio.tipo === "ASSIST"
    ? "Selecciona el significado correcto"
    : ejercicio.pregunta;

    return (
        <>
            <Header
            corazones={corazones}
            porcentaje={porcentaje}
            />
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            {title}
                        </h1>
                        <div>
                            {ejercicio.tipo === "ASSIST" && (
                                <QuestionBubble pregunta={ejercicio.pregunta} />
                            )}
                            <Ejercicio
                                opciones={opciones}
                                onSelect={onSelect}
                                status={status}
                                selectedOption={selectedOption}
                                disabled={pendiente}
                                tipo={ejercicio.tipo}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer
                disabled={pendiente || !selectedOption}
                status={status}
                onCheck={onContinue}
            />
        </>
    );
};