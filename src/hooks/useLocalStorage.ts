import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialState: T | (() => T),
  deserialize: (stored: string) => T = JSON.parse,
  serialize: (value: T) => string = JSON.stringify,
): [T, (value: T) => void] {
  const [value, setValue] = useState(initialState);
  const [loadedStored, setLoadedStored] = useState(false);

  const storedValue = window.localStorage.getItem(key);
  if (!loadedStored) {
    if (storedValue !== null) {
      setValue(deserialize(storedValue));
    }
    setLoadedStored(true);
  }

  useEffect(() => {
    if (!loadedStored) {
      return;
    }
    window.localStorage.setItem(key, serialize(value));
  }, [loadedStored, value]);

  return [value, setValue];
}
