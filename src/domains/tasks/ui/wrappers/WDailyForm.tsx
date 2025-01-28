"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WForm } from "../../../shared/form/ui/wrappers/WForm";
import { WInput } from "../../../shared/form/ui/wrappers/WInput";
import { WSubmit } from "../../../shared/form/ui/wrappers/WSubmit";

import { useFormManager } from "@/domains/shared/form/core/hooks/useFormManager";
import { Save } from "lucide-react";

import { useCrudHandler } from "../../../../hooks/useCrudHandler";
import { IRequest } from "@/domains/requests/ui/wrappers/WRequestForm";
import { ITask } from "@/domains/requests/ui/wrappers/WTaskForm";
import React from "react";
import { DailyCalendarSelector } from "../components/DailyCalendar";
import {
  IDailyControlInput,
  patchDailyControl,
} from "../../core/use-cases/patchDailyControl.server";
import { FileUploader } from "@/components/ui/file-uploader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RequestItem } from "@/domains/requests/ui/components/RequestItem";
import { useFetch } from "@/hooks/useFetch";
import { getDailyControl } from "../../core/use-cases/getDailyControl.server";
import { areDatesEqual } from "@/lib/utils";

export const dailyControlSchema = z.object({
  location: z.string(),
  description: z.string().optional(),
  initialCounter: z.coerce.number(),
  finalCounter: z.coerce.number(),
  spreed: z.string(),
  fuelSupply: z.coerce.number(),
  date: z.date().optional(),
  isDraft: z.boolean().optional(),
  id: z.number().optional(),
  initialCounterImage: z.string().nullable().optional(),
  finalCounterImage: z.string().nullable().optional(),
  taskId: z.number().optional(),

  // initialPhoto: z.any().optional().nullable(),
});

const defaultValues = {
  location: "",
  description: "",
  initialCounter: 0,
  finalCounter: 0,
  spreed: "",
  fuelSupply: 0,
};

export type IDailyControl = z.infer<typeof dailyControlSchema>;

export interface IWDailyFormProps {
  task: ITask;
  request: IRequest;
  historyDailyControl: IDailyControl[];
}

const FINAL_COUNTER_IMAGE = "finalCounterImage";
const INITIAL_COUNTER_IMAGE = "finalCounterImage";

export const WDailyForm = ({
  task,
  request,
  historyDailyControl,
}: IWDailyFormProps) => {
  const { edit } = useCrudHandler<FormData, IDailyControl>({
    edit: {
      action: patchDailyControl,
      onSuccess: {
        message: "👍 Asignación modificada satisfactoriamente",
      },
    },
  });

  const [date, setDate] = React.useState<Date | undefined>();

  const [initialPhoto, setInitialPhoto] = React.useState<File>();
  const [finalPhoto, setFinalPhoto] = React.useState<File>();
  const [dailyControl, setDailyControl] =
    React.useState<IDailyControl>(defaultValues);

  const form = useForm<IDailyControl>({
    resolver: zodResolver(dailyControlSchema),
    defaultValues: defaultValues,
    values: dailyControl,
  });

  useFormManager(form);

  const onSubmitHandler = async (values: IDailyControl) => {
    const formData = new FormData();

    values.taskId = task?.id;
    values.isDraft = true;

    const valuesBlob = new Blob([JSON.stringify({ ...values })], {
      type: "application/json",
    });

    formData.append("data", valuesBlob);
    if (initialPhoto) formData.append("initialPhoto", initialPhoto as File);
    if (finalPhoto) formData.append("finalPhoto", finalPhoto as File);
    edit(formData);
  };

  const onSelectDateHandler = (date: Date) => {
    setDate(date);

    const dailyControl = historyDailyControl.find(({ date: _date }) =>
      areDatesEqual(_date as Date, date)
    );
    setDailyControl(dailyControl || defaultValues);
    console.log(dailyControl);
  };

  const imageUploadHandler = (e, type: string) => {
    if (!e?.target?.files?.length) return;

    if (type === FINAL_COUNTER_IMAGE) setFinalPhoto(e.target.files[0]);
    if (type === INITIAL_COUNTER_IMAGE) setInitialPhoto(e.target.files[0]);
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

                <div className="flex-auto mb-5">
                  <WInput name="spreed" label="Desplazamiento" />
                </div>

                <div className="flex mb-5 flex-col md:flex-row">
                  <WInput
                    name="initialCounter"
                    type="number"
                    label="Horometro inicial"
                    className="mr-2"
                  />
                  <WInput
                    name="finalCounter"
                    type="number"
                    label="Horometro final"
                    className="mr-2"
                  />
                  <WInput
                    type="number"
                    name="fuelSupply"
                    label="Suministro de combustible"
                  />
                </div>

                <div className="flex flex-row">
                  <FileUploader
                    className="mr-2"
                    onChange={(e) =>
                      imageUploadHandler(e, INITIAL_COUNTER_IMAGE)
                    }
                    label="Horometro inicial"
                    src={dailyControl.initialCounterImage as string}
                  />
                  <FileUploader
                    className="ml-2"
                    label="Horometro final"
                    onChange={(e) => imageUploadHandler(e, FINAL_COUNTER_IMAGE)}
                  />
                </div>

                <WSubmit
                  text="Guardar"
                  className="w-fit mt-4"
                  icon={<Save size={15} />}
                />
              </div>
            </WForm>
          </div>
        )}
      </div>
    </>
  );
};

export default WDailyForm;
