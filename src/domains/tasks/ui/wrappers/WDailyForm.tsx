"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WForm } from "../../../shared/form/ui/wrappers/WForm";
import { WInput } from "../../../shared/form/ui/wrappers/WInput";
import { WSubmit } from "../../../shared/form/ui/wrappers/WSubmit";
import { useFormManager } from "@/domains/shared/form/core/hooks/useFormManager";
import { Eraser, Save } from "lucide-react";
import { useCrudHandler } from "../../../../hooks/useCrudHandler";
import { IRequest } from "@/domains/requests/ui/wrappers/WRequestForm";
import React from "react";
import { DailyCalendarSelector } from "../components/DailyCalendar";
import { patchDailyControl } from "../../core/use-cases/patchDailyControl.server";
import { RequestItem } from "@/domains/requests/ui/components/RequestItem";
import { areDatesEqual, deepEqual } from "@/lib/utils";
import { ITask } from "@/domains/requests/data/entities";
import { Button } from "@/components/ui/button";
import { WSwitch } from "@/domains/shared/form/ui/wrappers/WSwitch";
import { useToast } from "@/hooks/useToast";
import { WFileUploader } from "@/domains/shared/form/ui/wrappers/WFileUploader";
import { bulidDailyForm } from "../../core/use-cases/buildDailyForm";

export const dailyControlSchema = z.object({
  location: z.string().min(1, "Requerido"),
  description: z.string().optional(),
  initialCounter: z.coerce.number().min(1, "Requerido"),
  finalCounter: z.coerce.number().min(1, "Requerido"),
  spreed: z.boolean().default(false),
  fuelSupply: z.coerce.number().min(1, "Requerido"),
  date: z.string().datetime({ local: true }).optional(),
  isDraft: z.boolean().optional(),
  id: z.number().optional(),
  initialCounterImage: z
    .union([z.instanceof(File), z.string()])
    .refine(Boolean, "Imagen requerida"),
  finalCounterImage: z
    .union([z.instanceof(File), z.string()])
    .refine(Boolean, "Imagen requerida"),
  taskId: z.number().optional(),
});

const defaultValues: IDailyControl = {
  location: "",
  description: "",
  initialCounter: 0,
  finalCounter: 0,
  spreed: false,
  fuelSupply: 0,
  initialCounterImage: "",
  finalCounterImage: "",
};

export type IDailyControl = z.infer<typeof dailyControlSchema>;

export interface IWDailyFormProps {
  task: ITask;
  request: IRequest;
  historyDailyControl: IDailyControl[];
}

export const WDailyForm = ({
  task,
  request,
  historyDailyControl,
}: IWDailyFormProps) => {
  const { toast } = useToast();
  const { edit } = useCrudHandler<FormData, IDailyControl>({
    edit: {
      action: patchDailyControl,
      onSuccess: {
        message: "👍 Asignación modificada satisfactoriamente",
      },
    },
  });

  const [date, setDate] = React.useState<Date | undefined>();

  const [dailyControl, setDailyControl] =
    React.useState<IDailyControl>(defaultValues);

  const form = useForm<IDailyControl>({
    resolver: zodResolver(dailyControlSchema),
    defaultValues: defaultValues,
    values: dailyControl,
  });

  useFormManager(form);

  const onSubmitHandler = async (values: IDailyControl) => {
    const formData = bulidDailyForm(values, task.id as number);
    edit(formData);
  };

  const onSelectDateHandler = (date: Date) => {
    setDate(date);

    form.setValue("date", date);

    const dailyControl = historyDailyControl.find(({ date: _date }) =>
      areDatesEqual(_date as Date, date)
    );
    setDailyControl(dailyControl || defaultValues);
  };

  const saveDraftHandler = () => {
    const sameForm = deepEqual(dailyControl, {
      ...form.getValues(),
    });

    if (sameForm) {
      return toast({
        variant: "warning",
        description: "No hay cambios para guardar",
      });
    }

    onSubmitHandler({ ...form.getValues(), isDraft: true });
  };

  return (
    <>
      <div className="flex flex-col">
        <RequestItem {...request} task={task} readonly />

        <div className="w-full my-4">
          <DailyCalendarSelector
            historyDailyControl={historyDailyControl}
            onSelect={onSelectDateHandler}
          />
        </div>

        {date && (
          <div className="w-full p-2">
            <WForm<IDailyControl> onSubmit={onSubmitHandler}>
              <div className="flex flex-col">
                <div className="flex-auto mb-5">
                  <WInput name="location" label="Ubicación" />
                </div>
                <div className="flex-auto mb-5">
                  <WInput
                    name="description"
                    label="Descripción"
                    type="textarea"
                  />
                </div>

                <div className="flex mb-5 flex-col md:flex-row">
                  {/* <WInput name="spreed" label="Desplazamiento" /> */}
                  <WSwitch
                    name="spreed"
                    className="mr-1"
                    label="¿Hubo desplazamiento?"
                  />
                  <WInput
                    className="ml-1"
                    type="number"
                    name="fuelSupply"
                    label="Suministro de combustible"
                  />
                </div>

                <div className="flex mb-5 flex-col md:flex-row">
                  <WInput
                    name="initialCounter"
                    type="number"
                    label="Horometro inicial"
                    className="mr-1"
                  />
                  <WInput
                    name="finalCounter"
                    type="number"
                    label="Horometro final"
                    className="ml-1"
                  />
                </div>

                <div className="flex flex-row">
                  <WFileUploader
                    name="initialCounterImage"
                    className="mr-2"
                    label="Horometro inicial"
                  />
                  <WFileUploader
                    name="finalCounterImage"
                    className="ml-2"
                    label="Horometro final"
                  />
                </div>

                <div className="flex flex-col md:flex-row">
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-fit mt-4 mr-2 text-white"
                    onClick={saveDraftHandler}
                  >
                    <Eraser size={15} />
                    <span className="ml-2" />
                    {"GUARDAR BORRADOR"}
                  </Button>

                  <WSubmit
                    text="GUARDAR"
                    className="w-fit mt-4"
                    icon={<Save size={15} />}
                  />
                </div>
              </div>
            </WForm>
          </div>
        )}
      </div>
    </>
  );
};

export default WDailyForm;
