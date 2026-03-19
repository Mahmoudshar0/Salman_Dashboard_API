
import { Router } from 'express'
import * as registrationService from './service/registration.service.js';

const router = Router();


router.post("/login", registrationService.login)

export default router