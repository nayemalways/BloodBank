import { TokenDecode } from "../utility/tokenUtility.js";

export const userAuthentication = async (req, res, next) => {
     try {
        const token = req.cookies.token;
        const decodeToken = TokenDecode(token);

        const userID = decodeToken.user_id;
        const email = decodeToken.email;
    
        req.headers.email = email;
        req.headers.user_id = userID;

        next();
    }catch(e) {
        console.log(e.toString());
        res.status(401).json({status: "faild", message: "User Unauthorized"});
    }
}