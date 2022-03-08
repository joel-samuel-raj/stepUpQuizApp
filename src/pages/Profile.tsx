import React, {useContext} from 'react'
import { UserContext } from '../context/UserContext'

const Profile = () => {

    const value = useContext(UserContext);

  return (
    <div>{JSON.stringify(value)}</div>
  )
}

export default Profile
