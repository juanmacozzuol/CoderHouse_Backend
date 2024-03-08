import EErrors from "../../services/errors/enums.js";

export default(error,req,res,next)=>{
    req.logger.error("Error detectado entrando al Error Handler")
    req.logger.info(error.cause)
    switch(error.code){
        case EErrors.INVALID_TYPES_ERROR:
            res.status(400).send({status:"error",error:error.message})
            break;
        default:
            res.status(500).send({status:"error",error:"Unhandled error"})
    }
}