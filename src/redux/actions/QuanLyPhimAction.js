
import { result } from 'lodash';
import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { history } from '../../util/settings/history';
import { SET_DANH_GIA, SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from './types/QuanLyPhimType';

export const layDanhSachPhimAction = (tenPhim='') => {

    return async (dispatch) => {
        try {
            //Sử dụng tham số thamSo
            const result = await quanLyPhimService.layDanhSachPhim(tenPhim);

            dispatch({
                type: SET_DANH_SACH_PHIM,
                arrFilm: result.data.content
            })
        } catch (errors) {
            console.log('errors', errors)
        }
    };
}
export const themPhimUploadHinhAction = (formData) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.themPhimUploadHinh(formData);
            alert('Thêm phim thành công');
            console.log('result', result.data.content);


            dispatch(

            )
        } catch (errors) {
            console.log('errors', errors.response?.data)
        }
    }
}
export const layThongTinPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.layThongTinPhim(maPhim);

            console.log('result', result.data.content);


            dispatch({
                type: SET_THONG_TIN_PHIM,
                thongTinPhim: result.data.content
            }

            )
        } catch (errors) {
            console.log('errors', errors.response?.data)
        }
    }
}
export const capNhatPhimUpLoadAction = (formData) => {
  
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.capNhatPhimUpLoad(formData);

            console.log('result', result.data.content);
            history.push('/admin/Films');
            dispatch(layDanhSachPhimAction())


        } catch (errors) {
            console.log('errors', errors.response?.data)
        }
    }
}
export const xoaPhimAction = (maPhim)=>{
    return async (dispatch)=>{
        try {
            result = await quanLyPhimService.xoaPhim(maPhim)
            dispatch(layDanhSachPhimAction())
        } catch (error) {
            console.log('error',error)
        }
    }
}
export const themDanhGiaAction = (maPhim, danhGia) => {
    console.log('maPhim', maPhim);
    console.log('danhGia', danhGia);
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.themDanhGia(maPhim, danhGia);
            console.log('result', result.data.content);
            layDanhGiaAction(maPhim);
          
        } catch (errors) {
            console.log('errors', errors)
        }
    }
}
export const layDanhGiaAction = (maPhim) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.layDanhGiaPhim(maPhim);
            console.log('resulsstsad', result);
            dispatch({
                type: SET_DANH_GIA,
                arrComment: result.data
            })
            console.log('result', result.data);
        } catch (errors) {
            console.log('errors', errors)
        }   
    }
}