import { useEffect, useState, Key, useMemo } from "react";

import Button from "./Button";
import useKeypress from "../hooks/useKeypress";
import useClickOutside from "../hooks/useClickOutside";

export interface Option<T, K extends Key> {
  key: K;
  value: T;
  label?: string;
}

interface Props<T, K extends Key> {
  options: Array<Option<T, K>>;
  className?: string;
  trigger?: string | JSX.Element;
  onChange?: (values: Array<T>) => void;
  selected?: Array<K>;
}

export default function MultiSelect<T, K extends Key>({
  options,
  className = "",
  trigger = "Select",
  selected,
  onChange,
}: Props<T, K>) {
  if (!selected) {
    selected = [options[0].key]; // Ensure at least one selected
  }

  const [selectedOptions, setSelectedOptions] = useState(selected);
  const [isOpen, setIsOpen] = useState(false);
  const keyToValue = useMemo(
    () => new Map(options.map((option) => [option.key, option.value])),
    [options],
  );

  useEffect(() => {
    if (!onChange) {
      return;
    }
    onChange(
      selectedOptions.map((key) => keyToValue.get(key)).filter(notEmpty),
    );
  }, [selectedOptions, keyToValue]);

  const menu = useClickOutside<HTMLDivElement>(
    () => setIsOpen(false),
    [isOpen],
  );

  useKeypress(
    (event) => {
      if (isOpen && event.key === "Escape") {
        setIsOpen(false);
      }
    },
    [isOpen],
  );

  const toggleOption = (key: K) => {
    if (selectedOptions.includes(key)) {
      if (selectedOptions.length > 1) {
        setSelectedOptions(selectedOptions.filter((item) => item !== key));
      }
    } else {
      setSelectedOptions([...selectedOptions, key]);
    }
  };

  const selectAll = () =>
    setSelectedOptions(options.map((option) => option.key));

  const clearAll = () => {
    setSelectedOptions([options[0].key]); // Keep at least one selected
  };

  if (typeof trigger === "string") {
    trigger = <Button onClick={() => setIsOpen(!isOpen)}>{trigger}</Button>;
  } else {
    trigger = <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>;
  }

  return (
    <div className={className}>
      <div className="relative w-fit">
        {/* Settings button */}
        {trigger}

        {/* Tooltip (Dropdown) */}
        {isOpen && (
          <div
            ref={menu}
            className="absolute bottom-full end-1/4 mb-2
          w-48 bg-zinc-100 dark:bg-zinc-700 shadow-lg rounded-lg 
          p-2 border border-gray-200"
          >
            {/* Actions */}
            <div className="flex justify-between gap-2 mb-1">
              <Button onClick={selectAll}>All</Button>
              <Button onClick={clearAll}>Clear</Button>
            </div>
            {/* Options List */}
            <div className="flex flex-col gap-2">
              {options.map((option) => (
                <label
                  key={option.key}
                  className="flex items-center gap-2 select-none cursor-pointer capitalize"
                >
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option.key)}
                    onChange={() => toggleOption(option.key)}
                    className="w-4 h-4"
                  />
                  {option.label || String(option.key)}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}
