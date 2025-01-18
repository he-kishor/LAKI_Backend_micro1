//package installtion

import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import logger from './Settings/middleware/logger';
import connectDB from './Settings/DB/dbconnect';
import { createServer } from 'http';
import { Server } from 'socket.io';
import authenticateuser from './Settings/middleware/authenticate_user'
import cors from 'cors';



//For env File 
dotenv.config();

const app: Application = express();
const server = createServer(app);//http
const io = new Server(server,{
    cors:{origin:'*',methods:['GET','POST']},
});
io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('disconnect', () => console.log('user disconnected'));
  });
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(logger);



app.get('/', (req:Request,res:Response) => {
  res.send('Welcome to LAKI Chat AAP');
});

app.get('/test', authenticateuser,(req: Request, res: Response) => {
    console.log((req as any).body.user);
    res.send("Authenticated user");
  });

connectDB().then(()=>{
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
})
