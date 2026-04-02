import articleModel from "../../../DB/model/article.model.js";
import { asyncHandler } from "../../../utils/error/error.js";
import { succesResponse } from "../../../utils/response/success.response.js";
import slugify from "slugify";

export const addArticle = asyncHandler(async (req, res, next) => {
    const { title, content, category, author, metaDescription, keywords } = req.body;
    
    const existingArticle = await articleModel.findOne({ title, author });
    if (existingArticle) {
        return res.status(400).json({ message: "المقال موجود بالفعل بنفس العنوان والكاتب" });
    }

    let baseSlug = slugify(title, { lower: true });
    let slug = baseSlug;
    let count = 1;
    while (await articleModel.findOne({ slug })) {
        slug = `${baseSlug}-${count}`;
        count++;
    }

    const keywordsArray = keywords?.split(",") || [];

    const article = await articleModel.create({
        title,
        slug,
        content,
        category,
        author,
        image: req.file?.path,
        metaDescription,
        keywords: keywordsArray
    });

    return succesResponse({ res, message: "Done", data: { article } });
});


export const  getAllArticles=asyncHandler(async(req,res,next)=>{
const articles=await articleModel.find().sort({createdAt:-1})

    return succesResponse({ res, message: "Done", data: { articles } });

})

export const getArticleById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const article = await articleModel.findById(id);
  if (!article) {
    return next(new Error("Article not found", { cause: 404 }));
  }

  return res.status(200).json({
    message: "Done",
    article
  });
});


export const updateArticle = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (req.body.title) {
    req.body.slug = slugify(req.body.title, { lower: true, strict: true });
  }

  if (req.body.keywords) {
    req.body.keywords = req.body.keywords
      .split(",")
      .map(k => k.trim())
      .filter(k => k);
  }

  if (req.file) {
    req.body.image = req.file.path;
  }

  const article = await articleModel.findByIdAndUpdate(
    id,
    req.body,
    { returnDocument: "after", runValidators: true }
  );

  if (!article) {
    return next(new Error("Article not found", { cause: 404 }));
  }

  return succesResponse({ res, message: "Updated", data: { article } });
});



export const deleteArticle = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const article = await articleModel.findByIdAndDelete(id);

  if (!article) {
    return next(new Error("Article not found", { cause: 404 }));
  }

  return succesResponse({ res, message: "Deleted" });
});



export const toggleStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const article = await articleModel.findById(id);

  if (!article) {
    return next(new Error("Article not found", { cause: 404 }));
  }

  article.status = article.status === "published" ? "draft" : "published";

  await article.save();

  return succesResponse({ res, message: "Status updated", data: { article } });
});