import { Pokemon } from "./Pokemon";
import { Region } from "./Region";

import { pokemons, regions as regions } from "./registry.json";

type PokemonKey = keyof typeof pokemons;
export type RegionName = keyof typeof regions;

export function getPokemon(id: number): Pokemon {
  return pokemons[String(id) as PokemonKey] as Pokemon;
}

export function getRegion(region?: RegionName): Region {
  if (!region) {
    return Object.values(regions)[0];
  }
  return regions[region];
}

export const REGIONS: {
  [K in RegionName]: Region;
} = regions;

export default getPokemon;
