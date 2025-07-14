import {Router} from "express";

import userController from "../controllers/userController.js";
import authController from "../controllers/authController.js";

export const userRouter = Router();

// Register
    userRouter.get(
        "/register",
        userController.registerForm
    );
    userRouter.post(
        "/register",
        userController.validateRegister,
        userController.register
    );

// Login
    userRouter.get(
        "/login",
        userController.loginForm
    );
    userRouter.post(
        "/login",
        authController.login
    );

// Logout
    userRouter.post(
        "/logout",
        authController.isAuthenticated,
        authController.logout
    );