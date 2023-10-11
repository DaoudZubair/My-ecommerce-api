import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

import {
  login,
  createUser,
  getAllUsers,
  getSingularUser,
  updateSingleUser,
  deleteSingleUser,
} from "../controllers/user.controller.js";

const middleware = (req, res, next) => {
  console.log("Middleware Calling");
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization; // Corrected spelling
  token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
    }
    console.log("Successfully Verify Token");
    next();
  });
};

// router.post("/user", createUser)
router.get("/user", middleware, getAllUsers);
router.get("/user/:id", getSingularUser);
router.put("/user/:id", updateSingleUser);
router.delete("/user/:id", deleteSingleUser);
router.post("/user-login", login);

router.post("/user-reg", createUser);
// router.post("/user-forgot", forgotPassword); 

export { router };
