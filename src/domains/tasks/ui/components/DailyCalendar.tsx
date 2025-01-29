import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { dailyControlSchema, IDailyControl } from "../wrappers/WDailyForm";
import { areDatesEqual, buildHumanDate } from "@/lib/utils";

export interface IDailyCalendarSelectorProps {
  historyDailyControl: IDailyControl[];
  onSelect: (date: Date) => void;
}

export const DailyCalendarSelector = ({
  historyDailyControl = [],
  onSelect,
}: IDailyCalendarSelectorProps) => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const onSelectHandler = (date) => {
    setDate(date);
    onSelect(date);
  };

  // const isDraft = React.useMemo(() => {

  // }, [historyDailyControl])

  const isDraftModifier = (_date: Date) =>
    historyDailyControl.some(
      (dailyControl) =>
        areDatesEqual(_date, dailyControl.date as Date) && dailyControl.isDraft
    );

  const isDoneModifier = (_date: Date) =>
    historyDailyControl.some(
      (dailyControl) =>
        areDatesEqual(_date, dailyControl.date as Date) && !dailyControl.isDraft
    );

  return (
    <>
      <Calendar
        mode="single"
        selected={date}
        onSelect={onSelectHandler}
        className="rounded-md border w-fit"
        disabled={{
          after: new Date(),
        }}
        modifiers={{
          isDraft: isDraftModifier,
          isDone: isDoneModifier,
        }}
        modifiersClassNames={{
          disabled: "bg-gray-300 rounded-none",
          isDraft: "bg-amber-400 hover:bg-amber-300 rounded-none",
          isDone: "bg-green-300 rounded-none",
        }}
      />
      <span className="font-semibold my-4">
        {date
          ? `La fecha seleccionada es ${buildHumanDate(date)} ↓ `
          : "↑ Seleccione una fecha primero"}
      </span>
    </>
  );
};
