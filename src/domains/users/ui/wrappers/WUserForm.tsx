"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WForm } from "../../../shared/form/ui/wrappers/WForm";
import { WInput } from "../../../shared/form/ui/wrappers/WInput";
import { WSubmit } from "../../../shared/form/ui/wrappers/WSubmit";

import { useFormManager } from "@/domains/shared/form/core/hooks/useFormManager";
import { addUser } from "../../core/use-cases/addUser.server";
import { Save } from "lucide-react";
import { editUser } from "../../core/use-cases/editUser.server";
import { useCrudHandler } from "../../../../hooks/useCrudHandler";
import {
  IRole,
  IUser,
  userDefaultValues,
  userFormSchema,
} from "../../data/user-entites";
import { WSelect } from "@/domains/shared/form/ui/wrappers/WSelect";
import React from "react";
import { deepMerge } from "@/lib/utils";

export interface IUsersOutput {
  users: IUser[];
}

export interface IWUserFormProps {
  user?: IUser;
  roles: IRole[];
}

export const operatorSchema = z.object({
  operatorId: z.number(),
  contractStatus: z.string(),
  contractType: z.string(),
  jobLocation: z.string(),
});

// Inferred TypeScript type
export type IOperator = z.infer<typeof operatorSchema> & IUser;

export const WUserForm = ({ user, roles }: IWUserFormProps) => {
  const { add, edit } = useCrudHandler<IUser>({
    add: {
      action: addUser,
      onSuccess: {
        message: "👍 Usuario guardado satisfactoriamente",
        handler: (result) => {
          if (result.status < 400) {
            window.location.href = "/hub/users";
          }
        },
      },
    },
    edit: {
      action: editUser,
      onSuccess: {
        message: "👍 Usuario modificado satisfactoriamente",
        handler: (result) => {
          if (result.status < 400) {
            window.location.href = "/hub/users";
          }
        },
      },
    },
  });

  const form = useForm<IUser>({
    resolver: zodResolver(userFormSchema),
    defaultValues: deepMerge(userDefaultValues, user || {}),
  });

  const role = form.watch("role");
  const isOperator = role?.id === 2;

  useFormManager(form);

  const onSubmitHandler = async (values: IUser) => {
    if (user) edit(values);
    else add(values);
  };

  console.log(user, form);

  return (
    <WForm<IUser> onSubmit={onSubmitHandler}>
      <div className="flex flex-col">
        <div className="flex flex-row mb-5">
          <WInput
            name="name"
            label="Nombre"
            placeholder="Alfredo..."
            className="mr-6 w-full"
          />
          <WInput name="lastName" label="Apellido" placeholder="Vargas..." />
        </div>
        <div className="flex flex-row mb-5">
          <WInput
            name="cedula"
            label="Cédula"
            placeholder="1234"
            className="mr-6"
          />
          <WInput
            disabled={Boolean(user)}
            name="email"
            label="Correo"
            placeholder="juan@juan.com"
            className="mr-6"
          />
        </div>
        <div className="flex flex-row mb-5">
          <WSelect<IRole>
            disabled={Boolean(user)}
            name="role"
            label="Rol"
            placeholder="Seleccione el rol"
            className="w-full"
            options={roles}
          />
        </div>

        {!user && (
          <div className="flex flex-row mb-5">
            <WInput
              type="password"
              name="password"
              label="Contraseña"
              placeholder="******"
              className="mr-6"
            />
            <WInput
              type="password"
              name="password2"
              label="Confirmación de contraseña"
              placeholder="******"
              className="mr-6"
            />
          </div>
        )}

        {isOperator && (
          <div className="flex flex-row mb-5">
            <WInput
              name="contractStatus"
              label="Estado del contrato"
              className="mr-6"
            />

            <WInput
              name="contractType"
              label="Tipo de contrato"
              className="mr-6"
            />

            <WInput
              name="jobLocation"
              label="Lugar de trabajo"
              className="mr-6"
            />
          </div>
        )}

        <WSubmit text="GUARDAR" className="w-fit" icon={<Save size={15} />} />
      </div>
    </WForm>
  );
};

export default WUserForm;
