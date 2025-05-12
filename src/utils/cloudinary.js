import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null;
        // Upload the file to Cloudinary
        const response = cloudinary.uploader.upload(
            localFilePath, {
                resource_type: 'auto'
        })
        console.log("File uploaded on Cloudinary successfully", response.url);
        return response;
        // Delete the local file after upload
    
    } catch (error) {
        fs.unlinkSync(localFilePath, (err) => {
            if (err) {
                console.error("Error deleting local file:", err);
            } else {
                console.log("Local file deleted successfully");
            }
        })
    }
}


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});