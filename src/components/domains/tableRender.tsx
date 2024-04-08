import React from "react";
import { ExpenseFormType } from "./addUpdateExpenseModel";
import { TableCell, TableRow } from "../ui/table";
import { Pencil, Trash } from "lucide-react";
import { useExpense } from "@/hooks/useExpense";
import { useAddExpenseModal } from "@/hooks/useModel";
import DeleteModal from "./deleteModal";
import { Badge } from "@/components/ui/badge";

const TableRender = ({ expense }: { expense: ExpenseFormType }) => {
  const expenseStore = useExpense();
  const expenseModelStore = useAddExpenseModal((state) => state);

  const editExpense = () => {
    if (!expenseModelStore.isOpen) {
      expenseModelStore.onOpen();
      expenseStore.setDefaultExpense(expense?.id);
    }
  };

  return (
    <TableRow key={expense.id}>
      <TableCell className="font-medium">{expense.id}</TableCell>
      <TableCell className="font-medium">{expense.name}</TableCell>
      <TableCell>
        <Badge> {expense.category}</Badge>
      </TableCell>
      <TableCell className="text-right">{expense.amount}</TableCell>
      <TableCell>{expense.expenseDate.toLocaleDateString()}</TableCell>

      <TableCell>{expense.description}</TableCell>
      <TableCell className="text-right">
        <div className="flex gap-3">
          <Pencil
            size={20}
            color="blue"
            className="cursor-pointer"
            onClick={editExpense}
          />
          <DeleteModal />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TableRender;
