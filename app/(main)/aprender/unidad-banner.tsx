import { Button } from "@/components/ui/button";
import { NotebookText } from "lucide-react";
import Link from "next/link";

type Props = {
    title: string;
    descripcion: string;
};

export const UnidadBanner = ({
    title,
    descripcion,
}: Props) => {
    return (
        <div className="w-full rounded-xl bg-[#78a643] p-5 text-white flex items-center justify-between">
            <div className="space-y-2.5">
                <h3 className="text-2xl font-bold">
                    {title}
                </h3>
                <p className="text-lg">
                    {descripcion}
                </p>
            </div>
            <Link href="/leccion">
                <Button
                    size="lg"
                    variant="secondary"
                    className="hidden xl:flex border-2 border-b-4 active:border-b-2"
                >
                    <NotebookText className="mr-2" />
                    Continuar
                </Button>
            </Link>
        </div>
    );
};