import { useState } from 'react'
import './App.css'
import PokeID from './pokequiz/PokeID'
import Pokemon from './pokequiz/Pokemon'
import Button from './pokequiz/Button'
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

  const onClick = () => {
    if (hideName) {
      reveal()
    } else {
      changePokemon(getRandomPokemon())
    }
  }

  return (
    <div className="App">
      <div>
        <Button onClick={() => changePokemon(count - 1)}>Previous</Button>
        <Button onClick={() => changePokemon(getRandomPokemon())}>Random</Button>
        <Button onClick={() => changePokemon(count + 1)}>Next</Button>
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

function getRandomPokemon() {
  return getRandomInt(1, 152)
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}


export default App
