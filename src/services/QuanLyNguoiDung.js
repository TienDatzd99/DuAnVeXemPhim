import { baseService } from "./baseService.js";
export class QuanLyNguoiDungService extends baseService {

    constructor() {
        super();
    }

    DangNhap = (thongTinDangNhap) => {
        return this.postTest(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap)


    }

    LayThongTinNguoiDung = () => {
        return this.gettest('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
    }
    DangKy = (thongTinDangKy) => {
        return this.postTest('/api/QuanLyNguoiDung/DangKy', thongTinDangKy);
    }





}



export const quanLyNguoiDungService = new QuanLyNguoiDungService();