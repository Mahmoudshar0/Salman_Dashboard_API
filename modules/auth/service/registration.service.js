import userModel from "../../../DB/model/User.model.js"


import {  generateHash } from "../../../utils/security/hash.js";





export const createAdmin = async (req, res, next) => {
  try {
    const exist = await userModel.findOne({ userName: "admin" });

    if (exist) {
      console.log("Admin already exists");
      return;
    }
  const password = "123456";
    const hashedPassword = generateHash({ plaintext: password })

    const admin = await userModel.create({
      userName: "admin",
      password: hashedPassword,
    });

    console.log("Admin created:", admin);
  } catch (error) {
    console.log("Error:", error.message);
  }
};




