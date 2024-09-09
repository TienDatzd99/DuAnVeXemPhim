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
        if(tenPhim.trim()!=''){
            return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`)
        }
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)

    }

 
}



export const quanLyPhimService = new QuanLyPhimService();