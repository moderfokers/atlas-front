import { z } from "zod";

export type IMachine = z.infer<typeof machineFormSchema>;
export type IMachineClass = z.infer<typeof machineClassSchema>;
export type ISupplier = z.infer<typeof supplierSchema>;
export type IMachineStatus = z.infer<typeof machineStatusSchema>;
export type IColor = {
  id: number;
  name: string;
};

export interface IMachinesOutput {
  machines: IMachine[];
}

export const machineClassSchema = z.object({
  name: z.string(),
  id: z.number().optional(),
});

export const supplierSchema = z.object({
  name: z.string(),
  id: z.number().optional(),
});

export const machineStatusSchema = z.object({
  name: z.string(),
  id: z.number().optional(),
});


export const machineFormSchema = z.object({
  id: z.number().optional(),
  machineClass: machineClassSchema,
  supplier: supplierSchema,
  status: machineStatusSchema,
  registrationNumber: z.string().min(1, "Requerido").nullable(),
  brand: z.string().min(1, "Requerido").nullable(),
  line: z.string().min(1, "Requerido").nullable(),
  model: z.coerce.number().min(1, "Requerido").nullable(),
  propertyCard: z.string().min(1, "Requerido").nullable(),
  engineNumber: z.string().min(1, "Requerido").nullable(),
  serialNumber: z.string().min(1, "Requerido").nullable(),
  color: z.string().min(1, "Requerido").nullable(),
  shootingType: z.string().min(1, "Requerido").nullable(),
  weight: z.coerce.number().min(1, "Requerido").nullable(),
  height: z.coerce.number().min(1, "Requerido").nullable(),
  width: z.coerce.number().min(1, "Requerido").nullable(),
  length: z.coerce.number().min(1, "Requerido").nullable(),
  idNumber: z.string().min(1, "Requerido").nullable(),
  tenant: z.string().nullable(),
  idTenant: z.coerce.number().nullable(),
  transitAgency: z.string().nullable(),
  registryDate: z.string().datetime({ local: true }).nullable(),
  expirationDate: z.string().datetime({ local: true }).nullable(),
  expeditionDate: z.string().datetime({ local: true }).nullable(),
  releaseDate: z.string().datetime({ local: true }).nullable(),
  origin: z.string().nullable(),
  importNumber: z.string().nullable(),
  rent: z.boolean(),
});

export const machineDefaultValues: IMachine = {
  id: 0,
  machineClass: { name: "", id: 0 },
  supplier: { name: "", id: 0 },
  registrationNumber: "",
  brand: "",
  status: { name: "", id: 0 },
  line: "",
  model: null,
  propertyCard: "",
  engineNumber: "",
  serialNumber: "",
  color: "",
  shootingType: "",
  weight: null,
  height: null,
  width: null,
  length: null,
  idNumber: null,
  tenant: "",
  idTenant: null,
  transitAgency: null,
  registryDate: null,
  expirationDate: null,
  expeditionDate: null,
  origin: "",
  importNumber: null,
  releaseDate: "",
  rent: false,
};
