import PokeID from "./PokeID";
import { PokemonType } from "./Pokemon";

import registry from "./registry.json"

function getPokemon(pokeid: PokeID): PokemonType {
    return registry[pokeid + "" as keyof typeof registry] as PokemonType
}

export default getPokemon