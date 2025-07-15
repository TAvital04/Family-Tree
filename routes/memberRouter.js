import {Router} from "express";

import authController from "../controllers/authController.js";
import memberController from "../controllers/memberController.js";

import {catchErrors} from "../handlers/errorHandlers.js";

export const memberRouter = Router();

// Create
    memberRouter.get(
        "/add",
        authController.isAuthenticated,
        catchErrors(memberController.addMember)
    );
    memberRouter.post(
        "/add",
        catchErrors(memberController.createMember)
    );

// Read
    memberRouter.get(
        "/",
        catchErrors(memberController.getMemberBySlug)
    );

// Update
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

// Delete
    memberRouter.delete(
        "/delete",
        authController.isAuthenticated,
        catchErrors(memberController.deleteMember)
    );