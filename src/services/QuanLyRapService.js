import { baseService } from "./baseService.js";
import { GROUPID} from '../util/settings/config'
export class QuanLyRapService  extends baseService{

    constructor() {
        super();
    }
    layDanhSachRap = () => {
        return this.gettest(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap`);
    }
    layThongTinLichChieuPhim = (maPhim) =>{
        return this.gettest(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    }
    layThongTinHeThongRap = () =>{
        return this.gettest(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap`)
    }
    
    layThongTinCumRap =(maHethongRap) =>{
        return this.gettest(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHethongRap}`)
    }
}



export const quanLyRapService = new QuanLyRapService();