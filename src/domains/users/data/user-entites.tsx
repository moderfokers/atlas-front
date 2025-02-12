import { z } from "zod";

const OPERATOR_ID = 2;

export const roleFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Requerido"),
  description: z.string(),
});

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Requerido"),
  lastName: z.string().min(1, "Requerido"),
  email: z.string().min(1, "Requerido").email({
    message: "Esto no es un email",
  }),
  password: z.string(),
  password2: z.string(),
  cedula: z.string().min(1, "Requerido"),
  role: roleFormSchema,

  /// campos operario
  contractStatus: z.string().nullable().optional(),
  contractType: z.string().nullable().optional(),
  jobLocation: z.string().nullable().optional(),
});

export const userFormSchema = userSchema.superRefine((data, ctx) => {
  const isEditing = Boolean(data.id);
  const passwordPolice = data.password === data.password2;
  const isOperator = data.role?.id === 2;
  const invalidPassword = !Boolean(data.password) || !Boolean(data.password2);

  if (!isEditing && (!passwordPolice || invalidPassword)) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Las contraseñas no coinciden",
      path: ["password2"],
    });
  }

  if (!isOperator) return true;

  const operatorPolice = ["contractType", "contractStatus", "jobLocation"]
    .map((key) => {
      if (data[key]) return null;
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo Requerido",
        path: [key],
      });
    })
    .find(Boolean);

  return operatorPolice;
});

export const userDefaultValues = {
  id: undefined, // or null if you prefer
  name: "",
  lastName: "",
  email: "",
  password: "",
  password2: "",
  cedula: "",
  role: undefined,
  contractStatus: "",
  contractType: "",
  jobLocation: "",
};

export type IUser = z.infer<typeof userSchema>;
export type IRole = z.infer<typeof roleFormSchema>;
