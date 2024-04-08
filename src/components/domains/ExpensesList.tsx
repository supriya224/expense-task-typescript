import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAddExpenseModal } from "@/hooks/useModel";
import { useExpense } from "@/hooks/useExpense";
import { DatePicker } from "@/components/ui/datePicker";
import React from "react";
import { Input } from "@/components/ui/input";
import TableRender from "./tableRender";
import { totalExpenses } from "@/utils/helper";

export function ExpensesList() {
  const expenseModelStore = useAddExpenseModal((state) => state);
  const expenseStore = useExpense();

  const [nameFilter, setNameFilter] = React.useState("");
  const [dateFilter, setDateFilter] = React.useState("");

  const handleNameFilterChange = (event: { target: { value: any } }) => {
    const name = event.target.value;
    setNameFilter(name);
    expenseStore.filterByName(name);
  };

  const handleDateFilterChange = (event: any) => {
    setDateFilter(event);
    expenseStore.filterByDate(event);
  };

  const clearFilters = () => {
    setNameFilter("");
    setDateFilter("");
    expenseStore.filterByName("");
    expenseStore.filterByDate(null);
  };

  const handleExpenseOpen = () => {
    if (!expenseModelStore.isOpen) {
      expenseModelStore.onOpen();
    }
  };
  console.log(
    "[expenseStore]",
    { store: expenseStore.expenses },
    { filter: expenseStore.filteredExpenses },
    nameFilter,
    dateFilter
  );

  return (
    <div>
      <section className="flex items-center justify-end gap-2 mb-4 mr-4">
        <DatePicker
          onChange={handleDateFilterChange}
          onBlur={() => {}}
          value={dateFilter}
          name={"dateFilter"}
          ref={() => {}}
        />

        <Input
          onChange={handleNameFilterChange}
          value={nameFilter}
          className="w-[200px]"
          placeholder="Search By name..."
        />

        <Button onClick={clearFilters} variant="destructive">
          Clear Filter
        </Button>
        <Button onClick={handleExpenseOpen}>
          <SquarePlus /> &nbsp; Add new Expense
        </Button>
      </section>
      <Table>
        <TableCaption>A list of your recent expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount (₹)</TableHead>
            <TableHead className="text-right">Expense Date</TableHead>

            <TableHead>Description</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenseStore?.filteredExpenses.length > 0
            ? expenseStore?.filteredExpenses?.map((expense) => (
                <TableRender expense={expense} />
              ))
            : expenseStore.expenses.map((expense) => (
                <TableRender expense={expense} />
              ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              {totalExpenses(
                expenseStore?.filteredExpenses.length > 0
                  ? expenseStore?.filteredExpenses
                  : expenseStore.expenses
              )}{" "}
              ₹
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
