import {Router} from "express";

import authController from "../controllers/authController.js";
import familyController from "../controllers/familyController.js";

import {catchErrors} from "../handlers/errorHandlers.js";

export const familyRouter = Router();

// Open a list of families
    familyRouter.get(
        "/",
        authController.isAuthenticated,
        catchErrors(familyController.getFamilies)
    );

// Add a new family
    familyRouter.get(
        "/add",
        authController.isAuthenticated,
        catchErrors(familyController.addFamily)
    );
    familyRouter.post(
        "/add",
        catchErrors(familyController.createFamily)
    );

// Enter a family page
    familyRouter.get(
        "/:slug",
        familyController.getFamilyBySlug
    );

    familyRouter.get(
        "/:slug/add",
        authController.isAuthenticated,
        catchErrors(familyController.addMember)
    );
    familyRouter.post(
        "/:slug/add",
        catchErrors(familyController.createMember)
    );

// Delete a family
    familyRouter.delete(
        "/:id/delete",
        authController.isAuthenticated,
        catchErrors(familyController.deleteFamily)
    );