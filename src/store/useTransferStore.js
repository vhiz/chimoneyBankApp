import { create } from "zustand";

const useTransferStore = create((set) => ({
  details: null,
  setDetails: (data) => {
    return set({ details: data });
  },
}));

export default useTransferStore;
