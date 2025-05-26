"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { WForm } from "../../../shared/form/ui/wrappers/WForm";
import { WInput } from "../../../shared/form/ui/wrappers/WInput";
import { WSubmit } from "../../../shared/form/ui/wrappers/WSubmit";

import { useFormManager } from "@/domains/shared/form/core/hooks/useFormManager";
import { addMachine } from "../../core/use-cases/addMachine.server";
import { Save } from "lucide-react";
import { editMachine } from "../../core/use-cases/editMachine.server";
import { useCrudHandler } from "../../../../hooks/useCrudHandler";
import { WSelect } from "@/domains/shared/form/ui/wrappers/WSelect";
import { WDate } from "@/domains/shared/form/ui/wrappers/WDate";
import React from "react";
import {
  machineFormSchema,
  IColor,
  IMachine,
  IMachineStatus,
  IMachineClass,
  ISupplier,
  machineDefaultValues,
} from "../../data/machine-entities";
import { WSwitch } from "@/domains/shared/form/ui/wrappers/WSwitch";
import { NavigationService } from "@/services/NavigationService";

export interface IWMachineFormProps {
  machinery?: IMachine;
  classes: IMachineClass[];
  suppliers: ISupplier[];
  statuses: IMachineStatus[];
  colors: string[];
}

export const WMachineForm = ({
  machinery: machine,
  classes,
  suppliers,
  statuses,
  colors,
}: IWMachineFormProps) => {
  const { add, edit } = useCrudHandler<IMachine>({
    add: {
      action: addMachine,
      onSuccess: {
        message: "👍 Maquina guardada satisfactoriamente",
        handler: () => NavigationService.redirect("/hub/machines", 1000),
      },
    },
    edit: {
      action: editMachine,
      onSuccess: {
        message: "👍 Maquina modificada satisfactoriamente",
        handler: () => NavigationService.redirect("/hub/machines", 1000),
      },
    },
  });

  const form = useForm<IMachine>({
    resolver: zodResolver(machineFormSchema),
    defaultValues: machine || machineDefaultValues,
  });

  // const colors = React.useMemo(() => buildColorOptions(_colors), [_colors]);

  useFormManager(form);

  const onSubmitHandler = async (values: IMachine) => {
    if (machine) edit(values);
    else add(values);
  };

  return (
    <WForm<IMachine> onSubmit={onSubmitHandler}>
      <div className="flex flex-col">
        <div className=" mb-5 sm:flex-column flex md:flex-row">
          <WSelect<IMachineStatus>
            name="status"
            label="Estado"
            placeholder="Seleccione un estado"
            className="w-full md:mr-6"
            options={statuses}
          />

          <WSelect<ISupplier>
            name="supplier"
            label="Proveedor"
            placeholder="Seleccione un proveedor"
            className="w-full"
            options={suppliers}
          />
        </div>

        <div className=" mb-5 sm:flex-column flex md:flex-row">
          <WSelect<IMachineClass>
            name="machineClass"
            label="Tipo de maquina"
            placeholder="Seleccione el tipo de maquina"
            className="w-full md:mr-6"
            options={classes}
          />

          <WInput
            name="brand"
            label="Marca"
            placeholder="Toyota"
            className="w-full"
          />
        </div>

        <div className=" mb-5 sm:flex-column flex md:flex-row">
          <WInput
            name="registrationNumber"
            label="Numero de registro"
            placeholder="12345"
            className="w-full md:mr-6"
          />

          <WInput
            name="color"
            label="Color"
            placeholder="Seleccione el color"
            className="w-full"
          />
          {/* <WSelect<string>
            name="color"
            label="Color"
            placeholder="Seleccione el color de maquina"
            className="w-full"
            options={colors}
          /> */}
        </div>

        <div className=" mb-5 sm:flex-column flex md:flex-row">
          <WInput
            name="line"
            label="Linea"
            placeholder="CN-10"
            className="w-full md:mr-6"
          />
          <WInput
            type="number"
            name="model"
            label="Modelo"
            placeholder="2020"
          />
        </div>

        <div className=" mb-5 sm:flex-column flex md:flex-row">
          <WInput
            className="w-full md:mr-6"
            name="propertyCard"
            label="Tarjeta de propiedad"
            placeholder="1234..."
          />
          <WInput
            name="serialNumber"
            label="Numero de serie"
            placeholder="2020"
            className="w-full"
          />
        </div>

        <div className=" mb-5 sm:flex-column flex md:flex-row">
          <WInput
            className="w-full md:mr-6"
            name="engineNumber"
            label="N° de motor"
            placeholder="1234..."
          />
          <WInput
            name="shootingType"
            label="Rodaje"
            placeholder="1"
            className="w-full"
          />
        </div>

        <div className=" mb-5 sm:flex-column flex md:flex-row">
          <WInput
            type="number"
            name="weight"
            label="Peso"
            placeholder="20kg"
            className="w-full md:mr-6"
          />
          <WInput
            type="number"
            name="height"
            label="Altura"
            placeholder="20m"
            className="w-full md:mr-6"
          />
          <WInput
            type="number"
            name="width"
            label="Ancho"
            placeholder="20m"
            className="w-full md:mr-6"
          />
          <WInput
            type="number"
            name="length"
            label="Largo"
            placeholder="20m"
            className="w-full"
          />
        </div>

        <div className=" mb-5 sm:flex-column flex md:flex-row">
          <WInput
            type="number"
            name="idNumber"
            label="Numero de identificación"
            placeholder="1234..."
            className="w-full md:mr-6"
          />
          <WInput
            name="transitAgency"
            label="Organismo de transito"
            placeholder="Facto"
            className="w-full"
          />
        </div>

        <div className=" mb-5 sm:flex-column flex md:flex-row">
          <WInput
            name="tenant"
            label="Locatorio"
            placeholder="Juan Alimaña"
            className="w-full md:mr-6"
          />
          <WInput
            type="number"
            name="idTenant"
            label="Identificación locatorio"
            placeholder="1234"
            className="w-full"
          />
        </div>

        <div className=" mb-5 sm:flex-column flex md:flex-row">
          <WDate
            name="registryDate"
            label="Fecha de registro"
            className="w-full md:mr-6 sm:mb-6"
          />
          <WDate
            name="expirationDate"
            label="Fecha de vencimiento"
            className="w-full md:mr-6"
          />
          <WDate
            name="expeditionDate"
            label="Fecha de expedición"
            className="w-full md:mr-6"
          />
          <WDate
            name="releaseDate"
            label="Fecha de levante"
            className="w-full"
          />
        </div>

        <div className=" mb-5 sm:flex-column flex md:flex-row">
          <WInput
            name="origin"
            label="Origen"
            placeholder="Importación..."
            className="w-full md:mr-6"
          />
          <WInput
            type="number"
            name="importNumber"
            label="Numero de importación"
            placeholder="123456..."
            className="w-full"
          />
        </div>

        <div className=" mb-5 sm:flex-column flex">
          <WSwitch name="rent" label="¿Es alquilado?" />
          {/* <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Airplane Mode</Label>
            </div>
            */}
        </div>

        <WSubmit text="GUARDAR" className="w-fit" icon={<Save size={15} />} />
      </div>
    </WForm>
  );
};

export default WMachineForm;
