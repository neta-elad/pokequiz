import PokeID from "./PokeID";

export interface PokeimageProps {
  pokeid: PokeID;
}

function Pokeimage({ pokeid }: PokeimageProps) {
  return <img src={getPokeimageUrl(pokeid)} />;
}

export function getPokeimageUrl(id: PokeID): string {
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${("" + id).padStart(3, "0")}.png`;
}

export default Pokeimage;
