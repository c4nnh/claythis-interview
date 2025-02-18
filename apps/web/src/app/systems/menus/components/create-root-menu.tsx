"use client";

import { IconPlus } from "@/components/icons/plus";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormInput } from "@/components/ui/input";
import { CreateMenuSchema } from "@/schemas/menu";
import { menuActions, menuState } from "@/stores/slices/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

type FormData = z.infer<typeof CreateMenuSchema>;

export function CreateRootMenu() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isCreating } = useSelector(menuState);
  const formMethods = useForm<FormData>({
    resolver: zodResolver(CreateMenuSchema),
  });
  const { handleSubmit, reset } = formMethods;
  const [open, setOpen] = useState(false);

  function create(data: FormData) {
    if (isCreating) {
      return;
    }

    dispatch(
      menuActions.createMenu({
        dto: data,
        onSuccess: (id) => {
          router.push(`/systems/menus/${id}`);
          reset({
            name: "",
          });
          setOpen(false);
        },
      }),
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          title="Create root menu"
          className="h-13 w-13 rounded-full"
          icon={<IconPlus className="h-6 w-6" />}
        />
      </DialogTrigger>
      <FormProvider {...formMethods}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create root menu</DialogTitle>
            <DialogDescription>
              A new menu will be added into list.
            </DialogDescription>
          </DialogHeader>
          <FormInput
            name="name"
            label="Name"
            inputProps={{
              placeholder: "Enter menu name",
              className: "w-full",
            }}
            className="w-full"
          />
          <DialogFooter>
            <Button
              label="Create"
              className="h-13 rounded-full"
              onClick={handleSubmit(create)}
            />
          </DialogFooter>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
