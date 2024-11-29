import React, { useEffect } from 'react'
import Header from './Layout/Header/Header'
import HomeCarousel from './Layout/HomeCarousel/HomeCarousel'
import Footer from './Layout/Footer/Footer'

export default function HomeTemplate({Component}) {
  useEffect(()=>{
    window.scrollTo(0,0)
  })
  return (
    <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">
      <Component />
    </main>
    <Footer />
  </div>
  )
}
