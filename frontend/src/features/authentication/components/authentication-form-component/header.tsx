import { Typography } from "@/components/ui/typography";

import type { AuthenticationFormComponentProps } from ".";

export function AuthenticationHeader({
  type,
}: AuthenticationFormComponentProps) {
  return (
    <header className="flex flex-col">
      <Typography.Heading2>
        Sign {type === "sign-in" ? "in" : "up"}
      </Typography.Heading2>

      <Typography.Paragraph>
        Fill the form below to {type === "sign-in" ? "continue" : "sign up"}
      </Typography.Paragraph>
    </header>
  );
}
