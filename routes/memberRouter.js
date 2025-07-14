import {Router} from "express";

import authController from "../controllers/authController.js";
import memberController from "../controllers/memberController.js";

import {catchErrors} from "../handlers/errorHandlers.js";

export const memberRouter = Router();

// Open the member attribute page
    memberRouter.get(
        "/",
        catchErrors(memberController.getMemberBySlug)
    );

// Edit member attributes
    memberRouter.get(
        "/edit",
        authController.isAuthenticated,
        memberController.editMember
    );
    memberRouter.post(
        "/edit",
        authController.isAuthenticated,
        catchErrors(memberController.updateMember)
    );

// Delete a member
    memberRouter.delete(
        "/delete",
        authController.isAuthenticated,
        catchErrors(memberController.deleteMember)
    );