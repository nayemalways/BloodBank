import * as path from 'path';
import dotenv from "dotenv";
dotenv.config();


// DATABASE INFO
export const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;

// JWT TOKEN
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRATION_TIME = Number(process.env.JWT_EXPIRATION_TIME);


// EMAIL
export const EMAIL_HOST =process.env.EMAIL_HOST;
export const EMAIL_PORT = process.env.EMAIL_PORT;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
export const EMAIL_SECURITY = false;


// JSON SIZE
export const MAX_JSON_SIZE = process.env.MAX_JSON_SIZE;

// URL ENCODE
export const URL_ENCODED = true;

// REQUEST LIMIT
export const REQUEST_LIMIT_TIME = process.env.REQUEST_LIMIT_TIME;
export const REQUEST_LIMIT_NUMER = process.env.REQUEST_LIMIT_NUMER;


// WEB CACHE
export const WEB_CACHE = false;

// PORT
export const PORT = process.env.PORT;



