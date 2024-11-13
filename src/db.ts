import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import logger from "./logger";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_SERVER_PATH}/${DB_NAME}`);
        
        logger.info(`${DB_NAME} database connected`);
        console.log(`DB HOST: ${connectionInstance.connection.host}`);
  
    } catch (error) {
        logger.error("database not connected");
        logger.fatal(error);
        process.exit(0);
    }
  }

export default connectDB;