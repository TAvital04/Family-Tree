import {Router} from "express";

import authController from "../controllers/authController.js";

import {catchErrors} from "../handlers/errorHandlers.js";

export const treeRouter = Router();

