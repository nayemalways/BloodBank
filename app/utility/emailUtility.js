import nodemailer from 'nodemailer';
import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_USER, EMAIL_SECURITY } from '../config/config.js';

const Email_Send = async (EmailTo, EmailText, EmailSubject, EmailHTMLBody) => {
    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: EMAIL_SECURITY,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: EMAIL_USER,
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText,
        html: EmailHTMLBody
    };

    // SEND EMAIL
    try{
        await transporter.sendMail(mailOptions);
        return true;
    }catch(error){
        return false;
    }
};



// Export Email_Send
export default Email_Send;