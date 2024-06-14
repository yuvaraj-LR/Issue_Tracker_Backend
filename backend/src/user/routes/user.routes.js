import express from "express";

import {createNewUser} from "../controller/user.controller.js";

const router = express.Router();

// GET routes
// router.route("/getDetails").get(getUserDetail);
// router.route("/:userId").get(userDetails)
// router.route("/logout").get(logoutUser);

// POST routes
router.route("/signup").post(createNewUser);
// router.route("/googlelogin").post(googleLogin);
// router.route("/signin").post(userLogin);
// router.route("/password/forget").post(forgetPassword);
// router.route("/login/sendOTP").post(sendOTP);
// router.route("/login/verifyOTP").post(verifyOTP);

// Put routes
// router.route("/password/reset/").put(resetUserPassword);
// router.route("/password/update").put(updatePassword);
// router.route("/profile/update/:id").put(auth, updateUserProfile);

// Delete routes
// router.route("/delete/:user").delete(deleteAUser);



export default router;