import mongoose from "mongoose";
const connectDB = async () => {
console.log(process.env.LOCAL_MONGO_ABDO);

   await mongoose.connect(process.env.LOCAL_MONGO_ABDO).then(res=>{
        console.log(`DB connected`,res.models);
        
        
    }).catch(err=>{
        console.log(`DB connection error`,err);
    })
}

export default connectDB    