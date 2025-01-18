import { Request, Response, NextFunction, response } from "express"
import axios, {AxiosRequestConfig} from 'axios';
import dotenv from 'dotenv'
import erroHandler from "../errorHandler";
dotenv.config();

const authenticateuser= async(req:Request,res:Response,next:NextFunction): Promise<void>=>{
    try{
       
        const token = req.headers['authorization']
        if (!token) {
            res.status(401).json({ message: 'Access Token Missing' });
            
          }
        else{
            const apiUrl=`http://localhost:${process.env.users_Por||3003}/api/users/check_user`
            //config request
            const config:AxiosRequestConfig ={
                headers:{
                    Authorization: token,
                    "Content-Type":"application/json",
                }
            };


            //Make the API call
            const response = await axios.get(apiUrl, config);
            // Handle the response
            if (response.status === 200 && response.data) {
                req.body.user = response.data; // Attach user data to the request body
               
            }
            else{
            // Handle cases where the user is unauthorized or bad request
            res.status(response.status).json({
                message: response.data?.message || 'Unauthorized',
            });
            }
        next();
    }

    }
    catch (error) {
    
        // Handle unexpected errors
        console.error("Unexpected error:", error);
        res.status(500).json({ message: "Internal Server Error" });
        next();
        }
        
    };
        
    export default authenticateuser;