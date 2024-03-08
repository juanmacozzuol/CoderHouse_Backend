import dotenv, { config } from 'dotenv';
import program from '../utils/process.js';

const enviroment = program.opts().mode;


dotenv.config({
    path: enviroment === 'prod' ? "./src/config/.env.production" : "./src/config/.env.development"

})

export default{
    port: process.env.PORT,
    urlMongo: process.env.MONGO_URL,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
    enviroment: enviroment
}