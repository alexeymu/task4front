import { request } from './index'

import { USERS } from './consts'

export function registration(data) {
    return request({
        method: 'POST',
        url: USERS + '/signup',
        body: data,
    })
}

export function auth(data) {
    return request({
        method: 'POST',
        url: USERS + '/signin',
        body: data,

    })
}
