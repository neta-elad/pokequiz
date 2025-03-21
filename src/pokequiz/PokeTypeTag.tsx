import { PokeType } from "../models/Pokemon";

export interface PoketypeProps {
  poketype: PokeType;
}

export default function PokeTypeTag({ poketype }: PoketypeProps) {
  return (
    <div
      className={`
            inline-block w-24 mr-2
            font-bold text-white text-center capitalize
            rounded-full border-2 border-slate-600
            ${"bg-poke" + poketype}
            `}
    >
      {poketype}
    </div>
  );
}
