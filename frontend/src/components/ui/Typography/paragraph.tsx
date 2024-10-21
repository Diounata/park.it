import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

export function Paragraph({ children, className }: Props) {
  return <p className={`leading-7 ${className}`}>{children}</p>;
}
