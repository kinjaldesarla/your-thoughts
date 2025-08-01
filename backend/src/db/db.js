import mongoose from "mongoose";
import { DB_NAME } from "../../constant.js";

const connectDB = async () => {
  try {
   
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: DB_NAME,
    });

    console.log(`MONGODB connected at host: ${connectionInstance.connection.host}`);

  } catch (error) {
    console.log(" MONGODB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
