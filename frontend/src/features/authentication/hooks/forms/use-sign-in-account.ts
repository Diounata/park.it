import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { toast } from "@/hooks/use-toast";
import { signInAccountFormSchema } from "../../validators/sign-in-account-form-schema";

import type { SignInAccountFormInput } from "../../validators/sign-in-account-form-schema";

export function useSignInAccount() {
  const signInAccountForm = useForm<SignInAccountFormInput>({
    resolver: zodResolver(signInAccountFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInAccountFormInput> = useCallback(
    async (data) => {
      toast({
        title: "Sign in",
        description: JSON.stringify(data, null, "\t"),
      });
    },
    [],
  );

  return {
    signInAccountForm,
    onSubmit,
  };
}
