import React, { useContext } from 'react'
import { UserProfileCard } from '../components'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'


const Profile = () => {
  const { memberData } = useContext(AuthContext);

  return (
    <div>
      {memberData
        ?
        <UserProfileCard user={memberData} />
        :
        <Navigate to="/admission-form" />
      }
    </div>
  )
}

export default Profile