import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung"
import { DANG_KY_FAILURE, DANG_KY_SUCCESS, LOGIN_FAILURE, LOGIN_SUCCESS, SET_THONG_TIN_NGUOI_DUNG } from "./types/QuanLyNguoiDungType";

export const dangNhapAction = (thongTinDangNhap) => {
  console.log('thongTinDangNhap', thongTinDangNhap);
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.DangNhap(thongTinDangNhap);
      console.log('resulst', result);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: result.data.content, // { taiKhoan, accessToken, ... }
      });


      // Lưu thông tin đăng nhập vào localStorage
      localStorage.setItem('userLogin', JSON.stringify(result.data.content));
      localStorage.setItem('token', result.data.content.accessToken);
      // Dispatch action để lấy thông tin tài khoản với taiKhoan từ kết quả đăng nhập
      layThongTinNguoiDungAction();

    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.response?.data.message || 'Đăng nhập thất bại',
      });
    }
  };
};
export const dangKyAction = (user) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.DangKy(user);
      console.log('resulst', result.data );
      console.log('resulst', result.status );
      if (result.data.statusCode ===  200) {
        dispatch({
          type: DANG_KY_SUCCESS,
        });
      } else {
        dispatch({
          type: DANG_KY_FAILURE,
          payload: result.data.message || 'Đăng ký thất bại',
        });
      }
    } catch (error) {
      dispatch({
        type: DANG_KY_FAILURE,
        payload: error.response?.data.message || 'Đăng ký thất bại',
      });
    }
  };
};

// Action lấy thông tin tài khoản
export const layThongTinNguoiDungAction = () => {
  return async (dispatch) => {
    try {


      const result = await quanLyNguoiDungService.LayThongTinNguoiDung();
      console.log('resulst', result);
      console.log('resulsssst', result.data.content);
      dispatch({
        type: SET_THONG_TIN_NGUOI_DUNG,
        payload: { 
          data: result.data.content,
          error: null 
        },
      });

    } catch (error) {
      console.log('Lỗi lấy thông tin người dùng:', error);
      // Optionally, dispatch thêm một action để xử lý lỗi nếu cần
    }
  };
};