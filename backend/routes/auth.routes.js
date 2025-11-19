import express from "express";
import { googleAuthCallback, login, logout, resetPassword, sendOtp, signUp, verifyOtp } from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/signup",signUp)
authRoutes.post("/login",login)
authRoutes.post("/logout",logout)
authRoutes.post("/sendOtp",sendOtp)
authRoutes.post("/verifyOtp",verifyOtp)
authRoutes.post("/resetPassword",resetPassword)
authRoutes.post("/google-auth",googleAuthCallback)
authRoutes.post("/google-auth",googleAuthCallback)

export default authRoutes