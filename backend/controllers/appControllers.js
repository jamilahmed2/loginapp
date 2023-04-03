// REGISTER
export const register = async (req, res) => {
    res.json("Register");
}

// Login
export const login = async (req, res) => {
    res.json("login");
}

// GET USER
export const getUser = async (req, res) => {
    res.json("getuser");
}

// UPDATE USER
export const updateUser = async (req, res) => {
    res.json("updateUser");
}

// GENERATE OTP
export const generateOTP = async (req, res) => {
    res.json("generateOTP");
}

//VERIFY OTP
export const verifyOTP = async (req, res) => {
    res.json("verifyOTP");
}

// create and reset OTP
export const createResetSession = async (req, res) => {
    res.json("create reset session");
}

// RESET PASSWORD  
export const resetPassword = async (req, res) => {
    res.json("reset pass");
}
