import axios from 'axios'
// import ENV from '../config'
import jwt_decode from 'jwt-decode'

// Make api req
// axios.defaults.baseURL = ENV.SERVER_DOMAIN
// axios.defaults.baseURL = ''

/** To get username from Token */
export async function getUsername() {
    const token = localStorage.getItem('token')
    if (!token) return Promise.reject("Cannot find Token");
    let decode = jwt_decode(token)
    // console.log(decode)
    return decode;
}

// authenticate
export async function authenticate(username) {
    try {
        return await axios.post('authenticate', { username })
    } catch (error) {
        return { error: "Username doesn't exists!" }
    }
}

// get user details
export async function getUser({ username }) {
    try {
        const { data } = await axios.get(`user/${username}`)
        return { data }
    } catch (error) {
        return { error: "Password doesn't matched!" }
    }
}


// user register
export async function registerUser(credentials) {
    try {
        const { data: { msg }, status } = await axios.post(`register`, credentials);

        let { username, email } = credentials;

        /** send email */
        if (status === 201) {
            await axios.post('registerMail', { username, userEmail: email, text: msg })
        }

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}


// login function
export async function verifyPassword({ username, password }) {
    try {
        if (username) {
            const { data } = await axios.post('login', { username, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error: "Password doesn't matched!" })
    }
}


// update user profile function
export async function updateUser(response) {
    try {
        const token = await localStorage.getItem('token');
        const data = await axios.put('updateUser', response, { headers: { "Authorization": `Bearer ${token}` } })

        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: "Couldn't update profile!" })
    }
}


// generate otp
export async function generateOTP(username) {
    try {
        const { data: { code }, status } = await axios.get('generateOTP', { params: { username } })
        // send mail with otp
        if (status === 201) {
            let { data: { email } } = await getUser({ username })
            let text = `Your Password Recovery OTP is <b>${code}</b>. Verify and recover your password.`
            await axios.post('registerMail', { username, userEmail: email, text, subject: "Password Recovery OTP." })
        }

        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error })
    }
}


// verify otp
export async function verifyOTP({ username, code }) {
    try {
        const { data, status } = await axios.get('verifyOTP', { params: { username, code } })
        return { data, status }
    } catch (error) {
        return Promise.reject({ error })

    }
}


// reset password
export async function resetPassword({ username, password }) {
    try {
        const { data, status } = await axios.put('resetPassword', { username, password })
        return Promise.resolve({ data, status });
    } catch (error) {
        return Promise.reject({ error })
    }
}