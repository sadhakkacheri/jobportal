import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,    // Changed to match your .env
    api_key: process.env.API_KEY,          // Changed to match your .env
    api_secret: process.env.API_SECRET     // Changed to match your .env
});

export default cloudinary;