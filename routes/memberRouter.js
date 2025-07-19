import {Router} from "express";

import authController from "../controllers/authController.js";
import memberController from "../controllers/memberController.js";

import {catchErrors} from "../handlers/errorHandlers.js";

export const memberRouter = Router({mergeParams: true});

// Create


// Read
    memberRouter.get(
        "/",
        authController.isAuthenticated,
        catchErrors(memberController.getMemberBySlug)
    );

// Update
    memberRouter.get(
        "/edit",
        authController.isAuthenticated,
        memberController.editMember
    );

// Delete
    memberRouter.delete(
        "/delete",
        authController.isAuthenticated,
        catchErrors(memberController.deleteMember)
    );
