/*----------DEPENDENCIES----------*/
import UserModel  from "../model/UsersModel.js";
import bcrypt from "bcrypt";
import { TokenEncode } from "../utility/tokenUtility.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;



export const UserRegisterService = async (req) => {
     try {

        const UserData = req.body;
        const isValidData =  UserData.email && UserData.firstName && UserData.lastName && UserData.NIDNumber && UserData.phoneNumber && UserData.password && UserData.bloodGroup;
 
        // Data check whether user provide all input or not
        if(!isValidData || isValidData === false){
            return {status: 'fail', message: "Please provide all input field data"};
        }


        // Hashed Password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(UserData.password, saltRounds);
        UserData.password = hashedPassword;


        // User create
        const data = await UserModel.create(UserData);
        return {status: "Success", data: data}
        
     }catch(e) {
        console.log(e.toString());
        return {status: "Error", message: "Internal server error..!"}
     }
 }


export const UserLoginService = async (req) => {
     try {
      
        const {email, password} = req.body;

        // User search by email
        const data = await UserModel.find({email: email})
        const user = data[0];
        if(user.length === 0) {
            return {status: "fail", message: "No user found"};
        }

    
        // Compare with password
        const hashedPassValidation = await bcrypt.compare(password, user.password);
        if(!hashedPassValidation) {
            return {status: "fail", message: "Incorrect password"}
        }


        // Create User Token by _id , email
        const userEmail = user['email'];
        const userID = user['_id'].toString();
    
        const EncodeToken = TokenEncode(userEmail, userID);
        return {status: "Success", message: "Login success", Token: EncodeToken};
 

     }catch(e) {
      console.log(e.toString());
      return {status: "Error", message: "Inernal server error..!"};
     }
 }

 
 export const ProfileUpdateService = async (req) => {
     try {

         const userId = req.headers.user_id;
         const email = req.headers.email;
         const reqBody = req.body;
 
         // User could't update their password and email directly
         if(reqBody.password.length !== 0 || reqBody.email.length !== 0) {
            return {status: "fail", message: "Password not be updated"};
         }


         // Update User Profile
         await UserModel.updateOne({_id: userId, email: email}, reqBody)


         return {status: "Success", message: "Profile updated successfull!"};

     }catch(e){
      console.log(e.toString());
      return {status: "Succes", message: "Internal server error..!"};
     }
 }


 export const ProfileDeleteService = async (req) => {
     try {

         const userId = req.headers.user_id;
         const email = req.headers.email;

         // Delete user profile
         await UserModel.deleteOne({_id: userId, email: email});

         return {status: "Success", message: "Profile delete success"};

     }catch(e) {
      console.log(e.toString());
      return {status: "Error", message: "Internal server error..!"}
     }
 }


 export const ProfileReadService = async (req) => {
     try {

         const {email, user_id} = req.headers;

         // Find user profile
         const data = await UserModel.aggregate([
            {$match: {_id: new ObjectId(user_id), email: email}},
            {$project: {password: 0}}
         ]);


         return {status: "Success", data: data};

     }catch(e) {
      console.log(e.toString());
      return {status: "Error", message: "Internal server error..!"}
     }
 }


 export const AllUserProfileReadService = async (req) => {
     try {

         // Find all user profile
         const data = await UserModel.find();
         return {status: "Success", data: data};

     }catch(e) {
      console.log(e.toString());
      return {status: "Error", message: "Internal server error..!"}
     }
 }