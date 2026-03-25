

export const profile=async(req,res,next)=>{
    try {

        
        return res.status(200).json({message:"user profile",user:req.user   })
    } catch (error) {
                return res.status(500).json({message:"Erorr",error})

    }
}