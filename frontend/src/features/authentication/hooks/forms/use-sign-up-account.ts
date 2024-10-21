import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { toast } from "@/hooks/use-toast";
import { signUpAccountFormSchema } from "../../validators/sign-up-account-form-schema";

import type { SignUpAccountFormInput } from "../../validators/sign-up-account-form-schema";

export function useSignUpAccount() {
  const signUpAccountForm = useForm<SignUpAccountFormInput>({
    resolver: zodResolver(signUpAccountFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpAccountFormInput> = useCallback(
    async (data) => {
      toast({
        title: "Sign up",
        description: JSON.stringify(data, null, "\t"),
      });
    },
    [],
  );

  return {
    signUpAccountForm,
    onSubmit,
  };
}
