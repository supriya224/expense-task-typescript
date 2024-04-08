import { ExpenseFormType } from "@/components/domains/addUpdateExpenseModel";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

type Store = {
  expenses: ExpenseFormType[];
  addExpense: (payload: ExpenseFormType) => void;
  removeExpense: (id: string) => void;
  filterByName: (name: string) => void;
  filterByDate: (date: Date | null) => void;
  editExpense: (expense: ExpenseFormType) => void;
  filteredExpenses: ExpenseFormType[] | [];
  defaultExpense: ExpenseFormType;
  setDefaultExpense: (id?: string) => void;
  deleteExpense: (id?: string) => void;

  clearDefaultExpense: () => void;
};

const emptyExpenseObject: ExpenseFormType = {
  name: "",
  description: "",
  amount: NaN,
  expenseDate: new Date(),
  category: "",
  id: "",
};

export const useExpense = create<Store>()((set) => ({
  expenses: [],
  addExpense: (payload: ExpenseFormType) => {
    set((state) => ({
      expenses: [
        ...state.expenses,
        {
          id: uuidv4(),
          ...payload,
        } as ExpenseFormType,
      ],
    }));
  },
  editExpense: (payload: ExpenseFormType) => {
    set((state) => ({
      expenses: updateExpense(state.expenses, payload),
      filteredExpenses: updateExpense(state.expenses, payload),
    }));
  },

  removeExpense: (id: any) => {
    set((state) => ({
      expenses: state.expenses.filter((expense) => expense?.id !== id),
    }));
  },

  filteredExpenses: [],
  filterByName: (name) =>
    set((state) => ({
      filteredExpenses: state.expenses.filter((expense) =>
        expense.name.toLowerCase().includes(name.toLowerCase())
      ),
    })),
  filterByDate: (date) =>
    set((state) => ({
      filteredExpenses: state.expenses.filter(
        (expense) =>
          !date ||
          new Date(expense.expenseDate).toDateString() ===
            new Date(date).toDateString()
      ),
    })),
  defaultExpense: {
    name: "",
    description: "",
    amount: NaN,
    expenseDate: new Date(),
    category: "",
  },
  setDefaultExpense: (id?: string) => {
    set((state) => ({
      defaultExpense: state.expenses?.find((expense) => expense?.id === id),
    }));
  },
  clearDefaultExpense: () => {
    set((state) => ({
      defaultExpense: {
        name: "",
        description: "",
        amount: NaN,
        expenseDate: new Date(),
        category: "",
      },
    }));
  },
  deleteExpense: (id?: string) => {
    set((state) => ({
      expenses: state.expenses?.filter((expense) => expense?.id === id),
    }));
  },
}));

function updateExpense(
  current: ExpenseFormType[],
  expense: ExpenseFormType
): ExpenseFormType[] {
  const currentIndex = current.findIndex(
    (current) => current?.id === expense?.id
  );

  if (currentIndex !== -1) {
    const clonedList = [...current];
    clonedList[currentIndex] = expense;
    return clonedList;
  }
  return current;
}
