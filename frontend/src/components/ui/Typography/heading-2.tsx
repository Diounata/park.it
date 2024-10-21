import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

export function Heading2({ children, className }: Props) {
  return (
    <h2
      className={`scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
    >
      {children}
    </h2>
  );
}
