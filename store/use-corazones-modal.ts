import { create } from "zustand";

type CorazonesModalState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

export const useCorazonesModal = create<CorazonesModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));