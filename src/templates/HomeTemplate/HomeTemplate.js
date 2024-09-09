import React from 'react'
import Header from './Layout/Header/Header'
import HomeCarousel from './Layout/HomeCarousel/HomeCarousel'
import Footer from './Layout/Footer/Footer'

export default function HomeTemplate({Component}) {
  return (
   <>
   <Header/>
  
   <Component/>
   <Footer/>
   </>
  )
}
