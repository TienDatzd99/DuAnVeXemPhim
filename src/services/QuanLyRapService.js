import { baseService } from "./baseService.js";
import { GROUPID} from '../util/settings/config'
export class QuanLyRapService  extends baseService{

    constructor() {
        super();
    }
    layDanhSachRap = () => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`);
    }
    layThongTinLichChieuPhim = (maPhim) =>{
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    }
    
    
}



export const quanLyRapService = new QuanLyRapService();