import { DependencyList, useEffect } from "react";

export default function useKeypress(
  listener: (
    this: HTMLElement,
    ev: HTMLElementEventMap["keypress"],
  ) => void | Promise<void>,
  deps?: DependencyList,
) {
  return useEffect(() => {
    document.body.addEventListener("keydown", listener);

    return () => {
      document.body.removeEventListener("keydown", listener);
    };
  }, deps);
}
