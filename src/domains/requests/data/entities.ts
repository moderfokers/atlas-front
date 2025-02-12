import { costCenterSchema } from "@/domains/costs/ui/wrappers/WCostForm";
import { machineFormSchema } from "@/domains/machines/data/machine-entities";
import { userSchema } from "@/domains/users/data/user-entites";
import { operatorSchema } from "@/domains/users/ui/wrappers/WUserForm";
import { z } from "zod";

export const taskSchemaForm = z.object({
  id: z.number().optional(),
  requestId: z.number().optional(),
  operator: z
    .intersection(
      operatorSchema.pick({ operatorId: true }),
      userSchema.pick({ id: true })
    )
    .nullable()
    .refine(Boolean, { message: "Campo Requerido" }),
  machinery: machineFormSchema
    .pick({ id: true })
    .nullable()
    .refine(Boolean, { message: "Campo Requerido" }),
  costCenter: costCenterSchema
    .pick({ id: true })
    .nullable()
    .refine(Boolean, { message: "Campo Requerido" }),
});

export type ITaskForm = z.infer<typeof taskSchemaForm>;

export const taskSchema = z.object({
  id: z.number().optional(),
  requestId: z.number().optional(),
  operator: z.intersection(operatorSchema, userSchema),
  machinery: machineFormSchema,
  costCenter: costCenterSchema,
});


export type ITask = z.infer<typeof taskSchema>;
