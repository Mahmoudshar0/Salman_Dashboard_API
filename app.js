import express from "express";
import morgan from "morgan"
import notFoundMW from "./middlewares/notFoundMW.js"

const app = express();

app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.end("hello from salman backend application")
}
)

app.use(notFoundMW)
// app.use(errorHandlerMW)

export default app;