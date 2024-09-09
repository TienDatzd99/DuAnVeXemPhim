import React from 'react'
import './UserTemplate.css'
export default function UserTemplate({ Component }) {
    return (
        <div className='background-image' style={{ backgroundImage: 'url(https://movie-booking-project.vercel.app/img/bgAuth.jpg)', width: '100vw' }}>


          <Component/>

        </div>
    )
}
