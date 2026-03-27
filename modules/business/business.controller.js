import { Router } from "express"
import * as businessService from "./service/business.service.js"
import { authentication } from "../../middlewares/auth.middleWare.js";

const router=Router();
router.post("/add",authentication,businessService.addService)
router.get("/",authentication,businessService.getAllService)
router.get("/:id",authentication,businessService.getServiceByID)
router.put("/update/:id",authentication,businessService.updateService)
router.delete("/delete/:id", authentication, businessService.deleteService);
router.patch("/toggle/:id", authentication, businessService.toggleServiceStatus);

export default router