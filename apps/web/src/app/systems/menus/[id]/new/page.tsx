"use client";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/input";
import { cn } from "@/libs/classnames";
import { CreateMenuSchema } from "@/schemas/menu";
import { menuActions, menuState } from "@/stores/slices/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

type CreateSubMenuParams = {
  id: string;
};

type FormData = z.infer<typeof CreateMenuSchema>;

export default function CreateSubMenuPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id: parentId } = useParams<CreateSubMenuParams>();
  const formMethods = useForm<FormData>({
    resolver: zodResolver(CreateMenuSchema),
  });
  const { selectedMenu, isCreating } = useSelector(menuState);
  const { handleSubmit } = formMethods;

  if (!selectedMenu) {
    return <></>;
  }

  function create(data: FormData) {
    if (isCreating) {
      return;
    }

    dispatch(
      menuActions.createMenu({
        dto: {
          ...data,
          parentId,
        },
        onSuccess: (id) => {
          router.push(`/systems/menus/${id}`);
        },
      }),
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-blue-gray-600">Depth</span>
        <div
          className={cn(
            "h-13 rounded-2xl bg-blue-gray-200 px-4 py-[14px] text-blue-gray-600",
            "w-full lg:w-1/2",
          )}
        >
          <span>{selectedMenu.depth + 1}</span>
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
          <span>{selectedMenu.name}</span>
        </div>
      </div>
      <FormProvider {...formMethods}>
        <FormInput
          name="name"
          label="Name"
          inputProps={{
            placeholder: "Enter menu name",
            className: "w-full lg:w-1/2",
          }}
          className="w-full"
        />
        <Button
          label="Create"
          className={cn("h-13 rounded-full", "w-full lg:w-1/2")}
          onClick={handleSubmit(create)}
        />
      </FormProvider>
    </div>
  );
}
