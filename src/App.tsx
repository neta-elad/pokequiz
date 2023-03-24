import { useState } from 'react'
import './App.css'
import PokeID from './pokequiz/PokeID'
import Pokemon from './pokequiz/Pokemon'
import getPokemon from './pokequiz/registery'

function App() {
  const [count, setCount] = useState(getRandomPokemon())
  const [hideName, setHideName] = useState(true)
  const [hideTypes, setHideTypes] = useState(true)
  const pokemon = getPokemon(count as PokeID)

  const changePokemon = (id: number) => {
    if (id < 1 || id > 151) {
      return
    }
    setHideName(true)
    setHideTypes(true)
    setCount(id)
  }

  const reveal = () => {
    setHideName(false)
    setHideTypes(false)
  }

  return (
    <div className="App">
      <button onClick={() => changePokemon(count - 1)}>Previous</button>
      <button onClick={() => changePokemon(getRandomPokemon())}>Random</button>
      <button onClick={() => changePokemon(count + 1)}>Next</button>
      <button onClick={() => setHideTypes(false)}>Hint</button>
      <button onClick={reveal}>Reveal</button>
      <Pokemon pokemon={pokemon} hideName={hideName} hideTypes={hideTypes} />
    </div>
  )
}

function getRandomPokemon() {
  return getRandomInt(1, 152)
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}


export default App
