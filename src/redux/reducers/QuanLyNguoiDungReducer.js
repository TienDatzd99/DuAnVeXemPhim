import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { DANG_NHAP_ACTION, SET_THONG_TIN_NGUOI_DUNG } from "../actions/types/QuanLyNguoiDungType"

const userLoginData = localStorage.getItem(USER_LOGIN);
// console.log(userLoginData)
let user = {}
if (userLoginData) {  // Kiểm tra nếu giá trị không phải null hoặc undefined
    try {
        user = JSON.parse(userLoginData);
        console.log("o  day",user)  // Chỉ parse nếu là chuỗi JSON hợp lệ
    } catch (error) {
        console.error("Dữ liệu không phải là JSON hợp lệ:", error);
        // Bạn có thể xóa dữ liệu bị lỗi hoặc xử lý lỗi khác ở đây
    }
    
}

const stateDefault = {
    userLogin: user,
    thongTinNguoiDung: {}
     
}

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case DANG_NHAP_ACTION: {
            const { userLogin } = action;
            console.log("get userLogin: ", userLogin)

            // Kiểm tra thongTinDangNhap và accessToken có tồn tại hay không
            if (userLogin && userLogin.accessToken) {
                // Lưu thông tin người dùng vào localStorage
                localStorage.setItem(USER_LOGIN, JSON.stringify(userLogin));
                localStorage.setItem(TOKEN, userLogin.accessToken);

                // Cập nhật state với thông tin đăng nhập
                return { ...state, userLogin: userLogin };
            } else {
                console.error("Thông tin đăng nhập không hợp lệ hoặc không có accessToken");
                return { ...state }; // Giữ nguyên state nếu không có thông tin hợp lệ
            }
        }
        case SET_THONG_TIN_NGUOI_DUNG:{
            console.log("assxx",action)

            return{
                ...state,
                thongTinNguoiDung : action.thongTinNguoiDung
            }
        }

        default: {
            return { ...state };
        }
    }
};