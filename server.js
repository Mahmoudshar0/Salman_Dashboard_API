import app from './app.js';
import dotenv from 'dotenv';
import {connect} from "mongoose"

dotenv.config();
const PORT = process.env.PORT;
const MODE = process.env.MODE;
const MONGO_DB_URL = MODE === "DEV" ? process.env.LOCAL_MONGO_DB_URL : process.env.PIBLIC_MONGO_DB_URL;

connect(MONGO_DB_URL)
.then(() => {
    console.log("Mongo DB connected successfully");
})
.catch((err) => {
    console.log("Mongo DB connection error:", err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}
    in ${MODE} mode
    with DB Uri : ${MONGO_DB_URL}`);
});
