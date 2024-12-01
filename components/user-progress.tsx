import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { cursos } from "@/db/schema";

type Props = {
    activeCourse: typeof cursos.$inferSelect;
    puntos: number;
    corazones: number;
};

export const UserProgress = ({ activeCourse, puntos, corazones }: Props) => {
    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
            <Link href="/cursos">
                <Button variant="ghost">
                    <Image
                        src={activeCourse.imageSrc}
                        alt={activeCourse.title}
                        className="rounded-md border"
                        width={32}
                        height={32}
                    />
                </Button>
            </Link>
            <Button variant="ghost" className="text-orange-500">
                    <Image
                        src="/j1.png"
                        alt="Puntos"
                        width={28}
                        height={28}
                        className="mr-2"
                    />
                    {puntos}
            </Button>
            <Button variant="ghost" className="text-rose-500">
                    <Image
                        src="/l2.png"
                        alt="Corazones"
                        width={22}
                        height={22}
                        className="mr-2"
                    />
                    {corazones}
            </Button>
        </div>
    );
};