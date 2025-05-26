import { Calendar } from "@/components/ui/calendar";
import React from "react";

import { areDatesEqual, buildHumanDate } from "@/lib/utils";
import { dailyDefaultValues, IDailyControl } from "../../data/entities";
import { useDailyStore } from "../../data/stores/daily-store/useDailyStore";
import { useShallow } from "zustand/shallow";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export interface IDailyCalendarSelectorProps {
  historyDailyControl: IDailyControl[];
  onSelect?: (date: Date) => void;
}

export const WDailyCalendarSelector = ({
  historyDailyControl = [],
  onSelect,
}: IDailyCalendarSelectorProps) => {
  const { date, setDate, setDailyControl } = useDailyStore(
    useShallow((state) => ({
      date: state.date,
      setDate: state.setDate,
      setDailyControl: state.setDailyControl,
    }))
  );

  const onSelectHandler = (date) => {
    setDate(date);

    const dailyControl = historyDailyControl.find(({ date: _date }) =>
      areDatesEqual(_date as Date, date)
    );

    setDailyControl(dailyControl || dailyDefaultValues);

    if (onSelect) onSelect(date);
  };

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
    <div>
      <div className="flex  flex-col md:flex-row">
        <Calendar
          mode="single"
          selected={date as Date}
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
            isDone: "bg-green-400 hover:bg-green-300 rounded-none",
          }}
        />

        <Card>
          <CardHeader className="py-2 px-4">
            <b>ESTADOS</b>
          </CardHeader>
          <CardContent className="py-2 px-4 pb-4">
            <div className="flex flex-col gap-2">
              <Badge variant={"disabled"}>FECHA DESHABILITADA</Badge>
              <Badge variant={"warning"}>EN BORRADOR</Badge>
              <Badge variant={"success"}>FINALIZADA</Badge>
              <Badge>FECHA SELECCIONADA</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <span className="font-semibold m-2">
        {date
          ? `La fecha seleccionada es ${buildHumanDate(date)} ↓ `
          : "↑ Seleccione una fecha primero"}
      </span>
    </div>
  );
};
