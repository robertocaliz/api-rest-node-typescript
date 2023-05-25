import express from 'express';
import 'dotenv/config';
import { router } from './routes';
import cors from 'cors';


const server = express();


server.use(express.json());

server.use(cors({
  origin: process.env.ALLOWED_ORIGINS
}));


server.use(router);


export { server };