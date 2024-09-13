import React, { useEffect } from 'react'
import Header from './Layout/Header/Header'
import HomeCarousel from './Layout/HomeCarousel/HomeCarousel'
import Footer from './Layout/Footer/Footer'

export default function HomeTemplate({Component}) {
  useEffect(()=>{
    window.scrollTo(0,0)
  })
  return (
   <>
   <Header/>
  
   <Component/>
   <Footer/>
   </>
  )
}
