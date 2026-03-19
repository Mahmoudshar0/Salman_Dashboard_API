    import app from './app.js';
    import * as dotenv from 'dotenv';
    import { createAdmin } from './modules/auth/service/registration.service.js';

    dotenv.config();
    const PORT = process.env.PORT;

    createAdmin()

    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
