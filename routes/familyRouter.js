import {Router} from "express";

import authController from "../controllers/authController.js";
import familyController from "../controllers/familyController.js";

import {catchErrors} from "../handlers/errorHandlers.js";

export const familyRouter = Router();

// Create
    familyRouter.get(
        "/add",
        authController.isAuthenticated,
        catchErrors(familyController.addFamily)
    );
    familyRouter.post(
        "/add",
        catchErrors(familyController.createFamily)
    );

// Read
    familyRouter.get(
        "/",
        authController.isAuthenticated,
        catchErrors(familyController.getFamilies)
    );
    familyRouter.get(
        "/:slug",
        familyController.getFamilyBySlug
    );

// Update
    familyRouter.get(
        "/:slug/edit",
        authController.isAuthenticated,
        catchErrors(familyController.editFamilyBySlug)
    );
    familyRouter.post(
        "/:slug/edit",
        familyController.updateFamilyBySlug
    );

// Delete
    familyRouter.delete(
        "/:id/delete",
        authController.isAuthenticated,
        catchErrors(familyController.deleteFamily)
    );