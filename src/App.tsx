import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'

import './App.css'
import PokeID, { clamp } from './pokequiz/PokeID'
import Pokemon from './pokequiz/Pokemon'
import Button from './pokequiz/Button'
import getPokemon from './pokequiz/registry'
import { getPokeimageUrl } from './pokequiz/Pokeimage'

function App() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [hideName, setHideName] = useState(true)
  const [hideTypes, setHideTypes] = useState(true)
  const [loading, setLoading] = useState(false)

  const pokeId = clamp(id)
  const pokemon = getPokemon(pokeId)

  const changePokemon = async (id: number) => {
    const pokeId = clamp(id)
    const preloadPromise = preloadImage(pokeId)
    const loaded = await Promise.race([preloadPromise, timeout(25)])
    if (!loaded) {
      setLoading(true)
      await Promise.all([preloadPromise, timeout(125)])
      setLoading(false)
    }
    setHideName(true)
    setHideTypes(true)
    navigate(`/${pokeId}`)
  }

  const reveal = () => {
    setHideName(false)
    setHideTypes(false)
  }

  const onClick = () => {
    if (hideName) {
      reveal()
    } else {
      changePokemon(getRandomPokemon())
    }
  }

  return (
    <div className="App">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      <div>
        <Button onClick={async () => changePokemon(pokeId - 1)}>Previous</Button>
        <Button onClick={async () => changePokemon(getRandomPokemon())}>Random</Button>
        <Button onClick={async () => changePokemon(pokeId + 1)}>Next</Button>
      </div>
      <div>
        <Button onClick={() => setHideTypes(false)}>Hint</Button>
        <Button onClick={reveal}>Reveal</Button>
      </div>
      <div onClick={onClick}>
        <Pokemon pokemon={pokemon} hideName={hideName} hideTypes={hideTypes} />
      </div>
    </div>
  )
}

export function getRandomPokemon(): PokeID {
  return clamp(getRandomInt(1, 152))
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

async function preloadImage(id: PokeID) {
  await new Promise(resolve => {
    const image = new Image()
    image.src = getPokeimageUrl(id)
    image.onload = resolve
  })
  return true
}

async function timeout(durationInMs: number) {
  await new Promise(resolve => setTimeout(resolve, durationInMs))
  return false
}

export default App
