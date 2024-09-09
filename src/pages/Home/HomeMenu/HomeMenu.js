import { render } from '@testing-library/react';
import { Radio, Space, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { Fragment, useState } from 'react'
import moment from 'moment';
import StyleMenu from './HomeMenu.css'
import { NavLink } from 'react-router-dom';


export default function HomeMenu(props) {
  console.log("asdd", props)
  const [tabPosition, setTabPosition] = useState('left')
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value)
  }

  const renderHeThongRap = () => {
    return props.rapChieu?.slice(0,8).map((heThongRap, index) => {
      return (
        <Tabs.TabPane
          tab={<img src={heThongRap.logo} className='rounded-full' width="50" alt={`Logo ${index}`} />}
          key={index} >
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap?.map((cumRap, index) => {
              return <TabPane tabPosition={tabPosition}
                tab={
                  <div style={{ width: '300px', display: 'flex' }} >
                    <img src={cumRap.hinhAnh} className='rounded-full' width="50" alt={`Logo ${index}`} />
                    <div className='text-left ml-2'>
                      {cumRap.tenCumRap}
                      <p className='text-red-400'>Chi Tiết</p>
                    </div>


                  </div>} key={index}>
                {cumRap.danhSachPhim?.slice(95, 101).map((phim, index) => {
                  return <Fragment>
                    <div className=' my-5'>
                      <div className='flex flex-row'>
                        <img style={{ height: 100, width: 75 }} src={phim.hinhAnh} alt={phim.tenPhim} onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/75/75" }} />

                        <div className="ml-2">
                          <h1 className=' text-2xl text-green-700'>{phim.tenPhim}</h1>
                          <p>{cumRap.diaChi}</p>
                          <div className="grid grid-cols-6 gap-6">
                            {phim.lstLichChieuTheoPhim?.slice(0, 12).map((lichChieu, index) => {
                              return <NavLink className="rounded text-center font-medium text-xl px-1 bg-gray-800 text-white" to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                              </NavLink>
                            })}
                          </div>
                        </div>
                      </div>

                    </div>
                    <hr />
                  </Fragment>
                })}

              </TabPane>
            })}

          </Tabs>
        </Tabs.TabPane >
      );
    });
  };

  return (
    <Tabs tabPosition={tabPosition}>
      {renderHeThongRap()}
    </Tabs>
  );

}
