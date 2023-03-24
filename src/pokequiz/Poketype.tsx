enum PoketypeEnum {
    normal,
    fire,
    fighting,
    water,
    flying,
    grass,
    poison,
    electric,
    ground,
    psychic,
    rock,
    ice,
    bug,
    dragon,
    ghost,
    dark,
    steel,
    fairy,
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
            ${"bg-poke" + poketype}
            `}>{poketype}</div>
    )
}


export default Poketype