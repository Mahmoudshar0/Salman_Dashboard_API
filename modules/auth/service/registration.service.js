import userModel from "../../../DB/model/User.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"




export const createAdmin = async () => {
  try {
    const exist = await userModel.findOne({ userName: "admin" })

    if (exist) {
      console.log("Admin already exists")
      return
    }

    const hashedPassword = await bcrypt.hash("123456",parseInt(process.env.SALT) )

    const admin = await userModel.create({
      userName: "admin",
      password: hashedPassword
    })

    console.log("Admin created:", admin)
  } catch (error) {
    console.log("Error:", error.message)
  }
}




export const login = async(req, res, next) => {
  try {
      const{userName,password}=req.body

    const user =await userModel.findOne({userName} )
    if (!user) {
          return res.status(200).json({ message: "invalid-login data"  , user})

      
    }
        const match=bcrypt.compareSync(password,user.password)

    if (!match  ) {
          return res.status(404).json({ message: "invalid-login data"  , user})

      
    }

     const token = jwt.sign(
      { id: user._id, role: user.role || "User" }, 
      process.env.TOKEN_SIGNATURE,               
      { expiresIn: 60 * 60 }                     
    );
    return res.status(200).json({ message: "login"  , token})
  } catch (error) {
    
        return res.status(500).json({ message: "server error"  ,error,msg:error.message,stack:error.stack})

  }
}

