import { Router } from "express";
const router = Router();


import { createResetSession, generateOTP, getUser, login, register, resetPassword, updateUser, verifyOTP, verifyUser } from "../controllers/appControllers.js";
import Auth, { localVariables } from "../middleware/auth.js";
import { registerMail } from "../controllers/mailer.js";

// POST Methods
router.route('/register').post(register);
router.route('/registerMail').post(registerMail);
router.route('/authenticate').post(verifyUser, (req, res) => res.end());
router.route('/login').post(verifyUser, login);

// GET Methods
router.route(`/user/:username`).get(getUser);
// router.route(`/:email`).get(getUserByEmail);
router.route('/generateOTP').get(verifyUser, localVariables, generateOTP);
router.route('/verifyOTP').get(verifyUser, verifyOTP);
router.route('/createResetSession').get(createResetSession);

// Put Methods
router.route('/updateuser').put(Auth, updateUser);
router.route('/resetPassword').put(verifyUser, resetPassword);

export default router;