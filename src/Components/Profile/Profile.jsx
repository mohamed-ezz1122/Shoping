import React, { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import jwtDecode from 'jwt-decode'

export default function Profile() {
    let {userProfile}=useContext(UserContext)
    let decodedToken=localStorage.getItem('userToken')
    let decodeToken=jwtDecode(decodedToken)
  return <>
  <div className="bg-body-tertiary mt-3 ">
  <h2 className='text-main fw-bolder mb-3 '> Hello: {userProfile?.name}</h2>
  <h2 className='text-main fw-bolder '> Email: {userProfile?.email}</h2>

  </div>
  
  
  
  </>
  
}
