"use client";

import { FieldPath, FieldValues, useForm } from "react-hook-form";

import { FormField, FormItem, FormMessage } from "@/components/ui/form";

import { useFormStore } from "../../core/hooks/useFormStore";
import { useShallow } from "zustand/shallow";
import { cn } from "@/lib/utils";
import React from "react";
import { FileUploader } from "@/components/ui/file-uploader";

export interface TGenericOptions {
  id?: number;
  name?: string;
}

export interface IListColumn<T> {
  display: string;
  key: keyof T;
  cellTemplate?: (value: T) => string;
}

export interface IAbstractSelectProps<T> {
  label: string;
  src?: string;
  className?: string;
}

export const WFileUploader = <
  TInput extends TGenericOptions,
  TFieldValues extends FieldValues = any,
  TName extends FieldPath<TFieldValues> = any
>(
  props: {
    name: TName;
  } & IAbstractSelectProps<TInput>
) => {
  const { name, className, label } = props;

  const { form } = useFormStore(
    useShallow((state) => ({
      form: state.form,
    }))
  );

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const onChangeHandler = ({
          target,
        }: React.ChangeEvent<HTMLInputElement>) => {
          const file = target.files?.[0];
          field.onChange(file);
        };

        return (
          <FormItem className={cn(className)}>
            <FileUploader
              id={name}
              onChange={onChangeHandler}
              label={label}
              src={form.getValues(name)}
            />

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
