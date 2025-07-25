import {Router} from "express";

import authController from "../controllers/authController.js";
import familyController from "../controllers/familyController.js";

import {catchErrors} from "../handlers/errorHandlers.js";

export const familyRouter = Router({mergeParams: true});

// Create
    familyRouter.get(
        "/addToRoot",
        authController.isAuthenticated,
        catchErrors(familyController.addMemberAtRoot)
    );
    familyRouter.post(
        "/addToRoot",
        catchErrors(familyController.createMemberAtRoot)
    );

// Read
    familyRouter.get(
        "/",
        authController.isAuthenticated,
        catchErrors(familyController.getFamily)
    );

    familyRouter.get(
        "/query",
        authController.isAuthenticated,
        catchErrors(familyController.getQuery)
    );
    familyRouter.post(
        "/query",
        authController.isAuthenticated,
        catchErrors(familyController.postQuery)
    );

// Update
    familyRouter.get(
        "/edit",
        authController.isAuthenticated,
        catchErrors(familyController.editFamily)
    );
    familyRouter.post(
        "/edit",
        catchErrors(familyController.updateFamily)
    );

// Delete
    familyRouter.delete(
        "/delete",
        authController.isAuthenticated,
        catchErrors(familyController.deleteFamily)
    );