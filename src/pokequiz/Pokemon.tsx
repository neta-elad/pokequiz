import PokeID from "./PokeID";
import Pokeimage from "./Pokeimage";
import Poketype, { PoketypeType } from "./Poketype";

export type PokemonType = {
  pokeid: PokeID;
  name: string;
  types: Array<PoketypeType>;
};

export interface PokemonProps {
  pokemon: PokemonType;
  hideName: boolean;
  hideTypes: boolean;
}

function Pokemon({ pokemon, hideName, hideTypes }: PokemonProps) {
  return (
    <div>
      <h1 className={`text-3xl capitalize ${invisibleIf(hideName)}`}>
        {pokemon.name}
      </h1>
      <Pokeimage pokeid={pokemon.pokeid} />
      <div className={`text-left mx-8 ${invisibleIf(hideTypes)}`}>
        {pokemon.types.map((poketype) => (
          <Poketype key={poketype} poketype={poketype} />
        ))}
      </div>
    </div>
  );
}

function invisibleIf(condition: boolean): string {
  return condition ? "invisible" : "";
}

export default Pokemon;
