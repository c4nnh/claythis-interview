import { useEffect } from "react";

export function useOnMount(cb: () => void) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(cb, []);
}
