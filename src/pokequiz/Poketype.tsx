enum PoketypeEnum {
    normal,
    fighting,
    flying,
}

export type PoketypeType = keyof typeof PoketypeEnum

export interface PoketypeProps {
    poketype: PoketypeType
}

function Poketype({poketype}: PoketypeProps) {
    return (
        <div className={`
            inline-block w-24 mr-2
            font-bold text-white text-center capitalize
            rounded-full border-2 border-slate-600
            ${backgroundColor(poketype)}
            `}>{poketype}</div>
    )
}

function backgroundColor(poketype: PoketypeType): string {
    switch (poketype) {
        case "normal": return "bg-zinc-400"
        case "fighting": return "bg-red-800"
        case "flying": return "bg-violet-400"
    }
}

export default Poketype