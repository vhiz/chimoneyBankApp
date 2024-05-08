import { create } from "zustand";

const useUserStore = create((set) => ({
  currentUser: JSON.parse(localStorage.getItem("bankStore")) || null,
  setCurrentUser: (data) => {
    localStorage.setItem("bankStore", JSON.stringify(data));
    return set({ currentUser: data });
  },
  isLoading: true,
  userInfo: null,
  setUserInfo: (data) => {
    set((prev) => ({
      ...prev,
      userInfo: {
        ...data,
      },
      isLoading: false,
    }));
  },
}));

export default useUserStore;
