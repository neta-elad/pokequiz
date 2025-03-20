import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { getRandom } from './pokequiz/PokeID'

export default function RandomRedirector() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(`/${getRandom()}`)
  }, [])

  return (
    <>
    </>
  )
}
