import { Router } from "express";
const router = Router();


import { createResetSession, generateOTP, getUser, login, register, resetPassword, updateUser, verifyOTP } from "../controllers/appControllers.js";

// POST Methods
router.route('/register').post(register);
// router.route('/registerMail').post();
router.route('/authenticate').post((req, res) => res.end());
router.route('/login').post(login);

// GET Methods
router.route('/user/:username').get(getUser);
router.route('/generateOTP').get(generateOTP);
router.route('/verifyOTP').get(verifyOTP);
router.route('/createResetSession').get(createResetSession);

// Put Methods
router.route('/updateuser').put(updateUser);
router.route('/resetPassword').put(resetPassword);

export default router;