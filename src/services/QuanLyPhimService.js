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
            return this.gettest(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`)
        }
        return this.gettest(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)

    }
    themPhimUploadHinh = (Formdata) => {
        return this.postTest(`/api/QuanLyPhim/ThemPhimUploadHinh`,Formdata);
    }

    layThongTinPhim = (MaPhim)  =>{
        return this.gettest(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${MaPhim}`);
    }
    capNhatPhimUpLoad = (formData)=>{
        return this.postTest(`/api/QuanLyPhim/CapNhatPhimUpload`,formData)
    }
    xoaPhim = (MaPhim)=>{
        return this.deleteTest(`/api/QuanLyPhim/XoaPhim?MaPhim=${MaPhim}`)
    }
    themDanhGia = (maPhim,formData)=>{ 
        return this.postTest(`/api/QuanLyPhim/ThemDanhGia?maPhim=${maPhim}`,formData)
    }
    layDanhGiaPhim = (maPhim)=>{
        return this.gettest(`/api/QuanLyPhim/LayDanhGiaPhim?maPhim=${maPhim}`)
    }

 
}



export const quanLyPhimService = new QuanLyPhimService();