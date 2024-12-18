import { JWT_EXPIRATION_TIME, JWT_SECRET } from "../config/config.js";
import JWT from 'jsonwebtoken';


// Token Encode helper utility
export const TokenEncode = (email, user_id) => {
    const KEY = JWT_SECRET;
    const EXPIRE = {expiresIn: JWT_EXPIRATION_TIME};
    const PAYLOAD = {email: email, user_id: user_id};

    return JWT.sign(PAYLOAD, KEY, EXPIRE);
    
};


// Token Decode helper utility
export const TokenDecode = (token) => {
    try{
       return JWT.verify(token, JWT_SECRET);
    }catch(error){
        res.json({status: null});
    }
}