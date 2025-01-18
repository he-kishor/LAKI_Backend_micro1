import { Request, Response, NextFunction, response } from "express"
import axios, {AxiosRequestConfig} from 'axios';
import dotenv from 'dotenv'
import erroHandler from "../errorHandler";
dotenv.config();

const authenticateuser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers['authorization'];
        
        if (!token) {
            res.status(401).json({ message: 'Access Token Missing' });
            next()
        }
        else{
            const apiUrl = `http://localhost:${process.env.users_Por || 3003}/api/users/check_user`;
            // Configuring request headers
            const config: AxiosRequestConfig = {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            };

            // Make the API call
            const response = await axios.get(apiUrl, config);

            // Handle the response from the external API
            if (response.status === 200 && response.data) {
                req.body.user = response.data; // Attach user data to the request body
                next(); // Proceed to the next middleware or route
            } else {
                console.log(`Response status code: ${response.status}`);
                res.status(response.status).json({ message: response.data || 'Error in external service' });
            }
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // If the error is from the external API call
            res.status(error.response?.status || 500).send(error.response?.data || 'External API error' );
        } else {
            // If it's an unexpected error (not from the API call)
            console.error("Unexpected error:", error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

export default authenticateuser;