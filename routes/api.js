
// Dependencies
import express from "express";
import * as usersController from "../app/controllers/usersController.js";
import { authenticationMiddleware } from "../app/middlewares/authMiddleware.js";



// Create Route
const router = express.Router();


 /*----------------ALL ROUTNING ENDPOINT--------------------------- */
 router.post('/register', usersController.UserRegister)
 router.post('/login', usersController.UserLogin)
 router.post('/profile-update', usersController.ProfileUpdate)
 router.get('/delete-profile', usersController.ProfileDelete)
 router.get('/profile', usersController.UserProfileRead)
 router.get('/all-users', usersController.AllUserProfileRead)



// Finally Export
export default router;
