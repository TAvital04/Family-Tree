import {Router} from "express";

import authController from "../controllers/authController.js";
import memberController from "../controllers/memberController.js";

import {catchErrors} from "../handlers/errorHandlers.js";

export const memberRouter = Router({mergeParams: true});

// Create
    memberRouter.get(
        "/addToMember",
        authController.isAuthenticated,
        catchErrors(memberController.addMemberAtMember)
    );
    memberRouter.post(
        "/addToMember",
        catchErrors(memberController.createMemberAtMember)
    )

// Read
    memberRouter.get(
        "/",
        authController.isAuthenticated,
        catchErrors(memberController.getMember)
    );

// Update
    memberRouter.get(
        "/edit",
        authController.isAuthenticated,
        catchErrors(memberController.editMember)
    );
    memberRouter.post(
        "/edit",
        catchErrors(memberController.updateMember)
    )

// Delete
    memberRouter.delete(
        "/deleteMemberAndDescendants",
        authController.isAuthenticated,
        catchErrors(memberController.deleteMemberAndDescendants)
    );
