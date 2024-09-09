import React from 'react'
import { USER_LOGIN } from '../../util/settings/config'
import { Navigate } from 'react-router-dom'


export default function CheckoutTemplate({Component}) {
    // if(!localStorage.getItem(USER_LOGIN)){
    //     return <Navigate to='/login'></Navigate>
    // }
  return (
   <>
  
   <Component/>

   </>
  )
}
