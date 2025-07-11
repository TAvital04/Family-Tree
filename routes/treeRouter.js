import {Router} from "express";

import authController from "../controllers/authController.js";
import treeController from "../controllers/treeController.js";

import {catchErrors} from "../handlers/errorHandlers.js";

export const treeRouter = Router();

// Open a list of trees
    treeRouter.get(
        "/",
        authController.isAuthenticated,
        catchErrors(treeController.getTrees)
    );