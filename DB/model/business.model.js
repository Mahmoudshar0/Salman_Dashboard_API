import mongoose,{model,Schema} from "mongoose";
const businessSchema=new Schema({
name:{
    type:String,
    required:true,
    trim:true
},
 description: {
    type: String,   
    required: true,
  },price:{
    type:Number,
    required:true   
},
duration:{
    type:Number
 
},
status:{
    type:String,
    enum:["active","hidden"],
    default:"active"
},
order:{
    type:Number,
    default:0
},


},
{timestamps:true}


);

const businessModel=mongoose.models.Business||model("Business",businessSchema)
export default businessModel
