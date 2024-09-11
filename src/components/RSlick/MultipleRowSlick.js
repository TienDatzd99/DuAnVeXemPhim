import React, { useState } from 'react'
import Slider from 'react-slick';
import styleSlick from './MultipleRowSlick.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Film from '../Film/Film'
import Film_Flip from "../Film/Film_Flip";
import { type } from '@testing-library/user-event/dist/type';
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from '../../redux/actions/types/QuanLyPhimType';
function SampleNextArrow(props) {
  const { className, style, onClick } = props;




  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
    </div>

  );
}



function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}

      style={{ ...style, display: "block", left: '-50px' }}
      onClick={onClick}
    >
    </div>
  );
}
export default function MultipleRowSlick(props) {



  const renderFilms = () => {

    return props.arrFilm.slice(0, 12).map((item, index) => {
      return <div className="mt-2" key={index}  >
        <Film_Flip className={`${styleSlick['width-item']}`} item={item} />
      </div>
    })
  }
  const dispatch = useDispatch();
  const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer);

  let activeClassDC = dangChieu === true ? 'active_Film' : 'none_active_Film'
  let activeClassSC = sapChieu === true ? 'active_Film' : 'none_active_Film'

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <div className='flex mb-8 justify-center'>
        <button className={`${styleSlick[activeClassDC]} ${styleSlick['jss78']} duration-150 hover:scale-125 hover:text-orange-400  rounded text-black mr-7` }  onClick={() => {
          const action = { type: SET_FILM_DANG_CHIEU }

          dispatch(action)
        }}
        >PHIM ĐANG CHIẾU</button>
        <button className={`${styleSlick[activeClassSC]} ${styleSlick['jss78']} duration-150 hover:scale-125 hover:text-orange-400  rounded text-black ml-7`
        } onClick={() => {
          const action = {
            type: SET_FILM_SAP_CHIEU
          }
          dispatch(action)
        }}>PHIM SẮP CHIẾU</button>
      </div>
      <Slider {...settings}>
        {renderFilms()}

      </Slider>
    </div>
  )
}
