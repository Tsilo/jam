import { create } from "zustand";

export const useUsersStore = create((set, get) => ({
  me: null,
  users: new Map(),

  sendToAllUsers: (message) => {
    const { users } = get();
    users.forEach((user) => {
      if (user.connection?.writable) {
        user.connection.write(JSON.stringify(message));
      }
    });
  },

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

  setMe: (me) =>
    set(() => ({
      me,
    })),

  updateUser: (publicKey, updates) =>
    set((state) => {
      const user = state.users.get(publicKey);
      if (!user) return state;

      const newUsers = new Map(state.users);
      newUsers.set(publicKey, {
        ...user,
        ...updates,
      });

      return { users: newUsers };
    }),
}));
