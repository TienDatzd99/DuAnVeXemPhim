import React, { useEffect, useState } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'
import { useDispatch, useSelector } from 'react-redux'


import MultipleRowSlick from '../../components/RSlick/MultipleRowSlick'
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction'
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapAction'
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel'
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction'
export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    const action = layDanhSachPhimAction();
    dispatch(action)
    dispatch(layDanhSachHeThongRapAction())
    dispatch(layThongTinNguoiDungAction())
  }, [])

  const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer)
  const { arrFilm } = useSelector(state => state.QuanLyPhimReducer)
  console.log(heThongRapChieu)



  return (
    <div>
      <HomeCarousel />
      <div className='container mx-auto'>

        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <MultipleRowSlick arrFilm={arrFilm} />
            {/* <div className="flex flex-wrap  " style={{ justifyContent: 'center' }}>
            {renderFilms()}
          </div> */}
          </div>
        </section>

        <HomeMenu rapChieu={heThongRapChieu} />
      </div>
    </div>
  )
}
