"use client";

import { useOnMount } from "@/hooks/use-on-mount";
import { useRouter } from "next/navigation";

export default function Root() {
  const router = useRouter();

  useOnMount(() => router.push("/systems/menus"));

  return <></>;
}
