import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import DB_NAME from "../constants.js"

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`);
    }

    catch(error){
        console.error("Error connecting to mongodb:", error);
        process.exit(1);
    }
}

export default connectDB;