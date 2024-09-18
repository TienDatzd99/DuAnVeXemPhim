import { baseService } from "./baseService.js";
import { GROUPID} from '../util/settings/config'
export class QuanLyPhimService  extends baseService{

    constructor() {
        super();
    }

    layDanhSachBanner = () => {
        return this.get(`/api/QuanLyPhim/LayDanhSachBanner`);
    }
    
    layDanhSachPhim = (tenPhim='') => {
        if(tenPhim.trim()!==''){
            return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`)
        }
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)

    }
    themPhimUploadHinh = (Formdata) => {
        return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`,Formdata);
    }

    layThongTinPhim = (MaPhim)  =>{
        return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${MaPhim}`);
    }
    capNhatPhimUpLoad = (formData)=>{
        return this.post(`/api/QuanLyPhim/CapNhatPhimUpload`,formData)
    }
    xoaPhim = (MaPhim)=>{
        return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${MaPhim}`)
    }

 
}



export const quanLyPhimService = new QuanLyPhimService();