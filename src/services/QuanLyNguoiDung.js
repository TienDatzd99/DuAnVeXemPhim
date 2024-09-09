import { baseService } from "./baseService.js";
export class QuanLyNguoiDungService extends baseService {

    constructor() {
        super();
    }

DangNhap = (thongTinDangNhap) => {
        return this.post(`/api/QuanLyNguoiDung/DangNhap`,thongTinDangNhap)


    }
}



export const quanLyNguoiDungService = new QuanLyNguoiDungService();