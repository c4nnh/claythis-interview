"use client";

import { useOnMount } from "@/hooks/use-onmount";
import { useRouter } from "next/navigation";

export default function Root() {
  const router = useRouter();

  useOnMount(() => router.push("/systems/menus"));

  return <></>;
}
