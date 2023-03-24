import PokeID from "./PokeID";
import { PokemonType } from "./Pokemon";

import registery from "./registery.json"

function getPokemon(pokeid: PokeID): PokemonType {
    return registery[pokeid + ""] as PokemonType
}

export default getPokemon