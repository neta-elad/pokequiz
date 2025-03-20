type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

const MIN_ID = 1;
const ONE_OVER_MAX_ID = 152;
const RANGE = ONE_OVER_MAX_ID - MIN_ID;

type PokeID = IntRange<typeof MIN_ID, typeof ONE_OVER_MAX_ID>;

export function toPokeID(id: number | string | undefined): PokeID {
  id = +(id || "");
  if (id < MIN_ID) {
    return (ONE_OVER_MAX_ID + (id % RANGE) - 1) as PokeID;
  } else if (id >= ONE_OVER_MAX_ID) {
    return (MIN_ID + ((id - MIN_ID) % RANGE)) as PokeID;
  }
  return id as PokeID;
}

export function getRandom(): PokeID {
  return getRandomInt(MIN_ID, ONE_OVER_MAX_ID) as PokeID;
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export default PokeID;
