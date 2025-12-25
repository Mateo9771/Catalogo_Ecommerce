import dotenv from 'dotenv';

dotenv.config({path: './config/.env'});

export default {
    port: process.env.PORT,
    mongoURI: process.env.MONGO_URI,
    cookieSecret: process.env.COOKIE_SECRET,
    frontendURL: process.env.FRONTEND_URL
}
