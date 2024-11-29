// src/pages/Profile/Profile.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Profile.module.css';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import _ from 'lodash';

export default function Profile() {
  const dispatch = useDispatch();
  const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

  console.log("thongTinNguoiDung", thongTinNguoiDung);

  useEffect(() => {
    // Kiểm tra xem thông tin người dùng đã được tải chưa
    if (!thongTinNguoiDung || Object.keys(thongTinNguoiDung).length === 0) {
      const userLogin = JSON.parse(localStorage.getItem('userLogin'));
      if (userLogin && userLogin.accessToken) {
        dispatch(layThongTinNguoiDungAction(userLogin.taiKhoan));
      }
    }
  }, [dispatch, thongTinNguoiDung]);

  const renderTicketItem = () => {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      const seats = _.first(ticket.danhSachGhe);

      return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="Phim"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={ticket.hinhAnh}
            />
            <div className="flex-grow">
              <h2 className="text-pink-500 title-font font-medium text-2xl">{ticket.tenPhim}</h2>
              <p className="text-gray-500">
                <span className="font-bold">Giờ chiếu:</span> {moment(ticket.ngayDat).format('hh:mm A')} -{' '}
                <span className="font-bold">Ngày chiếu:</span> {moment(ticket.ngayDat).format('DD-MM-YYYY')}.
              </p>
              <p><span className="font-bold">Địa điểm:</span> {seats.tenHeThongRap}</p>
              <p>
                <span className="font-bold">Tên rạp:</span> {seats.tenCumRap} - <span className="font-bold">Ghế:</span> {' '}
                {ticket.danhSachGhe.map((ghe, idx) => (
                  <span className="text-green-500 text-xl" key={idx}>
                    [ {ghe.tenGhe} ]{' '}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className={`${style.profileContainer} min-h-screen px-4 sm:px-6 lg:px-8`} style={{ backgroundColor: "#e2e8f0" }}>
      <div className="container mx-auto pt-5">
        <div className="flex flex-wrap -mx-3">
          {/* Thông tin cá nhân */}
          <div className="w-full md:w-1/3 mb-6 px-3">
            <div className="bg-white shadow-md rounded-lg">
              <div className="p-5">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={thongTinNguoiDung?.avatar || "https://bootdey.com/img/Content/avatar/avatar7.png"}
                    alt="User Avatar"
                    className="rounded-full w-36"
                  />
                  <div className="mt-3">
                    <h4 className="text-xl font-semibold">{thongTinNguoiDung?.hoTen || "John Doe"}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Thông tin chi tiết */}
          <div className="w-full md:w-2/3">
            <div className="bg-white shadow-md rounded-lg mb-3">
              <div className="p-5">
                <div className="flex justify-between mb-3 p-2">
                  <div>
                    <h6 className="text-gray-700">Họ và tên</h6>
                  </div>
                  <div className="text-gray-600">
                    {thongTinNguoiDung?.hoTen || "Kenneth Valdez"}
                  </div>
                </div>
                <hr />
                <div className="flex justify-between mb-3 p-2">
                  <div>
                    <h6 className="text-gray-700">Email</h6>
                  </div>
                  <div className="text-gray-600">
                    {thongTinNguoiDung?.email || "fip@jukmuh.al"}
                  </div>
                </div>
                <hr />
                <div className="flex justify-between mb-3 p-2">
                  <div>
                    <h6 className="text-gray-700">Mã Nhóm</h6>
                  </div>
                  <div className="text-gray-600">
                    {thongTinNguoiDung?.maNhom || "GP01"}
                  </div>
                </div>
                <hr />
                <div className="flex justify-between mb-3 p-2">
                  <div>
                    <h6 className="text-gray-700">Số điện thoại</h6>
                  </div>
                  <div className="text-gray-600">
                    {thongTinNguoiDung?.soDT || "0123456789"}
                  </div>
                </div>
                <hr />
                <div className="flex justify-between mb-3 p-2">
                  <div>
                    <h6 className="text-gray-700">Loại người dùng</h6>
                  </div>
                  <div className="text-gray-600">
                    {thongTinNguoiDung?.loaiNguoiDung || "KhachHang"}
                  </div>
                </div>
                <hr />
                <div className="flex justify-start mt-3">
                  <button className='text-white px-4 py-1 rounded-md' style={{ backgroundColor: "#17a2b8" }}>Edit</button>
                </div>
              </div>
            </div>

            {/* Lịch sử Đặt vé */}
            <div className="bg-white shadow-md rounded-lg">
              <div className="p-5">
                <h6 className="flex items-center mb-3 text-lg font-semibold">
                  Lịch sử Đặt vé
                </h6>

                {thongTinNguoiDung?.thongTinDatVe && thongTinNguoiDung.thongTinDatVe.length > 0 ? (
                  <div className="flex flex-wrap -m-2">
                    {renderTicketItem()}
                  </div>
                ) : (
                  <p className="text-gray-600">Chưa có lịch sử đặt vé nào.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}