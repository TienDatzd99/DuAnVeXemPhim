// src/pages/Profile/Profile.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Profile.module.css';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';

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

  return (
    <div className={`${style.profileContainer} min-h-screen p-40`} style={{ backgroundColor: "#e2e8f0" }}>
      <div className="container mx-auto pt-5">
        <div className="flex flex-wrap -mx-3">
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
            <div className="bg-white shadow-md rounded-lg mt-3">
              <ul className="list-none p-3">
                <li className="flex justify-between items-center mb-3">
                  <h6 className="text-gray-700">Website</h6>
                  <span className="text-gray-500">{thongTinNguoiDung?.website || "https://bootdey.com"}</span>
                </li>
                {/* Thêm các mục khác nếu cần */}
              </ul>
            </div>
          </div>

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

            <div className="flex flex-wrap -mx-3">
              <div className="w-full sm:w-1/2 mb-3 px-3">
                <div className="bg-white shadow-md h-full rounded-lg">
                  <div className="p-5">
                    <h6 className="flex items-center mb-3">
                      Lịch sử Đặt vé
                    </h6>
                    {/* Thêm progress bar nếu cần */}
                  </div>
                </div>
              </div>
              {/* Lặp lại phần này cho các thẻ khác */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}