import { create } from "zustand";

export const useUsersStore = create((set) => ({
  users: new Map(),
  addUser: (publicKey, userData) =>
    set((state) => {
      const newUsers = new Map(state.users);
      newUsers.set(publicKey, userData);
      return { users: newUsers };
    }),
  removeUser: (publicKey) =>
    set((state) => {
      const newUsers = new Map(state.users);
      newUsers.delete(publicKey);
      return { users: newUsers };
    }),
}));
