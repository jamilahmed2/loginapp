import { toast } from "react-hot-toast";

// -----> Validate  Username <-----
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values)

    return errors
}

// -----> Validate  Signup <-----
export async function signUpValidate(values) {
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors,values);
    return errors
}

// -----> Validate  Password <-----
export async function passwordValidate(values) {
    const errors = passwordVerify({}, values)

    return errors
}

// -----> Validate  resetPassword <-----
export async function resetPasswordValidation(values) {
    const errors = passwordVerify({}, values)
    if (values.password !== values.confirm_pwd) {
        errors.exist = toast.error("Password not matched")
    }
    return errors
}

// -----> Validate  Profile Page <-----
export async function profileValidation(values){
    const errors = emailVerify({},values);
    return errors;
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
function emailVerify(errors = {}, values) {
    if (!values.email) {
        errors.email = toast.error("Email Requred!")
    } else if (values.email.includes(" ")) {
        errors.email = toast.error("Wrong Email!")
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i.toast(values.email)) {
        errors.email = toast.error("Invalid Email Address!")
    }
    return errors;
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