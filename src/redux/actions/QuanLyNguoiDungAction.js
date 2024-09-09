import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung"
import { DANG_NHAP_ACTION } from "./types/QuanLyNguoiDungType";

export const dangNhapAction = (thongTinDangNhap) => {
console.log("asd",thongTinDangNhap)
    return async (dispatch) => {

        try {

            const result = await quanLyNguoiDungService.DangNhap(thongTinDangNhap);
            
        
                console.log("sas",result)
                dispatch({
                    type: DANG_NHAP_ACTION,
                    userLogin: result.data.content,
                })
            
        } catch (errors) {
            console.log(errors)
        }

    }


}