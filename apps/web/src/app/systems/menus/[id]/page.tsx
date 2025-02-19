"use client";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/input";
import { cn } from "@/libs/classnames";
import { UpdateMenuSchema } from "@/schemas/menu";
import { menuActions, menuState } from "@/stores/slices/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

type MenuDetailsParams = {
  id: string;
};

type FormData = z.infer<typeof UpdateMenuSchema>;

export default function MenuDetailsPage() {
  const { id } = useParams<MenuDetailsParams>();
  const dispatch = useDispatch();
  const { selectedMenu, isUpdating } = useSelector(menuState);
  const formMethods = useForm<FormData>({
    resolver: zodResolver(UpdateMenuSchema),
  });
  const {
    handleSubmit,
    setValue,
    reset,
    formState: { isDirty, isValid },
  } = formMethods;

  useEffect(() => {
    if (selectedMenu) {
      setValue("name", selectedMenu.name);
    }
  }, [selectedMenu, setValue]);

  function update(data: FormData) {
    if (isUpdating) {
      return;
    }

    dispatch(
      menuActions.updateMenu({
        id,
        dto: data,
        onSuccess: (updatedMenu) => {
          reset({
            name: updatedMenu.name,
          });
        },
      }),
    );
  }

  if (!selectedMenu) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-blue-gray-600">Menu ID</span>
        <div
          className={cn(
            "min-h-13 w-full rounded-2xl bg-blue-gray-50 px-4 py-[14px] text-blue-gray-500",
          )}
        >
          <span>{id}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-blue-gray-600">Depth</span>
        <div
          className={cn(
            "h-13 rounded-2xl bg-blue-gray-200 px-4 py-[14px] text-blue-gray-600",
            "w-full lg:w-1/2",
          )}
        >
          <span>{selectedMenu.depth}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-blue-gray-600">Parent Data</span>
        <div
          className={cn(
            "h-13 rounded-2xl bg-blue-gray-50 px-4 py-[14px] text-blue-gray-500",
            "w-full lg:w-1/2",
          )}
        >
          <span>{selectedMenu.parent?.name || ""}</span>
        </div>
      </div>
      <FormProvider {...formMethods}>
        <FormInput
          name="name"
          label="Name"
          inputProps={{
            placeholder: "Enter menu name",
            className: "w-full lg:w-1/2",
            readOnly: isUpdating,
          }}
          className="w-full"
        />
        <Button
          label="Save"
          className={cn("h-13 w-1/2 rounded-full")}
          onClick={handleSubmit(update)}
          loading={isUpdating}
          disabled={!isDirty || !isValid}
        />
      </FormProvider>
    </div>
  );
}
