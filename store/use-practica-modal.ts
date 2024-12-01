import { create } from "zustand";

type PracticaModalState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

export const usePracticaModal = create<PracticaModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));