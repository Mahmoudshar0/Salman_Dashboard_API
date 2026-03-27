
import * as loginService from './service/login.js';
import { Router } from 'express'

const router = Router();


router.post("/login", loginService.login)

export default router