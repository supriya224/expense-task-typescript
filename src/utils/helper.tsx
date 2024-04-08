import { ExpenseFormType } from "@/components/domains/addUpdateExpenseModel";

export const handleNumberFormValue = (inputValue: string | number) => {
  if (
    Number(inputValue) !== 0 ||
    (inputValue !== "" && Number(inputValue) === 0)
  ) {
    return +inputValue;
  }
  if (inputValue === "") {
    return NaN;
  }
  return NaN;
};

export const filterExpensesByDate = (
  expenseList: ExpenseFormType[],
  expenseDate: Date
): ExpenseFormType[] => {
  return expenseList.filter((expense) => {
    const expenseDateObj = new Date(expense.expenseDate);
    const filterDate = new Date(expenseDate);
    return expenseDateObj.toDateString() === filterDate.toDateString();
  });
};

export const filterExpensesByName = (
  expenseList: ExpenseFormType[],
  name: string
): ExpenseFormType[] => {
  return expenseList.filter((expense) => {
    return expense.name.toLowerCase().includes(name.toLowerCase());
  });
};

export const totalExpenses = (expenseList: ExpenseFormType[]): number => {
  return expenseList?.reduce((acc, current) => {
    return acc + current.amount;
  }, 0);
};
