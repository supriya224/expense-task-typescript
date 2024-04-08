"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ControllerRenderProps } from "react-hook-form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ExpenseFormType } from "./addUpdateExpenseModel";

const categories = [
  {
    value: "HEALTH",
    label: "Health",
  },
  {
    value: "ELECTRONICS",
    label: "Electronic",
  },
  {
    value: "TRAVEL",
    label: "Travel",
  },
  {
    value: "EDUCATION",
    label: "Education",
  },
  {
    value: "BOOKS",
    label: "Books",
  },
  {
    value: "OTHERS",
    label: "Others",
  },
];

export function ExpenseCategories({
  ...rest
}: ControllerRenderProps<ExpenseFormType>) {
  const [open, setOpen] = React.useState(false);
  //   const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {rest?.value
            ? categories?.find((category) => category?.value === rest?.value)
                ?.label
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search category..." />
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories?.map((category) => (
                <CommandItem
                  key={category?.value}
                  value={category?.value}
                  onSelect={(currentValue: string) => {
                    rest.onChange(
                      currentValue === rest?.value ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      rest?.value === category?.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {category?.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
