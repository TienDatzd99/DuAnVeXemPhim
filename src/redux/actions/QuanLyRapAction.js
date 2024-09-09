import { type } from "@testing-library/user-event/dist/type"
import { quanLyRapService, QuanLyRapService } from "../../services/QuanLyRapService"
import { GROUPID } from "../../util/settings/config"
import { SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_CHIEU } from "./types/QuanLyRapType"

export const layDanhSachHeThongRapAction = () => {
    return async dispatch => {
        try {
            const result = await quanLyRapService.layDanhSachRap()
            console.log("sssa",result)
            if(result.status === 200){
                dispatch({
                    type: SET_HE_THONG_RAP_CHIEU,
                    heThongRapChieu: result.data.content
            })
            }
        }catch(errors){
            console.log(errors)
        }
    }

    

}
export const layThongTinChiTietPhimAction = (id) => {
    return async dispatch => {
        try {
            const result = await quanLyRapService.layThongTinLichChieuPhim(id)
            console.log("ssssas",result)
            if(result.status === 200){
                dispatch({
                    type: SET_CHI_TIET_PHIM,
                    FilmDetail: result.data.content
                  
            })
            }
        }catch(errors){
            console.log(errors)
        }
    }

    

}