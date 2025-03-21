import { useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router";

import useKeypress from "../effects/useKeypress";
import useSwipe from "../effects/useSwipe";
import Pokemon from "./PokemonCard";
import Button from "../components/Button";
import { getPokeImageUrl } from "./PokeImage";
import { RegionList } from "../models/Region";

export interface PokeQuizProps {
  regions: RegionList;
}

export default function PokeQuiz({ regions }: PokeQuizProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hideName, setHideName] = useState(true);
  const [hideTypes, setHideTypes] = useState(true);
  const [loading, setLoading] = useState(false);

  const pokeId = regions.toId(id);

  if (String(pokeId) !== String(id)) {
    return <Navigate to={`/${pokeId}`} replace />;
  }

  const changePokemon = async (id: number) => {
    const pokeId = id;
    const preloadPromise = preloadImage(pokeId);
    const loaded = await Promise.race([preloadPromise, timeout(25)]);
    if (!loaded) {
      setLoading(true);
      await Promise.all([preloadPromise, timeout(125)]);
      setLoading(false);
    }
    setHideName(true);
    setHideTypes(true);
    navigate(`/${pokeId}`);
  };

  const prevPokemon = async () => {
    await changePokemon(regions.prevId(pokeId));
  };

  const nextPokemon = async () => {
    await changePokemon(regions.nextId(pokeId));
  };

  useSwipe(prevPokemon, nextPokemon, [id]);

  const randomPokemon = async () => {
    await changePokemon(regions.getRandom());
  };

  const reveal = () => {
    setHideName(false);
    setHideTypes(false);
  };

  const onClick = async () => {
    if (hideName) {
      reveal();
    } else {
      await randomPokemon();
    }
  };

  useKeypress(
    async (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          return await prevPokemon();
        case "ArrowRight":
          return await nextPokemon();
        case " ":
          event.preventDefault();
          return await onClick();
      }
    },
    [id, hideName],
  );

  return (
    <div className="PokeQuiz">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      <div>
        <Button onClick={prevPokemon}>Previous</Button>
        <Button onClick={randomPokemon}>Random</Button>
        <Button onClick={nextPokemon}>Next</Button>
      </div>
      <div onClick={onClick}>
        <Pokemon id={pokeId} hideName={hideName} hideTypes={hideTypes} />
      </div>
    </div>
  );
}

async function preloadImage(id: number) {
  await new Promise((resolve) => {
    const image = new Image();
    image.src = getPokeImageUrl(id);
    image.onload = resolve;
  });
  return true;
}

async function timeout(durationInMs: number) {
  await new Promise((resolve) => setTimeout(resolve, durationInMs));
  return false;
}
