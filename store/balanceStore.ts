import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./mmkv-store";

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  title: string;
}

export interface BalanceStore {
  transations: Array<Transaction>;
  runTransaction: (transaction: Transaction) => void;
  balance: () => number;
  clearBalance: () => void;
}

export const useBalanceStore = create<BalanceStore>()(
  persist(
    (set, get) => ({
      transations: [],
      runTransaction: (transaction: Transaction) => {
        set((state) => ({ transations: [...state.transations, transaction] }));
      },
      balance: () => 0,
      clearBalance: () => {
        set({ transations: [] });
      },
    }),
    {
      name: "balance",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
