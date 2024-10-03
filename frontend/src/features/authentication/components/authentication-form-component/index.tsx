/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

import { AuthenticationForm } from "./form";
import { AuthenticationHeader } from "./header";

import type { SubmitHandler, UseFormReturn } from "react-hook-form";

export interface AuthenticationFormComponentProps {
  type: "sign-in" | "sign-up";
  form: UseFormReturn<any>;
  onSubmit: SubmitHandler<any>;
}

export function AuthenticationFormComponent(
  props: AuthenticationFormComponentProps,
) {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-primary px-7 py-10">
      <div className="flex w-full flex-col justify-center gap-8 rounded-lg bg-white px-4 py-8 drop-shadow-lg md:w-[600px]">
        <Image src="/logo-sm.svg" alt="Park.it" width={90} height={25} />
        <AuthenticationHeader {...props} />
        <AuthenticationForm {...props} />
      </div>
    </div>
  );
}
