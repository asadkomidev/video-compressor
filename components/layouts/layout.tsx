import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

export const Main: FC<{ children: ReactNode }> = ({ children }) => {
  return <main className={cn("")}>{children}</main>;
};

export const Container: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("mx-auto max-w-7xl px-4", className)}>{children}</div>
  );
};

export const Header: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <header className={cn("", className)}>{children}</header>;
};

export const Section: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <section className={cn("", className)}>{children}</section>;
};
