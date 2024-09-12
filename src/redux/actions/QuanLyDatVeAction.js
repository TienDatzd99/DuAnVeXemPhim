import { type } from "@testing-library/user-event/dist/type";
import { QuanLyDatVeService, quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { SET_HE_THONG_RAP_CHIEU } from "./types/QuanLyRapType";
import { DISPLAY_LOADING_ACTION } from "./LoadingAction.js";
import { HIDE_LOADING_ACTION } from "./LoadingAction.js";
import { CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT } from "./types/QuanLyDatVeType.js";
import { connection } from "../../index.js";


export const layChiTietPhongVeAction = (maLichChieu) => {

    return async (dispatch) => {

        try {

            const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);


            console.log("sszasss", result)
            dispatch({
                type: SET_HE_THONG_RAP_CHIEU,
                ChiTietPhongVe: result.data.content,
            })

        } catch (errors) {
            console.log(errors)
        }

    }


}


export const datVeAction = (ThongTinDatVe) => {
    return async dispatch => {
        dispatch(DISPLAY_LOADING_ACTION)
        try {
            const result = await quanLyDatVeService.datVe(ThongTinDatVe)
            console.log("assd", result)
            await dispatch(layChiTietPhongVeAction(ThongTinDatVe.maLichChieu))
            await dispatch({ type: DAT_VE_HOAN_TAT })
            dispatch(HIDE_LOADING_ACTION)
            dispatch({ type: CHUYEN_TAB })
        } catch (errors) {
            console.log(errors)
        }
    }
}
export const datGheAction = (ghe,maLichChieu) => {


    return async (dispatch,getState) => {

        //Đưa thông tin ghế lên reducer
        await dispatch({
            type: DAT_VE,
            gheDuocChon: ghe
        });

        //Call api về backend 
        let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
        let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;

        console.log('danhSachGheDangDat',danhSachGheDangDat);
        console.log('taiKhoan',taiKhoan);
        console.log('maLichChieu',maLichChieu);
        //Biến mảng thành chuỗi
        danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

        //Call api signalR
        connection.invoke('datGhe',taiKhoan,danhSachGheDangDat,maLichChieu);




    }

}