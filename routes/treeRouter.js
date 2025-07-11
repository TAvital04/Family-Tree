import {Router} from "express";

import authController from "../controllers/authController.js";
import treeController from "../controllers/treeController.js";

import {catchErrors} from "../handlers/errorHandlers.js";

export const treeRouter = Router();

// Create
    // Create a tree
    treeRouter.get(
        "/add",
        authController.isAuthenticated,
        catchErrors(treeController.addTree)
    );
    treeRouter.post(
        "/add",
        catchErrors(treeController.createTree)
    );

    // Create a descendant
    treeRouter.get(
        "/:id/add",
        authController.isAuthenticated,
        catchErrors(treeController.addDescendant)
    );
    treeRouter.post(
        "/:id/add",
        catchErrors(treeController.createDescendant)
    );

// Read
    treeRouter.get(
        "/",
        authController.isAuthenticated,
        catchErrors(treeController.getTrees)
    );

    treeRouter.get(
        "/:slug",
        treeController.getTreeBySlug
    );

// Update
    treeRouter.get(
        "/:id/edit",
        authController.isAuthenticated,
        treeController.editTree
    );
    treeRouter.post(
        "/:id/edit",
        authController.isAuthenticated,
        catchErrors(treeController.updateTree)
    );

// Delete
    router.delete(
        "/:id/delete",
        authController.isAuthenticated,
        catchErrors(treeController.deleteNote)
    );