import * as articleService from "./service/article.service.js";
import { Router } from "express";
import multer from "multer";

const router=Router();
const upload=multer({dest:"uploads/"})
router.post("/addArticle",upload.single("image"),articleService.addArticle)
router.get("/all-articles",articleService.getAllArticles)
router.get("/article/:id",articleService.getArticleById)
router.put("/update-article/:id",upload.single("image"),articleService.updateArticle)
router.delete("/delete-article/:id",articleService.deleteArticle)
router.patch("/toggle-status/:id",articleService.toggleStatus)

export default router
