import jwt from "jsonwebtoken";
import userModel from "../DB/model/User.model.js";

export const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log({ authorization });
    // if (!authorization) {
    //   return res.status(400).json({ message: "Authorization is required" });
    // }

    const [bearer, token] = authorization?.split(" ")||[]
    if (bearer !== "Bearer" || !token) {
      return res.status(401).json({ message: "Invalid authorization format" });
    }

    const signature = process.env.TOKEN_SIGNATURE;

    const decoded = jwt.verify(token, signature);
    console.log({ decoded });

    if (!decoded?.id) {
      return res.status(400).json({ message: "Invalid token payload" });
    }

    const user = await userModel.findById(decoded.id);
    console.log({ user });

    if (!user) {
      return res.status(404).json({ message: "User not registered" });
    }

    req.user = user;
    return next();
  } catch (error) {
    if (error?.name) {
      switch (error.name) {
        case "TokenExpiredError":
        case "JsonWebTokenError":
          return res.status(400).json({ message: "Token Error", error });
      }
    }
    return res.status(500).json({ message: "Server error", error });
  }
};