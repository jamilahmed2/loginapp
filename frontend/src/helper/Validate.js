import { toast } from "react-hot-toast";

// -----> Validate  Username <-----
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values)

    return errors
}

function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error("Username Required!")
    } else if (values.username.includes(" ")) {
        error.username = toast.error("Invalid Username")
    }

    return error;
}

// -----> Validate  Password <-----
export async function passwordValidate(values) {
    const errors = passwordVerify({}, values)

    return errors
}

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

// -----> Validate  Password <-----
export async function resetPasswordValidation(values) {
    const errors = passwordVerify({}, values)
    if (values.password !== values.confirm_pwd) {
        errors.exist = toast.error("Password not matched")
    }
    return errors
}
