import { 
   AllUserProfileReadService, 
   ProfileDeleteService, 
   ProfileReadService, 
   ProfileUpdateService, 
   UserLoginService, 
   UserRegisterService } from "../Services/userServices.js";

 



 export const UserRegister = async (req, res) => {
    const result = await UserRegisterService(req);
    res.json(result);
 }


 export const UserLogin = async (req, res) => {
    const result = await UserLoginService(req);
      // Cookie set
      const cookieOptions = {expires: new Date(Date.now() + 24 * 60 * 60 * 1000), htttpOnly: false};
      res.cookie("token", result['Token'], cookieOptions);
      res.json(result);
 }



 export const ProfileUpdate = async (req, res) => {
    const result = await ProfileUpdateService(req);
    res.json(result);
 }



 export const ProfileDelete = async (req, res) => {
    const result = await ProfileDeleteService(req);
    res.json(result);
 }




 export const UserProfileRead = async (req, res) => {
    const result = await ProfileReadService(req);
    res.json(result);
 }



 export const AllUserProfileRead = async (req, res) => {
    const result = await AllUserProfileReadService(req);
    res.json(result);
 }

