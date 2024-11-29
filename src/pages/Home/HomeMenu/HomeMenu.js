import React, { Fragment, useState } from 'react';
import { Tabs, Radio } from 'antd';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './HomeMenu.module.css';  // Đảm bảo đường dẫn chính xác

const { TabPane } = Tabs;

export default function HomeMenu(props) {
  // Lấy thông tin người dùng từ Redux store
  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
  const [tabPosition, setTabPosition] = useState('left');

  // Thay đổi vị trí của các tab
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  console.log('props.rapChieu', props.rapChieu);

  // Kiểm tra trạng thái đăng nhập và trả về URL phù hợp
  const kiemTraDangNhap = (lichChieu) => {
    return userLogin.accessToken
      ? `/checkout/${lichChieu.maLichChieu}`
      : `/login`;
  };

  // Render danh sách các hệ thống rạp chiếu
  const renderHeThongRap = () => {
    return props.rapChieu?.slice(0, 8).map((heThongRap, index) => (
      console.log('heThongRap', heThongRap),
      <TabPane
        tab={<img src={heThongRap.logo} className='rounded-full' width="50" alt={`Logo ${index}`} />}
        key={index}
      >
        <Tabs tabPosition={tabPosition}>
          {heThongRap.lstCumRap?.map((cumRap, index) => (
            console.log('cumRap', cumRap),
            <TabPane
              tabPosition={tabPosition}
              tab={
                <div style={{ width: '300px', display: 'flex' }}>
                  <img src={cumRap.hinhAnh} className='rounded-full' width="50" alt={`Logo ${index}`} />
                  <div className='text-left ml-2'>
                    {cumRap.tenCumRap}
                    <p className='text-red-400'>Chi Tiết</p>
                  </div>
                </div>
              }
              key={index}
            >
              {cumRap.danhSachPhim?.slice(0, 10).map((phim, index) => (
                console.log('phiss', cumRap.danhSachPhim),
                <Fragment key={index}>
                  <div className='my-5'>
                    <div className='flex flex-row'>
                      <img
                        style={{ height: 100, width: 75 }}
                        src={phim.hinhAnh}
                        alt={phim.tenPhim}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://picsum.photos/75/75";  // Hình ảnh dự phòng
                        }}
                      />
                      <div className="ml-2">
                        <h1 className='text-2xl text-green-700'>{phim.tenPhim}</h1>
                        <p>{cumRap.diaChi}</p>
                        <div className="grid grid-cols-6 gap-6">
                          {phim.lstLichChieuTheoPhim?.slice(0, 12).map((lichChieu, index) => (
                            <NavLink
                              className="rounded text-center font-medium text-xl px-1 bg-gray-800 text-white"
                              to={kiemTraDangNhap(lichChieu)}
                              key={index}
                            >
                              {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              ))}
            </TabPane>
          ))}
        </Tabs>
      </TabPane>
    ));
  };

  return (
    <>
      <Radio.Group onChange={changeTabPosition} value={tabPosition}>
        <Radio value="left">Trái</Radio>
        <Radio value="right">Phải</Radio>
        <Radio value="top">Trên</Radio>
        <Radio value="bottom">Dưới</Radio>
      </Radio.Group>
      <Tabs tabPosition={tabPosition}>
        {renderHeThongRap()}
      </Tabs>
    </>
  );
}