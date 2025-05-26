"use client";
import React from "react";

import { FieldValues, FormProvider } from "react-hook-form";
import { useShallow } from "zustand/shallow";
import { useFormStore } from "../../core/hooks/useFormStore";
import { DevFormConsole } from "../components/DevFormConsole";

interface IAbstractFormProps<TValues extends FieldValues> {
  children: React.ReactNode;
  onSubmit: (values: TValues, event?: any) => void;
}

export const WForm = <TValues extends FieldValues>(
  props: IAbstractFormProps<TValues>
) => {
  const { children, onSubmit } = props;
  const { form } = useFormStore(
    useShallow((state) => ({
      form: state.form,
    }))
  );

  const onSubmitHandler = async (values: TValues, ...args) => {
    console.log(args);
    onSubmit(values);
  };

  if (!form) return;

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)}>{children}</form>
      <DevFormConsole form={form} />
    </FormProvider>
  );
};
