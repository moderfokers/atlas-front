"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format, formatISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FieldPath, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFormStore } from "../../core/hooks/useFormStore";
import { useShallow } from "zustand/shallow";
import { projectSchema } from "@/domains/projects/ui/wrappers/WProjectForm";
import { es } from "date-fns/locale";

interface IAbstractDateProps {
  label: string;
  placeholder?: string;
  className?: string;
}

export const WDate = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(
  props: {
    name: TName;
  } & IAbstractDateProps
) => {
  const { name, label, placeholder, className } = props;
  const { form } = useFormStore(
    useShallow((state) => ({
      form: state.form,
    }))
  );

  console.log(form);

  return (
    <FormField
      control={form.control || null}
      name={name}
      render={({ field }) => {
        const onChangeHandler = (day: Date | undefined, selectedDay: Date) => {
          field.onChange(day?.toISOString());
        };

        return (
          <FormItem className={cn("flex flex-col w-full", className)}>
            <FormLabel>{label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "pl-3 text-left font-normal w-full",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      // formatISO(field.value, { representation: "complete" })
                      format(field.value, "P", { locale: es })
                    ) : (
                      // format(field.value, "P", { locale: es })
                      <span>{placeholder || ""}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={new Date(field.value)}
                  onSelect={onChangeHandler}
                  // disabled={(date) =>
                  //   date > new Date() || date < new Date("1900-01-01")
                  // }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
