import PokeID from "./PokeID"
import Pokeimage from "./Pokeimage"
import Poketype, { PoketypeType } from "./Poketype"

export type PokemonType = {
    pokeid: PokeID,
    name: string,
    types: Array<PoketypeType>,
}

export interface PokemonProps {
    pokemon: PokemonType,
}

function Pokemon({pokemon}: PokemonProps) {
    return (
        <div>
            <h1 className="font-3xl capitalize">{pokemon.name}</h1>
            <Pokeimage pokeid={pokemon.pokeid} />
            <div className="text-left mx-8">
                {pokemon.types.map(poketype => <Poketype poketype={poketype} />)}
            </div>
        </div>
    )
}

export default Pokemon