import { create } from "zustand";

export const usePianoStore = create((set, get) => ({
  pressedKey: null,

  setPressedKey: (pressedKey) =>
    set(() => ({
      pressedKey,
    })),
}));
