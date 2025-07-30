import { create } from "zustand";

export const useMessagesStore = create((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({
      messages: [
        {
          ...message,
          id: Date.now(),
        },
        ...state.messages,
      ],
    })),
}));
