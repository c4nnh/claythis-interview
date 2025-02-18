"use client";

import * as React from "react";
import { type ControllerProps } from "react-hook-form";

import { cn } from "@/libs/classnames";
import { ControlledFormItem } from "./controlled-form-item";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "h-13 rounded-2xl bg-blue-gray-50 px-4 py-[14px]",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export type FormInputProps = React.PropsWithChildren<
  {
    name: string;
    label: string;
  } & Omit<ControllerProps, "render"> & {
      inputProps?: InputProps;
      className?: React.HTMLAttributes<HTMLDivElement>["className"];
    }
>;

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    { inputProps = {}, name, label, className, ...controlledFormItemProps },
    ref,
  ) => {
    return (
      <ControlledFormItem
        name={name}
        className={className}
        {...controlledFormItemProps}
        render={({ value, onChange, onBlur }) => (
          <div className="flex flex-col items-start gap-2">
            <label
              className="text-sm font-normal text-blue-gray-600"
              htmlFor={name}
            >
              {label}
            </label>
            <Input
              id={name}
              ref={ref}
              {...{ value, onChange, onBlur }}
              {...inputProps}
            />
          </div>
        )}
      />
    );
  },
);
FormInput.displayName = "FormInput";

export { FormInput, Input };
