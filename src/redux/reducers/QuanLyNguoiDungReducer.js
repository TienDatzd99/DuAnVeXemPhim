import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import {
    DANG_NHAP_ACTION, LOGIN_FAILURE, LOGIN_SUCCESS, SET_THONG_TIN_NGUOI_DUNG, DANG_KY_SUCCESS,
    DANG_KY_FAILURE
} from "../actions/types/QuanLyNguoiDungType"

const userLoginData = localStorage.getItem(USER_LOGIN);
// console.log(userLoginData)
let user = {}
if (userLoginData) {  // Kiểm tra nếu giá trị không phải null hoặc undefined
    try {
        user = JSON.parse(userLoginData);
        console.log("o  day", user)  // Chỉ parse nếu là chuỗi JSON hợp lệ
    } catch (error) {
        console.error("Dữ liệu không phải là JSON hợp lệ:", error);
        // Bạn có thể xóa dữ liệu bị lỗi hoặc xử lý lỗi khác ở đây
    }

}

const stateDefault = {
    userLogin: user,
    thongTinNguoiDung: {},
    error: null,
    dangKySuccess: false,
    dangKyError: null,

}

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case DANG_KY_SUCCESS:
            console.log("Đăng ký thành công:", action.payload);
            return {
                ...state,
                dangKySuccess: true,
                dangKyError: null,
            };
        case DANG_KY_FAILURE:
            return {
                ...state,
                dangKySuccess: false,
                dangKyError: action.payload,
            };
        case LOGIN_SUCCESS: {
            const userLogin = action.payload;
            console.log("Đăng nhập thành côngss:", userLogin);

            if (userLogin && userLogin.accessToken) {
                localStorage.setItem(USER_LOGIN, JSON.stringify(userLogin));
                localStorage.setItem(TOKEN, userLogin.accessToken);

                return {
                    ...state,
                    userLogin: userLogin,
                    error: null
                };
            } else {
                console.error("Thông tin đăng nhập không hợp lệ hoặc thiếu accessToken");
                return {
                    ...state,
                    userLogin: null,
                    error: 'Thông tin đăng nhập không hợp lệ'
                };
            }
        }
        case LOGIN_FAILURE: {
            const error = action.payload;
            console.log("Đăng nhập thất bại:", error);
            return {
                ...state,
                userLogin: null,
                error: error
            };
        }
        case SET_THONG_TIN_NGUOI_DUNG: {
            const { data, error } = action.payload;
            console.log(action.payload);
            if (data) {
                console.log("Reducer - Cập nhật thông tin người dùng:", data);
                return {
                    ...state,
                    thongTinNguoiDung: data,
                    error: null
                };
            } else {
                console.log("Reducer - Lỗi khi cập nhật thông tin người dùng:", error);
                return {
                    ...state,
                    thongTinNguoiDung: {},
                    error: error
                };
            }
        }

        default: {
            return { ...state };
        }
    }
};