import { formSchema } from "@/lib/zod/form-schemas";
import z from "zod";

export const signInAccountFormSchema = z.object({
  email: formSchema.email,
  password: formSchema.password,
});

export type SignInAccountFormInput = z.infer<typeof signInAccountFormSchema>;
