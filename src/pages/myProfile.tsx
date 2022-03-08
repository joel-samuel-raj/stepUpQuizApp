import React, {useContext} from 'react'
import { Appcontext } from './appcontext'

const myProfile = () => {

    const value = useContext(Appcontext);

  return (
    <div>{value}</div>
  )
}

export default myProfile
