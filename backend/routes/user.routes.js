import express from "express";
import { getCurrentUser } from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/isAuth.js";


const userRoutes = express.Router();

userRoutes.get("/current-user",isAuth,getCurrentUser)

export default userRoutes;