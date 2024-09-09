import { SET_DANH_SACH_PHIM, SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from "../actions/types/QuanLyPhimType"
import { SET_CHI_TIET_PHIM } from "../actions/types/QuanLyRapType";

const initialState = {
    arrFilm: [{
        "maPhim": 11090,
        "tenPhim": "One Piece Special",
        "biDanh": "one-piece-special",
        "trailer": "12312312312312312",
        "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/one-piece-1_gp01.jpg",
        "moTa": "One Piece là bộ truyện tranh dành cho thiếu niên của tác giả nổi tiếng Oda Eiichiro. Bộ manga này được chuyển thể thành một series anime nhiều tập hài hước, đặc sắc...",
        "maNhom": "GP01",
        "ngayKhoiChieu": "2024-06-03T20:22:53.14",
        "danhGia": 10,
        "hot": true,
        "dangChieu": false,
        "sapChieu": true
    }],
    dangChieu: false,
    sapChieu: false,
    arrFilmDefault: [],
    FilmDetail:{}
}

export const QuanLyPhimReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DANH_SACH_PHIM: {
            return {
                ...state,
                arrFilm: action.arrFilm,
                arrFilmDefault: action.arrFilm
            };
        }
        case SET_FILM_DANG_CHIEU: {
            const updatedArrFilm = state.arrFilmDefault.filter(film => film.dangChieu === !state.dangChieu);
            return {
                ...state,
                dangChieu: !state.dangChieu,
                sapChieu: false,
                arrFilm: updatedArrFilm
            };
        }
        case SET_FILM_SAP_CHIEU: {
            const updatedArrFilm = state.arrFilmDefault.filter(film => film.sapChieu === !state.sapChieu);
            return {
                ...state,
                sapChieu: !state.sapChieu,
                dangChieu: false,
                arrFilm: updatedArrFilm
            };
        }
        case SET_CHI_TIET_PHIM:{
            return{...state,
                FilmDetail: action.FilmDetail
            }
        }
        default:
            return state;
    }
};
