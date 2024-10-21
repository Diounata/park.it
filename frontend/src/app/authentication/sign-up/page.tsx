"use client";

import { AuthenticationFormComponent } from "@/features/authentication/components/authentication-form-component";
import { useSignUpAccount } from "@/features/authentication/hooks/forms/use-sign-up-account";

export default function SignUpPage() {
  const { signUpAccountForm, onSubmit } = useSignUpAccount();

  return (
    <AuthenticationFormComponent
      type="sign-up"
      form={signUpAccountForm}
      onSubmit={onSubmit}
    />
  );
}
