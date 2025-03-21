import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import useKeypress from "../effects/useKeypress";

export interface Option<T> {
  value: T;
  label?: string;
}

interface Props<T> {
  className?: string;
  trigger?: string | JSX.Element;
  options: Array<Option<T>>;
  onChange?: (values: Array<T>) => void;
}

export default function MultiSelect<T>({
  className = "",
  options,
  trigger = "Select",
  onChange,
}: Props<T>) {
  const [selectedOptions, setSelectedOptions] = useState([0]); // Ensure at least one selected
  const [isOpen, setIsOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onChange) {
      return;
    }
    onChange(selectedOptions.map((key) => options[key].value));
  }, [options, selectedOptions]);

  useKeypress(
    (event) => {
      if (isOpen && event.key === "Escape") {
        setIsOpen(false);
      }
    },
    [isOpen],
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        menu.current &&
        !menu.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        event.stopPropagation();
      }
    }

    document.body.addEventListener("click", handleClickOutside, true);

    return () => {
      document.body.removeEventListener("click", handleClickOutside, true);
    };
  }, [isOpen]);

  const toggleOption = (id: number) => {
    if (selectedOptions.includes(id)) {
      if (selectedOptions.length > 1) {
        setSelectedOptions(selectedOptions.filter((item) => item !== id));
      }
    } else {
      setSelectedOptions([...selectedOptions, id]);
    }
  };

  const selectAll = () => setSelectedOptions(options.map((_option, i) => i));

  const clearAll = () => {
    setSelectedOptions([0]); // Keep at least one selected
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
              {options.map((option, i) => (
                <label
                  key={i}
                  className="flex items-center gap-2 select-none cursor-pointer capitalize"
                >
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(i)}
                    onChange={() => toggleOption(i)}
                    className="w-4 h-4"
                  />
                  {option.label || String(option.value)}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
