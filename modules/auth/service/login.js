import userModel from "../../../DB/model/User.model.js"
import { asyncHandler } from "../../../utils/error/error.js"
import { succesResponse } from "../../../utils/response/success.response.js";
import { compareHash } from "../../../utils/security/hash.js";
import { generateToken } from "../../../utils/security/token.js";









export const login = asyncHandler(async (req, res, next) => {

  const { userName, password } = req.body

  const user = await userModel.findOne({ userName })
  if (!user) {
    return next(new Error("invalid-login data", { cause: 404 }))


  }
  const match =compareHash({plaintext:password,hashValue:user.password})

  if (!match) {
    return next(new Error("invalid-login data", { cause: 400 }))


  }

  const token = 
  generateToken({
    payload:{ id: user._id, role: user.role || "User" },
    signature: process.env.TOKEN_SIGNATURE,
    options:  { expiresIn: 60 * 60 }
  })
  
 
  return succesResponse({ res, message: "Done", data: { token } })

}


)