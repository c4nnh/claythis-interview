"use client";

import { Loading } from "@/components/composites/loading";
import { useOnMount } from "@/hooks/use-on-mount";
import { menuActions, menuState } from "@/stores/slices/menu";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

type MenuDetailsParams = {
  id: string;
};

export default function MenuDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useDispatch();
  const { id } = useParams<MenuDetailsParams>();
  const { isFetchingDetails } = useSelector(menuState);

  useOnMount(() => {
    dispatch(menuActions.getMenuDetails({ id }));
  });

  if (isFetchingDetails) {
    return <Loading />;
  }

  return children;
}
