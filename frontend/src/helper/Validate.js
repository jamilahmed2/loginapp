import { toast } from "react-hot-toast";
import { authenticate } from './helper.js'
// -----> Validate  Username <-----
export async function usernameValidate(values) {
    const error = usernameVerify({}, values)
    // checking user exists or not
    if (values.username) {
        const { status } = await authenticate(values.username)
        if (status !== 200) {
            error.exist = toast.error("user doesn't exists...!");
        }
    }
    return error
}

// -----> Validate  Signup <-----
export async function signUpValidate(values) {
    const error = usernameVerify({}, values);
    passwordVerify(error, values);
    emailVerify(error, values);
    return error
}

// -----> Validate  Password <-----
export async function passwordValidate(values) {
    const error = passwordVerify({}, values)

    return error
}

// -----> Validate  resetPassword <-----
export async function resetPasswordValidation(values) {
    const error = passwordVerify({}, values)
    if (values.password !== values.confirm_pwd) {
        error.exist = toast.error("Password not matched")
    }
    return error
}

// -----> Validate  Profile Page <-----
export async function profileValidation(values) {
    const error = emailVerify({}, values);
    return error;
}

//  ************************************** //

// -----> password verify <-----
function passwordVerify(error = {}, values) {

    const specialChars = /[`@#$%^&*()_+\-=/[\]{};':"\\|,.<>\/?~]/;

    if (!values.password) {
        error.password = toast.error("Password Required!")
    } else if (values.password.includes(" ")) {
        error.password = toast.error("Invalid Password")
    } else if (values.password.length < 8) {
        error.password = toast.error("Password must be at least 8 characters!")
    } else if (!specialChars.test(values.password)) {
        error.password = toast.error("Password must have special characters!")
    }

    return error;
}

// -----> email verify <-----
function emailVerify(error ={}, values){
    if(!values.email){
        error.email = toast.error("Email Required...!");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Wrong Email...!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address...!")
    }

    return error;
}

// -----> username verify <-----
function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error("Username Required!")
    } else if (values.username.includes(" ")) {
        error.username = toast.error("Invalid Username")
    }

    return error;
}