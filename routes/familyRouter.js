import {Router} from "express";

import authController from "../controllers/authController.js";
import familyController from "../controllers/familyController.js";

import {catchErrors} from "../handlers/errorHandlers.js";

export const familyRouter = Router({mergeParams: true});

// Create
    familyRouter.get(
        "/addToRoot",
        authController.isAuthenticated,
        catchErrors(familyController.addMemberToRoot)
    );
    familyRouter.post(
        "/addToRoot",
        catchErrors(familyController.createMemberToRoot)
    );

// Read
    familyRouter.get(
        "/",
        familyController.getFamily
    );   

// Update
    familyRouter.get(
        "/edit",
        authController.isAuthenticated,
        catchErrors(familyController.editFamily)
    );
    familyRouter.post(
        "/edit",
        familyController.updateFamily
    );

// Delete
    familyRouter.delete(
        "/delete",
        authController.isAuthenticated,
        catchErrors(familyController.deleteFamily)
    );