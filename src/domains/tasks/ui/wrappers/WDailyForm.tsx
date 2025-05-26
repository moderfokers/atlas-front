"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { WForm } from "../../../shared/form/ui/wrappers/WForm";
import { WInput } from "../../../shared/form/ui/wrappers/WInput";
import { WSubmit } from "../../../shared/form/ui/wrappers/WSubmit";
import { useFormManager } from "@/domains/shared/form/core/hooks/useFormManager";
import { Eraser, Save } from "lucide-react";
import { useCrudHandler } from "../../../../hooks/useCrudHandler";
import { IRequest } from "@/domains/requests/ui/wrappers/WRequestForm";
import React from "react";
import { WDailyCalendarSelector } from "./WDailyCalendar";
import { patchDailyControl } from "../../core/use-cases/patchDailyControl.server";
import { RequestItem } from "@/domains/requests/ui/components/RequestItem";
import { deepEqual } from "@/lib/utils";
import { ITask } from "@/domains/requests/data/entities";
import { Button } from "@/components/ui/button";
import { WSwitch } from "@/domains/shared/form/ui/wrappers/WSwitch";
import { useToast } from "@/hooks/useToast";
import { WFileUploader } from "@/domains/shared/form/ui/wrappers/WFileUploader";
import { buildDailyForm } from "../../core/use-cases/buildDailyForm";
import {
  dailyControlSchema,
  dailyDefaultValues,
  IDailyControl,
} from "../../data/entities";
import { useDailyStore } from "../../data/stores/daily-store/useDailyStore";
import { useShallow } from "zustand/shallow";
import { NavigationService } from "@/services/NavigationService";

const IS_DRAFT_TRIGGER = true;
const IS_FINISH_TRIGGER = false;

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
        message: "👍 Control diario registrado",
        handler: () => NavigationService.redirect("/hub/requests", 1000),
      },
    },
  });

  const { date, dailyControl } = useDailyStore(
    useShallow((state) => ({
      date: state.date,
      dailyControl: state.dailyControl,
    }))
  );

  const form = useForm<IDailyControl>({
    resolver: zodResolver(dailyControlSchema),
    defaultValues: dailyDefaultValues,
    values: dailyControl,
  });

  useFormManager(form);

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

    onSaveHandler({ ...form.getValues() }, IS_DRAFT_TRIGGER);
  };

  const onSaveHandler = (values: IDailyControl, isDraft: boolean) => {
    const formData = buildDailyForm(
      { ...values, date, isDraft },
      task.id as number
    );
    edit(formData);
  };

  return (
    <>
      <div className="flex flex-col">
        <RequestItem {...request} task={task} readonly />

        <div className="w-full my-4">
          <WDailyCalendarSelector historyDailyControl={historyDailyControl} />
        </div>

        {date && (
          <div className="w-full p-2">
            <WForm<IDailyControl>
              onSubmit={(values) => onSaveHandler(values, IS_FINISH_TRIGGER)}
            >
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
