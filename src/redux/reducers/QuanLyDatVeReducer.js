import { SET_HE_THONG_RAP_CHIEU } from "../actions/types/QuanLyRapType"
import { ThongTinLichChieu } from "../../_core/models/ThongTinPhongVe"
import { DAT_VE } from "../actions/types/QuanLyDatVeType"

const initialState = {
    chiTietPhongVe: new ThongTinLichChieu(),
    danhSachGheDangDat: [
    //     {
    //     maGhe: 48684,
    //     tenGhe: "04",
    //     maRap: 459,
    //     loaiGhe: "Thuong",
    //     stt: "04",
    //     giaVe: 100000,
    //     daDat: true,
    //     taiKhoanNguoiDat: "string"
    // }
]
}

export const QuanLyDatVeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HE_THONG_RAP_CHIEU: {
            return {
                ...state,
                chiTietPhongVe: action.ChiTietPhongVe
            }
        }
        case DAT_VE: {
            let danhSachGheCapNhat = [...state.danhSachGheDangDat];
            let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === action.gheDuocChon.maGhe);

            if (index !== -1) {
                // Nếu ghế đã tồn tại trong danh sách, xóa nó
                danhSachGheCapNhat.splice(index, 1);
            } else {
                // Nếu ghế chưa tồn tại trong danh sách, thêm nó
                danhSachGheCapNhat.push(action.gheDuocChon);
            }

            return {
                ...state,
                danhSachGheDangDat: danhSachGheCapNhat
            };
        }
        default:
            return state
    }
}
