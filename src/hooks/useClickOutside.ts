import { DependencyList, useRef, useEffect, RefObject } from "react";

export default function useClickOutside<T extends HTMLElement>(
  callback: () => void,
  deps?: DependencyList,
): RefObject<T> {
  const ref = useRef<T>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
        event.stopPropagation();
      }
    }

    document.body.addEventListener("click", handleClickOutside, true);

    return () => {
      document.body.removeEventListener("click", handleClickOutside, true);
    };
  }, deps);

  return ref;
}
