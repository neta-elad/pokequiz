import React from "react";

interface Props {
  children?: React.ReactNode;
  onClick: () => void;
}

function Button({ onClick, children }: Props) {
  return (
    <button
      className="w-24 p-0 bg-zinc-200 text-slate-900"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
