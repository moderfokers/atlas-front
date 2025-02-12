"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WForm } from "../../../shared/form/ui/wrappers/WForm";
import { WInput } from "../../../shared/form/ui/wrappers/WInput";
import { WSubmit } from "../../../shared/form/ui/wrappers/WSubmit";
import { useFormManager } from "@/domains/shared/form/core/hooks/useFormManager";

import { Save } from "lucide-react";
import { ICost } from "../../data/cost-columns";
import { editCosts } from "../../core/use-cases/editCost.server";
import { addCosts } from "../../core/use-cases/addCost.server";
import { WDate } from "@/domains/shared/form/ui/wrappers/WDate";
import { useCrudHandler } from "@/hooks/useCrudHandler";

export interface ICostsOutput {
  costs: ICost[];
}

export const costCenterSchema = z.object({
  startDate: z.string().datetime({ local: true }).min(1, "Requerido"),
  endDate: z.string().datetime({ local: true }).min(1, "Requerido"),
  name: z.string().min(1, "Requerido"),
  code: z.string().min(1, "Requerido"),
  id: z.number().optional(),
});

export type TFormData = z.infer<typeof costCenterSchema>;

interface IWCostsFormProps {
  cost?: ICost;
}

export const WCostsForm = ({ cost }: IWCostsFormProps) => {
  const form = useForm<TFormData>({
    resolver: zodResolver(costCenterSchema),
    defaultValues: cost || {
      code: "",
      name: "",
      startDate: "",
      endDate: "",
    },
  });

  const { add, edit } = useCrudHandler<TFormData>({
    add: {
      action: addCosts,
      onSuccess: {
        message: "👍 Centro de costo guardado satisfactoriamente",
      },
    },
    edit: {
      action: editCosts,
      onSuccess: {
        message: "👍 Centro de costo modificado satisfactoriamente",
      },
    },
  });

  useFormManager(form);

  const onSubmitHandler = async (values: TFormData) => {
    if (cost) edit(values);
    else add(values);
  };

  return (
    <WForm<TFormData> onSubmit={onSubmitHandler}>
      <div className="flex flex-col">
        <div className="flex-auto mb-5">
          <WInput name="name" label="Nombre" placeholder="Caja menor" />
        </div>
        <div className="flex-auto mb-5">
          <WInput name="code" label="Codigo" placeholder="CM-1" />
        </div>
        <div className="flex-auto mb-5">
          <WDate name="startDate" label="Fecha inicio" />
        </div>

        <div className="flex-auto mb-5">
          <WDate name="endDate" label="Fecha fin" />
        </div>
        <WSubmit text="GUARDAR" className="w-fit" icon={<Save size={15} />} />
      </div>
    </WForm>
  );
};

export default WCostsForm;
