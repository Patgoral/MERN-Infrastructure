import { getToken } from './users-services'
const BASE_URL = '/api/users'

export async function signUp(userData) {
	// // pausing code to wait for a response back from the server
	// const res = await fetch(BASE_URL, {
	// 	// I want to make a user
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 	},
	// 	body: JSON.stringify(userData),
	// })

	// // if success
	// // we get a true here when the status is 200
	// if (res.ok) {
	// 	return res.json()
	// } else {
	// 	// if error throw new error
	// 	throw new Error('Invalid Sign up')
	// }
    return sendRequest(BASE_URL, 'POST', userData)
}

export async function logIn(credentials) {
	// const res = await fetch(BASE_URL + '/login', {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 	},
	// 	body: JSON.stringify(credentials),
	// })

	// if (res.ok) {
	// 	return res.json()
	// } else {
	// 	throw new Error('Invalid Log In')
	// }
    return sendRequest(BASE_URL + '/login', 'POST', credentials)

}

export default async function sendRequest(url, method = 'GET', payload = null) {
	const options = { method }
	if (payload) {
		// set headers for content if there's a payload
		options.headers = { 'Content-Type': 'application/json' }
		options.body = JSON.stringify(payload)
	}
    // if there's a token include it in the request
const token = getToken()
if (token) {
    // make sure we have headers on our options
    options.headers = options.headers || {}
    // add in our token with an authorization header
    options.headers.Authorization = `Bearer ${token}`
    // Make sure to capitalize Authorization
}

    const res = await fetch(url, options)
    if (res.ok) {
        return res.json()
    } else {
        throw new Error('Bad Request')
    }
}

export async function checkToken() {
    return sendRequest(BASE_URL + '/check-token')
}
