import Image from "next/image";
import Link from "next/link";
import {
    ClerkLoading,
    ClerkLoaded,
    UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

import { SidebarItem } from "./sidebar-item";

type Props = {
    className?: string;
};

export const Sidebar = ({ className }: Props) => {
    return (
        <div className={cn(
            "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
            className,
            )}>
            <Link href="/aprender">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="/logoverdeoscuro.png" height={40} width={40} alt="Logo"/>
                    <h1 className="text-2xl font-extrabold text-[#606c38] tracking-wide">
                        Hablando con Manos
                    </h1>
                </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem
                    label="Aprender"
                    iconSrc="/learn.svg"
                    href="/aprender"
                />
                <SidebarItem
                    label="Leaderboard"
                    iconSrc="/leaderboard.svg"
                    href="/leaderboard"
                />
                <SidebarItem
                    label="Misiones"
                    iconSrc="/quests.svg"
                    href="/misiones"
                />
            </div>
            <div className="p-4">
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton afterSignOutUrl="/"/>
                </ClerkLoaded>
            </div>
        </div>
    );
};