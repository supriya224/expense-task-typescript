import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useMemo, useState } from "react";

import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useAddExpenseModal } from "@/hooks/useModel";
import Spacer from "@/components/atoms/spacer";
import { Textarea } from "@/components/ui/textarea";
import { ExpenseCategories } from "./expenseCategroy";
import { DatePicker } from "@/components/ui/datePicker";
import { handleNumberFormValue } from "@/utils/helper";
import { useExpense } from "@/hooks/useExpense";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).max(140),
  amount: z
    .union([z.number().min(0), z.nan()])
    .refine((data) => !Number.isNaN(data), {
      message: "Please enter amount",
    })
    .refine((data) => data !== null, {
      message: "Please enter amount",
    }),
  category: z.string(),
  expenseDate: z.date(),
  id: z.string().optional(),
});

export type ExpenseFormType = z.infer<typeof formSchema>;

export const EmployeeRegisterModal = () => {
  const storeModal = useAddExpenseModal();

  const expenseStore = useExpense();

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(
      () => expenseStore?.defaultExpense,
      [expenseStore?.defaultExpense]
    ),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // update the expense
    if (values?.id) {
      expenseStore.editExpense(values);
    } else {
      // adding expense into store
      expenseStore.addExpense(values);
    }
    // close the add expense modal
    storeModal.onClose();
    expenseStore?.clearDefaultExpense();
    // show toaster
    toast({
      title: `🚀🚀 Successfully ${
        values?.id ? "Updated" : "added"
      }  expense 🚀🚀`,
    });
    form.reset();
  };
  React.useEffect(() => {
    form.reset(expenseStore?.defaultExpense);
  }, [form.reset, expenseStore?.defaultExpense]);

  return (
    <Modal
      title="Expense"
      description="Add / Update expense here"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Enter the expense name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Spacer size={16} />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field: { onChange, ...rest } }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={loading}
                          placeholder="Enter the expense amount"
                          onChange={(event) =>
                            onChange(handleNumberFormValue(event.target.value))
                          }
                          {...rest}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Spacer size={16} />

                <div className="flex gap-10 w-full ">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <ExpenseCategories {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="expenseDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expense Date</FormLabel>
                        <FormControl>
                          <DatePicker {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Spacer size={16} />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expense Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about expense"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button
                    disabled={loading}
                    variant="outline"
                    onClick={storeModal.onClose}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">
                    {expenseStore?.defaultExpense?.id ? "Update" : "Add"}
                    &nbsp; 🚀
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};
