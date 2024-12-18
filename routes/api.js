
// Dependencies
import express from "express";
import * as usersController from "../app/controllers/usersController.js";
import  {userAuthentication}  from "../app/middlewares/authMiddleware.js";



// Create Route
const router = express.Router();


 /*----------------ALL ROUTNING ENDPOINT--------------------------- */
 router.post('/register', usersController.UserRegister)
 router.post('/login', usersController.UserLogin)
 router.post('/profile-update', userAuthentication, usersController.ProfileUpdate)
 router.get('/delete-profile', userAuthentication, usersController.ProfileDelete)
 router.get('/profile', userAuthentication, usersController.UserProfileRead)
 router.get('/all-users', userAuthentication, usersController.AllUserProfileRead)



// Finally Export
export default router;
