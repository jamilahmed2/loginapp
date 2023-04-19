import { Router } from "express";
const router = Router();


import { createResetSession, generateOTP, getUser,  getUserByEmail,  login, register, resetPassword, updateUser, verifyOTP, verifyUser } from "../controllers/appControllers.js";

// POST Methods
router.route('/register').post(register);
// router.route('/registerMail').post();
router.route('/authenticate').post((req, res) => res.end());
router.route('/login').post(verifyUser, login);

// GET Methods
router.route(`/user/:username`).get(getUser);
router.route(`/:email`).get(getUserByEmail);
router.route('/generateOTP').get(generateOTP);
router.route('/verifyOTP').get(verifyOTP);
router.route('/createResetSession').get(createResetSession);

// Put Methods
router.route('/updateuser').put(updateUser);
router.route('/resetPassword').put(resetPassword);

export default router;