import { z } from "zod";

export const dailyControlSchema = z
  .object({
    location: z.string().min(1, "Requerido"),
    description: z.string().optional(),
    initialCounter: z.coerce.number().min(1, "Requerido"),
    finalCounter: z.coerce
      .number()
      .min(1, "Requerido")
      .refine((...args) => {
        console.log(args);
        return true;
      }),
    spreed: z.boolean().default(false),
    fuelSupply: z.coerce.number().min(1, "Requerido"),
    date: z.date().nullable(),
    isDraft: z.boolean().optional(),
    id: z.number().optional(),
    initialCounterImage: z
      .union([z.instanceof(File), z.string()])
      .refine(Boolean, "Imagen requerida"),
    finalCounterImage: z
      .union([z.instanceof(File), z.string()])
      .refine(Boolean, "Imagen requerida"),
    taskId: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.initialCounter > data.finalCounter) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El horometro inicial no puede ser mayor al final",
        path: ["initialCounter"],
      });
    }

    return true;
  });

export const dailyDefaultValues: IDailyControl = {
  location: "",
  description: "",
  initialCounter: 0,
  finalCounter: 0,
  spreed: false,
  fuelSupply: 0,
  initialCounterImage: "",
  finalCounterImage: "",
  date: null,
};

export type IDailyControl = z.infer<typeof dailyControlSchema>;
