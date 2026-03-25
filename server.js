    import app from './app.js';
    import * as dotenv from 'dotenv';
    import { createAdmin } from './modules/auth/service/registration.service.js';
import connectDB from './DB/connection.js';

    dotenv.config();
    const PORT = process.env.PORT;

        let data={
            body:{},
            params:{},
            headers:{}
        }
data.user={
    name:"mahmoud"
}
console.log(data);

    createAdmin()
connectDB()

    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
