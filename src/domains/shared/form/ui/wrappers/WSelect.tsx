"use client";

import { FieldPath, FieldValues, useForm } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormStore } from "../../core/hooks/useFormStore";
import { useShallow } from "zustand/shallow";
import { cn, isStringArray } from "@/lib/utils";
import React from "react";
import { useTransformOptions } from "../../core/hooks/useTransformOptions";

export interface TGenericOptions {
  id?: number;
  name?: string;
}

export interface IAbstractSelectProps<T> {
  label: string;
  placeholder: string;
  options: T[];
  value?: T;
  className?: string;
  name: string;
  disabled?: boolean;
  keyValue?: keyof T;
}

export const WSelect = <
  TInput extends TGenericOptions | string,
  TFieldValues extends FieldValues = any,
  TName extends FieldPath<TFieldValues> = any
>(
  props: {
    name: TName;
  } & IAbstractSelectProps<TInput>
) => {
  const {
    name,
    label,
    options: _options,
    className,
    disabled,
    keyValue = "name",
  } = props;

  const isPlainOptions = isStringArray(_options);

  const { form } = useFormStore(
    useShallow((state) => ({
      form: state.form,
    }))
  );
  const options = useTransformOptions(props, form);

  return (
    <FormField
      disabled={disabled}
      control={form.control}
      name={name}
      render={({ field }) => {
        const onChangeHandler = (value: string) => {
          if (isPlainOptions) {
            field.onChange(value);
          } else {
            field.onChange(
              (options as TGenericOptions[]).find(({ id }) => `${id}` === value)
            );
          }
        };

        return (
          <FormItem className={cn(className)}>
            <FormLabel>{label}</FormLabel>
            <Select
              disabled={disabled}
              onValueChange={onChangeHandler}
              // defaultValue={valueSetter}
              // value={valueSetter}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      Object.keys(field?.value || {}).length
                        ? field?.value[keyValue]
                        : "Seleccione un valor"
                    }
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {(options || []).map((option) => {
                  if (typeof option === "string") {
                    return (
                      <SelectItem key={option} value={`${option}`}>
                        {option}
                      </SelectItem>
                    );
                  }

                  return (
                    <SelectItem key={option.id} value={`${option.id}`}>
                      {option[keyValue]}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
