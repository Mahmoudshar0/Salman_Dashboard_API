import { asyncHandler } from "../../../utils/error/error.js";
import { succesResponse } from "../../../utils/response/success.response.js";


export const profile=asyncHandler(async(req,res,next)=>{

        
    return succesResponse({res,data:{user:req.user}})
    } )
