import mongoose, { model, Schema } from "mongoose";
const userSchema = new Schema({
userName: {
  type: String,
  required: [true, "User name is required"],
  minLength: [2, "too short user name"],
  maxLength: [50, "too long user name"],
  trim: true,
  unique: true  
},
password:{
    type:String,
    required:true,
}


},{timestamps:true})

const userModel=mongoose.models.User|| model('User',userSchema)
export default userModel