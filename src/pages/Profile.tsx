import React, {useContext} from 'react'
import Navbar from '../components/Navbar'
import Quiz from '../components/Admin/Quiz'
import { UserContext } from '../context/UserContext'

const Profile = () => {

    const user = useContext(UserContext);
  const admin = () => {
    if ( user.isAdmin! ) {
        return <Quiz />
      }
    }
  return (
    <>
      <Navbar />
      { admin() }
    </>

  )
}

export default Profile
