//package installation

import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const connectDB = async():Promise<void>=>{
    try{
        const mongouri =process.env.MONGODBP
        if (!mongouri) {
            throw new Error('MongoDB connection string (MONGODBP) is not defined in environment variables.');
          }
        await mongoose.connect(mongouri,{});
        console.log('Database connected');
    }
        catch(err){
            console.error('Database connection erro:',err);
            process.exit(1);//exit process with failure
        }
    };

export default connectDB;