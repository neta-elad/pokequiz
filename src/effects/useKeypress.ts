import { DependencyList, useEffect } from "react";

export default function useKeypress(
  listener: (
    this: Document,
    ev: HTMLElementEventMap["keypress"],
  ) => void | Promise<void>,
  deps?: DependencyList,
) {
  return useEffect(() => {
    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, deps);
}
