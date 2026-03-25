import { Router } from "express";
import { profile } from "./services/user.service.js";
import { authentication } from "../../middlewares/auth.middleWare.js";

const router=Router()
  
router.get("/profile",authentication,profile)
export default router