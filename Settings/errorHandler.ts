import { Response } from "express";

//define the type for the error objects
interface CustomError extends Error{
    status?:number;
}

const erroHandler = (res:Response, error:CustomError):void=>{
const status = error.status || 500;
const message = error.message || "Something went Wrong";
res.status(status).json({ message });
}

export default erroHandler;