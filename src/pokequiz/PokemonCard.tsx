import { getPokemon } from "../models/registry";
import PokeImage from "./PokeImage";
import PokeTypeTag from "./PokeTypeTag";

export interface PokemonProps {
  id: number;
  hideName: boolean;
  hideTypes: boolean;
}

export default function PokemonCard({ id, hideName, hideTypes }: PokemonProps) {
  const pokemon = getPokemon(id);
  return (
    <div>
      <h1 className={`text-3xl capitalize ${invisibleIf(hideName)}`}>
        {pokemon.name}
      </h1>
      <PokeImage id={id} />
      <div className={`text-left mx-8 ${invisibleIf(hideTypes)}`}>
        {pokemon.types.map((poketype) => (
          <PokeTypeTag key={poketype} poketype={poketype} />
        ))}
      </div>
    </div>
  );
}

function invisibleIf(condition: boolean): string {
  return condition ? "invisible" : "";
}
