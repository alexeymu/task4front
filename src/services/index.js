import { ACCESS_TOKEN_KEY } from './consts'

const API = process.env.REACT_APP_API || 'http://localhost:5000'

export function request({ method, url, body }) {
    return new Promise((resolve, reject) => {
        const accessToken = getAccessToken()

        let headers = {
            'Content-Type': 'application/json',
        }

        if (accessToken) {
            headers['Authorization'] = generateBearerToken(accessToken)
        }

        fetch(API + url, {
            method,
            headers,
            body: JSON.stringify(body),
        }).then(async function(data) {
            console.log(data)
            if (data.status >= 400) {
                if (data.status === 401) {
                    removeAccessToken()
                    window.location.href = '/auth'
                    reject()
                } else {
                    const res = await data.json()
                    reject(res.message)
                }
            } else {
                return data.json()
            }
        })
            .then(async function(data) {
                console.log(data)
                setAccessToken(data)
                resolve(data)
            })
            .catch(function(error) {
                console.log(error)
                reject(error)
            })
    })
}

function generateBearerToken(token) {
    return `Bearer ${token}`
}


export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
}

function setAccessToken(data) {
    if (data && data.token) {
        localStorage.setItem(ACCESS_TOKEN_KEY, data.token)
    }
}

function removeAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
}
