import {Router} from "express";

import authController from "../controllers/authController.js";
import homeController from "../controllers/homeController.js";

import {catchErrors} from "../handlers/errorHandlers.js";

export const homeRouter = Router();

// Create
    homeRouter.get(
        "/add",
        authController.isAuthenticated,
        catchErrors(homeController.addFamily)
    );
    homeRouter.post(
        "/add",
        catchErrors(homeController.createFamily)
    );

// Read
    homeRouter.get(
        "/",
        authController.isAuthenticated,
        catchErrors(homeController.getFamilies)
    );