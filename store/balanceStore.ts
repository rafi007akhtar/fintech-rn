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
  transactions: Array<Transaction>;
  runTransaction: (transaction: Transaction) => void;
  balance: () => number;
  clearBalance: () => void;
}

export const useBalanceStore = create<BalanceStore>()(
  persist(
    (set, get) => ({
      transactions: [] as Array<Transaction>,
      runTransaction: (transaction: Transaction) => {
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        }));
      },
      balance: () => get().transactions.reduce((acc, t) => acc + t.amount, 0),
      clearBalance: () => {
        set({ transactions: [] });
      },
    }),
    {
      name: "balance",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
