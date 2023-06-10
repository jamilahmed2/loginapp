import { Router } from "express";
const router = Router();


import { createResetSession, generateOTP, getUser, ipAddress, login, register, resetPassword, updateUser, verifyOTP, verifyUser } from "../controllers/appControllers.js";
import Auth, { localVariables } from "../middleware/auth.js";
import { registerMail } from "../controllers/mailer.js";

// POST Methods
router.route('/register').post(ipAddress, register);
router.route('/registerMail').post(registerMail);
router.route('/authenticate').post(verifyUser, (req, res) => res.end());
router.route('/login').post(verifyUser, login);

// GET Methods
router.route(`/user/:username`).get(ipAddress, getUser);
// router.route(`/:email`).get(getUserByEmail);
router.route('/generateOTP').get(verifyUser, localVariables, generateOTP);
router.route('/verifyOTP').get(verifyUser, verifyOTP);
router.route('/createResetSession').get(createResetSession);

// Put Methods
router.route('/updateuser').put(Auth, updateUser);
router.route('/resetPassword').put(verifyUser, resetPassword);

// ip
// router.route('/').get(ipAddress);
// app.get('/', (req, res) => {
//     const ipAddress = req.ip;
//     const location = GeoIP.lookup(ipAddress);

//     const userVisit = new UserVisit({
//       ipAddress: ipAddress,
//       location: location ? `${location.city}, ${location.country}` : 'Unknown',
//       timestamp: new Date()
//     });

//     userVisit.save()
//       .then(() => res.sendStatus(200))
//       .catch((error) => {
//         console.error('Error saving user visit:', error);
//         res.sendStatus(500);
//       });
//   });

export default router;