import userModel from "../DB/model/User.model.js";
import { asyncHandler } from "../utils/error/error.js";
import { verifyToken } from "../utils/security/token.js";

export const authentication = asyncHandler(async (req, res, next) => {

  const { authorization } = req.headers;

  if (!authorization) {
    return next(new Error("Authorization required", { cause: 400 }));
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    return next(new Error("Invalid token format", { cause: 400 }));
  }

  const signature = process.env.TOKEN_SIGNATURE;

  const decoded = verifyToken({token,signature})

  if (!decoded?.id) {
    return next(new Error("Invalid token payload", { cause: 400 }));
  }

  const user = await userModel.findById(decoded.id);

  if (!user) {
    return next(new Error("User not found", { cause: 404 }));
  }

  req.user = user;
  next();
});