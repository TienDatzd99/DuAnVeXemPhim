import { QuanLyDatVeService, quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { SET_HE_THONG_RAP_CHIEU } from "./types/QuanLyRapType";


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


export const datVeAction = (ThongTinDatVe ) => {
    return async dispatch => {
        try {
            const result = await quanLyDatVeService.datVe(ThongTinDatVe)
            console.log("assd",result)


        } catch (errors) {
            console.log(errors)
        }
    }
}
