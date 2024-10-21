import { formSchema } from "@/lib/zod/form-schemas";
import z from "zod";

export const signUpAccountFormSchema = z
  .object({
    name: formSchema.genericString,
    email: formSchema.email,
    password: formSchema.password,
    repeatPassword: formSchema.password,
  })
  .refine(({ password, repeatPassword }) => password === repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

export type SignUpAccountFormInput = z.infer<typeof signUpAccountFormSchema>;
