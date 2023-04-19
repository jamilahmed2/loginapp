import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import Express from "express";

dotenv.config()
/** middleware for verify user */
export const verifyUser = async (req, res, next) => {
    try {
        const { username } = req.method == "GET" ? req.query : req.body

        // checking user
        let exist = await UserModel.findOne({ username })
        if (!exist) return res.status(404).send({ error: "User Not Found" })
        next();
    } catch (error) {
        return res.status(404).send({ error: "Authentication error" });
    }

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

// Login  POST: http://localhost:5000/api/login 
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

// GET USER BY USERNAME
export const getUser = async (req, res) => {
    const { username } = req.params;

    try {
        // if (!username) return res.status(400).send({ error: "Invalid Username" });

        const user = await UserModel.findOne({ username }).select("-password");

        if (!user) return res.status(404).send({ error: "Couldn't Find the User" });

        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" });
    }

}

// GET USER BY EMAIL
export const getUserByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        if (!email) return res.status(400).send({ error: "Invalid email" });

        const user = await UserModel.findOne({ email }).select("-password");
        if (!user) return res.status(404).send({ error: "User not found" });

        return res.status(200).send(user);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal server error" });
    }

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
