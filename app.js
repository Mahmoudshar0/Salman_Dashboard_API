import express from "express";
import morgan from "morgan"
import notFoundMW from "./middlewares/notFoundMW.js"
import connectDB from "./DB/connection.js";
import authconroller from "./modules/auth/auth.controller.js"
import userController from "./modules/User/user.controller.js" 

const app = express();
app.use(express.json())
 
app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.end("hello from salman backend application")
})

app.use("/auth", authconroller)
app.use("/user", userController)
// connectDB()

app.use(notFoundMW)
// app.use(errorHandlerMW)


export default app;