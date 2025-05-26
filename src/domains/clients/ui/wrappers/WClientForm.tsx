"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WForm } from "../../../shared/form/ui/wrappers/WForm";
import { WInput } from "../../../shared/form/ui/wrappers/WInput";
import { WSubmit } from "../../../shared/form/ui/wrappers/WSubmit";

import { useFormManager } from "@/domains/shared/form/core/hooks/useFormManager";
import { addClient } from "../../core/use-cases/addClient.server";
import { Save } from "lucide-react";
import { editClient } from "../../core/use-cases/editClient.server";
import { useCrudHandler } from "../../../../hooks/useCrudHandler";
import { NavigationService } from "@/services/NavigationService";

export interface IClientsOutput {
  clients: IClient[];
}

export const clientFormSchema = z.object({
  nit: z.string().min(1, "Requerido"),
  name: z.string().min(1, "Requerido"),
  id: z.number().optional(),
});

export type IClient = z.infer<typeof clientFormSchema>;

interface IWClientFormProps {
  client?: IClient;
}

export const WClientForm = ({ client }: IWClientFormProps) => {
  const { add, edit } = useCrudHandler<IClient>({
    add: {
      action: addClient,
      onSuccess: {
        message: "👍 Cliente guardado satisfactoriamente",
        handler: () => NavigationService.redirect("/hub/clients", 1000),
      },
    },
    edit: {
      action: editClient,
      onSuccess: {
        message: "👍 Cliente modificado satisfactoriamente",
        handler: () => NavigationService.redirect("/hub/clients", 1000),
      },
    },
  });

  const form = useForm<IClient>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: client || {
      nit: "",
      name: "",
    },
  });

  useFormManager(form);


  const onSubmitHandler = async (values: IClient) => {
    if (client) edit(values);
    else add(values);
  };

  return (
    <WForm<IClient> onSubmit={onSubmitHandler}>
      <div className="flex flex-col">
        <div className="flex-auto mb-5">
          <WInput name="nit" label="NIT" placeholder="1234567-8" />
        </div>
        <div className="flex-auto mb-5">
          <WInput name="name" label="Nombre" />
        </div>
        <WSubmit text="GUARDAR" className="w-fit" icon={<Save size={15} />} />
      </div>
    </WForm>
  );
};

export default WClientForm;
