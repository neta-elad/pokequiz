export interface PokeImageProps {
  id: number;
}

export default function PokeImage({ id }: PokeImageProps) {
  return <img src={getPokeImageUrl(id)} />;
}

export function getPokeImageUrl(id: number): string {
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(id).padStart(3, "0")}.png`;
}
