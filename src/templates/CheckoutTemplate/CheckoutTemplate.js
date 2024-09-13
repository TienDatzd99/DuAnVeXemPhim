import React, { useEffect } from 'react'
import { USER_LOGIN } from '../../util/settings/config'
import { Navigate } from 'react-router-dom'


export default function CheckoutTemplate({Component}) {
    // if(!localStorage.getItem(USER_LOGIN)){
    //     return <Navigate to='/login'></Navigate>
    // }
    useEffect(()=>{
      window.scrollTo(0,0)
    })


  return (
   <>
  
   <Component/>

   </>
  )
}
