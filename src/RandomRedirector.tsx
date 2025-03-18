import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { getRandomPokemon } from './App'

export default function RandomRedirector() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(`/${getRandomPokemon()}`)
  }, [])

  return (
    <>
    </>
  )
}
