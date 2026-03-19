import mongoose from "mongoose";
const connectDB = async () => {

   await mongoose.connect("mongodb+srv://abdo0100:0794613@cluster0.7mqoi.mongodb.net/lawoffice").then(res=>{
        console.log(`DB connected`,res.models);
        
    }).catch(err=>{
        console.log(`DB connection error`,err);
    })
}

export default connectDB    