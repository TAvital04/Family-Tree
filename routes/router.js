// Objects
    import {Router} from "express";

    import userController from "../controllers/userController.js";
    import authController from "../controllers/authController.js";

    import {catchErrors} from "../handlers/errorHandlers.js";

    export const router = Router();

// Routes
    router.get("/", (req, res) => {
        res.send("Home");
    });

    // Users
        // Register
            router.get(
                "/register",
                userController.registerForm
            );
            router.post(
                "/register",
                userController.validateRegister,
                userController.register
            );

        // Login
            router.get(
                "/login",
                userController.loginForm
            );
            router.post(
                "/login",
                authController.login
            );

        // Logout
            router.get(
                "/logout",
                authController.isAuthenticated,
                authController.logout
            );