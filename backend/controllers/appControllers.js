import UserModel from "../model/User.model.js";
import bcrypt from "bcryptjs"


/** middleware for verify user */
export const verifyUser = async (req, res) => {
    res.json("verifyUser");
}


// REGISTER POST: http://localhost:5000/api/register 
export const register = async (req, res) => {
    try {
        const { username, password, profile, email } = req.body;

        // check the existing user
        const existUsername = new Promise((resolve, reject) => {
            UserModel.findOne({ username }, function (err, user) {
                if (err) reject(new Error(err))
                if (user) reject({ error: "Please use unique username" });

                resolve();
            })
        });

        // check for existing email
        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({ email }, function (err, email) {
                if (err) reject(new Error(err))
                if (email) reject({ error: "Please use unique Email" });

                resolve();
            })
        });


        Promise.all([existUsername, existEmail])
            .then(() => {
                if (password) {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {

                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email
                            });

                            // return save result as a response
                            user.save()
                                .then(result => res.status(201).send({ msg: "User Register Successfully" }))
                                .catch(error => res.status(500).send({ error }))

                        }).catch(error => {
                            return res.status(500).send({
                                error: "Enable to hashed password"
                            })
                        })
                }
            }).catch(error => {
                return res.status(500).send({ error })
            })

    } catch (error) {
        return res.status(500).send(error)
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
