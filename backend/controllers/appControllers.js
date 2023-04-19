import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()
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
            return res.status(400).send({ error: "Username already existed" });
        }

        if (userEmail) {
            return res.status(400).send({ error: "Email already existed" });
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
    const { username, password } = req.body;
    try {
        UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {
                        if (!passwordCheck) return res.status(400).send({ error: "Don't have password" });

                        // create jwt token
                        const token = jwt.sign({
                            userId: user._userId,
                            username: user.username
                        }, process.env.JWT_SECERET)

                        return res.status(201).send({
                            msg: "Login Successful..!",
                            username: user.username,
                            token
                        })
                    })
                    .catch(error => {
                        return res.status(400).send({ error: "password not matched" });
                    })
            })
            .catch(error => {
                return res.status(404).send({ error: "Username not found" });
            })
    } catch (error) {
        return res.status(500).send({ error });
    }
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
