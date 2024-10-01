import Image from "next/image";
import Link from "next/link";

import { Typography } from "@/components/ui/Typography";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  type: "sign-in" | "sign-up";
}

export function AuthenticationForm(props: Props) {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-primary px-7 py-10">
      <div className="flex w-full flex-col justify-center gap-8 rounded-lg bg-white px-4 py-8 drop-shadow-lg md:w-[600px]">
        <Image src="/logo-sm.svg" alt="Park.it" width={90} height={25} />
        <Header {...props} />
        <Form {...props} />
      </div>
    </div>
  );
}

function Header({ type }: Props) {
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

function Form({ type }: Props) {
  return (
    <form className="flex flex-col items-center gap-7">
      <main className="flex w-full flex-col gap-4">
        {type === "sign-up" ? <Input label="Name" placeholder="Name" /> : null}
        <Input type="email" label="Email" placeholder="Email" />

        <section className="flex flex-col gap-4 md:flex-row md:gap-4">
          <Input type="password" label="Password" placeholder="Password" />

          {type === "sign-up" ? (
            <Input
              type="password"
              label="Repeat password"
              placeholder="Repeat password"
            />
          ) : null}
        </section>
      </main>

      <footer className="flex w-full flex-col items-center gap-1.5">
        <Button className="w-full">
          Sign {type === "sign-in" ? "in" : "up"}
        </Button>

        <p className="text-sm">
          or sign {type === "sign-in" ? "up" : "in"}{" "}
          <Link
            href={`/authentication/sign-${type === "sign-in" ? "up" : "in"}`}
            className="underline"
          >
            clicking here
          </Link>
        </p>
      </footer>
    </form>
  );
}
