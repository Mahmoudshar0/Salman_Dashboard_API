import jwt from "jsonwebtoken"
import userModel from "../../../DB/model/User.model.js"

export const profile=async(req,res,next)=>{
    try {
        const {authorization}=req.headers
        const decoded=jwt.verify(authorization,process.env.TOKEN_SIGNATYURE)
        const   user=await userModel.findById(decoded.id)
        
        return res.status(200).json({message:"user profile",user    ,decoded})
    } catch (error) {
                return res.status(500).json({message:"Erorr",error})

    }
}