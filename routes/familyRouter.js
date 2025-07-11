import {Router} from "express";

import authController from "../controllers/authController.js";
import treeController from "../controllers/familyController.js";

import {catchErrors} from "../handlers/errorHandlers.js";

export const familyRouter = Router();

// Open a list of trees
    familyRouter.get(
        "/",
        authController.isAuthenticated,
        catchErrors(treeController.getFamilies)
    );