"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker<T extends FieldValues>({
  ...props
}: ControllerRenderProps<T>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !props?.value && "text-muted-foreground"
          )}
        >
          {props?.value ? (
            format(props?.value, "PPP")
          ) : (
            <span>Select date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={props?.value}
          onSelect={props?.onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
