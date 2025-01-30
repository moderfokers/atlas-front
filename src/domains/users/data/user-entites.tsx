import { z } from "zod";

const OPERATOR_ID = 2;

export const roleFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "requerido"),
  description: z.string(),
});

export const userFormSchema = z
  .object({
    id: z.number().optional(),
    name: z.string().min(1, "requerido"),
    lastName: z.string().min(1, "requerido"),
    email: z.string().min(1, "requerido").email({
      message: "Esto no es un email",
    }),
    password: z.string(),
    password2: z.string(),
    cedula: z.string().min(1, "requerido"),
    role: roleFormSchema,

    /// campos operario
    contractStatus: z.string().nullable().optional(),
    contractType: z.string().nullable().optional(),
    jobLocation: z.string().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    const isEditing = Boolean(data.id);
    const passwordPolice = data.password === data.password2;
    const isOperator = data.role?.id === 2;
    const invalidPassword = !Boolean(data.password) || !Boolean(data.password2);

    if (!isOperator) return true;

    const operatorPolice = ["contractType", "contractStatus", "jobLocation"]
      .map((key) => {
        if (data[key]) return null;
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo requerido",
          path: [key],
        });
      })
      .find(Boolean);

    if (!isEditing && (!passwordPolice || invalidPassword)) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Las contraseñas no coinciden",
        path: ["password2"],
      });
    }

    return operatorPolice;
  });

// .refine((data) => data.password === data.password2, {
//   message: "Las contraseñas no coinciden",
//   path: ["password2"],
// })
// .refine(
//   (data) => data.role?.id === 2 && !data.contractType,
//   {
//     message: "veo",
//     path: ["contractType"],
//   }
// );
// .refine(operatorRequiredPolice);
// .refine((data) => {}, {});

export const userDefaultValues = {
  id: undefined, // or null if you prefer
  name: "",
  lastName: "",
  email: "",
  password: "",
  password2: "",
  cedula: "",
  role: undefined, // assuming `roleFormSchema` has its own default or will be provided

  // campos operario
  contractStatus: "",
  contractType: "",
  jobLocation: "",
};

export type IUser = z.infer<typeof userFormSchema>;
export type IRole = z.infer<typeof roleFormSchema>;
