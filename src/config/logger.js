import winston, { transports } from "winston";
import config from "./env.config.js";

//TODO:: Creating our logger:
const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'blue',
        http: 'red',
        debug: 'white'
    }
};


const prodLogger = winston.createLogger({
    // Declaramos el trasnport
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console(
            {
                level: "info",
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            }
        ),
        new winston.transports.File(
            {
                filename: './errors.log',
                level: 'error', 
                format: winston.format.simple()
            }
        )
    ]
})



const devLogger = winston.createLogger({
    // Declaramos el trasnport
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({ level: "debug" }),
        
    ]
})



export const addLogger = (req, res, next) => {
    if (config.enviroment === 'prod') {
        req.logger = prodLogger


    } else {
        req.logger = devLogger

    }
    next();
}

    