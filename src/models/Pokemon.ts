export enum _PoketypeEnum {
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

export type PokeType = keyof typeof _PoketypeEnum;

export interface Pokemon {
  name: string;
  types: Array<PokeType>;
}
