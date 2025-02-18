"use client";

import { cn } from "@/libs/classnames";
import { type HTMLAttributes } from "react";
import {
  Controller,
  type ControllerProps,
  type ControllerRenderProps,
  useFormContext,
} from "react-hook-form";

export type ControlledFormItemProps = React.PropsWithChildren<
  {
    name: string;
    render: (
      props: Pick<ControllerRenderProps, "value" | "onChange" | "onBlur">,
    ) => React.ReactNode;
  } & Omit<ControllerProps, "render"> & {
      className?: HTMLAttributes<HTMLDivElement>["className"];
    }
>;

export function ControlledFormItem({
  name,
  className,
  render,
  ...props
}: ControlledFormItemProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      {...props}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        return (
          <div className={cn("flex flex-col gap-1", className)}>
            {render({ value, onChange, onBlur })}
            {!!error?.message && (
              <p className="text-xs text-red-500">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}
