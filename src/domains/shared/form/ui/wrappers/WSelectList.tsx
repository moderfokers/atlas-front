"use client";

import { FieldPath, FieldValues, useForm } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useFormStore } from "../../core/hooks/useFormStore";
import { useShallow } from "zustand/shallow";
import { cn, isStringArray } from "@/lib/utils";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "@/components/ui/search";

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
  value?: T;
  className?: string;
  name: string;
  rows: T[];
  columns: IListColumn<T>[];
  placeholder: string;
  idKey?: keyof T;
}

export const WSelectList = <
  TInput extends TGenericOptions,
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
    rows: _rows,
    columns,
    className,
    placeholder,
    idKey = "id",
  } = props;

  const [selectedRow, setSelectedRow] = React.useState<TInput>({} as TInput);
  const [rows, setRows] = React.useState<TInput[]>(_rows);

  const { form } = useFormStore(
    useShallow((state) => ({
      form: state.form,
    }))
  );

  const onChangeSearch = (event) => {
    const { value } = event.target;
    if (!value) return setRows(_rows);

    const tips = String(value).split(" ");

    const filteredRows = _rows.filter((row) =>
      tips.every((tip) =>
        JSON.stringify(row)
          .toLocaleLowerCase()
          .includes(String(tip).toLocaleLowerCase())
      )
    );

    setRows(filteredRows);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const onChangeHandler = (row: TInput) => {
          setSelectedRow(row);
          field.onChange(row);
        };

        return (
          <FormItem className={cn(className)}>
            <div className="p-2 flex justify-between">
              <div>
                <FormLabel className="text-md">{label}</FormLabel>
                <p className="text-sm">
                  {placeholder || "Seleccione un valor|"}
                </p>
              </div>
              <div>
                <Search onChange={onChangeSearch} />
              </div>
            </div>

            <div className="h-[300px] overflow-y-scroll border-2">
              <Table>
                <TableHeader className="sticky top-0 bg-primary hover:[none]">
                  {/* <TableHead>xd</TableHead> */}
                  <TableHead className="w-1 p-0" />
                  {(columns || []).map(({ display, key }) => (
                    <TableHead
                      key={`col-${String(key)}`}
                      className="text-white font-semibold"
                    >
                      {display}
                    </TableHead>
                  ))}
                </TableHeader>
                <TableBody>
                  {(rows || []).map((row) => (
                    <TableRow
                      className={cn("cursor-pointer", {
                        "transition-colors bg-muted/50 ":
                          selectedRow[idKey] === row[idKey],
                      })}
                      key={row[idKey] as string}
                      onClick={() => onChangeHandler(row)}
                    >
                      <TableCell className="p-0">
                        {selectedRow[idKey] === row[idKey] && (
                          <span className="block w-1 h-12 bg-primary" />
                        )}
                      </TableCell>
                      {(columns || []).map(({ key, cellTemplate }) => (
                        <TableCell key={`row-${String(key)}`}>
                          {cellTemplate
                            ? cellTemplate(row)
                            : (row[key] as string)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
