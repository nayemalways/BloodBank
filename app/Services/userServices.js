/*----------DEPENDENCIES----------*/
import UserModel  from "../model/UsersModel.js";
import bcrypt from "bcrypt";




export const UserRegisterService = async (req) => {
     try {

        const UserData = req.body;
        const isValidData = UserData.firstName && UserData.lastName && UserData.NIDNumber && UserData.phoneNumber && UserData.password && UserData.bloodGroup;
 
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
     
 }

 
 export const ProfileUpdateService = async (req) => {
     
 }


 export const ProfileDeleteService = async (req) => {
     
 }


 export const ProfileReadService = async (req) => {
     
 }


 export const AllUserProfileReadService = async (req) => {
     
 }