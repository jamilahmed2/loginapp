import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt"


/** middleware for verify user */
export const verifyUser = async (req, res) => {
    res.json("verifyUser");
}


// REGISTER POST: http://localhost:5000/api/register 
export const register = async (req, res) => {
    try {
        const { username, password, profile, email } = req.body;

        // check the existing user
        const existUsername = UserModel.findOne({ username });
        const existEmail = UserModel.findOne({ email });

        const [user, userEmail] = await Promise.all([
            existUsername,
            existEmail
        ]);

        if (user) {
            return res.status(400).send({ error: "Please use unique username" });
        }

        if (userEmail) {
            return res.status(400).send({ error: "Please use unique email" });
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new UserModel({
                username,
                password: hashedPassword,
                profile: profile || "",
                email
            });

            await newUser.save();

            return res.status(201).send({ msg: "User registered successfully" });
        }

        return res.status(400).send({ error: "Password is required" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error });
    }
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
