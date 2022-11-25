import { request } from './index'
import { USERS } from './consts'


export function getUsersList(data) {
    return request({
        method: 'GET',
        url: USERS,
        body: data,
    })
}

export function deleteUser(id){
    return request({
        method: "DELETE",
        url: USERS + `/${id}`

    })
}
export function unblockUser(id) {
    return request({
        method: 'PUT',
        url: USERS + `/${id}`,
        body: {status:1},
    })
}

export function blockUser(id) {
    return request({
        method: 'PUT',
        url: USERS + `/${id}`,
        body: {status:0},
    })
}