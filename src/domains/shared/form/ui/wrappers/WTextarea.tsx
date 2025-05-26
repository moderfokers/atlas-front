"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import React from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { useShallow } from "zustand/shallow";
import { useFormStore } from "../../core/hooks/useFormStore";
import { Textarea } from "@/components/ui/textarea";

interface IAbstractInputProps {
  label: string;
  placeholder?: string;
}

export const WTextarea = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(
  props: {
    name: TName;
  } & IAbstractInputProps
) => {
  const { name, label, placeholder } = props;

  const { form } = useFormStore(
    useShallow((state) => ({
      form: state.form,
    }))
  );

  return (
    <FormField
      control={form.control || null}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder || ""} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
