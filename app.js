// ALL THE DEPENDENCIES 
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import router from "./routes/api.js";
import fileUpload from "express-fileupload";
import {
    REQUEST_LIMIT_TIME,
    REQUEST_LIMIT_NUMER,
    PORT,
    MAX_JSON_SIZE,
    URL_ENCODED,
    WEB_CACHE,
    MONGODB_CONNECTION,
    DB_USER,
    DB_PASS
} from './app/config/config.js';
import dotenv from "dotenv";
dotenv.config();




// EXPRESS APP CREATE
const app = express();


// GLOBAL APPLICATIONS MIDDLEWARES
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(hpp());
app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({extended: URL_ENCODED}));
app.use(fileUpload());

// RATE LIMIT
const limitter = rateLimit({windowMs:REQUEST_LIMIT_TIME, max: REQUEST_LIMIT_NUMER});
app.use(limitter);


// WEB CAHCE
app.set('etag', WEB_CACHE);


// MONGODB CONNECTION
const options = {
    user: DB_USER,
    pass: DB_PASS,
    autoIndex: true,
    serverSelectionTimeoutMS: 30000
}

mongoose.connect(MONGODB_CONNECTION, options)
    .then(() => console.log("DB connected"))
    .catch((e) => console.error(err));


// SET APPLICATION STORAGE
app.use(express.static('storage')); // The file will recognize randomly


// SET API ROUTES
app.use('/api', router);





// *** RUN YOU APPLICATIONS ***
app.listen(PORT, () => {
    console.log(`Your App is running on the port number ${PORT}`);
})