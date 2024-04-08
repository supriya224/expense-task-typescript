import { ExpensesList } from "@/components/domains/ExpensesList";
import React from "react";

const expenses = [
  {
    id: "INV001",
    name: "Paid",
    amount: 250.0,
    category: "Credit Card",
    description: "PayPal",
    expenseDate: new Date(),
  },
  {
    id: "INV002",
    name: "Pending",
    amount: 150.0,
    category: "PayPal",
    description: "PayPal",
    expenseDate: new Date(),
  },
];

const HomePage = () => {
  return (
    <>
      <ExpensesList />
    </>
  );
};

export default HomePage;
