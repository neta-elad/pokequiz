type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

type PokeID = IntRange<1, 152>

export function clamp(id: number | string | undefined): PokeID {
  id = +(id || '')
  if (id < 1) {
    return 1
  } else if (id > 151) {
    return 151
  }
  return id as PokeID
}

export default PokeID