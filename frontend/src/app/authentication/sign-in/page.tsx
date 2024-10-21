"use client";

import { AuthenticationFormComponent } from "@/features/authentication/components/authentication-form-component";

import { useSignInAccount } from "@/features/authentication/hooks/forms/use-sign-in-account";

export default function SignInPage() {
  const { signInAccountForm, onSubmit } = useSignInAccount();

  return (
    <AuthenticationFormComponent
      type="sign-in"
      form={signInAccountForm}
      onSubmit={onSubmit}
    />
  );
}
