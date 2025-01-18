import { Response, Request, NextFunction} from "express";
const logger =(req:Request, res:Response,next:NextFunction):void=>{
    console.log(`LOGS :=>${req.method} request recived on ${req.url}`);
    next();
}
export default logger;