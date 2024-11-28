import Axios from "axios"
import { ApiTest, DOMAIN, TOKEN } from '../util/settings/config'

export class baseService {
    //put json về phía backend
    put = (url, model) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: 'PUT',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) } //JWT
        })
    }

    post = (url, model) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: 'POST',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) } //JWT
        })
    }


    get = (url) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: 'GET',
            // headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)} //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
        })
    }

    delete = (url) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) } //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
        })
    }
    // Api Test
    gettest = (url) => {
        return Axios({
            url: `${ApiTest}${url}`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN),
                'ngrok-skip-browser-warning': 'true'

             } //JWT
        })
    }
    putTest = (url, model) => {
        return Axios({
            url: `${ApiTest}${url}`,
            method: 'PUT',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN),
                'ngrok-skip-browser-warning': 'true'

             } //JWT
        })
    }

    postTest = (url, model) => {
        return Axios({
            url: `${ApiTest}${url}`,
            method: 'POST',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN),
                'ngrok-skip-browser-warning': 'true'
             } //JWT
        })
    }


    deleteTest = (url) => {
        return Axios({
            url: `${ApiTest}${url}`,
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN),
                'ngrok-skip-browser-warning': 'true'
             } //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
        })
    }
}