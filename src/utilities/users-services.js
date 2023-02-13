import * as usersAPI from './users-api'

export async function signUp(userData) {
	const token = await usersAPI.signUp(userData)

	// for right now, this won't be a token but we will be returning one eventually
	localStorage.setItem('token', token)
    return getUser()
}




export function getToken() {
    // get the token from local storage
    // get the token's payload
    // check if the token has expired
    // if it hasn't return the token
    const token = localStorage.getItem('token')
    if (!token) return null
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJjIiwiZW1haWwiOiJjQGMuY29tIiwiX2lkIjoiNjNlYTVhNDdlOTMxNmQyMTE5ZWFkNDViIiwiY3JlYXRlZEF0IjoiMjAyMy0wMi0xM1QxNTo0MTo1OS41NzdaIiwidXBkYXRlZEF0IjoiMjAyMy0wMi0xM1QxNTo0MTo1OS41NzdaIiwiX192IjowfSwiaWF0IjoxNjc2MzAyOTE5LCJleHAiOjE2NzYzODkzMTl9.vJco5uJO1EEeRCMyH2GSKfWEwJo7lMWKJvKorKKzvwE
    // ^^ that's our JWT
    // Part 1 is the header
    // part 2 is the payload
    // Part 3 is the signature
    const payload = token.split('.')[1]
    // JWTs are base64 encoded
    // we need to decode it to make it usable
    // JavaScript has a builtin function for decoding base64
    // called atob()
    const decodedPayload = atob(payload)
    const parsedPayload = JSON.parse(decodedPayload)
    // JWT's exp is express in seconds, not milliseconds, so convert
    if (parsedPayload.exp < Date.now() / 1000) {
        // Token has expired - remove it
        localStorage.removeItem('token')
        return null
    } else {
        return token
    }
}



export function getUser() {
    const token = getToken()
    if (token) {
    const payload = token.split('.')[1]
    const decodedPayload = atob(payload)
    const parsedPayload = JSON.parse(decodedPayload)
    return parsedPayload.user
    } else {
        return null
    }
}

export function logOut() {
    localStorage.removeItem('token')
}


export async function logIn(credentials) {
    const token = await usersAPI.logIn(credentials)
    localStorage.setItem('token', token)
    return getUser()


}

export function checkToken() {
return usersAPI.checkToken()
    .then(dateStr => new Date(dateStr))
}