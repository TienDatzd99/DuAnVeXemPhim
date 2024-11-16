import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung"
import { DANG_NHAP_ACTION, SET_THONG_TIN_NGUOI_DUNG } from "./types/QuanLyNguoiDungType";

export const dangNhapAction = (thongTinDangNhap) => {
    console.log("asd", thongTinDangNhap)
    return async (dispatch) => {

        try {

            const result = await quanLyNguoiDungService.DangNhap(thongTinDangNhap);


            console.log("sszaasss", result)
            dispatch({
                type: DANG_NHAP_ACTION,
                userLogin: result.data.content,
            })


        } catch (errors) {
            console.log(errors)
        }

    }


}

export const layThongTinNguoiDungAction = (thongTinNguoiDung) => {
    console.log('thongzzTinxscNguoixDung', thongTinNguoiDung);

    return async (dispatch) => {

        try {

            const result = await quanLyNguoiDungService.LayThongTinNguoiDung();


            console.log("1sssssas", result)
            dispatch({
                type: SET_THONG_TIN_NGUOI_DUNG,
                thongTinNguoiDung: result.data.content,
            })

        } catch (errors) {
            console.log(errors)
        }

    }


}
