import Vue from 'vue'
import axios, {AxiosRequestConfig} from 'axios'
import {get} from '@/utils/cookie'
import baseUrl from '@/utils/api'

// create an axios instance
const service = axios.create({
    baseURL: baseUrl, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    // timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    (config):AxiosRequestConfig => {
        // do something before request is sent
        // @ts-ignore
        // config.headers['Content-Type'] = 'multipart/form-data'
        const respondentToken = get('respondentToken')
        if (respondentToken) {
            // @ts-ignore
            config.headers['Authorization-Resp'] = respondentToken
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

interface Response {
    'code': any,
    'msg': {
        [propName: string]: any;
    }
}
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    (response):any => {
        console.log(response)
        const res:Response = response.data.data
        // if the custom code is not 200, it is judged as an error.
        if (response.status !== 200) {
            return Promise.reject(new Error(response.data || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error.response)
    }
)

export default service
