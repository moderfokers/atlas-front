"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface IGenericOption {
  id?: number | string;
  name?: string;
}

export interface IFilterSelectProps<T extends IGenericOption> {
  options: T[];
  label: string;
  valueKey?: keyof T;
  onChange: (value?: T) => void;
  className?: string;
  value?: string | number;
}

export const FilterSelect = <T extends IGenericOption>({
  options,
  label,
  valueKey = "name",
  onChange,
  className,
  value,
}: IFilterSelectProps<T>) => {
  const onChangeHandler = (value: string) => {
    const obj = options.find((option) => String(option.id) === String(value));
    onChange(obj);
  };

  return (
    <div className={cn("w-full", className)}>
      <Label>{label}</Label>
      <Select onValueChange={onChangeHandler} value={String(value)}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.id} value={String(option.id)}>
              {option[valueKey] as string}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
