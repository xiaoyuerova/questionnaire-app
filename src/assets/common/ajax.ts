import request from '@/assets/common/request'

interface Params {
    [propName: string]: any;
}

export function commonAjax(url: string, data: Params, method = 'post') {
    if (method === 'post') {
        let params = new URLSearchParams()
        for (let k in data) {
            params.append(k, data[k]);
        }
        return request({
            // url: url + '/' + action,
            url: url,
            method: 'post',
            data: params
        })
    } else if (method === 'get') {
        return request({
            url: url,
            method: 'get',
            params: data
        })
    } else if (method === 'put') {
        return request({
            url: url,
            method: 'put',
            data: data
        })
    } else {
        // @ts-ignore
        return request({
            url: url,
            method: method,
            params: data
        })
    }
}