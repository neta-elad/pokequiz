import React from "react";

interface Props {
    children?: React.ReactNode
    onClick: () => void
}

function Button({onClick, children}: Props) {
    return (
        <button className="inline-block w-24 mb-2 mr-2 p-0 bg-zinc-200" onClick={onClick}>
            {children}
        </button>
    )
}

export default Button