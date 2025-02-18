"use client";

import { cn } from "@/libs/classnames";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactElement } from "react";
import { IconReload } from "../icons/reload";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-30 ",
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-primary/90 text-white",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground text-primary",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-success text-background hover:bg-success/90",
        text: "hover:bg-transparent !px-0",
      },
      size: {
        xs: "h-8 px-2",
        md: "h-10 p-2",
        lg: "h-12 rounded-md px-8",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> &
  VariantProps<typeof buttonVariants> & {
    label?: string;
    icon?: ReactElement;
    loading?: boolean;
    asChild?: boolean;
    iconPosition?: "start" | "end";
  };

export function Button({
  label,
  icon,
  loading,
  disabled,
  className,
  variant,
  size,
  asChild = false,
  iconPosition = "start",
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "flex w-full flex-row items-center text-base",
        icon || loading ? "gap-2" : "",
        buttonVariants({ variant, size, className }),
      )}
      disabled={disabled || loading}
      title={label}
      {...props}
    >
      {loading && <IconReload className="mr-2 h-4 w-4 animate-spin" />}
      {!loading && icon && iconPosition === "start" && icon}
      {label}
      {!loading && icon && iconPosition === "end" && icon}
    </Comp>
  );
}
