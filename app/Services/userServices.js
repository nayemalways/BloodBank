/*----------DEPENDENCIES----------*/
import UserModel  from "../model/UsersModel.js";
import bcrypt from "bcrypt";
import { TokenEncode } from "../utility/tokenUtility.js";




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
     
 }


 export const ProfileReadService = async (req) => {
     
 }


 export const AllUserProfileReadService = async (req) => {
     
 }